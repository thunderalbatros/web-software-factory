import charter from '../../data/academy/project_charter.json';
import archetypesDoc from '../../data/academy/archetypes.json';
import tracksDoc from '../../data/academy/tracks.json';
import sourcesDoc from '../../data/academy/sources.json';
import toolsDoc from '../../data/academy/tools.json';
import videosDoc from '../../data/academy/videos.json';

export function loadLocalAcademySnapshot() {
  const archetypes = archetypesDoc.rows || [];
  const tracks = tracksDoc.rows || [];
  const sources = sourcesDoc.rows || [];
  const tools = toolsDoc.rows || [];
  const videos = videosDoc.rows || [];

  const toolsById = new Map(tools.map((t) => [t.tool_id, t]));
  const enrichedTools = tools.map((tool) => ({
    ...tool,
    freeAlternative: tool.free_alternative_id ? toolsById.get(tool.free_alternative_id) || null : null
  }));

  return {
    charter,
    archetypes,
    tracks,
    sources,
    tools: enrichedTools,
    videos
  };
}

export function getLevelBundle(levelSlug) {
  const snapshot = loadLocalAcademySnapshot();
  const levelConfig = (snapshot.charter.levels || []).find((l) => l.id === levelSlug) || snapshot.charter.levels[0];
  const videos = snapshot.videos.filter((v) => Array.isArray(v.topic_tags) && v.topic_tags.includes(levelSlug));
  const tools = snapshot.tools.filter((t) => Array.isArray(t.domain_stage_tags) && t.domain_stage_tags.includes(levelSlug));
  return {
    charter: snapshot.charter,
    levelConfig,
    archetypes: snapshot.archetypes,
    tracks: snapshot.tracks,
    sources: snapshot.sources,
    videos,
    tools
  };
}
