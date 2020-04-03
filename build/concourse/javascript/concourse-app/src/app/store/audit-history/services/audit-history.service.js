"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const models_1 = require("@concourse/core/models");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let AuditHistoryService = class AuditHistoryService {
    constructor(http) {
        this.http = http;
    }
    attributeTag(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `attribute-tags/${id}/audits`))
            .pipe(operators_1.map((response) => response.map(r => new models_1.AuditHistory().deserialize(r))));
    }
    applicationModel(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `application-models/${id}/audits`))
            .pipe(operators_1.map((response) => response.map(r => new models_1.AuditHistory().deserialize(r))));
    }
    enclaveModel(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `enclave-models/${id}/audits`))
            .pipe(operators_1.map((response) => response.map(r => new models_1.AuditHistory().deserialize(r))));
    }
    policyGroup(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-groups/${id}/audits`))
            .pipe(operators_1.map((response) => response.map(r => new models_1.AuditHistory().deserialize(r))));
    }
    policyGroupTemplate(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-group-templates/${id}/audits`))
            .pipe(operators_1.map((response) => response.map(r => new models_1.AuditHistory().deserialize(r))));
    }
    group(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `groups/${id}/audits`))
            .pipe(operators_1.map((response) => response.map(r => new models_1.AuditHistory().deserialize(r))));
    }
    user(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `users/${id}/audits`))
            .pipe(operators_1.map((response) => response.map(r => new models_1.AuditHistory().deserialize(r))));
    }
    cloudRole(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `cloud-roles/${id}/audits`))
            .pipe(operators_1.map((response) => response.map(r => new models_1.AuditHistory().deserialize(r))));
    }
    idpConfig(institutionId) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `/institutions/${institutionId}/config/idp/audits`))
            .pipe(operators_1.map((response) => response.map(r => new models_1.AuditHistory().deserialize(r))));
    }
};
AuditHistoryService = __decorate([
    core_1.Injectable()
], AuditHistoryService);
exports.AuditHistoryService = AuditHistoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQtaGlzdG9yeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F1ZGl0LWhpc3Rvcnkvc2VydmljZXMvYXVkaXQtaGlzdG9yeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0Esd0NBQTJDO0FBRzNDLDhDQUFxQztBQUVyQyxtREFBc0Q7QUFDdEQsbURBQXVEO0FBQ3ZELHVEQUFnRTtBQUdoRSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUU5QixZQUE2QixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQztJQUVsRCxZQUFZLENBQUMsRUFBVTtRQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsS0FBSyxFQUFFLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3pGLElBQUksQ0FDSCxlQUFHLENBQUMsQ0FBQyxRQUFlLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLHFCQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMvRSxDQUFDO0lBQ04sQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQVU7UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUM3RixJQUFJLENBQ0gsZUFBRyxDQUFDLENBQUMsUUFBZSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxxQkFBWSxFQUFF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