import { describe, expect, it } from "@jest/globals";
import type { IPlaylistResponse } from "@/api/use-load-playlists";
import { getLibraryPlaylistsInfo } from "./get-library-playlists";

const createPlaylist = (
  overrides: Partial<IPlaylistResponse> = {},
): IPlaylistResponse => ({
  collaborative: false,
  description: "",
  external_urls: { spotify: "https://open.spotify.com/playlist/1" },
  href: "https://api.spotify.com/v1/playlists/1",
  id: "playlist-1",
  images: [{ width: 300, height: 300, url: "https://example.com/image.jpg" }],
  items: { href: "https://api.spotify.com/v1/playlists/1/tracks", total: 10 },
  name: "My Playlist",
  owner: { display_name: "John Doe" },
  primary_color: null,
  public: true,
  snapshot_id: "snapshot-1",
  tracks: { href: "https://api.spotify.com/v1/playlists/1/tracks", total: 10 },
  type: "playlist",
  uri: "spotify:playlist:1",
  ...overrides,
});

describe("getLibraryPlaylists", () => {
  it("returns an empty array for an empty input list", () => {
    expect(getLibraryPlaylistsInfo([])).toEqual([]);
  });

  it("maps playlist fields to library view model", () => {
    const playlist = createPlaylist();

    expect(getLibraryPlaylistsInfo([playlist])).toEqual([
      {
        id: "playlist-1",
        name: "My Playlist",
        ownerName: "John Doe",
        mainImage: "https://example.com/image.jpg",
      },
    ]);
  });

  it("maps multiple playlists preserving order", () => {
    const playlists = [
      createPlaylist({
        id: "playlist-1",
        name: "First",
        owner: { display_name: "Alice" },
        images: [{ width: 64, height: 64, url: "https://example.com/first.jpg" }],
      }),
      createPlaylist({
        id: "playlist-2",
        name: "Second",
        owner: { display_name: "Bob" },
        images: [{ width: 64, height: 64, url: "https://example.com/second.jpg" }],
      }),
    ];

    expect(getLibraryPlaylistsInfo(playlists)).toEqual([
      {
        id: "playlist-1",
        name: "First",
        ownerName: "Alice",
        mainImage: "https://example.com/first.jpg",
      },
      {
        id: "playlist-2",
        name: "Second",
        ownerName: "Bob",
        mainImage: "https://example.com/second.jpg",
      },
    ]);
  });

  it("returns undefined mainImage when images is null", () => {
    const playlist = createPlaylist({ images: null });

    expect(getLibraryPlaylistsInfo([playlist])).toEqual([
      {
        id: "playlist-1",
        name: "My Playlist",
        ownerName: "John Doe",
        mainImage: undefined,
      },
    ]);
  });
});
