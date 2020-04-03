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
let PolicyTemplateService = class PolicyTemplateService {
    constructor(http) {
        this.http = http;
    }
    create(policyTemplate) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, 'policy-templates'), policyTemplate).pipe(operators_1.map(response => new models_1.PolicyTemplate().deserialize(response)));
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, 'policy-templates')).pipe(operators_1.map((response) => response.content.map(item => new models_1.PolicyTemplate().deserialize(item))));
    }
    get(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-templates/${id}`)).pipe(operators_1.map(response => new models_1.PolicyTemplate().deserialize(response)));
    }
    delete(id) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-templates/${id}`)).pipe(operators_1.map(response => response));
    }
    update(policyTemplate) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-templates/${policyTemplate.id}`), policyTemplate.serialize()).pipe(operators_1.map(response => response));
    }
};
PolicyTemplateService = __decorate([
    core_1.Injectable()
], PolicyTemplateService);
exports.PolicyTemplateService = PolicyTemplateService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LXRlbXBsYXRlL3NlcnZpY2VzL3BvbGljeS10ZW1wbGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0Esd0NBQTJDO0FBRzNDLDhDQUFxQztBQUVyQyxtREFBMkU7QUFDM0UsbURBQXVEO0FBQ3ZELHVEQUFnRTtBQUdoRSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUVoQyxZQUE2QixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQztJQUVsRCxNQUFNLENBQUMsY0FBdUM7UUFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FDdEcsZUFBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSx1QkFBYyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQzVELENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDckYsZUFBRyxDQUFDLENBQUMsUUFBMkMsRUFBRSxFQUFFLENBQ2xELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSx1QkFBYyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDeEUsQ0FBQztJQUNKLENBQUM7SUFFRCxHQUFHLENBQUMsRUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzNGLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksdUJBQWMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUM1RCxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDOUYsZUFBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBZSxDQUFDLENBQ2pDLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLGNBQThCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ2xCLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsTUFBTSxFQUFFLG9CQUFvQixjQUFjLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDakYsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUMzQixDQUFDLElBQUksQ0FDSixlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFlLENBQUMsQ0FDakMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBckNZLHFCQUFxQjtJQURqQyxpQkFBVSxFQUFFO0dBQ0EscUJBQXFCLENBcUNqQztBQXJDWSxzREFBcUIifQ==