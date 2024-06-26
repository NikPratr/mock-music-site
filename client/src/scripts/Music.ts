export class Album {
    constructor(
        readonly title: string,
        readonly artist: string,
        readonly published: Date,
        readonly artwork: string,
        public price: number,
        
        public trackList: Song[] = [],
        readonly contributors?: string
        ) { }
    
    addTracks = (tracks: Song[]) => {
        this.trackList.push(...tracks);
    }
}

export class Song {
    constructor(
        readonly name: string,
        public price: number,
        readonly length: string,
        readonly album?: Album,
        readonly artist?: string,
        readonly artwork?: string,
        readonly published?: Date
    ) {
        if(album) {
            this.artist = album.artist;
            this.artwork = album.artwork;
            this.published = album.published;
        }
    }
}