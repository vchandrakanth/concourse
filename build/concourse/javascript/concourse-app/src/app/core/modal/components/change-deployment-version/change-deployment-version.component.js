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
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const operators_1 = require("rxjs/operators");
let ChangeDeploymentVersionComponent = class ChangeDeploymentVersionComponent {
    constructor(fb, versionText, assetFacade, logicalDeploymentFacade, policyViolationFacade) {
        this.fb = fb;
        this.versionText = versionText;
        this.assetFacade = assetFacade;
        this.logicalDeploymentFacade = logicalDeploymentFacade;
        this.policyViolationFacade = policyViolationFacade;
        this.logicalDeployment$ = this.logicalDeploymentFacade.selectedWithRelated$;
        this.enclaveModelEvaluationResponse$ = this.policyViolationFacade.savedModelEvaluation$;
        this.isEvaluationPending$ = this.policyViolationFacade.isEvaluationPending$;
        this.assets$ = this.assetFacade.assetListByLineageId$.pipe(operators_1.filter(assets => !!assets.length), operators_1.map(assets => assets.map(item => ({
            id: item.id,
            label: `${item.name} (${this.versionText.transform(item)})`,
            current: item.majorVersion === this.currentModel.majorVersion && item.minorVersion === this.currentModel.minorVersion
        }))));
        this.form = this.fb.group({
            generalInfo: this.fb.group({
                modelId: [undefined, forms_1.Validators.required]
            }),
            eval: this.fb.group({})
        });
        this.icons = { faTimes: faTimes_1.faTimes };
    }
    get modelIdControl() {
        return this.form.get('generalInfo.modelId');
    }
    ngOnInit() {
        if (!!this.currentModel) {
            this.modelIdControl.setValue(this.currentModel.id);
        }
    }
    stepEvent(step, logicalDeployment) {
        if (step.formGroupName === 'eval') {
            this.policyViolationFacade.evaluateSavedEnclaveModel(this.modelIdControl.value, logicalDeployment.surfaceLayerId);
        }
    }
    submit(logicalDeployment) {
        if (this.form.valid) {
            this.logicalDeploymentFacade.updateModelVersion(logicalDeployment.copyWith({ modelId: this.modelIdControl.value }));
        }
    }
};
ChangeDeploymentVersionComponent = __decorate([
    core_1.Component({
        selector: 'app-change-deployment-version',
        templateUrl: './change-deployment-version.component.html',
        styleUrls: ['./change-deployment-version.component.scss']
    })
], ChangeDeploymentVersionComponent);
exports.ChangeDeploymentVersionComponent = ChangeDeploymentVersionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLWRlcGxveW1lbnQtdmVyc2lvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2NoYW5nZS1kZXBsb3ltZW50LXZlcnNpb24vY2hhbmdlLWRlcGxveW1lbnQtdmVyc2lvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFDbEQsMENBQTBFO0FBQzFFLHVFQUFvRTtBQUVwRSw4Q0FBNkM7QUFZN0MsSUFBYSxnQ0FBZ0MsR0FBN0MsTUFBYSxnQ0FBZ0M7SUE0QjNDLFlBQ21CLEVBQWUsRUFDZixXQUE0QixFQUM1QixXQUF3QixFQUN4Qix1QkFBZ0QsRUFDaEQscUJBQTRDO1FBSjVDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBOUIvRCx1QkFBa0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLENBQUM7UUFDdkUsb0NBQStCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHFCQUFxQixDQUFDO1FBQ25GLHlCQUFvQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUN2RSxZQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQ25ELGtCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUNqQyxlQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQzNELE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZO1NBQ3RILENBQUMsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUVGLFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzthQUMxQyxDQUFDO1lBQ0YsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUN4QixDQUFDLENBQUM7UUFNTSxVQUFLLEdBQUcsRUFBRSxPQUFPLEVBQVAsaUJBQU8sRUFBRSxDQUFDO0lBUXpCLENBQUM7SUFaTCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFZRCxRQUFRO1FBQ04sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFlLEVBQUUsaUJBQW9DO1FBQzdELElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxNQUFNLEVBQUU7WUFDakMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ25IO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxpQkFBb0M7UUFDekMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNuQixJQUFJLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQzdDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQ25FLENBQUM7U0FDSDtJQUNILENBQUM7Q0FDRixDQUFBO0FBdkRZLGdDQUFnQztJQUw1QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLCtCQUErQjtRQUN6QyxXQUFXLEVBQUUsNENBQTRDO1FBQ3pELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxDQUFDO0tBQzFELENBQUM7R0FDVyxnQ0FBZ0MsQ0F1RDVDO0FBdkRZLDRFQUFnQyJ9