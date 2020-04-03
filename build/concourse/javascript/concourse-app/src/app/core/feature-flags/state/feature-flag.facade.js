"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const query = require("./feature-flag.selectors");
let FeatureFlagFacade = class FeatureFlagFacade {
    constructor(store) {
        this.store = store;
        this.features$ = this.store.pipe(store_1.select(query.getFeatures));
        this.institutionFeatures$ = this.store.pipe(store_1.select(query.getInstitutionFeatures));
        this.combinedFeatures$ = this.store.pipe(store_1.select(query.getCombinedFeatures));
    }
};
FeatureFlagFacade = __decorate([
    core_1.Injectable()
], FeatureFlagFacade);
exports.FeatureFlagFacade = FeatureFlagFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1mbGFnLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2ZlYXR1cmUtZmxhZ3Mvc3RhdGUvZmVhdHVyZS1mbGFnLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsa0RBQWtEO0FBR2xELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBSzVCLFlBQ21CLEtBQW1CO1FBQW5CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFMdEMsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RCx5QkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUM3RSxzQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztJQUluRSxDQUFDO0NBRU4sQ0FBQTtBQVRZLGlCQUFpQjtJQUQ3QixpQkFBVSxFQUFFO0dBQ0EsaUJBQWlCLENBUzdCO0FBVFksOENBQWlCIn0=