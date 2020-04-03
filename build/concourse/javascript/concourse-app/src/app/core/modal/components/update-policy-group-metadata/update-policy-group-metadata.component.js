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
let UpdatePolicyGroupMetadataComponent = class UpdatePolicyGroupMetadataComponent {
    constructor(policyGroupFacade, fb) {
        this.policyGroupFacade = policyGroupFacade;
        this.fb = fb;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.selectedPolicyGroup$ = this.policyGroupFacade.selectedWithRelated$;
        this.owningGroupOptions$ = this.policyGroupFacade.selectableOwningGroups$;
        this.form = this.fb.group({
            generalInfo: this.fb.group({}),
        });
    }
    submit(pg) {
        const _a = this.form.value.generalInfo, { versionBump } = _a, data = __rest(_a, ["versionBump"]);
        this.policyGroupFacade.updateDetails(pg.copyWith(data), versionBump);
    }
};
UpdatePolicyGroupMetadataComponent = __decorate([
    core_1.Component({
        selector: 'app-update-policy-group-metadata',
        templateUrl: './update-policy-group-metadata.component.html',
        styleUrls: ['./update-policy-group-metadata.component.scss']
    })
], UpdatePolicyGroupMetadataComponent);
exports.UpdatePolicyGroupMetadataComponent = UpdatePolicyGroupMetadataComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBvbGljeS1ncm91cC1tZXRhZGF0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL3VwZGF0ZS1wb2xpY3ktZ3JvdXAtbWV0YWRhdGEvdXBkYXRlLXBvbGljeS1ncm91cC1tZXRhZGF0YS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUEwQztBQUUxQyx1RUFBb0U7QUFVcEUsSUFBYSxrQ0FBa0MsR0FBL0MsTUFBYSxrQ0FBa0M7SUFTN0MsWUFDbUIsaUJBQW9DLEVBQ3BDLEVBQWU7UUFEZixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFWekIsVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztRQUM3Qix5QkFBb0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUM7UUFDbkUsd0JBQW1CLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDO1FBQ3JFLFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFDMUIsQ0FBQztTQUNILENBQUMsQ0FBQTtJQUtFLENBQUM7SUFHTCxNQUFNLENBQUMsRUFBZTtRQUNwQixNQUFNLGdDQUFzRCxFQUF0RCxFQUFFLFdBQVcsT0FBeUMsRUFBdkMsa0NBQXVDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Q0FDRixDQUFBO0FBbkJZLGtDQUFrQztJQUw5QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtDQUFrQztRQUM1QyxXQUFXLEVBQUUsK0NBQStDO1FBQzVELFNBQVMsRUFBRSxDQUFDLCtDQUErQyxDQUFDO0tBQzdELENBQUM7R0FDVyxrQ0FBa0MsQ0FtQjlDO0FBbkJZLGdGQUFrQyJ9