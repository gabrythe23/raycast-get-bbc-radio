import { ActionPanel, Action, Icon, List, showHUD } from "@raycast/api";
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import { useState } from "react";

interface RadioStation {
  id?: string;
  title?: string;
  image?: string;
  whosPlaying?: string;
}

async function getBBCRadioStationsFromWebSite(): Promise<RadioStation[]> {
  const RadioStations: RadioStation[] = [];
  const response = await fetch("https://www.bbc.co.uk/sounds");
  const html = await response.text();
  const $ = cheerio.load(html);
  for (const station of $("ul.sc-o-scrollable__list>li.gs-u-align-top")) {
    RadioStations.push({
      id: $(station).find(".sc-c-network-item__link").attr("href"),
      image: $(station).find(".sc-o-responsive-image__img").attr("src"),
      title: $(station).find(".gs-u-display-block").text(),
      whosPlaying: $(station).find(".sc-c-network-item__bottom").text(),
    });
  }
  return RadioStations;
}

export default function Command() {
  const [bbcRadioStations, setBBcRadioStations] = useState<RadioStation[]>([]);

  getBBCRadioStationsFromWebSite()
    .then((data) => setBBcRadioStations(data))
    .catch((error) => showHUD(error.message));

  return (
    <List isLoading={bbcRadioStations.length === 0}>
      {bbcRadioStations.map((item) => (
        <List.Item
          key={item.id}
          icon={item.image || Icon.Globe}
          title={item.title || ""}
          accessories={[{ text: item.whosPlaying }]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={`https://www.bbc.co.uk${item.id}`} />
              <Action.CopyToClipboard title="Copy To Clipboard" content={`https://www.bbc.co.uk${item.id}`} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
