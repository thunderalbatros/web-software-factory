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

export function mapAuthorCardFromRow(row) {
  const githubLogin = row.author_github_login || null;
  const linkedinHandle = row.author_linkedin_handle || null;
  const xHandle = row.author_x_handle || null;
  return {
    id: row.author_id,
    displayName: row.author_display_name,
    avatarUrl: row.author_avatar_key ? `/api/avatars/${row.author_id}.webp` : null,
    currentLevel: Number(row.author_level || 1),
    activePathId: row.author_path_id || 'uso_cotidiano',
    badges: {
      githubLogin,
      githubUrl: githubLogin ? `https://github.com/${githubLogin}` : null,
      linkedinUrl: linkedinHandle ? `https://www.linkedin.com/in/${linkedinHandle}` : null,
      xUrl: xHandle ? `https://x.com/${xHandle}` : null
    }
  };
}

function mapForumThreadRow(row) {
  return {
    id: row.id,
    level: Number(row.level),
    category: row.category,
    pathId: row.path_id,
    lessonSlug: row.lesson_slug || null,
    title: row.title,
    bodyMd: row.body_md,
    attachedRepoUrl: row.attached_repo_url || null,
    helpfulCount: Number(row.helpful_count || 0),
    replyCount: Number(row.reply_count || 0),
    createdAt: row.created_at,
    author: mapAuthorCardFromRow(row)
  };
}

function mapForumReplyRow(row) {
  return {
    id: row.id,
    threadId: row.thread_id,
    bodyMd: row.body_md,
    helpfulCount: Number(row.helpful_count || 0),
    createdAt: row.created_at,
    author: mapAuthorCardFromRow(row)
  };
}

function mapChatMessageRow(row) {
  return {
    id: row.id,
    roomLevel: Number(row.room_level),
    bodyText: row.body_text,
    attachedUrl: row.attached_url || null,
    createdAt: row.created_at,
    author: mapAuthorCardFromRow(row)
  };
}

const THREAD_SELECT_SQL = `
  SELECT
    t.id, t.author_id, t.level, t.category, t.path_id, t.lesson_slug,
    t.title, t.body_md, t.attached_repo_url, t.helpful_count, t.hidden_by_reports, t.created_at,
    u.display_name AS author_display_name,
    u.avatar_key AS author_avatar_key,
    u.current_level AS author_level,
    u.active_path_id AS author_path_id,
    u.linkedin_handle AS author_linkedin_handle,
    u.x_handle AS author_x_handle,
    oa.provider_login AS author_github_login,
    (SELECT COUNT(*) FROM forum_replies r WHERE r.thread_id = t.id AND r.hidden_by_reports = 0) AS reply_count
  FROM forum_threads t
  JOIN users u ON u.id = t.author_id
  LEFT JOIN oauth_accounts oa ON oa.user_id = u.id AND oa.provider = 'github'
`;

export async function listForumThreads(db, { level = null, category = '', pathId = '', lessonSlug = '', limit = 30 } = {}) {
  const where = ['t.hidden_by_reports = 0'];
  const binds = [];
  if (level !== null && level !== undefined && level !== '') {
    where.push('t.level = ?');
    binds.push(Number(level));
  }
  if (category) {
    where.push('t.category = ?');
    binds.push(String(category));
  }
  if (pathId) {
    where.push('t.path_id = ?');
    binds.push(String(pathId));
  }
  if (lessonSlug) {
    where.push('t.lesson_slug = ?');
    binds.push(String(lessonSlug));
  }
  const safeLimit = Math.max(1, Math.min(50, Number(limit || 30)));
  binds.push(safeLimit);

  const sql = `${THREAD_SELECT_SQL} WHERE ${where.join(' AND ')} ORDER BY t.created_at DESC LIMIT ?`;
  const res = await db.prepare(sql).bind(...binds).all();
  return (res?.results || []).map(mapForumThreadRow);
}

export async function getForumThreadById(db, threadId) {
  const row = await db
    .prepare(`${THREAD_SELECT_SQL} WHERE t.id = ? AND t.hidden_by_reports = 0 LIMIT 1`)
    .bind(String(threadId))
    .first();
  return row ? mapForumThreadRow(row) : null;
}

export async function getForumThreadWithReplies(db, threadId) {
  const thread = await getForumThreadById(db, threadId);
  if (!thread) return null;
  const repliesRes = await db
    .prepare(
      `SELECT
         r.id, r.thread_id, r.author_id, r.body_md, r.helpful_count, r.created_at,
         u.display_name AS author_display_name,
         u.avatar_key AS author_avatar_key,
         u.current_level AS author_level,
         u.active_path_id AS author_path_id,
         u.linkedin_handle AS author_linkedin_handle,
         u.x_handle AS author_x_handle,
         oa.provider_login AS author_github_login
       FROM forum_replies r
       JOIN users u ON u.id = r.author_id
       LEFT JOIN oauth_accounts oa ON oa.user_id = u.id AND oa.provider = 'github'
       WHERE r.thread_id = ? AND r.hidden_by_reports = 0
       ORDER BY r.created_at ASC`
    )
    .bind(String(threadId))
    .all();
  return {
    thread,
    replies: (repliesRes?.results || []).map(mapForumReplyRow)
  };
}

export async function insertForumThread(
  db,
  { id, authorId, level, category, pathId, lessonSlug, title, bodyMd, attachedRepoUrl, createdAt }
) {
  await db
    .prepare(
      `INSERT INTO forum_threads (
        id, author_id, level, category, path_id, lesson_slug, title, body_md, attached_repo_url, helpful_count, hidden_by_reports, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?)`
    )
    .bind(
      id,
      authorId,
      Number(level),
      category,
      pathId || 'uso_cotidiano',
      lessonSlug || null,
      title,
      bodyMd,
      attachedRepoUrl || null,
      createdAt
    )
    .run();
  return getForumThreadById(db, id);
}

export async function insertForumReply(db, { id, threadId, authorId, bodyMd, createdAt }) {
  const thread = await getForumThreadById(db, threadId);
  if (!thread) return null;
  await db
    .prepare(
      `INSERT INTO forum_replies (
        id, thread_id, author_id, body_md, helpful_count, hidden_by_reports, created_at
      ) VALUES (?, ?, ?, ?, 0, 0, ?)`
    )
    .bind(id, threadId, authorId, bodyMd, createdAt)
    .run();
  const row = await db
    .prepare(
      `SELECT
         r.id, r.thread_id, r.author_id, r.body_md, r.helpful_count, r.created_at,
         u.display_name AS author_display_name,
         u.avatar_key AS author_avatar_key,
         u.current_level AS author_level,
         u.active_path_id AS author_path_id,
         u.linkedin_handle AS author_linkedin_handle,
         u.x_handle AS author_x_handle,
         oa.provider_login AS author_github_login
       FROM forum_replies r
       JOIN users u ON u.id = r.author_id
       LEFT JOIN oauth_accounts oa ON oa.user_id = u.id AND oa.provider = 'github'
       WHERE r.id = ? LIMIT 1`
    )
    .bind(id)
    .first();
  return row ? mapForumReplyRow(row) : null;
}

export async function listChatMessages(db, roomLevel, limit = 50) {
  const safeLimit = Math.max(1, Math.min(100, Number(limit || 50)));
  const res = await db
    .prepare(
      `SELECT
         m.id, m.room_level, m.author_id, m.body_text, m.attached_url, m.created_at,
         u.display_name AS author_display_name,
         u.avatar_key AS author_avatar_key,
         u.current_level AS author_level,
         u.active_path_id AS author_path_id,
         u.linkedin_handle AS author_linkedin_handle,
         u.x_handle AS author_x_handle,
         oa.provider_login AS author_github_login
       FROM chat_messages m
       JOIN users u ON u.id = m.author_id
       LEFT JOIN oauth_accounts oa ON oa.user_id = u.id AND oa.provider = 'github'
       WHERE m.room_level = ? AND m.hidden_by_reports = 0
       ORDER BY m.created_at DESC
       LIMIT ?`
    )
    .bind(Number(roomLevel), safeLimit)
    .all();
  return (res?.results || []).reverse().map(mapChatMessageRow);
}

export async function insertChatMessage(db, { id, roomLevel, authorId, bodyText, attachedUrl, createdAt }) {
  await db
    .prepare(
      `INSERT INTO chat_messages (
        id, room_level, author_id, body_text, attached_url, hidden_by_reports, created_at
      ) VALUES (?, ?, ?, ?, ?, 0, ?)`
    )
    .bind(id, Number(roomLevel), authorId, bodyText, attachedUrl || null, createdAt)
    .run();
  const row = await db
    .prepare(
      `SELECT
         m.id, m.room_level, m.author_id, m.body_text, m.attached_url, m.created_at,
         u.display_name AS author_display_name,
         u.avatar_key AS author_avatar_key,
         u.current_level AS author_level,
         u.active_path_id AS author_path_id,
         u.linkedin_handle AS author_linkedin_handle,
         u.x_handle AS author_x_handle,
         oa.provider_login AS author_github_login
       FROM chat_messages m
       JOIN users u ON u.id = m.author_id
       LEFT JOIN oauth_accounts oa ON oa.user_id = u.id AND oa.provider = 'github'
       WHERE m.id = ? LIMIT 1`
    )
    .bind(id)
    .first();
  return row ? mapChatMessageRow(row) : null;
}

const REPORT_TARGET_SQL = Object.freeze({
  thread: {
    selectSql: 'SELECT id FROM forum_threads WHERE id = ? LIMIT 1',
    hideSql: 'UPDATE forum_threads SET hidden_by_reports = 1 WHERE id = ?'
  },
  reply: {
    selectSql: 'SELECT id FROM forum_replies WHERE id = ? LIMIT 1',
    hideSql: 'UPDATE forum_replies SET hidden_by_reports = 1 WHERE id = ?'
  },
  chat_message: {
    selectSql: 'SELECT id, room_level FROM chat_messages WHERE id = ? LIMIT 1',
    hideSql: 'UPDATE chat_messages SET hidden_by_reports = 1 WHERE id = ?'
  }
});

export async function submitCommunityReport(db, { id, targetType, targetId, reporterUserId, reason, createdAt }) {
  const sqlSpec = REPORT_TARGET_SQL[targetType];
  if (!sqlSpec) return { found: false };
  const targetRow = await db.prepare(sqlSpec.selectSql).bind(targetId).first();
  if (!targetRow) return { found: false };

  const insertRes = await db
    .prepare(
      `INSERT OR IGNORE INTO community_reports (
        id, target_type, target_id, reporter_user_id, reason, created_at
      ) VALUES (?, ?, ?, ?, ?, ?)`
    )
    .bind(id, targetType, targetId, reporterUserId, reason, createdAt)
    .run();
  const inserted = Number(insertRes?.meta?.changes || 0) > 0;

  const countRow = await db
    .prepare('SELECT COUNT(*) AS cnt FROM community_reports WHERE target_type = ? AND target_id = ?')
    .bind(targetType, targetId)
    .first();
  const reportCount = Number(countRow?.cnt || 0);
  const autoHidden = reportCount >= 3;
  if (autoHidden) {
    await db.prepare(sqlSpec.hideSql).bind(targetId).run();
  }
  return {
    found: true,
    inserted,
    reportCount,
    autoHidden,
    roomLevel: targetRow.room_level ? Number(targetRow.room_level) : null
  };
}

export async function recordModerationAuditLog(db, { id, userIdHash, surface, reasonCode, createdAt }) {
  await db
    .prepare(
      'INSERT INTO moderation_audit_log (id, user_id_hash, surface, reason_code, created_at) VALUES (?, ?, ?, ?, ?)'
    )
    .bind(id, userIdHash, surface, reasonCode, createdAt)
    .run();
}

export async function listUserCommunityContributionsForExport(db, userId) {
  const [threadsRes, repliesRes, chatRes] = await Promise.all([
    db
      .prepare('SELECT id, level, category, path_id, lesson_slug, title, body_md, attached_repo_url, created_at FROM forum_threads WHERE author_id = ? ORDER BY created_at ASC')
      .bind(userId)
      .all(),
    db
      .prepare('SELECT id, thread_id, body_md, created_at FROM forum_replies WHERE author_id = ? ORDER BY created_at ASC')
      .bind(userId)
      .all(),
    db
      .prepare('SELECT id, room_level, body_text, attached_url, created_at FROM chat_messages WHERE author_id = ? ORDER BY created_at ASC')
      .bind(userId)
      .all()
  ]);
  return {
    forumThreads: threadsRes?.results || [],
    forumReplies: repliesRes?.results || [],
    chatMessages: chatRes?.results || []
  };
}

export async function deleteUserCascade(db, userId) {
  await db.batch([
    db
      .prepare(
        `DELETE FROM community_reports
         WHERE reporter_user_id = ?
            OR (target_type = 'thread' AND target_id IN (SELECT id FROM forum_threads WHERE author_id = ?))
            OR (target_type = 'reply' AND target_id IN (SELECT id FROM forum_replies WHERE author_id = ? OR thread_id IN (SELECT id FROM forum_threads WHERE author_id = ?)))
            OR (target_type = 'chat_message' AND target_id IN (SELECT id FROM chat_messages WHERE author_id = ?))`
      )
      .bind(userId, userId, userId, userId, userId),
    db
      .prepare(
        'DELETE FROM forum_replies WHERE author_id = ? OR thread_id IN (SELECT id FROM forum_threads WHERE author_id = ?)'
      )
      .bind(userId, userId),
    db.prepare('DELETE FROM forum_threads WHERE author_id = ?').bind(userId),
    db.prepare('DELETE FROM chat_messages WHERE author_id = ?').bind(userId),
    db.prepare('DELETE FROM certificates WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM project_milestones WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM lesson_progress_ledger WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM sessions WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM oauth_accounts WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM users WHERE id = ?').bind(userId)
  ]);
}
