import React from "react";
import { List, ActionPanel, Action, Icon, showHUD, Image } from "@raycast/api";
import { LastTrack } from "../types/bbc";

export const TrackListItem: React.FC<{ track: LastTrack }> = ({ track }) => (
  <List.Item
    title={track.title}
    subtitle={track.artist}
    icon={{ source: track.cover, mask: Image.Mask.Circle }}
    accessories={[{ text: track.time, icon: Icon.Clock }]}
    actions={
      <ActionPanel>
        <Action.OpenInBrowser
          title="Search on Spotify"
          icon={Icon.MagnifyingGlass}
          url={`https://open.spotify.com/search/${encodeURIComponent(`${track.artist} ${track.title}`)}`}
        />
        <Action.CopyToClipboard
          title="Copy Track Info"
          content={`${track.artist} - ${track.title}`}
          onCopy={() => showHUD(`Copied: ${track.artist} - ${track.title}`)}
        />
      </ActionPanel>
    }
  />
);
