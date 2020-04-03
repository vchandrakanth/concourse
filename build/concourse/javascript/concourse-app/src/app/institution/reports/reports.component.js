"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const rxjs_1 = require("rxjs");
// TODO: Remove after list implemented in backend
exports.AZURE_RESOURCES = [
    'Microsoft.Sql/servers/databases/auditingSettings',
    'Microsoft.Sql/servers/auditingSettings',
    'Microsoft.Insights/diagnosticSettings',
    'Microsoft.Web/sites',
    'Microsoft.Sql/servers/databases',
    'Microsoft.Sql/servers',
    'Microsoft.Web/hostingEnvironments'
];
let ReportsComponent = class ReportsComponent {
    constructor(fb, reportingFacade) {
        this.fb = fb;
        this.reportingFacade = reportingFacade;
        this.azureResources$ = new rxjs_1.BehaviorSubject(exports.AZURE_RESOURCES);
        this.resourceAuditsForm = this.fb.group({
            resourceType: [undefined, forms_1.Validators.required],
            lookbackWindow: [30, forms_1.Validators.required]
        });
        this.cloudRoleAuditForm = this.fb.group({
            lookbackWindow: [30, forms_1.Validators.required]
        });
    }
    resourceAuditSubmit() {
        const { resourceType, lookbackWindow } = this.resourceAuditsForm.value;
        this.reportingFacade.generateGenericDiffReport(resourceType, lookbackWindow);
    }
    cloudRoleAuditSubmit() {
        const { lookbackWindow } = this.cloudRoleAuditForm.value;
        this.reportingFacade.generateCloudRoleDiffReport(lookbackWindow);
    }
};
ReportsComponent = __decorate([
    core_1.Component({
        selector: 'app-reports',
        templateUrl: './reports.component.html',
        styleUrls: ['./reports.component.scss']
    })
], ReportsComponent);
exports.ReportsComponent = ReportsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvaW5zdGl0dXRpb24vcmVwb3J0cy9yZXBvcnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQywwQ0FBeUQ7QUFFekQsK0JBQXVDO0FBSXZDLGlEQUFpRDtBQUNwQyxRQUFBLGVBQWUsR0FBRztJQUM3QixrREFBa0Q7SUFDbEQsd0NBQXdDO0lBQ3hDLHVDQUF1QztJQUN2QyxxQkFBcUI7SUFDckIsaUNBQWlDO0lBQ2pDLHVCQUF1QjtJQUN2QixtQ0FBbUM7Q0FDcEMsQ0FBQztBQU9GLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBYTNCLFlBQ21CLEVBQWUsRUFDZixlQUFnQztRQURoQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2Ysb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBYm5ELG9CQUFlLEdBQUcsSUFBSSxzQkFBZSxDQUFDLHVCQUFlLENBQUMsQ0FBQztRQUV2RCx1QkFBa0IsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNqQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7WUFDOUMsY0FBYyxFQUFFLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1NBQzFDLENBQUMsQ0FBQztRQUVILHVCQUFrQixHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2pDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztTQUMxQyxDQUFDLENBQUM7SUFLQyxDQUFDO0lBRUwsbUJBQW1CO1FBQ2pCLE1BQU0sRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztRQUN2RSxJQUFJLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO1FBQ3pELElBQUksQ0FBQyxlQUFlLENBQUMsMkJBQTJCLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUVGLENBQUE7QUE1QlksZ0JBQWdCO0lBTDVCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO0tBQ3hDLENBQUM7R0FDVyxnQkFBZ0IsQ0E0QjVCO0FBNUJZLDRDQUFnQiJ9