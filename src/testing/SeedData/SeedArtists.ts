import Artist from '../../types/Artist';

export const SeedArtists: Artist[] = ((): Artist[] => {
    return [
        { id: 1, name: 'artist1' },
        { id: 2, name: 'artist2' },
        { id: 3, name: 'artist3' }
    ];
})();
