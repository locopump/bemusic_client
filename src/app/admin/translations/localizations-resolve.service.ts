import { Injectable }             from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {Localization} from "../../shared/types/models/Localization";
import {AppHttpClient} from "../../shared/app-http-client.service";

@Injectable()
export class LocalizationsResolve implements Resolve<Localization[]> {

    constructor(private http: AppHttpClient, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Promise<Localization[]> {
        return this.http.get('localizations').toPromise().then(response => {
            return response;
        }, () => {
            this.router.navigate(['/admin']);
            return false;
        });
    }
}