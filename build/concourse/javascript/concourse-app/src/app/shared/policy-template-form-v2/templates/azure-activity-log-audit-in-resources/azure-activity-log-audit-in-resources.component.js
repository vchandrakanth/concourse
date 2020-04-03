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
let AzureActivityLogAuditInResourcesComponent = class AzureActivityLogAuditInResourcesComponent {
    constructor(fb, ptfComponent) {
        this.fb = fb;
        this.ptfComponent = ptfComponent;
        this.form = this.fb.group({
            30043: [undefined, forms_1.Validators.required] // Actors.
        });
    }
    ngOnInit() {
        this.ptfComponent.addAndPopulateTemplate(this.policyTemplate.id, this.form);
    }
};
AzureActivityLogAuditInResourcesComponent = __decorate([
    core_1.Component({
        selector: 'app-azure-activity-log-audit-in-resources',
        templateUrl: './azure-activity-log-audit-in-resources.component.html',
        styleUrls: ['./azure-activity-log-audit-in-resources.component.scss']
    })
], AzureActivityLogAuditInResourcesComponent);
exports.AzureActivityLogAuditInResourcesComponent = AzureActivityLogAuditInResourcesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmUtYWN0aXZpdHktbG9nLWF1ZGl0LWluLXJlc291cmNlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BvbGljeS10ZW1wbGF0ZS1mb3JtLXYyL3RlbXBsYXRlcy9henVyZS1hY3Rpdml0eS1sb2ctYXVkaXQtaW4tcmVzb3VyY2VzL2F6dXJlLWFjdGl2aXR5LWxvZy1hdWRpdC1pbi1yZXNvdXJjZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDBDQUF5RDtBQVF6RCxJQUFhLHlDQUF5QyxHQUF0RCxNQUFhLHlDQUF5QztJQU1wRCxZQUNtQixFQUFlLEVBQ2YsWUFBeUM7UUFEekMsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLGlCQUFZLEdBQVosWUFBWSxDQUE2QjtRQU41RCxTQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbkIsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUEsVUFBVTtTQUNsRCxDQUFDLENBQUM7SUFLQyxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDRixDQUFBO0FBZFkseUNBQXlDO0lBTHJELGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsMkNBQTJDO1FBQ3JELFdBQVcsRUFBRSx3REFBd0Q7UUFDckUsU0FBUyxFQUFFLENBQUMsd0RBQXdELENBQUM7S0FDdEUsQ0FBQztHQUNXLHlDQUF5QyxDQWNyRDtBQWRZLDhGQUF5QyJ9