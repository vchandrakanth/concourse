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
let AwsAccountsService = class AwsAccountsService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'config/aws-accounts')).pipe(operators_1.map((response) => response.content.map(i => new models_1.AwsAccountResource().deserialize(i))));
    }
    get(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `config/aws-accounts/${id}`)).pipe(operators_1.map(response => new models_1.AwsAccountResource().deserialize(response)));
    }
    create(params) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'config/aws-accounts'), Object.assign({}, params)).pipe(operators_1.map(response => new models_1.AwsAccountResource().deserialize(response)));
    }
    update(params) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `config/aws-accounts/${params.id}`), params.serialize()).pipe(operators_1.map(response => new models_1.AwsAccountResource().deserialize(response)));
    }
    delete(id) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `config/aws-accounts/${id}`)).pipe(operators_1.map(response => new models_1.AwsAccountResource().deserialize(response)));
    }
    enableSurface(surfaceId, awsAccountId) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `config/aws-accounts/${awsAccountId}/surfaces/${surfaceId}/enable`), {}).pipe(operators_1.map(response => response));
    }
    disableSurface(surfaceId, awsAccountId) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `config/aws-accounts/${awsAccountId}/surfaces/${surfaceId}/disable`), {}).pipe(operators_1.map(response => response));
    }
    enableSurfaceLayer(surfaceId, surfaceLayerId, awsAccountId) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `config/aws-accounts/${awsAccountId}/surfaces/${surfaceId}/surface-layers/${surfaceLayerId}/enable`), {}).pipe(operators_1.map(response => response));
    }
    disableSurfaceLayer(surfaceId, surfaceLayerId, awsAccountId) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `config/aws-accounts/${awsAccountId}/surfaces/${surfaceId}/surface-layers/${surfaceLayerId}/disable`), {}).pipe(operators_1.map(response => response));
    }
};
AwsAccountsService = __decorate([
    core_1.Injectable()
], AwsAccountsService);
exports.AwsAccountsService = AwsAccountsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWFjY291bnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYXdzLWFjY291bnRzL3NlcnZpY2VzL2F3cy1hY2NvdW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0Esd0NBQTJDO0FBRzNDLDhDQUFxQztBQUVyQyxtREFBK0U7QUFDL0UsbURBQXVEO0FBQ3ZELHVEQUFnRTtBQUdoRSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUM3QixZQUNtQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQy9CLENBQUM7SUFFTCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUM3RixlQUFHLENBQUMsQ0FBQyxRQUErQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksMkJBQWtCLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUM3SCxDQUFDO0lBQ0osQ0FBQztJQUVELEdBQUcsQ0FBQyxFQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLFdBQVcsRUFBRSx1QkFBdUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDbkcsZUFBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSwyQkFBa0IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUNoRSxDQUFDO0lBQ0osQ0FBQztJQUVELE1B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