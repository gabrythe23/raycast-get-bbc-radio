import React from "react";
import { List } from "@raycast/api";
import { TrackListItem } from "./components/TrackListItem";
import { StationListItem } from "./components/StationListItem";
import { useBBCRadio } from "./hooks/useBBCRadio";

const Command: React.FC = () => {
  const { bbcRadioStations, tracks, isLoading, selectedStation, fetchTracks } = useBBCRadio();

  if (selectedStation && tracks[selectedStation]) {
    return (
      <List
        navigationTitle={`Last Tracks - ${bbcRadioStations.find((s) => s.id === selectedStation)?.title}`}
        isLoading={isLoading}
        searchBarPlaceholder="Search tracks..."
      >
        <List.Section title="Last Played Tracks">
          {tracks[selectedStation].map((track, index) => (
            <TrackListItem key={`${selectedStation}_${index}`} track={track} />
          ))}
        </List.Section>
      </List>
    );
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search BBC Radio stations...">
      {bbcRadioStations.map((station) => (
        <StationListItem key={station.id} station={station} onSelectStation={fetchTracks} />
      ))}
    </List>
  );
};

export default Command;
