import { Album, Song } from './Music';

export class MusicList {
    private static instance: MusicList;
    static albums: Album[] = [];

    private constructor() {
            const RiotGeneration = new Album('Riot Generation', 'The Damaged and Broken', new Date('2008-05-02'), '../images/generated-album-art/punk-1.png', 14.99);
            RiotGeneration.addTracks([
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

    static get() {
        if(MusicList.instance) {
            return this.instance
        }
        this.instance = new MusicList();
    }
}