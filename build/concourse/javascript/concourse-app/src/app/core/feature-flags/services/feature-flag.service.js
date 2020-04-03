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
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let FeatureFlagService = class FeatureFlagService {
    constructor(http) {
        this.http = http;
    }
    listFeatures() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'features')).pipe(operators_1.map(response => response));
    }
    listInstitutionFeatures() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'institution-features')).pipe(operators_1.map(response => response));
    }
};
FeatureFlagService = __decorate([
    core_1.Injectable()
], FeatureFlagService);
exports.FeatureFlagService = FeatureFlagService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1mbGFnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9mZWF0dXJlLWZsYWdzL3NlcnZpY2VzL2ZlYXR1cmUtZmxhZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0Esd0NBQTJDO0FBRzNDLDhDQUFxQztBQUVyQyxtREFBdUQ7QUFDdkQsdURBQWdFO0FBR2hFLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBYzdCLFlBQ1UsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUN0QixDQUFDO0lBZEwsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzlFLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQW9CLENBQUMsQ0FDdEMsQ0FBQztJQUNKLENBQUM7SUFFRCx1QkFBdUI7UUFDckIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLE9BQU8sRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMxRixlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFvQixDQUFDLENBQ3RDLENBQUM7SUFDSixDQUFDO0NBS0YsQ0FBQTtBQWpCWSxrQkFBa0I7SUFEOUIsaUJBQVUsRUFBRTtHQUNBLGtCQUFrQixDQWlCOUI7QUFqQlksZ0RBQWtCIn0=