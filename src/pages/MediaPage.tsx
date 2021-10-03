import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner'

import Navigation from '../components/Navigation';
import Media from '../types/Media';
import MediaContainer from '../components/MediaContainer';
import MediaInfoSidebar from '../components/MediaInfoSidebar';
import BannerAlert from '../components/BannerAlert';
import MediaInfoEditModal from '../components/MediaInfoEditModal';

import './MediaPage.css';
import { MediaRepository } from '../repositories/MediaRepository';

export default function MediaPage() {
    const [media, setMedia] = useState<Media | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isMediaLoading, setIsMediaLoading] = useState(true);
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        var mediaIDString: string = new URL(window.location.href).searchParams.get("id") as string;
        var mediaID: number = +mediaIDString;
        new MediaRepository().get(mediaID).then((response: Media) => {
            setMedia(response);
        }).catch(error => { 
            setAlerts([...alerts, <BannerAlert variant="danger" heading="API Error:" body={error.message}/>]);
        });
    }, []);

    return ( 
        <React.Fragment>
            {showEditModal ? 
                <MediaInfoEditModal media={media as Media} isShown={showEditModal} onClose={() => setShowEditModal(false)}
                    onSave={(updatedMedia: Media) => {setMedia(updatedMedia); setShowEditModal(false)}}/>
                : null}
            <Navigation />
            {alerts.map(errorComponent => errorComponent)}
            <div id="mediapage">
                <div id="mediapage-sidebar">
                    {media !== null ? 
                        <div>
                            <button className="edit_button btn btn-primary" onClick={() => setShowEditModal(true)}>Edit</button>
                            <MediaInfoSidebar media={media} setMedia={setMedia}/> 
                        </div>
                        : null}
                </div>
                <div id="mediapage-content">
                    {isMediaLoading ? <Spinner id="imageLoadingSpinner" animation="border" variant="primary" /> : null}
                    <MediaContainer media={media as Media} onLoad={() => setIsMediaLoading(false)}/>
                </div>
            </div>
        </React.Fragment>
     );
}
