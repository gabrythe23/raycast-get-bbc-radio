export interface RadioStation {
  id: string;
  title: string;
  image: string;
  whosPlaying: string;
}

export interface LastTrack {
  time: string;
  artist: string;
  title: string;
  cover: string;
}

export interface ScriptJson {
  props: {
    pageProps: {
      dehydratedState: {
        queries: Array<{
          queryKey: string[];
          state: {
            data: {
              data: Array<{
                id: string;
                data: Array<{
                  id: string;
                  network: {
                    short_title: string;
                  };
                  image_url: string;
                  titles: {
                    primary: string;
                  };
                }>;
              }>;
            };
          };
        }>;
      };
    };
  };
}

export interface PreloadedState {
  modules: {
    data: Array<{
      id: string;
      data: Array<{
        titles: {
          primary: string;
          secondary: string;
        };
        image_url: string;
      }>;
    }>;
  };
}
