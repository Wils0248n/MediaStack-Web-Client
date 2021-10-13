import { ArtistRepository } from "../repositories/AritstRepository";
import { IGenericSearchQuery } from "../repositories/GenericRepository";
import Artist from "../types/Artist";
import IRepository from "../types/IRepository";
import useRepository from "./useRepository";

export default function useArtists() {

    const artistsRepository: IRepository<Artist, IGenericSearchQuery> = new ArtistRepository();
    return useRepository(artistsRepository);
}
