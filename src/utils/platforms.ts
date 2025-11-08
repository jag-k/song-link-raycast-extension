export interface Platform {
  name: string;
  apiKey: string;
  displayName: string;
}

export const PLATFORMS: Platform[] = [
  { name: "Spotify", apiKey: "spotify", displayName: "Spotify" },
  { name: "Apple Music", apiKey: "appleMusic", displayName: "Apple Music" },
  { name: "iTunes", apiKey: "itunes", displayName: "iTunes" },
  { name: "YouTube", apiKey: "youtube", displayName: "YouTube" },
  { name: "YouTube Music", apiKey: "youtubeMusic", displayName: "YouTube Music" },
  { name: "Pandora", apiKey: "pandora", displayName: "Pandora" },
  { name: "Deezer", apiKey: "deezer", displayName: "Deezer" },
  { name: "Tidal", apiKey: "tidal", displayName: "Tidal" },
  { name: "Amazon", apiKey: "amazonStore", displayName: "Amazon" },
  { name: "Amazon Music", apiKey: "amazonMusic", displayName: "Amazon Music" },
  { name: "SoundCloud", apiKey: "soundcloud", displayName: "SoundCloud" },
  { name: "Napster", apiKey: "napster", displayName: "Napster" },
  { name: "Yandex Music", apiKey: "yandex", displayName: "Yandex Music" },
  { name: "Anghami", apiKey: "anghami", displayName: "Anghami" },
  { name: "Audiomack", apiKey: "audiomack", displayName: "Audiomack" },
  { name: "Audius", apiKey: "audius", displayName: "Audius" },
  { name: "Boomplay", apiKey: "boomplay", displayName: "Boomplay" },
];

export const PLATFORM_MAP: Record<string, Platform> = PLATFORMS.reduce(
  (acc, platform) => {
    acc[platform.name.toLowerCase()] = platform;
    acc[platform.apiKey] = platform;
    return acc;
  },
  {} as Record<string, Platform>,
);

export function getPlatformByName(name: string): Platform | undefined {
  return PLATFORM_MAP[name.toLowerCase()] || PLATFORMS.find((p) => p.name === name);
}

export function getPlatformByApiKey(apiKey: string): Platform | undefined {
  return PLATFORMS.find((p) => p.apiKey === apiKey);
}
