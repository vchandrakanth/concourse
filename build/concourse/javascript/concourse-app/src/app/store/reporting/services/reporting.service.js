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
let ReportingService = class ReportingService {
    constructor(http) {
        this.http = http;
    }
    generateSurfaceLayerReport(surfaceLayerId) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Reporting, `surface-layers/${surfaceLayerId}/reports`), {
            responseType: 'blob',
            observe: 'response',
            headers: { Accept: 'application/pdf' }
        }).pipe(operators_1.map(response => this.parseResponse(response)));
    }
    generateGenericDiffReport(lookbackWindow, resourceType) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Reporting, 'diff-generic'), { lookbackWindow, resourceType }, {
            responseType: 'blob',
            observe: 'response',
            headers: { Accept: 'application/pdf' }
        }).pipe(operators_1.map(response => this.parseResponse(response)));
    }
    generateCloudRoleDiffReport(lookbackWindow) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Reporting, 'diff-custom-role'), { lookbackWindow }, {
            responseType: 'blob',
            observe: 'response',
            headers: { Accept: 'application/pdf' }
        }).pipe(operators_1.map(response => this.parseResponse(response)));
    }
    parseResponse(response) {
        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        return {
            content: response.body,
            fileName: filename
        };
    }
};
ReportingService = __decorate([
    core_1.Injectable()
], ReportingService);
exports.ReportingService = ReportingService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0aW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcmVwb3J0aW5nL3NlcnZpY2VzL3JlcG9ydGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0Esd0NBQTJDO0FBRzNDLDhDQUFxQztBQUVyQyxtREFBdUQ7QUFDdkQsdURBQWdFO0FBR2hFLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBRTNCLFlBQ21CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFDL0IsQ0FBQztJQUVMLDBCQUEwQixDQUFDLGNBQXNCO1FBQy9DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ2xCLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsU0FBUyxFQUFFLGtCQUFrQixjQUFjLFVBQVUsQ0FBQyxFQUN2RjtZQUNFLFlBQVksRUFBRSxNQUFNO1lBQ3BCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRTtTQUN2QyxDQUFDLENBQUMsSUFBSSxDQUNMLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FDOUMsQ0FBQztJQUNOLENBQUM7SUFFRCx5QkFBeUIsQ0FBQyxjQUFzQixFQUFFLFlBQW9CO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ25CLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxFQUMzRCxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsRUFDaEM7WUFDRSxZQUFZLEVBQUUsTUFBTTtZQUNwQixPQUFPLEVBQUUsVUFBVTtZQUNuQixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUU7U0FDdkMsQ0FBQyxDQUFDLElBQUksQ0FDTCxlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQzlDLENBQUM7SUFDTixDQUFDO0lBRUQsMkJBQTJCLENBQUMsY0FBc0I7UUFDaEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDbkIsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsRUFDL0QsRUFBRSxjQUFjLEVBQUUsRUFDbEI7WUFDRSxZQUFZLEVBQUUsTUFBTTtZQUNwQixPQUFPLEVBQUUsVUFBVTtZQUNuQixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUU7U0FDdkMsQ0FBQyxDQUFDLElBQUksQ0FDTCxlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQzlDLENBQUM7SUFDTixDQUFDO0lBRUQsYUFBYSxDQUFDLFFBQTRCO1FBQ3hDLE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN2RSxNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1RixPQUFPO1lBQ0wsT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ3RCLFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUM7SUFDSixDQUFDO0NBRUYsQ0FBQTtBQXJEWSxnQkFBZ0I7SUFENUIsaUJBQVUsRUFBRTtHQUNBLGdCQUFnQixDQXFENUI7QUFyRFksNENBQWdCIn0=