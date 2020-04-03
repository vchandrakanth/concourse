"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const store_1 = require("@ngrx/store");
const ngx_cookie_service_1 = require("ngx-cookie-service");
const operators_1 = require("rxjs/operators");
const enums_1 = require("@concourse/shared/enums");
const selectors_1 = require("../selectors");
const auth_service_1 = require("./services/auth.service");
const auth_actions_1 = require("./state/auth.actions");
const auth_effects_1 = require("./state/auth.effects");
const auth_facade_1 = require("./state/auth.facade");
const fromAuth = require("./state/auth.reducer");
// tslint:disable-next-line:only-arrow-functions
function _authApplicationFactory(store, cookieService) {
    return () => new Promise(resolve => {
        const hasAccessToken = cookieService.check(enums_1.AuthKeys.AccessTokenKey);
        const hasRefreshToken = cookieService.check(enums_1.AuthKeys.RefreshTokenKey);
        if (!hasAccessToken && !hasRefreshToken) {
            return resolve(true);
        }
        if (hasAccessToken && !hasRefreshToken) {
            store.dispatch(new auth_actions_1.Logout({ message: 'Invalid refresh token' }));
            return resolve(true);
        }
        const refreshToken = cookieService.get(enums_1.AuthKeys.RefreshTokenKey);
        if (!hasAccessToken && hasRefreshToken) {
            store.dispatch(new auth_actions_1.RequestNewAccessToken(refreshToken));
        }
        if (hasAccessToken && hasRefreshToken) {
            const accessToken = cookieService.get(enums_1.AuthKeys.AccessTokenKey);
            store.dispatch(new auth_actions_1.UserAuthenticated({ accessToken, refreshToken }));
        }
        store
            .pipe(store_1.select(selectors_1.getAuthenticatedUser), operators_1.skipWhile(authUser => !authUser), operators_1.take(1))
            .subscribe(_ => {
            resolve(true);
        });
    });
}
exports._authApplicationFactory = _authApplicationFactory;
const AUTH_INIT_PROVIDER = {
    provide: core_1.APP_INITIALIZER,
    useFactory: _authApplicationFactory,
    multi: true,
    deps: [[new core_1.Inject(store_1.Store)], [new core_1.Inject(ngx_cookie_service_1.CookieService)]]
};
let AuthStoreModule = class AuthStoreModule {
};
AuthStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.Auth, fromAuth.reducer),
            effects_1.EffectsModule.forFeature([auth_effects_1.AuthEffects])
        ],
        providers: [auth_service_1.AuthService, AUTH_INIT_PROVIDER, auth_facade_1.AuthFacade]
    })
], AuthStoreModule);
exports.AuthStoreModule = AuthStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYXV0aC9hdXRoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFrRTtBQUNsRSwyQ0FBOEM7QUFDOUMsdUNBQXlEO0FBQ3pELDJEQUFtRDtBQUNuRCw4Q0FBaUQ7QUFFakQsbURBQStEO0FBQy9ELDRDQUFvRDtBQUNwRCwwREFBc0Q7QUFDdEQsdURBQXdGO0FBQ3hGLHVEQUFtRDtBQUNuRCxxREFBaUQ7QUFDakQsaURBQWlEO0FBRWpELGdEQUFnRDtBQUNoRCxTQUFnQix1QkFBdUIsQ0FBQyxLQUE0QixFQUFFLGFBQTRCO0lBQ2hHLE9BQU8sR0FBRyxFQUFFLENBQ1YsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDcEIsTUFBTSxjQUFjLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxnQkFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsZ0JBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV0RSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3ZDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO1FBRUQsSUFBSSxjQUFjLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHFCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakUsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEI7UUFFRCxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLGdCQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGNBQWMsSUFBSSxlQUFlLEVBQUU7WUFDdEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLG9DQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDekQ7UUFFRCxJQUFJLGNBQWMsSUFBSSxlQUFlLEVBQUU7WUFDckMsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxnQkFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQy9ELEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxnQ0FBaUIsQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFFRCxLQUFLO2FBQ0YsSUFBSSxDQUNILGNBQU0sQ0FBQyxnQ0FBb0IsQ0FBQyxFQUM1QixxQkFBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFDaEMsZ0JBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUjthQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQW5DRCwwREFtQ0M7QUFFRCxNQUFNLGtCQUFrQixHQUFHO0lBQ3pCLE9BQU8sRUFBRSxzQkFBZTtJQUN4QixVQUFVLEVBQUUsdUJBQXVCO0lBQ25DLEtBQUssRUFBRSxJQUFJO0lBQ1gsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLGFBQU0sQ0FBQyxhQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxhQUFNLENBQUMsa0NBQWEsQ0FBQyxDQUFDLENBQUM7Q0FDekQsQ0FBQztBQVNGLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7Q0FBSSxDQUFBO0FBQW5CLGVBQWU7SUFQM0IsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsbUJBQVcsQ0FBQyxVQUFVLENBQUMsa0JBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN6RCx1QkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLDBCQUFXLENBQUMsQ0FBQztTQUN4QztRQUNELFNBQVMsRUFBRSxDQUFDLDBCQUFXLEVBQUUsa0JBQWtCLEVBQUUsd0JBQVUsQ0FBQztLQUN6RCxDQUFDO0dBQ1csZUFBZSxDQUFJO0FBQW5CLDBDQUFlIn0=