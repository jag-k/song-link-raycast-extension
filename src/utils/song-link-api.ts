import { withCache } from "@raycast/utils";

export interface SongLinkEntity {
  id: string;
  type: string;
  title?: string;
  artistName?: string;
  thumbnailUrl?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
}

export interface SongLinkPlatformLink {
  entityUniqueId: string;
  url: string;
  nativeAppUriMobile?: string;
  nativeAppUriDesktop?: string;
}

export interface SongLinkResponse {
  pageUrl: string;
  linksByPlatform: Record<string, SongLinkPlatformLink>;
  entitiesByUniqueId: Record<string, SongLinkEntity>;
}

async function convertLinkImpl(url: string, country: string = "US"): Promise<SongLinkResponse> {
  const apiUrl = `https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(url)}&userCountry=${country}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch song.link data: ${response.statusText}`);
  }

  const data = (await response.json()) as SongLinkResponse;
  return data;
}

// Cache successful API responses for 10 minutes
export const convertLink = withCache(convertLinkImpl, {
  maxAge: 10 * 60 * 1000, // 10 minutes
  validate: (data: SongLinkResponse) => {
    // Validate that the response has the expected structure
    return (
      data &&
      typeof data === "object" &&
      "linksByPlatform" in data &&
      "entitiesByUniqueId" in data &&
      typeof data.linksByPlatform === "object" &&
      typeof data.entitiesByUniqueId === "object"
    );
  },
});

// Export clearCache function for manual cache clearing if needed
export const clearConvertLinkCache = convertLink.clearCache;

export function getPlatformLink(response: SongLinkResponse, platformKey: string): SongLinkPlatformLink | null {
  return response.linksByPlatform[platformKey] || null;
}

export function getEntityMetadata(response: SongLinkResponse, entityUniqueId?: string): SongLinkEntity | null {
  if (!entityUniqueId) {
    const firstEntity = Object.values(response.entitiesByUniqueId)[0];
    return firstEntity || null;
  }
  return response.entitiesByUniqueId[entityUniqueId] || null;
}

export function getAllAvailablePlatforms(response: SongLinkResponse): string[] {
  return Object.keys(response.linksByPlatform);
}

export function isValidUrl(text: string): boolean {
  if (!text || text.trim() === "") {
    return false;
  }

  // Check if it's a file path
  if (text.startsWith("file://")) {
    return false;
  }

  // Try to parse as URL
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
