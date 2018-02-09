import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {WebPlayerUrls} from "../../web-player-urls.service";
import {Genre} from "../../../shared/types/models/Genre";
import {FilterablePage} from "../../filterable-page/filterable-page";
import {ActivatedRoute} from "@angular/router";
import {Settings} from "../../../shared/settings.service";

@Component({
    selector: 'popular-artist',
    templateUrl: './popular-artist.component.html',
    styleUrls: ['./popular-artist.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PopularArtistComponent extends FilterablePage<Genre> implements OnInit {

    /**
     * PopularGenresComponent Constructor.
     */
    constructor(
        private route: ActivatedRoute,
        public urls: WebPlayerUrls,
        public settings: Settings
    ) {
        super(['name']);
    }

    ngOnInit() {
    }
}
