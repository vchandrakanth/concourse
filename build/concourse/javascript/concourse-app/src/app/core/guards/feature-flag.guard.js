"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
let FeatureFlagGuard = class FeatureFlagGuard {
    constructor(router, featureFlagFacade) {
        this.router = router;
        this.featureFlagFacade = featureFlagFacade;
        this.combinedFeatures$ = this.featureFlagFacade.combinedFeatures$;
    }
    canActivate(snapShot) {
        const { featureFlag } = snapShot.routeConfig.data;
        let options = {
            allow: true,
            flag: ''
        };
        if (helpers_1.Util.isUndefined(featureFlag)) {
            throw new Error('must specify feature');
        }
        if (helpers_1.Util.isString(featureFlag)) {
            options = Object.assign(Object.assign({}, options), { flag: featureFlag });
        }
        else {
            options = Object.assign(Object.assign({}, options), featureFlag);
        }
        return this.combinedFeatures$.pipe(operators_1.filter(features => features.includes(options.flag)), operators_1.map(features => options.allow && features.length !== 0), operators_1.tap(hasFeature => {
            if (!hasFeature) {
                this.router.navigateByUrl('dashboard');
            }
        }));
    }
};
FeatureFlagGuard = __decorate([
    core_1.Injectable()
], FeatureFlagGuard);
exports.FeatureFlagGuard = FeatureFlagGuard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1mbGFnLmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvZ3VhcmRzL2ZlYXR1cmUtZmxhZy5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQVEzQyw4Q0FBa0Q7QUFFbEQsdURBQWlEO0FBU2pELElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBRzNCLFlBQ21CLE1BQWMsRUFDZCxpQkFBb0M7UUFEcEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFKdkQsc0JBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDO0lBS3pELENBQUM7SUFFTCxXQUFXLENBQUMsUUFBZ0M7UUFDMUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ2xELElBQUksT0FBTyxHQUF1QjtZQUNoQyxLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxFQUFFO1NBQ1QsQ0FBQztRQUNGLElBQUksY0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDekM7UUFDRCxJQUFJLGNBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDOUIsT0FBTyxtQ0FDRixPQUFPLEtBQ1YsSUFBSSxFQUFFLFdBQVcsR0FDbEIsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLG1DQUNGLE9BQU8sR0FDUCxXQUFXLENBQ2YsQ0FBQztTQUNIO1FBQ0QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUNoQyxrQkFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDbkQsZUFBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUN2RCxlQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBdENZLGdCQUFnQjtJQUQ1QixpQkFBVSxFQUFFO0dBQ0EsZ0JBQWdCLENBc0M1QjtBQXRDWSw0Q0FBZ0IifQ==