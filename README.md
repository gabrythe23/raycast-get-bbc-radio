# Get BBC Radio - Raycast Extension

This Raycast extension allows you to browse BBC Radio stations, view currently playing tracks, and search for tracks on Spotify.

## Features

- Browse a list of BBC Radio stations
- View currently playing tracks for each station
- Search and play tracks on Spotify
- Copy track information to clipboard

## Installation

### From Raycast Store (Recommended)

1. Open Raycast
2. Search for "Get BBC Radio" in the Extensions store
3. Click "Install"

### Manual Installation

1. Clone this repository:

   ```
   git clone https://github.com/gabrythe23/raycast-get-bbc-radio.git
   ```

2. Navigate to the project directory:

   ```
   cd raycast-get-bbc-radio
   ```

3. Install dependencies:

   ```
   yarn install
   ```

4. Build the extension:

   ```
   yarn build
   ```

5. In Raycast, go to Extensions > Add Extension > Add Script Command
6. Choose the `dist/index.js` file from this project

## Usage

1. Open Raycast and type "BBC Radio" to find the extension
2. Press Enter to open the list of BBC Radio stations
3. Use the arrow keys to navigate through the stations
4. Press Enter on a station to view its currently playing tracks
5. In the tracks list, you can:
   - Press Enter to search for the track on Spotify
   - Use the action menu to copy track information to clipboard

## Development

To set up the project for development:

1. Clone the repository:

   ```
   git clone https://github.com/gabrythe23/raycast-get-bbc-radio.git
   ```

2. Navigate to the project directory:

   ```
   cd raycast-get-bbc-radio
   ```

3. Install dependencies:

   ```
   yarn install
   ```

4. Start the development server:

   ```
   yarn dev
   ```

