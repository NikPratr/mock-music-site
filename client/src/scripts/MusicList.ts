import { Album, Song } from './Music';
import { getAlbums } from '../../../server/src/database-services/albums-database-service';

export class MusicList {
    private static instance: MusicList;
    public static albums: Album[] = [];

    private constructor() { }

    static async get() {
        if(MusicList.instance) {
            return this.instance
        }
        this.instance = new MusicList();
        
        const albumList = await getAlbums();
        const RiotGeneration = albumList.find(album => album.title === 'RiotGeneration')!;
        const RiotGenerationAlbum = new Album(
            RiotGeneration.title,
            RiotGeneration.artist,
            new Date(RiotGeneration.published),
            RiotGeneration.artwork,
            RiotGeneration.price
        );
        RiotGenerationAlbum.addTracks([
            new Song('Blue Glass', 2.99, '3:45', RiotGeneration),
            new Song('Runaway', 2.99, '2:59', RiotGeneration),
            new Song('Rebel Without a Cause', 2.99, '4:02', RiotGeneration),
            new Song('Chaos Parade', 2.99, '4:36', RiotGeneration),
            new Song('System Silhouette', 2.99, '4:30', RiotGeneration),
            new Song('Spire', 2.99, '3:25', RiotGeneration),
            new Song('Red Tailed Dove', 2.99, '5:02', RiotGeneration),
            new Song('Army of Six', 2.99, '2:17', RiotGeneration),
            new Song('Forward', 2.99, '3:14', RiotGeneration),
            new Song('Violence', 2.99, '4:01', RiotGeneration),
            new Song('Blurred Memories', 2.99, '5:18', RiotGeneration),
            new Song('Riot Generation', 2.99, '6:27', RiotGeneration)
        ]);

        MusicList.albums.push(RiotGeneration);
    }
}