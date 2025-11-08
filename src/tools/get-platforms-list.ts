import { PLATFORMS } from "../utils/platforms";

export default async function getPlatformsList() {
  return {
    platforms: PLATFORMS.map((platform) => ({
      name: platform.name,
      apiKey: platform.apiKey,
      displayName: platform.displayName,
    })),
  };
}
