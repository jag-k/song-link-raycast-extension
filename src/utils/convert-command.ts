import { Clipboard, showHUD, showToast, Toast } from "@raycast/api";
import { convertLink, getPlatformLink } from "../utils/song-link-api";
import { PLATFORMS } from "../utils/platforms";

export async function convertToPlatformCommand(platformName: string) {
  try {
    const clipboardText = await Clipboard.readText();

    if (!clipboardText) {
      await showHUD("Clipboard is empty");
      return;
    }

    const platform = PLATFORMS.find((p) => p.name === platformName);
    if (!platform) {
      await showHUD("Platform not found");
      return;
    }

    await showHUD("Converting...");

    const response = await convertLink(clipboardText);
    const platformLink = getPlatformLink(response, platform.apiKey);

    if (!platformLink) {
      await showHUD(`No ${platformName} link found`);
      return;
    }

    await Clipboard.copy(platformLink.url);
    await showHUD(`✓ Copied ${platformName} link`);
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to convert link",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
