import { convertLink, getPlatformLink, getEntityMetadata } from "../utils/song-link-api";
import { getPlatform } from "../utils/platforms";

interface ConvertToPlatformParams {
  /**
   * The URL of the song to convert.
   * @example https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC
   */
  url: string;
  /**
   * The name of the platform to convert to. Can be the name of the platform or the platform key.
   * @example Spotify
   * @example appleMusic
   * @example Apple Music
   */
  platform: string;
  /**
   * The country code to use for the conversion.
   * @example US
   * @example GE
   * @default US
   */
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

  const platformConfig = getPlatform(platform);
  if (!platformConfig) {
    throw new Error(`Unknown platform: ${platform}`);
  }

  const response = await convertLink(url, country);
  const platformLink = getPlatformLink(response, platformConfig.key);

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
