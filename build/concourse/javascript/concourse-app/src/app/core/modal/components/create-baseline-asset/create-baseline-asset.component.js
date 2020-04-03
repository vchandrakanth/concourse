"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const helpers_1 = require("@concourse/shared/helpers");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const operators_1 = require("rxjs/operators");
const basic_modal_1 = require("../basic-modal");
let CreateBaselineAssetComponent = class CreateBaselineAssetComponent extends basic_modal_1.BasicModal {
    constructor(fb, attributeTagFacade, policyGroupFacade, baselineAssetFacade, authFacade) {
        super();
        this.fb = fb;
        this.attributeTagFacade = attributeTagFacade;
        this.policyGroupFacade = policyGroupFacade;
        this.baselineAssetFacade = baselineAssetFacade;
        this.authFacade = authFacade;
        this.componentIcons = { faSignInAlt: free_solid_svg_icons_1.faSignInAlt, faSync: free_solid_svg_icons_1.faSync };
        this.isLoading$ = this.baselineAssetFacade.isLoading$;
        this.isLoaded$ = this.baselineAssetFacade.isLoaded$;
        this.owningGroupOptions$ = this.policyGroupFacade.selectableOwningGroups$;
        this.attributeTags$ = this.attributeTagFacade.list$;
        this.institutionId$ = this.authFacade.institutionId$; // remove it with backend fix
        this.form = this.fb.group({
            generalInfo: this.fb.group({
                attributeTags: [undefined],
                isConjunction: [true]
            }) // Form Builder for general-details-controls-form
        });
        this.institutionId$.pipe(operators_1.take(1)).subscribe(i => this.instId = i);
    }
    onSubmit() {
        const { name, description, status, owningGroupId, versionBump, attributeTags, isConjunction } = this.form.value.generalInfo;
        let reqBody = {};
        reqBody = Object.assign(Object.assign({}, reqBody), { name,
            description,
            status, attributeTags: attributeTags ? attributeTags.map(at => ({ id: at })) : null, isConjunction, institutionId: this.instId, owningGroupId });
        this.baselineAssetFacade.createBaselineAsset(helpers_1.clean(reqBody), status === 'PUBLISHED' ? versionBump : '');
    }
};
CreateBaselineAssetComponent = __decorate([
    core_1.Component({
        selector: 'app-create-baseline-asset',
        templateUrl: './create-baseline-asset.component.html',
        styleUrls: ['./create-baseline-asset.component.scss']
    })
], CreateBaselineAssetComponent);
exports.CreateBaselineAssetComponent = CreateBaselineAssetComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWJhc2VsaW5lLWFzc2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvY3JlYXRlLWJhc2VsaW5lLWFzc2V0L2NyZWF0ZS1iYXNlbGluZS1hc3NldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFFbEQsdURBQWtEO0FBR2xELDRFQUF3RTtBQUN4RSw4Q0FBc0M7QUFDdEMsZ0RBQTRDO0FBTzVDLElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTZCLFNBQVEsd0JBQVU7SUFrQjFELFlBQ1UsRUFBZSxFQUNOLGtCQUFzQyxFQUN0QyxpQkFBb0MsRUFDcEMsbUJBQXdDLEVBQ3hDLFVBQXNCO1FBR3ZDLEtBQUssRUFBRSxDQUFDO1FBUEEsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNOLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGVBQVUsR0FBVixVQUFVLENBQVk7UUF0QmhDLG1CQUFjLEdBQUcsRUFBRSxXQUFXLEVBQVgsa0NBQVcsRUFBRSxNQUFNLEVBQU4sNkJBQU0sRUFBRSxDQUFDO1FBRWxELGVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDO1FBQ2pELGNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1FBQy9DLHdCQUFtQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQztRQUNyRSxtQkFBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7UUFFL0MsbUJBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLDZCQUE2QjtRQUc5RSxTQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbkIsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUN6QixhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQzFCLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQzthQUN0QixDQUFDLENBQUMsaURBQWlEO1NBQ3JELENBQUMsQ0FBQztRQVlELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRXBFLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUM1SCxJQUFJLE9BQU8sR0FBUSxFQUFFLENBQUM7UUFFdEIsT0FBTyxtQ0FDRixPQUFPLEtBQ1YsSUFBSTtZQUNKLFdBQVc7WUFDWCxNQUFNLEVBQ04sYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQzNFLGFBQWEsRUFDYixhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFDMUIsYUFBYSxHQUNkLENBQUM7UUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUcsQ0FBQztDQUVGLENBQUE7QUFqRFksNEJBQTRCO0lBTHhDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsMkJBQTJCO1FBQ3JDLFdBQVcsRUFBRSx3Q0FBd0M7UUFDckQsU0FBUyxFQUFFLENBQUMsd0NBQXdDLENBQUM7S0FDdEQsQ0FBQztHQUNXLDRCQUE0QixDQWlEeEM7QUFqRFksb0VBQTRCIn0=