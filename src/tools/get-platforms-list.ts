import { PLATFORMS } from "../utils/platforms";

export default async function getPlatformsList() {
  return {
    platforms: PLATFORMS.map((platform) => ({
      name: platform.name,
      key: platform.key,
      displayName: platform.displayName,
    })),
  };
}
