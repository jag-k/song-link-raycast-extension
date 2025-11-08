import { List, Clipboard, Icon, showToast, Toast, getPreferenceValues } from "@raycast/api";
import { useEffect, useState } from "react";
import { isValidUrl } from "./utils/song-link-api";
import { usePlatformLinks } from "./utils/use-platform-links";
import { PlatformListItem } from "./components/PlatformListItem";

interface Preferences {
  showUnavailable: boolean;
}

export default function Command() {
  const preferences = getPreferenceValues<Preferences>();
  const [searchText, setSearchText] = useState("");
  const { platformLinks, isLoading, error } = usePlatformLinks(searchText, preferences.showUnavailable);

  useEffect(() => {
    async function loadInitial() {
      const clipboardText = await Clipboard.readText();
      if (clipboardText && isValidUrl(clipboardText)) {
        setSearchText(clipboardText);
      }
    }
    loadInitial();
  }, []);

  useEffect(() => {
    if (error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: error,
      });
    }
  }, [error]);

  const isEmptySearch = !searchText || searchText.trim() === "";

  return (
    <List
      isLoading={isLoading}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      isShowingDetail={platformLinks.length > 0}
    >
      {platformLinks.length === 0 && !isLoading && (
        <List.EmptyView
          icon={isEmptySearch ? Icon.MagnifyingGlass : Icon.ExclamationMark}
          title={isEmptySearch ? "Enter a music platform link" : error || "No platforms found"}
          description={
            isEmptySearch
              ? "Paste a link from Spotify, Apple Music, YouTube, or any other music platform"
              : error
                ? "Copy a music platform link to your clipboard and try again"
                : "No available links for this track"
          }
        />
      )}
      {platformLinks.map((link) => (
        <PlatformListItem key={link.platform} link={link} showUnavailable={preferences.showUnavailable} />
      ))}
    </List>
  );
}
