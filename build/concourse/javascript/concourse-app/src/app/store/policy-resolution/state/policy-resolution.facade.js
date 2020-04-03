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
const selectors_1 = require("@concourse/store/selectors");
const policy_resolution_actions_1 = require("./policy-resolution.actions");
const query = require("./policy-resolution.selectors");
let PolicyResolutionFacade = class PolicyResolutionFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.selected$ = this.store.pipe(store_1.select(selectors_1.getSelectedPolicyViolationWithRelated));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
    }
    post(policyResolutionId, resolutionAction) {
        this.store.dispatch(new policy_resolution_actions_1.PostActionForPolicyResolution({ policyResolutionId, resolutionAction }));
    }
};
PolicyResolutionFacade = __decorate([
    core_1.Injectable()
], PolicyResolutionFacade);
exports.PolicyResolutionFacade = PolicyResolutionFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXJlc29sdXRpb24uZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3BvbGljeS1yZXNvbHV0aW9uL3N0YXRlL3BvbGljeS1yZXNvbHV0aW9uLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsMERBQW1GO0FBRW5GLDJFQUVxQztBQUVyQyx1REFBdUQ7QUFHdkQsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFNakMsWUFDbUIsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQU50QyxVQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlDLGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsaURBQXFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFJdkQsQ0FBQztJQUVMLElBQUksQ0FBQyxrQkFBMEIsRUFBRSxnQkFBMkM7UUFDMUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSx5REFBNkIsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7Q0FDRixDQUFBO0FBYlksc0JBQXNCO0lBRGxDLGlCQUFVLEVBQUU7R0FDQSxzQkFBc0IsQ0FhbEM7QUFiWSx3REFBc0IifQ==