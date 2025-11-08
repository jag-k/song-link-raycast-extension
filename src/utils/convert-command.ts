import { Clipboard, showHUD } from "@raycast/api";
import { convertLink, getPlatformLink } from "../utils/song-link-api";
import { PLATFORMS } from "../utils/platforms";
import { showFailureToast } from "@raycast/utils";

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
    const platformLink = getPlatformLink(response, platform.key);

    if (!platformLink) {
      await showHUD(`No ${platformName} link found`);
      return;
    }

    await Clipboard.copy(platformLink.url);
    await showHUD(`✓ Copied ${platformName} link`);
  } catch (error) {
    await showFailureToast(error, { title: "Failed to convert link" });
  }
}
