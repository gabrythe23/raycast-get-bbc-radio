import * as cheerio from "cheerio";
import fetch from "node-fetch";
import { RadioStation, ScriptJson, LastTrack, PreloadedState } from "../types/bbc";

export const getBBCRadioStationsFromWebSite = async (): Promise<RadioStation[]> => {
  console.log("Fetching BBC Radio Stations");

  const response = await fetch("https://www.bbc.co.uk/sounds");
  const html = await response.text();
  const $ = cheerio.load(html);

  const scriptContent = $("#__NEXT_DATA__").html();
  if (!scriptContent) return [];

  const scriptJson = JSON.parse(scriptContent) as ScriptJson;
  const listenLiveData = scriptJson.props.pageProps.dehydratedState.queries
    .find((r) => r.queryKey.some((key) => key.includes("experience/inline/listen")))
    ?.state.data.data.find((r) => r.id === "listen_live");

  if (!listenLiveData) return [];

  return listenLiveData.data.map((r) => ({
    id: r.id,
    title: r.network.short_title,
    image: r.image_url.replace("{recipe}", "400x400"),
    whosPlaying: r.titles.primary,
  }));
};

export const getLastsTracks = async (station: string): Promise<LastTrack[]> => {
  const response = await fetch(`https://www.bbc.co.uk/sounds/play/live:${station}`);
  const html = await response.text();

  const scriptRegex = /<script>\s*window\.__PRELOADED_STATE__\s*=\s*(\{[\s\S]*?\})\s*<\/script>/;
  const match = html.match(scriptRegex);

  if (!match || !match[1]) return [];

  const jsonString = match[1].split("; </script>")[0];
  const jsonData = JSON.parse(jsonString) as PreloadedState;

  const recent_tracks = jsonData.modules.data.find((r) => r.id === "recent_tracks");
  if (!recent_tracks) return [];

  return recent_tracks.data.map((r) => ({
    time: "",
    artist: r.titles.primary,
    title: r.titles.secondary,
    cover: r.image_url.replace("{recipe}", "400x400"),
  }));
};
