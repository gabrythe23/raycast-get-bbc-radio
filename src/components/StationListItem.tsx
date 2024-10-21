import React from "react";
import { List, ActionPanel, Action, Icon, Image } from "@raycast/api";
import { RadioStation } from "../types/bbc";

export const StationListItem: React.FC<{
  station: RadioStation;
  onSelectStation: (stationId: string) => void;
}> = ({ station, onSelectStation }) => (
  <List.Item
    key={station.id}
    icon={{ source: station.image, mask: Image.Mask.Circle }}
    title={station.title}
    subtitle={station.whosPlaying}
    accessories={[{ icon: Icon.Person, text: station.whosPlaying }]}
    actions={
      <ActionPanel>
        <Action.OpenInBrowser url={`https://www.bbc.co.uk/sounds/play/live:${station.id}`} />
        <Action title="Show Last Tracks" onAction={() => onSelectStation(station.id)} />
      </ActionPanel>
    }
  />
);
