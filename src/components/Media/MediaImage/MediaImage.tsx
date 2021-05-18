import React, { useEffect } from 'react';
import Media from '../../../model/Media';
import $ from 'jquery';
import './MediaImage.css';

type Props = {
    onImageClick?: Function,
    onImageLoad: Function,
    media: Media
}

export default function MediaImage({onImageClick, onImageLoad, media}: Props) {
    useEffect(() => {
        if (typeof onImageClick !== 'undefined') {
            $("#mediaImage").on("click", (event) => {
                onImageClick(event);
            });
        }
    }, []);

    const onLoadEventHanlder = () => {
        onImageLoad();
    }

    return (
        <div>
            <img id="mediaImage"
                onLoad={onLoadEventHanlder} 
                alt={media.tags.toString()} 
                src={`${process.env.REACT_APP_API}/media/${media.id}/file`}/>
        </div>
    );
}
