import Album from '../types/Album';
import Tag from '../types/Tag';
import IRepository from '../types/IRepository';
import ISearchResponse from '../types/ISearchResponse';
import IAlbumSearchQuery from '../types/IAlbumSearchQuery';
import IAlbumUpdateRequest from '../types/IAlbumUpdateRequest';
import IMediaUpdateRequest from '../types/IMediaUpdateRequest';
import API from '../api/API';
import MediaRepository from './MediaRepository';

export default class AlbumRepository implements IRepository<Album, IAlbumSearchQuery, IAlbumUpdateRequest> {

    baseURL = `${process.env.REACT_APP_API}`;

    add(album: Album): Promise<Album> {
        return API.post<Album>(`${this.baseURL}/albums?name=${album.name}&artistId=${album.artistID}`);
    }

    get(id: number): Promise<Album> {
        return API.get<Album>(`${this.baseURL}/albums?id=${id}`);
    }

    search(query: IAlbumSearchQuery): Promise<ISearchResponse<Album>> {
        let endpoint = `${this.baseURL}/albums/search?count=${query.count}`;

        if (query.offset) {
            endpoint += `&offset=${query.offset}`
        }

        if (query.name) {
            endpoint += `&name=${query.name}`;
        }

        if (query.artistId) {
            endpoint += `&artistid=${query.artistId}`;
        }

        return API.get<ISearchResponse<Album>>(endpoint);
    }

    async update(updateRequest: IAlbumUpdateRequest): Promise<Album> {
        let mediaRepository = new MediaRepository();
        const response = await mediaRepository.search({ albumID: updateRequest.ID, mode: 1, count: 9999 });
        for (const media of response.data) {
            let mediaUpdateRequest: IMediaUpdateRequest = { ID: media.id, score: updateRequest.score, source: updateRequest.source };

            if (updateRequest.removeTagIDs !== undefined || updateRequest.addTagIDs !== undefined) {
                let tags: Tag[] = [...media.tags];
                let newTagIDs: number[] = [];

                tags.forEach(tag => {
                    if (!updateRequest.removeTagIDs?.find(tID => tID === tag.id)) {
                        newTagIDs.push(tag.id);
                    }
                });

                updateRequest.addTagIDs?.forEach(tagID => {
                    if (!newTagIDs.find(tID_1 => tID_1 === tagID)) {
                        newTagIDs.push(tagID);
                    }
                });

                mediaUpdateRequest.tagIDs = newTagIDs;
            }

            await mediaRepository.update(mediaUpdateRequest);
        }
        return await this.get(updateRequest.ID);
    }

    delete(e: Album): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
