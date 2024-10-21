import { useState, useEffect } from "react";
import { showHUD } from "@raycast/api";
import { getBBCRadioStationsFromWebSite, getLastsTracks } from "../services/bbcApi";
import { RadioStation, LastTrack } from "../types/bbc";

export const useBBCRadio = () => {
  const [bbcRadioStations, setBbcRadioStations] = useState<RadioStation[]>([]);
  const [tracks, setTracks] = useState<Record<string, LastTrack[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  useEffect(() => {
    const fetchRadioStations = async () => {
      try {
        const stations = await getBBCRadioStationsFromWebSite();
        setBbcRadioStations(stations);
      } catch (error) {
        console.error("Failed to fetch BBC Radio Stations", error);
        showHUD("Failed to fetch BBC Radio Stations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRadioStations();
  }, []);

  const fetchTracks = async (stationId: string) => {
    if (!tracks[stationId]) {
      try {
        setIsLoading(true);
        const lastTracks = await getLastsTracks(stationId);
        console.log(`Fetched ${lastTracks.length} tracks for station ${stationId}`);
        setTracks((prev) => ({ ...prev, [stationId]: lastTracks }));
      } catch (error) {
        console.error(`Failed to fetch tracks for station ${stationId}`, error);
        showHUD(`Failed to fetch tracks for ${stationId}`);
      } finally {
        setIsLoading(false);
      }
    }
    setSelectedStation(stationId);
  };

  return { bbcRadioStations, tracks, isLoading, selectedStation, fetchTracks };
};
