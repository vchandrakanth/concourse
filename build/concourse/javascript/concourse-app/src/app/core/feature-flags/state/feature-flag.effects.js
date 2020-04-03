"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const feature_flag_actions_1 = require("./feature-flag.actions");
let FeatureFlagEffects = class FeatureFlagEffects {
    constructor(actions$, featureFlagApi) {
        this.actions$ = actions$;
        this.featureFlagApi = featureFlagApi;
        this.loadAllFeatures$ = this.actions$.pipe(effects_1.ofType(feature_flag_actions_1.FeatureFlagTypes.LoadAllFeatures), operators_2.mergeMap(_ => [
            new feature_flag_actions_1.LoadFeatures(),
            new feature_flag_actions_1.LoadInstitutionFeatures()
        ]));
        this.loadFeatures$ = this.actions$.pipe(effects_1.ofType(feature_flag_actions_1.FeatureFlagTypes.LoadFeatures), operators_2.switchMap(_ => this.featureFlagApi.listFeatures().pipe(operators_2.map(data => new feature_flag_actions_1.LoadFeaturesSuccess(data)), operators_1.handleError('toast', new feature_flag_actions_1.LoadFeaturesFailure()))));
        this.loadInstitutionFeatures$ = this.actions$.pipe(effects_1.ofType(feature_flag_actions_1.FeatureFlagTypes.LoadInstitutionFeatures), operators_2.switchMap(_ => this.featureFlagApi.listInstitutionFeatures().pipe(operators_2.map(data => new feature_flag_actions_1.LoadInstitutionFeaturesSuccess(data)), operators_1.handleError('toast', new feature_flag_actions_1.LoadInstitutionFeaturesFailure()))));
    }
};
__decorate([
    effects_1.Effect()
], FeatureFlagEffects.prototype, "loadAllFeatures$", void 0);
__decorate([
    effects_1.Effect()
], FeatureFlagEffects.prototype, "loadFeatures$", void 0);
__decorate([
    effects_1.Effect()
], FeatureFlagEffects.prototype, "loadInstitutionFeatures$", void 0);
FeatureFlagEffects = __decorate([
    core_1.Injectable()
], FeatureFlagEffects);
exports.FeatureFlagEffects = FeatureFlagEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1mbGFnLmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9mZWF0dXJlLWZsYWdzL3N0YXRlL2ZlYXR1cmUtZmxhZy5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBd0Q7QUFFeEQsOENBQTBEO0FBRzFELGlFQVFnQztBQUdoQyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQThCN0IsWUFDbUIsUUFBaUIsRUFDakIsY0FBa0M7UUFEbEMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUE5QjNDLHFCQUFnQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDakUsZ0JBQU0sQ0FBQyx1Q0FBZ0IsQ0FBQyxlQUFlLENBQUMsRUFDeEMsb0JBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ1osSUFBSSxtQ0FBWSxFQUFFO1lBQ2xCLElBQUksOENBQXVCLEVBQUU7U0FDOUIsQ0FBQyxDQUNILENBQUM7UUFFUSxrQkFBYSxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDOUQsZ0JBQU0sQ0FBQyx1Q0FBZ0IsQ0FBQyxZQUFZLENBQUMsRUFDckMscUJBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUNyQyxlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLDBDQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzFDLHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksMENBQW1CLEVBQUUsQ0FBQyxDQUNoRCxDQUNGLENBQ0YsQ0FBQztRQUVRLDZCQUF3QixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDekUsZ0JBQU0sQ0FBQyx1Q0FBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxFQUNoRCxxQkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLElBQUksQ0FDaEQsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxxREFBOEIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNyRCx1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLHFEQUE4QixFQUFFLENBQUMsQ0FDM0QsQ0FDRixDQUNGLENBQUM7SUFLRSxDQUFDO0NBQ04sQ0FBQTtBQWhDVztJQUFULGdCQUFNLEVBQUU7NERBTVA7QUFFUTtJQUFULGdCQUFNLEVBQUU7eURBUVA7QUFFUTtJQUFULGdCQUFNLEVBQUU7b0VBUVA7QUE1QlMsa0JBQWtCO0lBRDlCLGlCQUFVLEVBQUU7R0FDQSxrQkFBa0IsQ0FrQzlCO0FBbENZLGdEQUFrQiJ9