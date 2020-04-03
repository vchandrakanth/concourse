"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
const SCOPE = 'INSTITUTION POLICY MODEL IDENTITY RUNTIME_DATA';
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
    }
    login(request) {
        const body = new FormData();
        body.append('grant_type', 'password');
        body.append('scope', SCOPE);
        Object.entries(request).forEach(([key, value]) => {
            body.append(key, value);
        });
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Auth, 'oauth/token'), body).pipe(operators_1.map(response => response));
    }
    samlLogin(institutionId) {
        let params = new http_1.HttpParams();
        params = params.set('institutionId', `${institutionId}`);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'institutions/saml/login'), {}, {
            params,
            headers: new http_1.HttpHeaders({
                'Content-Type': 'text/plain'
            })
        }).pipe(operators_1.map(response => response));
    }
    samlLogout() {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'institutions/saml/logout'), {}).pipe(operators_1.map(response => response));
    }
    refreshAccessToken(refreshToken) {
        const body = new FormData();
        body.append('refresh_token', refreshToken);
        body.append('grant_type', 'refresh_token');
        body.append('scope', SCOPE);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Auth, 'oauth/token'), body).pipe(operators_1.map(response => response));
    }
    forgotPassword(formData) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users/password/reset'), formData).pipe(operators_1.map(response => response));
    }
    resetPassword(updatePasswordRequest) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users/password/tokenUpdatePassword'), updatePasswordRequest).pipe(operators_1.map(response => response));
    }
    validateToken(token) {
        let params = new http_1.HttpParams();
        params = params.set('token', token);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users/password/validatetoken'), {}, { params }).pipe(operators_1.map(response => response));
    }
};
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F1dGgvc2VydmljZXMvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQTJFO0FBQzNFLHdDQUEyQztBQUczQyw4Q0FBcUM7QUFHckMsbURBQXVEO0FBQ3ZELHVEQUFnRTtBQUVoRSxNQUFNLEtBQUssR0FBRyxnREFBZ0QsQ0FBQztBQUcvRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBRXRCLFlBQ21CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFDL0IsQ0FBQztJQUVMLEtBQUssQ0FBQyxPQUF5QjtRQUM3QixNQUFNLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNyRixlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUF5QixDQUFDLENBQzNDLENBQUM7SUFDSixDQUFDO0lBRUQsU0FB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