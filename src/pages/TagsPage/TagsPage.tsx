import React, { useState, useEffect } from 'react';

import { TagsRequest } from '../../api/requests/TagRequests';
import TagsTable from '../../components/TagsTable/TagsTable';
import BannerAlert from '../../components/BannerAlert/BannerAlert';
import Navigation from '../../components/Navigation/Nav';
import Tag from '../../model/Tag';
import MediaSearchQuery from '../../api/requests/RequestModels/MediaSearchQuery';

export default function TagsPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        new TagsRequest().send().then(tags => {
            setTags(tags);
        }).catch(error => {
            setAlerts([...alerts, <BannerAlert variant="danger" heading="API Error:" body={error.message}/>]);
        });
    }, []);

    return ( 
        <React.Fragment>
            <Navigation />
            {alerts.map(errorComponent => errorComponent)}
            <TagsTable 
                tags={tags}
                onDeleteTag={(deletedTag: Tag) => setTags(tags.filter((tag) => {return tag.id !== deletedTag.id}))}
                onEditTag={(edittedTag: Tag) => {
                    tags.map(tag => {
                        if (tag.id === edittedTag.id) {
                            tag.name = edittedTag.name;
                        }
                    });
                }}
                onTagClick={(searchQuery: MediaSearchQuery) => console.log(searchQuery)}
            />
        </React.Fragment>
     );
}
