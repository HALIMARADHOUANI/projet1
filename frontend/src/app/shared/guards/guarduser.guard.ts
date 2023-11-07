import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild, Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import {AuthuserService} from '../../services/authentificationService/authuser.service';
import {AuthAdminService} from '../../services/authentificationService/auth-admin.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuarduserGuard implements CanActivateChild {
  /**
   * Constructor
   */
  constructor(
    private _authService: AuthAdminService,
    private _router: Router
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Can activate
   *
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
    return this._check(redirectUrl, route);
  }

  /**
   * Can activate child
   *
   * @param childRoute
   * @param state
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
    return this._check(redirectUrl);
  }

  /**
   * Can load
   *
   * @param route
   * @param segments
   */
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this._check('/');
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Check the authenticated status
   *
   * @param redirectURL
   * @param route
   * @private
   */
  private _check(redirectURL: string, route?: any): Observable<boolean> {
    // Check the authentication status
    return this._authService.check()
      .pipe(
        switchMap((authenticated) => {
          // If the user is not authenticated...
          if (authenticated) {
            let userRole = JSON.parse(localStorage.getItem(environment.users));
            if (route?.data?.role?.indexOf(userRole.role) === -1) {
              this._router.navigate(['login'], {queryParams: {redirectURL}});
              return of(false);
            }
            // Redirect to the sign-in page


            // Allow the access
            return of(true);
          }
          this._router.navigate(['login'], {queryParams: {redirectURL}});
          // Prevent the access
          return of(false);
        })
      );
  }

}
