import {Injectable} from '@angular/core';
import {Album} from "../shared/types/models/Album";
import {Artist} from "../shared/types/models/Artist";
import {Genre} from "../shared/types/models/Genre";
import {Track} from "../shared/types/models/Track";
import {User} from "../shared/types/models/User";
import {Settings} from "../shared/settings.service";
import {Playlist} from "../shared/types/models/Playlist";
import {utils} from "../shared/utils";

@Injectable()
export class WebPlayerUrls {

    constructor(private settings: Settings) {}

    /**
     * Get router link for specified album.
     */
    public album(album: Album, artist?: Artist|string) {
        if ( ! artist) artist = album.artist;

        if (artist) {
            artist = typeof artist === 'string' ? artist : artist.name;
        } else {
            artist = 'Various Artists';
        }

        return ['/album', album.id, this.encodeItemName(artist), this.encodeItemName(album.name)];
    }

    /**
     * Get router link for specified artist.
     */
    public artist(artist: Artist|string, append?: string) {
        let link = ['/artist'];

        if (typeof artist === 'string') {
            link.push(this.encodeItemName(artist));
        } else {
            link = link.concat([artist.id, this.encodeItemName(artist.name)] as any);
        }

        if (append) link.push(append);

        return link;
    }

    /**
     * Get router link for specified artist radio.
     */
    public artistRadio(artist: Artist) {
        return ['radio/artist', artist.id, this.encodeItemName(artist.name)];
    }

    /**
     * Get router link for specified track radio.
     */
    public trackRadio(track: Track) {
        return ['radio/track', track.id, this.encodeItemName(track.name)];
    }

    /**
     * Get router link for specified genre.
     */
    public genre(genre: Genre) {
        return ['/genre', this.encodeItemName(genre.name)];
    }

    public track(track: Track) {
        return ['/track', track.id, this.encodeItemName(track.name)];
    }

    public playlist(playlist: Playlist) {
        return ['/playlists', playlist.id, this.encodeItemName(playlist.name)];
    }

    public user(user: User, append?: string) {
        let link = ['/user', user.id, this.encodeItemName(user['display_name'])];

        if (append) link.push(append);

        return link;
    }

    public search(query: string, tab?: string) {
        const link = ['/search', this.encodeItemName(query)];
        if (tab) link.push(tab);
        return link;
    }

    /**
     * Get router link for editing specified artist.
     */
    public editArtist(artist: Artist): any[] {
        return ['admin/artists', artist.id, 'edit'];
    }

    public encodeItemName(name: string): string {
        if ( ! name) return '';
        return name.replace('%', '%25');
    }

    public routerLinkToUrl(commands: any[]): string {
        return (this.settings.getBaseUrl().replace(/\/$/, '') + commands.join('/'));
    }
}
