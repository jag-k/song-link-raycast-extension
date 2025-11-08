export interface Platform {
  name: string;
  key: string;
  displayName: string;
}

export const PLATFORMS: Platform[] = [
  { name: "Spotify", key: "spotify", displayName: "Spotify" },
  { name: "Apple Music", key: "appleMusic", displayName: "Apple Music" },
  { name: "iTunes", key: "itunes", displayName: "iTunes" },
  { name: "YouTube", key: "youtube", displayName: "YouTube" },
  { name: "YouTube Music", key: "youtubeMusic", displayName: "YouTube Music" },
  { name: "Pandora", key: "pandora", displayName: "Pandora" },
  { name: "Deezer", key: "deezer", displayName: "Deezer" },
  { name: "Tidal", key: "tidal", displayName: "Tidal" },
  { name: "Amazon", key: "amazonStore", displayName: "Amazon" },
  { name: "Amazon Music", key: "amazonMusic", displayName: "Amazon Music" },
  { name: "SoundCloud", key: "soundcloud", displayName: "SoundCloud" },
  { name: "Napster", key: "napster", displayName: "Napster" },
  { name: "Yandex Music", key: "yandex", displayName: "Yandex Music" },
  { name: "Anghami", key: "anghami", displayName: "Anghami" },
  { name: "Audiomack", key: "audiomack", displayName: "Audiomack" },
  { name: "Audius", key: "audius", displayName: "Audius" },
  { name: "Boomplay", key: "boomplay", displayName: "Boomplay" },
];

export const PLATFORM_MAP: Record<string, Platform> = PLATFORMS.reduce(
  (acc, platform) => {
    acc[platform.name.toLowerCase()] = platform;
    acc[platform.key] = platform;
    return acc;
  },
  {} as Record<string, Platform>,
);

export function getPlatformByName(name: string): Platform | undefined {
  return PLATFORM_MAP[name.toLowerCase()] || PLATFORMS.find((p) => p.name === name);
}

export function getPlatformByKey(key: string): Platform | undefined {
  return PLATFORMS.find((p) => p.key === key);
}
