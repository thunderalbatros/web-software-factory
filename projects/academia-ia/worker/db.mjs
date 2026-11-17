/**
 * db.mjs — Pure Cloudflare D1 SQL Data Layer (executes identical SQL on env.DB & local node:sqlite adapter)
 * Zero node:* imports; 100% parameterized `.prepare(sql).bind(...args)`.
 */
import {
  CANONICAL_EVENT_XP,
  computeCurriculumProgress
} from '../src/lib/curriculum-paths.mjs';

export async function findUserByBlindIndex(db, blindIndex) {
  return db
    .prepare('SELECT * FROM users WHERE email_blind_index = ? LIMIT 1')
    .bind(blindIndex)
    .first();
}

export async function findOAuthLink(db, provider, providerUserId) {
  return db
    .prepare('SELECT * FROM oauth_accounts WHERE provider = ? AND provider_user_id = ? LIMIT 1')
    .bind(provider, String(providerUserId))
    .first();
}

export async function getUserById(db, userId) {
  return db.prepare('SELECT * FROM users WHERE id = ? LIMIT 1').bind(userId).first();
}

export async function listOAuthAccountsForUser(db, userId) {
  const res = await db
    .prepare('SELECT provider, provider_user_id, provider_login, created_at FROM oauth_accounts WHERE user_id = ? ORDER BY created_at ASC')
    .bind(userId)
    .all();
  return res?.results || [];
}

export async function createOrUpdateGoogleUserAndLink(
  db,
  {
    userId,
    displayName,
    emailCiphertext,
    emailBlindIndex,
    googleSub,
    nowIso
  }
) {
  const existingLink = await findOAuthLink(db, 'google', googleSub);
  if (existingLink) {
    await db
      .prepare('UPDATE users SET email_ciphertext = ?, email_blind_index = ?, updated_at = ? WHERE id = ?')
      .bind(emailCiphertext, emailBlindIndex, nowIso, existingLink.user_id)
      .run();
    return getUserById(db, existingLink.user_id);
  }

  const existingByBlind = await findUserByBlindIndex(db, emailBlindIndex);
  if (existingByBlind) {
    await db.batch([
      db
        .prepare('UPDATE users SET email_ciphertext = ?, updated_at = ? WHERE id = ?')
        .bind(emailCiphertext, nowIso, existingByBlind.id),
      db
        .prepare(
          'INSERT INTO oauth_accounts (provider, provider_user_id, provider_login, user_id, created_at) VALUES (?, ?, NULL, ?, ?)'
        )
        .bind('google', String(googleSub), existingByBlind.id, nowIso)
    ]);
    return getUserById(db, existingByBlind.id);
  }

  await db.batch([
    db
      .prepare(
        `INSERT INTO users (
          id, display_name, email_ciphertext, email_blind_index, avatar_key,
          xp_total, current_level, active_path_id, hardware_archetype_id,
          linkedin_handle, x_handle, onboarding_completed, created_at, updated_at
        ) VALUES (?, ?, ?, ?, NULL, 0, 1, 'uso_cotidiano', 'pc_basica_zero_cost', NULL, NULL, 0, ?, ?)`
      )
      .bind(userId, displayName, emailCiphertext, emailBlindIndex, nowIso, nowIso),
    db
      .prepare(
        'INSERT INTO oauth_accounts (provider, provider_user_id, provider_login, user_id, created_at) VALUES (?, ?, NULL, ?, ?)'
      )
      .bind('google', String(googleSub), userId, nowIso)
  ]);
  return getUserById(db, userId);
}

export async function linkGithubAccountForUser(db, { userId, providerUserId, providerLogin, nowIso }) {
  const existing = await findOAuthLink(db, 'github', providerUserId);
  if (existing && existing.user_id !== userId) {
    return { linked: false, conflict: true, reason: 'GITHUB_ACCOUNT_ALREADY_LINKED_TO_OTHER_USER' };
  }
  await db
    .prepare(
      `INSERT INTO oauth_accounts (provider, provider_user_id, provider_login, user_id, created_at)
       VALUES ('github', ?, ?, ?, ?)
       ON CONFLICT(user_id, provider) DO UPDATE SET
         provider_user_id = excluded.provider_user_id,
         provider_login = excluded.provider_login`
    )
    .bind(String(providerUserId), String(providerLogin), userId, nowIso)
    .run();
  return { linked: true, conflict: false, providerLogin: String(providerLogin) };
}

export async function createSession(db, { tokenSha256, userId, expiresAtIso, nowIso }) {
  await db
    .prepare('INSERT INTO sessions (token_sha256, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)')
    .bind(tokenSha256, userId, expiresAtIso, nowIso)
    .run();
}

export async function getSessionUser(db, tokenSha256, nowIso) {
  if (!tokenSha256) return null;
  const row = await db
    .prepare(
      `SELECT u.* FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token_sha256 = ? AND s.expires_at > ?
       LIMIT 1`
    )
    .bind(tokenSha256, nowIso)
    .first();
  return row || null;
}

export async function deleteSessionByHash(db, tokenSha256) {
  if (!tokenSha256) return;
  await db.prepare('DELETE FROM sessions WHERE token_sha256 = ?').bind(tokenSha256).run();
}

export async function recalculateUserXp(db, userId, nowIso) {
  const row = await db
    .prepare(
      `SELECT
        (SELECT COALESCE(SUM(xp_awarded), 0) FROM lesson_progress_ledger WHERE user_id = ?) +
        (SELECT COALESCE(SUM(xp_awarded), 0) FROM project_milestones WHERE user_id = ?) AS total_xp`
    )
    .bind(userId, userId)
    .first();
  const totalXp = Number(row?.total_xp || 0);
  await db
    .prepare('UPDATE users SET xp_total = ?, updated_at = ? WHERE id = ?')
    .bind(totalXp, nowIso, userId)
    .run();
  return totalXp;
}

export async function updateUserProfile(
  db,
  userId,
  { displayName, activePathId, hardwareArchetypeId, linkedinHandle, xHandle, nowIso }
) {
  await db
    .prepare(
      `UPDATE users
       SET display_name = ?,
           active_path_id = ?,
           hardware_archetype_id = ?,
           linkedin_handle = ?,
           x_handle = ?,
           updated_at = ?
       WHERE id = ?`
    )
    .bind(
      displayName,
      activePathId,
      hardwareArchetypeId,
      linkedinHandle || null,
      xHandle || null,
      nowIso,
      userId
    )
    .run();
  return getUserById(db, userId);
}

export async function completeUserOnboarding(
  db,
  userId,
  { activePathId, hardwareArchetypeId, calibratedLevel, nowIso }
) {
  await db
    .prepare(
      `UPDATE users
       SET active_path_id = ?,
           hardware_archetype_id = ?,
           current_level = ?,
           onboarding_completed = 1,
           updated_at = ?
       WHERE id = ?`
    )
    .bind(activePathId, hardwareArchetypeId, Number(calibratedLevel), nowIso, userId)
    .run();
  return getUserById(db, userId);
}

export async function updateUserAvatarKey(db, userId, avatarKey, nowIso) {
  await db
    .prepare('UPDATE users SET avatar_key = ?, updated_at = ? WHERE id = ?')
    .bind(avatarKey, nowIso, userId)
    .run();
}

export async function recordIdempotentProgressEvent(
  db,
  { id, userId, lessonId, eventType, scoreJson, nowIso }
) {
  const xpAwarded = Number(CANONICAL_EVENT_XP[eventType] || 0);
  const runRes = await db
    .prepare(
      `INSERT OR IGNORE INTO lesson_progress_ledger (
        id, user_id, lesson_id, event_type, xp_awarded, score_json, completed_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(id, userId, lessonId, eventType, xpAwarded, scoreJson, nowIso)
    .run();
  const inserted = Number(runRes?.meta?.changes || 0) > 0;
  const totalXp = await recalculateUserXp(db, userId, nowIso);
  return { inserted, xpAwarded: inserted ? xpAwarded : 0, xpTotal: totalXp };
}

export async function recordIdempotentMilestone(
  db,
  { id, userId, pathId, milestoneIndex, githubRepoUrl, commitSha, nowIso }
) {
  const xpAwarded = CANONICAL_EVENT_XP.milestone;
  const runRes = await db
    .prepare(
      `INSERT OR IGNORE INTO project_milestones (
        id, user_id, path_id, milestone_index, github_repo_url, commit_sha, xp_awarded, verified_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      id,
      userId,
      pathId,
      Number(milestoneIndex),
      githubRepoUrl || null,
      commitSha || null,
      xpAwarded,
      nowIso
    )
    .run();
  const inserted = Number(runRes?.meta?.changes || 0) > 0;
  const totalXp = await recalculateUserXp(db, userId, nowIso);
  return { inserted, xpAwarded: inserted ? xpAwarded : 0, xpTotal: totalXp };
}

export async function getUserDashboardState(db, userRow) {
  const [oauthRes, ledgerRes, milestonesRes, certsRes] = await Promise.all([
    db
      .prepare('SELECT provider, provider_user_id, provider_login, created_at FROM oauth_accounts WHERE user_id = ?')
      .bind(userRow.id)
      .all(),
    db
      .prepare('SELECT id, lesson_id, event_type, xp_awarded, score_json, completed_at FROM lesson_progress_ledger WHERE user_id = ? ORDER BY completed_at ASC')
      .bind(userRow.id)
      .all(),
    db
      .prepare('SELECT id, path_id, milestone_index, github_repo_url, commit_sha, xp_awarded, verified_at FROM project_milestones WHERE user_id = ? ORDER BY verified_at ASC')
      .bind(userRow.id)
      .all(),
    db
      .prepare('SELECT cert_code, recipient_name, level, path_id, github_repo_url, payload_json, ed25519_signature, issued_at FROM certificates WHERE user_id = ? ORDER BY level ASC')
      .bind(userRow.id)
      .all()
  ]);

  const oauthAccounts = oauthRes?.results || [];
  const ledger = ledgerRes?.results || [];
  const milestones = milestonesRes?.results || [];
  const certificates = certsRes?.results || [];
  const progress = computeCurriculumProgress({
    activePathId: userRow.active_path_id,
    ledgerRows: ledger,
    milestoneRows: milestones
  });

  const githubAccount = oauthAccounts.find((a) => a.provider === 'github') || null;
  const googleAccount = oauthAccounts.find((a) => a.provider === 'google') || null;

  return {
    user: {
      id: userRow.id,
      displayName: userRow.display_name,
      avatarUrl: userRow.avatar_key ? `/api/avatars/${userRow.id}.webp` : null,
      xpTotal: Number(userRow.xp_total || 0),
      currentLevel: Number(userRow.current_level || 1),
      activePathId: userRow.active_path_id,
      hardwareArchetypeId: userRow.hardware_archetype_id,
      linkedinUrl: userRow.linkedin_handle ? `https://www.linkedin.com/in/${userRow.linkedin_handle}` : '',
      xUrl: userRow.x_handle ? `https://x.com/${userRow.x_handle}` : '',
      onboardingCompleted: Number(userRow.onboarding_completed || 0) === 1,
      googleLinked: Boolean(googleAccount),
      githubLogin: githubAccount?.provider_login || null,
      githubUrl: githubAccount?.provider_login ? `https://github.com/${githubAccount.provider_login}` : null,
      createdAt: userRow.created_at,
      updatedAt: userRow.updated_at
    },
    progress,
    ledger,
    milestones,
    certificates
  };
}

export async function findCertificateByUserLevelPath(db, userId, level, pathId) {
  return db
    .prepare('SELECT * FROM certificates WHERE user_id = ? AND level = ? AND path_id = ? LIMIT 1')
    .bind(userId, Number(level), pathId)
    .first();
}

export async function findCertificateByCode(db, certCode) {
  return db
    .prepare('SELECT * FROM certificates WHERE cert_code = ? LIMIT 1')
    .bind(String(certCode || '').trim())
    .first();
}

export async function insertCertificate(
  db,
  {
    certCode,
    userId,
    recipientName,
    level,
    pathId,
    githubRepoUrl,
    payloadJson,
    ed25519Signature,
    issuedAt
  }
) {
  await db
    .prepare(
      `INSERT INTO certificates (
        cert_code, user_id, recipient_name, level, path_id, github_repo_url, payload_json, ed25519_signature, issued_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      certCode,
      userId,
      recipientName,
      Number(level),
      pathId,
      githubRepoUrl || null,
      payloadJson,
      ed25519Signature,
      issuedAt
    )
    .run();
  return findCertificateByCode(db, certCode);
}

export async function deleteUserCascade(db, userId) {
  await db.batch([
    db.prepare('DELETE FROM certificates WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM project_milestones WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM lesson_progress_ledger WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM sessions WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM oauth_accounts WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM users WHERE id = ?').bind(userId)
  ]);
}
