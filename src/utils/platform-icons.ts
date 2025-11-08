import { Icon, Image } from "@raycast/api";

const iconMap: Record<string, Image.ImageLike> = {
  spotify: "platform-icons-svg/spotify.svg",
  appleMusic: "platform-icons-svg/appleMusic.svg",
  itunes: "platform-icons-svg/itunes.svg",
  youtube: "platform-icons-svg/youtube.svg",
  youtubeMusic: "platform-icons-svg/youtubeMusic.svg",
  pandora: "platform-icons-svg/pandora.svg",
  deezer: "platform-icons-svg/deezer.svg",
  tidal: "platform-icons-svg/tidal.svg",
  amazonStore: "platform-icons-svg/amazonStore.svg",
  amazonMusic: "platform-icons-svg/amazonMusic.svg",
  soundcloud: "platform-icons-svg/soundcloud.svg",
  napster: "platform-icons-svg/napster.svg",
  yandex: "platform-icons-svg/yandex.svg",
  anghami: "platform-icons-svg/anghami.svg",
  audiomack: "platform-icons-svg/audiomack.svg",
  audius: "platform-icons-svg/audius.svg",
  boomplay: "platform-icons-svg/boomplay.svg",
};

export function getPlatformIcon(platformKey: string): Image.ImageLike {
  return iconMap[platformKey] || Icon.Music;
}
