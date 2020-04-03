"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let InstitutionAuditHistoryComponent = class InstitutionAuditHistoryComponent {
    constructor(institutionFacade, auditHistoryFacade) {
        this.institutionFacade = institutionFacade;
        this.auditHistoryFacade = auditHistoryFacade;
        this.config$ = this.institutionFacade.idpConfig$;
        this.auditHistory$ = this.auditHistoryFacade.auditHistory$;
    }
};
InstitutionAuditHistoryComponent = __decorate([
    core_1.Component({
        selector: 'app-institution-audit-history',
        templateUrl: './institution-audit-history.component.html'
    })
], InstitutionAuditHistoryComponent);
exports.InstitutionAuditHistoryComponent = InstitutionAuditHistoryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tYXVkaXQtaGlzdG9yeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvaW5zdGl0dXRpb24vaW5zdGl0dXRpb24tYXVkaXQtaGlzdG9yeS9pbnN0aXR1dGlvbi1hdWRpdC1oaXN0b3J5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQVExQyxJQUFhLGdDQUFnQyxHQUE3QyxNQUFhLGdDQUFnQztJQUczQyxZQUNtQixpQkFBb0MsRUFDcEMsa0JBQXNDO1FBRHRDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUp6RCxZQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztRQUM1QyxrQkFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7SUFJbEQsQ0FBQztDQUNOLENBQUE7QUFQWSxnQ0FBZ0M7SUFKNUMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwrQkFBK0I7UUFDekMsV0FBVyxFQUFFLDRDQUE0QztLQUMxRCxDQUFDO0dBQ1csZ0NBQWdDLENBTzVDO0FBUFksNEVBQWdDIn0=