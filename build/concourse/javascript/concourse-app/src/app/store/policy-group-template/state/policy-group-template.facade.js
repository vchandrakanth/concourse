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
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const selectors_1 = require("@concourse/store/selectors");
const policy_group_template_actions_1 = require("./policy-group-template.actions");
const query = require("./policy-group-template.selectors");
let PolicyGroupTemplateFacade = class PolicyGroupTemplateFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(selectors_1.getAllPolicyGroupTemplatesWithRelated));
        this.publishedList$ = this.store.pipe(store_1.select(selectors_1.getPolicyGroupTemplatesByStatusWithRelated, { status: 'PUBLISHED' }));
        this.selectedWithRelated$ = this.store.pipe(store_1.select(selectors_1.getPolicyGroupTemplateWithRelated));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.hasNextLink$ = this.store.pipe(store_1.select(query.hasNextLink));
    }
    delete(policyGroupTemplate) {
        this.store.dispatch(new policy_group_template_actions_1.DeletePolicyGroupTemplate(policyGroupTemplate.id));
    }
    removePolicyTemplateFromPolicyGroupTemplate(policyGroupTemplateId, policyTemplateId) {
        this.store.dispatch(new policy_group_template_actions_1.RemovePolicyTemplateFromPolicyGroupTemplate({ policyGroupTemplateId, policyTemplateId }));
    }
    updateDetails(policyGroupTemplate, versionBump) {
        this.store.dispatch(new policy_group_template_actions_1.UpdatePolicyGroupTemplate({ newPolicyGroupTemplate: policyGroupTemplate, versionBump }));
    }
    search(name) {
        this.store.dispatch(new policy_group_template_actions_1.SearchPolicyGroupTemplate(name));
    }
    create(policyGroupTemplate, versionBump) {
        this.store.dispatch(new policy_group_template_actions_1.CreatePolicyGroupTemplate({ newPgt: policyGroupTemplate, versionBump }));
    }
    resetSearch() {
        this.store.dispatch(new policy_group_template_actions_1.ResetPolicyGroupTemplateResults());
    }
    updatePolicyTemplates(pgt) {
        this.store.dispatch(new policy_group_template_actions_1.UpdatePolicyTemplates(pgt));
    }
    openToaster(message) {
        this.store.dispatch(new toast_actions_1.OpenToast({ message, type: 'warning' }));
    }
    getPaginatedList(page, size) {
        this.store.dispatch(new policy_group_template_actions_1.LoadPolicyGroupTemplatesByPagination({ page: page.toString(), size: size.toString() }));
    }
};
PolicyGroupTemplateFacade = __decorate([
    core_1.Injectable()
], PolicyGroupTemplateFacade);
exports.PolicyGroupTemplateFacade = PolicyGroupTemplateFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktZ3JvdXAtdGVtcGxhdGUvc3RhdGUvcG9saWN5LWdyb3VwLXRlbXBsYXRlLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsdUVBQWdFO0FBRWhFLDBEQUlvQztBQUNwQyxtRkFTeUM7QUFFekMsMkRBQTJEO0FBRzNELElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBUXBDLFlBQ21CLEtBQW1CO1FBQW5CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFSdEMsVUFBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxpREFBcUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsbUJBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsc0RBQTBDLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlHLHlCQUFvQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyw2Q0FBaUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDM0QsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RCxpQkFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUl0RCxDQUFDO0lBRUwsTUFBTSxDQUFDLG1CQUF3QztRQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHlEQUF5QixDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELDJDQUEyQyxDQUFDLHFCQUE2QixFQUFFLGdCQUF3QjtRQUNqRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDJFQUEyQyxDQUFDLEVBQUUscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUVELGFBQWEsQ0FBQyxtQkFBaUQsRUFBRSxXQUF3QjtRQUN2RixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHlEQUF5QixDQUFDLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25ILENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWTtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHlEQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELE1BQU0sQ0FBQyxtQkFBaUQsRUFBRSxXQUF3QjtRQUNoRixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHlEQUF5QixDQUFDLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksK0RBQStCLEVBQUUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxHQUFpQztRQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHFEQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFlO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUkseUJBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsSUFBWTtRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLG9FQUFvQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2pILENBQUM7Q0FDRixDQUFBO0FBL0NZLHlCQUF5QjtJQURyQyxpQkFBVSxFQUFFO0dBQ0EseUJBQXlCLENBK0NyQztBQS9DWSw4REFBeUIifQ==