import { convertLink, getPlatformLink, getEntityMetadata } from "../utils/song-link-api";
import { getPlatformByName } from "../utils/platforms";

interface ConvertToPlatformParams {
  url: string;
  platform: string;
  country?: string;
}

export default async function convertToPlatform(params: ConvertToPlatformParams) {
  const { url, platform, country = "US" } = params;

  if (!url) {
    throw new Error("URL is required");
  }

  if (!platform) {
    throw new Error("Platform is required");
  }

  const platformConfig = getPlatformByName(platform);
  if (!platformConfig) {
    throw new Error(`Unknown platform: ${platform}`);
  }

  const response = await convertLink(url, country);
  const platformLink = getPlatformLink(response, platformConfig.apiKey);

  if (!platformLink) {
    throw new Error(`No link found for platform: ${platform}`);
  }

  const entity = getEntityMetadata(response, platformLink.entityUniqueId);

  return {
    url: platformLink.url,
    platform: platformConfig.displayName,
    metadata: entity
      ? {
          title: entity.title,
          artistName: entity.artistName,
          thumbnailUrl: entity.thumbnailUrl,
        }
      : null,
  };
}
