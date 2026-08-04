import type { IPlaylistResponse } from "@/api/use-load-playlists";

export const getLibraryPlaylists = (list: IPlaylistResponse[]) =>
  list.map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    ownerName: playlist.owner.display_name,
    mainImage: playlist.images?.[0]?.url,
  }));
