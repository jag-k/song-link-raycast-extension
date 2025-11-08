import { useEffect, useState } from "react";
import { convertLink, getPlatformLink, getEntityMetadata, SongLinkPlatformLink } from "./song-link-api";
import { PLATFORMS } from "./platforms";

export interface PlatformLink {
  platform: string;
  platformLink: SongLinkPlatformLink | null;
  displayName: string;
  hasLink: boolean;
  entity?: {
    title?: string;
    artistName?: string;
    thumbnailUrl?: string;
    type?: string;
  };
}

export function usePlatformLinks(searchText: string, showUnavailable: boolean) {
  const [platformLinks, setPlatformLinks] = useState<PlatformLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLinks() {
      if (!searchText || searchText.trim() === "") {
        setIsLoading(false);
        setError(null);
        setPlatformLinks([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await convertLink(searchText);
        const firstEntity = getEntityMetadata(response);
        const links: PlatformLink[] = [];

        for (const platform of PLATFORMS) {
          const platformLink = getPlatformLink(response, platform.key);
          const hasLink = !!platformLink;

          if (hasLink || showUnavailable) {
            const entity = platformLink ? getEntityMetadata(response, platformLink.entityUniqueId) : firstEntity;
            links.push({
              platform: platform.key,
              platformLink: platformLink || null,
              displayName: platform.displayName,
              hasLink,
              entity: entity
                ? {
                    title: entity.title,
                    artistName: entity.artistName,
                    thumbnailUrl: entity.thumbnailUrl,
                    type: entity.type,
                  }
                : undefined,
            });
          }
        }

        setPlatformLinks(links);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to convert link");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLinks();
  }, [searchText, showUnavailable]);

  return { platformLinks, isLoading, error };
}
