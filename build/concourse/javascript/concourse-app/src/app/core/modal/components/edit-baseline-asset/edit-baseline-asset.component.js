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
const operators_1 = require("rxjs/operators");
const basic_modal_1 = require("../basic-modal");
let EditBaselineAssetComponent = class EditBaselineAssetComponent extends basic_modal_1.BasicModal {
    constructor(fb, policyGroupFacade, institutionDataFacade, baselineAssetFacade, attributeTagFacade) {
        super();
        this.fb = fb;
        this.policyGroupFacade = policyGroupFacade;
        this.institutionDataFacade = institutionDataFacade;
        this.baselineAssetFacade = baselineAssetFacade;
        this.attributeTagFacade = attributeTagFacade;
        this.isLoaded$ = this.baselineAssetFacade.isLoaded$;
        this.owningGroupOptions$ = this.policyGroupFacade.selectableOwningGroups$;
        this.attributeTags$ = this.attributeTagFacade.list$;
        this.selectedFieldValues$ = this.institutionDataFacade.selectedFieldValues$;
        this.selected$ = this.baselineAssetFacade.selected$.pipe(operators_1.tap((selected) => {
            this.form = this.fb.group({
                generalInfo: this.fb.group({
                    name: [selected.name],
                    description: [selected.description],
                    status: [selected.status],
                    owningGroupId: [selected.owningGroupId],
                    attributeTags: [selected.attributeTags.map(tag => tag.id)],
                    isConjunction: [selected.isConjunction]
                }) // Form Builder for general-details-controls-form
            });
        }));
    }
    onSubmit(selected) {
        const { name, description, status, owningGroupId, versionBump, attributeTags, isConjunction } = this.form.value.generalInfo;
        let reqBody = {};
        const baseline = Object.assign({}, this.baseline);
        reqBody = Object.assign(Object.assign(Object.assign({}, baseline), reqBody), { name,
            description,
            status, attributeTags: attributeTags ? attributeTags.map(at => ({ id: at })) : {}, isConjunction,
            owningGroupId, institutionId: selected.institutionId, version: selected.version });
        this.baselineAssetFacade.update(selected.id, helpers_1.clean(reqBody), status === 'PUBLISHED' ? versionBump : '');
    }
};
EditBaselineAssetComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-baseline-asset',
        templateUrl: './edit-baseline-asset.component.html',
        styleUrls: ['./edit-baseline-asset.component.scss']
    })
], EditBaselineAssetComponent);
exports.EditBaselineAssetComponent = EditBaselineAssetComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1iYXNlbGluZS1hc3NldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2VkaXQtYmFzZWxpbmUtYXNzZXQvZWRpdC1iYXNlbGluZS1hc3NldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFJMUMsdURBQWtEO0FBR2xELDhDQUFxQztBQUdyQyxnREFBNEM7QUFPNUMsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMkIsU0FBUSx3QkFBVTtJQTBCeEQsWUFDVSxFQUFlLEVBQ04saUJBQW9DLEVBQ3BDLHFCQUE0QyxFQUM1QyxtQkFBd0MsRUFDeEMsa0JBQXNDO1FBRXZELEtBQUssRUFBRSxDQUFDO1FBTkEsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNOLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUE3QnpELGNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1FBSy9DLHdCQUFtQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQztRQUNyRSxtQkFBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7UUFFL0MseUJBQW9CLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLG9CQUFvQixDQUFDO1FBQ3ZFLGNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDakQsZUFBRyxDQUFDLENBQUMsUUFBYSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDeEIsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29CQUN6QixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUNyQixXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO29CQUNuQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO29CQUN6QixhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO29CQUN2QyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDMUQsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztpQkFDeEMsQ0FBQyxDQUFDLGlEQUFpRDthQUNyRCxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBVUYsQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUF1QjtRQUM5QixNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQzVILElBQUksT0FBTyxHQUFRLEVBQUUsQ0FBQztRQUV0QixNQUFNLFFBQVEscUJBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1FBQ3RDLE9BQU8saURBQ0YsUUFBUSxHQUNSLE9BQU8sS0FDVixJQUFJO1lBQ0osV0FBVztZQUNYLE1BQU0sRUFDTixhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDekUsYUFBYTtZQUNiLGFBQWEsRUFDYixhQUFhLEVBQUUsUUFBUSxDQUFDLGFBQWEsRUFDckMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEdBQzFCLENBQUM7UUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsZUFBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUcsQ0FBQztDQUVGLENBQUE7QUF4RFksMEJBQTBCO0lBTHRDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUseUJBQXlCO1FBQ25DLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7S0FDcEQsQ0FBQztHQUNXLDBCQUEwQixDQXdEdEM7QUF4RFksZ0VBQTBCIn0=