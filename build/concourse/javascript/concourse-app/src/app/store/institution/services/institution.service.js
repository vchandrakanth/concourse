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
const models_1 = require("@concourse/core/models");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let InstitutionService = class InstitutionService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'institutions')).pipe(operators_1.map((response) => response.content.map(item => (new models_1.Institution().deserialize(item)))));
    }
    get(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `institutions/${id}`)).pipe(operators_1.map(response => new models_1.Institution().deserialize(response)));
    }
    update(institution) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `institutions/${institution.id}`), institution).pipe(operators_1.map(response => new models_1.Institution().deserialize(response)));
    }
    invite(institution) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'institutions/invite'), institution).pipe(operators_1.map(response => new models_1.Institution().deserialize(response)));
    }
    register(institution) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'institutions/register/create'), institution).pipe(operators_1.map(response => new models_1.Institution().deserialize(response)));
    }
    validateInstToken(token) {
        let params = new http_1.HttpParams();
        params = params.set('token', token);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'institutions/register/validateRegistration'), {}, { params }).pipe(operators_1.map(response => response));
    }
    regenerateInvitation(token) {
        let params = new http_1.HttpParams();
        params = params.set('token', token);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'institutions/register/reRegister'), {}, { params }).pipe(operators_1.map(response => response));
    }
    validateRegistrationToken(token) {
        let params = new http_1.HttpParams();
        params = params.set('token', token);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'institutions/register/confirm'), {}, { params }).pipe(operators_1.map(response => response));
    }
    regenerateRegistration(token) {
        let params = new http_1.HttpParams();
        params = params.set('token', token);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'institutions/register/recreateConfirmation'), {}, { params }).pipe(operators_1.map(response => response));
    }
    getIDPConfig() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'config/idp')).pipe(operators_1.map(response => new models_1.IDPConfig().deserialize(response)));
    }
    updateIDPConfig(action, data) {
        return this.http[action](helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'config/idp'), data).pipe(operators_1.map(response => new models_1.IDPConfig().deserialize(response)));
    }
};
InstitutionService = __decorate([
    core_1.Injectable()
], InstitutionService);
exports.InstitutionService = InstitutionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9pbnN0aXR1dGlvbi9zZXJ2aWNlcy9pbnN0aXR1dGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQXVHO0FBQ3ZHLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFFN0IsWUFBNkIsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUFFbEQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3RGLGVBQUcsQ0FBQyxDQUFDLFFBQXdDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDN0UsSUFBSSxvQkFBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUNwQyxDQUFDLENBQUMsQ0FDSixDQUFDO0lBQ0osQ0FBQztJQUVELEdBQUcsQ0FBQyxFQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDNUYsZUFBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxvQkFBVyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQ3pELENBQUM7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