"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let WorkflowWidgetComponent = class WorkflowWidgetComponent {
    constructor(workflowFacade) {
        this.workflowFacade = workflowFacade;
        this.workflow$ = this.workflowFacade.summary$;
    }
};
WorkflowWidgetComponent = __decorate([
    core_1.Component({
        selector: 'app-workflow-widget',
        templateUrl: './workflow-widget.component.html',
        styleUrls: ['./workflow-widget.component.scss']
    })
], WorkflowWidgetComponent);
exports.WorkflowWidgetComponent = WorkflowWidgetComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3ctd2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9kYXNoYm9hcmQvd29ya2Zsb3ctd2lkZ2V0L3dvcmtmbG93LXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFTMUMsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFHbEMsWUFDbUIsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBSGpELGNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztJQUlyQyxDQUFDO0NBQ04sQ0FBQTtBQU5ZLHVCQUF1QjtJQUxuQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO0tBQ2hELENBQUM7R0FDVyx1QkFBdUIsQ0FNbkM7QUFOWSwwREFBdUIifQ==