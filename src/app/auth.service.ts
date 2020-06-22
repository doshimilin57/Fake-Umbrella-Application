import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtitlityService } from './utitlity.service';


@Injectable({
    providedIn: 'root',
})

export class AuthGuardService implements CanActivate {
    constructor(public router: Router, public activeRoute: ActivatedRoute, private http: HttpClient, public utility: UtitlityService) { }

    canActivate(): boolean {

        if (this.utility.getAuthenticatedStatus() === 'true') {
            return true;
        } else {
            return false;
        }

    }
}
