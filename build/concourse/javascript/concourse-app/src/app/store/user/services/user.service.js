"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const models_1 = require("@concourse/core/models");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let UserService = class UserService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users')).pipe(operators_1.map((response) => response.content.map(u => new models_1.User().deserialize(u))));
    }
    paginatedList(size = '200', page = '0', sort = 'id,DESC') {
        const params = new http_1.HttpParams()
            .set('size', size)
            .set('page', page)
            .set('sort', sort);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users'), { params }).pipe(operators_1.map((response) => ({
            users: response.content.map(item => (new models_1.User().deserialize(item))),
            hasNextLink: this.hasNextLink(response)
        })));
    }
    getUser(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `users/${id}`)).pipe(operators_1.map(response => new models_1.User().deserialize(response)));
    }
    getMe() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users/me')).pipe(operators_1.map((_a) => {
            var { authoritiesBySurfaceLayerId, authoritiesByInstitutionId, authoritiesBySurfaceId, groups } = _a, user = __rest(_a, ["authoritiesBySurfaceLayerId", "authoritiesByInstitutionId", "authoritiesBySurfaceId", "groups"]);
            return ({
                authoritiesBySurfaceLayerId,
                authoritiesByInstitutionId,
                authoritiesBySurfaceId,
                user: new models_1.User().deserialize(Object.assign(Object.assign({}, user), { groups: groups.map(({ id }) => ({ id })) })),
                groups: groups.map(g => new models_1.Group().deserialize(g))
            });
        }));
    }
    deleteUser(id) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `users/${id}`)).pipe(operators_1.map(response => response));
    }
    inviteUser(user) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users/invite'), user).pipe(operators_1.map(response => new models_1.User().deserialize(response)));
    }
    updateUser(user) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `users/${user.id}`), user.serialize()).pipe(operators_1.map(response => new models_1.User().deserialize(response)));
    }
    updatePassword(id, updatePasswordRequest) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `users/${id}/updatePassword`), updatePasswordRequest).pipe(operators_1.map(response => response));
    }
    validateInviteUserToken(token) {
        let params = new http_1.HttpParams();
        params = params.set('token', token);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users/validateinvitation'), {}, { params }).pipe(operators_1.map(response => response));
    }
    regenerateInvitation(token) {
        let params = new http_1.HttpParams();
        params = params.set('token', token);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users/reinvite'), {}, { params }).pipe(operators_1.map(response => response));
    }
    createUser(token, user) {
        const params = new http_1.HttpParams()
            .set('token', token);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users'), user, { params }).pipe(operators_1.map(response => response));
    }
    validateConfirmationToken(token) {
        let params = new http_1.HttpParams();
        params = params.set('token', token);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users/confirm'), {}, { params }).pipe(operators_1.map(response => response));
    }
    regenerateConfirmationToken(token) {
        let params = new http_1.HttpParams();
        params = params.set('token', token);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users/recreateconfirmation'), {}, { params }).pipe(operators_1.map(response => response));
    }
    getSecurityQuestions() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'users/catalog/security-questions')).pipe(operators_1.map((response) => response.content));
    }
    hasNextLink(pagination) {
        return pagination.links.filter(link => link.rel === 'next').length > 0;
    }
};
UserService = __decorate([
    core_1.Injectable()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3VzZXIvc2VydmljZXMvdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEQ7QUFDOUQsd0NBQTJDO0FBRzNDLDhDQUFxQztBQUVyQyxtREFNZ0M7QUFDaEMsbURBQXVEO0FBQ3ZELHVEQUFnRTtBQUdoRSxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBRXRCLFlBQ21CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFDL0IsQ0FBQztJQUVMLElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN4RSxlQUFHLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksYUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDakcsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsR0FBRyxFQUFFLElBQUksR0FBRyxTQUFTO1FBRXhELE1BQU0sTUFBTSxHQUFlLElBQUksaUJBQVUsRUFBRTthQUN4QyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzthQUNqQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzthQUNqQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FB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