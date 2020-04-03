"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
let EditCloudRoleTemplateComponent = class EditCloudRoleTemplateComponent {
    constructor(cloudRoleFacade, fb) {
        this.cloudRoleFacade = cloudRoleFacade;
        this.fb = fb;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.cloudRole$ = this.cloudRoleFacade.getSelected$;
        this.form = this.fb.group({
            generalInfo: this.fb.group({})
        });
    }
    submit(cloudRole) {
        const _a = this.form.value.generalInfo, { versionBump } = _a, data = __rest(_a, ["versionBump"]);
        this.cloudRoleFacade.updateDetails(cloudRole.copyWith(Object.assign({}, data)), versionBump);
    }
};
EditCloudRoleTemplateComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-cloud-role-template',
        templateUrl: './edit-cloud-role-template.component.html',
        styleUrls: []
    })
], EditCloudRoleTemplateComponent);
exports.EditCloudRoleTemplateComponent = EditCloudRoleTemplateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1jbG91ZC1yb2xlLXRlbXBsYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvZWRpdC1jbG91ZC1yb2xlLXRlbXBsYXRlL2VkaXQtY2xvdWQtcm9sZS10ZW1wbGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUEwQztBQUUxQyx1RUFBb0U7QUFVcEUsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBOEI7SUFPekMsWUFDbUIsZUFBZ0MsRUFDaEMsRUFBZTtRQURmLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBUnpCLFVBQUssR0FBRyxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLENBQUM7UUFDN0IsZUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDO1FBQy9DLFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFDMUIsQ0FBQztTQUNILENBQUMsQ0FBQTtJQUlFLENBQUM7SUFFTCxNQUFNLENBQUMsU0FBb0I7UUFFekIsTUFBTSxnQ0FBc0QsRUFBdEQsRUFBRSxXQUFXLE9BQXlDLEVBQXZDLGtDQUF1QyxDQUFDO1FBRTdELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUNoQyxTQUFTLENBQUMsUUFBUSxtQkFDYixJQUFJLEVBQ1AsRUFDRixXQUFXLENBQ1osQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBdkJZLDhCQUE4QjtJQUwxQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDhCQUE4QjtRQUN4QyxXQUFXLEVBQUUsMkNBQTJDO1FBQ3hELFNBQVMsRUFBRSxFQUFFO0tBQ2QsQ0FBQztHQUNXLDhCQUE4QixDQXVCMUM7QUF2Qlksd0VBQThCIn0=