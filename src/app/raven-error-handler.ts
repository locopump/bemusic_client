import {ErrorHandler} from "@angular/core";
import {Settings} from "./shared/settings.service";
import * as Raven from 'raven-js';
import {CurrentUser} from "./auth/current-user";

export class RavenErrorHandler extends ErrorHandler {

    /**
     * Whether sentry error logger is already installed.
     */
    private installed = false;

    /**
     * RavenErrorHandler Constructor.
     */
    constructor(private settings: Settings, private currentUser: CurrentUser) {
        super();
    }

    /**
     * Handle specified error.
     */
    public handleError(err: any): void {
        //if there's no error, or it's a validation error return, bail
        if ( ! err || (err.type === 'http' && (err.status === 403 || err.status === 401))) return;

        super.handleError(err);

        //sentry did not install properly
        if ( ! this.installSentry()) return;

        Raven.captureException(err.originalError || err);
    }

    /**
     * Install sentry error logger.
     */
    private installSentry(): boolean {
        //already installed
        if (this.installed) return true;

        //no sentry public key is set
        if ( ! this.settings.has('logging.sentry_public')) return false;

        //install
        Raven.config(this.settings.get('logging.sentry_public'), {
            release: this.settings.get('version'),
            extra: {user: this.currentUser.getModel()},
            ignoreErrors: [
                'requestAnimationFrame is not defined',]
        }).install();

        if (this.currentUser.isLoggedIn()) {
            Raven.setUserContext({
                id: this.currentUser.get('id'),
                username: this.currentUser.get('display_name'),
                email: this.currentUser.get('email')
            });
        }

        return this.installed = true;
    }
}