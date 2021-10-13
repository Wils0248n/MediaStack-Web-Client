import { useState } from 'react';
import { Modal, Button }from "react-bootstrap";
import Album from '../types/Album';
import Media from '../types/Media';
import AlbumUpdateForm from './AlbumUpdateForm';

import './AlbumInfoEditModal.css'
import useAlbums from '../hooks/useAlbums';
import { IAlbumUpdateRequest } from '../repositories/AlbumRepository';

type Props = {
    album: Album,
    mediaList: Media[]
    isShown: boolean,
    onClose: () => void,
    onSave: (updatedAlbum: Album) => void 
}

export default function AlbumInfoEditModal({album, mediaList, isShown, onClose, onSave}: Props) {

    const { update } = useAlbums();

    // TODO: Not Working
    const getAlbumSource = () => {
        let albumSource: string = "";

        mediaList.forEach(media => {
            if (media.source !== null && media.source !== "") {
                if (albumSource !== null && media.source !== albumSource) {
                    return "";
                }
                albumSource = media.source;
            }
        });

        return albumSource;
    };

    const [updateRequest, setUpdateRequest] = useState<IAlbumUpdateRequest>(
        { 
            ID: album.id, 
            categoryID: mediaList.length !== 0 ? mediaList[0].categoryID : undefined, //TODO: Find a better way.
            artistID: album.artistID,
            source: getAlbumSource(),
        }
    );

    const handleSave = () => {
        update(updateRequest).then(response => {
            onSave(response);
        });
    };
    
    return ( 
        <>
            <Modal show={isShown} onHide={() => onClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Edit Album Info`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlbumUpdateForm request={updateRequest} onChange={setUpdateRequest}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onClose()}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
      </>
     );
}
