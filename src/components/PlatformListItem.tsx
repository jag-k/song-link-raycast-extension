import { ActionPanel, Action, List, Icon, Color } from "@raycast/api";
import { PlatformLink } from "../utils/use-platform-links";
import { getPlatformIcon } from "../utils/platform-icons";

interface PlatformListItemProps {
  link: PlatformLink;
  showUnavailable: boolean;
}

function PlatformListItemDetail({ link }: { link: PlatformLink }) {
  if (!link.hasLink) {
    return null;
  }

  const markdown = link.entity?.thumbnailUrl
    ? `![${link.entity.title || "Album Art"}](${link.entity.thumbnailUrl})`
    : "";

  return (
    <List.Item.Detail
      markdown={markdown}
      metadata={
        <List.Item.Detail.Metadata>
          {link.entity?.title && (
            <>
              <List.Item.Detail.Metadata.Label title="Title" text={link.entity.title} />
              <List.Item.Detail.Metadata.Separator />
            </>
          )}
          {link.entity?.artistName && (
            <>
              <List.Item.Detail.Metadata.Label title="Artist" text={link.entity.artistName} />
              <List.Item.Detail.Metadata.Separator />
            </>
          )}
          {link.entity?.type && (
            <>
              <List.Item.Detail.Metadata.Label title="Type" text={link.entity.type} />
              <List.Item.Detail.Metadata.Separator />
            </>
          )}
          {link.platformLink && (
            <>
              <List.Item.Detail.Metadata.Link
                title="Web URL"
                target={link.platformLink.url}
                text={link.platformLink.url}
              />
              {link.platformLink.nativeAppUriDesktop && (
                <>
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Link
                    title="Desktop App URI"
                    target={link.platformLink.nativeAppUriDesktop}
                    text={link.platformLink.nativeAppUriDesktop}
                  />
                </>
              )}
              {link.platformLink.nativeAppUriMobile && (
                <>
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Link
                    title="Mobile App URI"
                    target={link.platformLink.nativeAppUriMobile}
                    text={link.platformLink.nativeAppUriMobile}
                  />
                </>
              )}
            </>
          )}
        </List.Item.Detail.Metadata>
      }
    />
  );
}

export function PlatformListItem({ link, showUnavailable }: PlatformListItemProps) {
  const subtitle = link.entity?.artistName
    ? `${link.entity.artistName}${link.entity.title ? ` - ${link.entity.title}` : ""}`
    : undefined;

  const copyText =
    link.entity?.title && link.entity?.artistName && link.platformLink
      ? `${link.entity.artistName} - ${link.entity.title}\n${link.platformLink.url}`
      : link.platformLink?.url || "";

  return (
    <List.Item
      key={link.platform}
      title={link.displayName}
      subtitle={subtitle}
      icon={getPlatformIcon(link.platform)}
      accessories={
        showUnavailable
          ? [
              {
                icon: link.hasLink
                  ? { source: Icon.CheckCircle, tintColor: Color.Green }
                  : { source: Icon.XMarkCircle, tintColor: Color.Red },
                tooltip: link.hasLink ? "Link available" : "Link not available",
              },
            ]
          : []
      }
      detail={<PlatformListItemDetail link={link} />}
      actions={
        link.platformLink && (
          <ActionPanel>
            <Action.CopyToClipboard content={link.platformLink.url} title="Copy URL" />
            <Action.OpenInBrowser
              url={link.platformLink.url}
              shortcut={{
                macOS: {
                  modifiers: ["cmd"],
                  key: "return",
                },
                Windows: {
                  modifiers: ["ctrl"],
                  key: "return",
                },
              }}
            />
            <Action.CopyToClipboard
              content={copyText}
              title="Copy Title + Artist + URL"
              shortcut={{
                macOS: {
                  modifiers: ["cmd", "shift"],
                  key: "c",
                },
                Windows: {
                  modifiers: ["ctrl", "shift"],
                  key: "c",
                },
              }}
            />
          </ActionPanel>
        )
      }
    />
  );
}
