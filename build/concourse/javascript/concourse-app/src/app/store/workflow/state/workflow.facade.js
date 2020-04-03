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
const workflow_actions_1 = require("./workflow.actions");
const query = require("./workflow.selectors");
let WorkflowFacade = class WorkflowFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getSelected));
        this.owned$ = this.store.pipe(store_1.select(query.getOwned));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
        this.filteredBy$ = this.store.pipe(store_1.select(query.getSelectedType));
        this.summary$ = this.store.pipe(store_1.select(query.getSummary));
    }
    getByType(workflowTypes) {
        if (!Array.isArray(workflowTypes)) {
            workflowTypes = [workflowTypes];
        }
        this.store.dispatch(new workflow_actions_1.LoadWorkflowSummariesByType(workflowTypes));
    }
    search(searchText) {
        this.store.dispatch(new workflow_actions_1.SearchWorkflowSummaries(searchText));
    }
    resetSearch() {
        this.store.dispatch(new workflow_actions_1.ResetWorkflowSummariesSearchResults());
    }
    filterByType(type) {
        this.store.dispatch(new workflow_actions_1.FilterWorkflowSummariesByType(type));
    }
};
WorkflowFacade = __decorate([
    core_1.Injectable()
], WorkflowFacade);
exports.WorkflowFacade = WorkflowFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3cuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3dvcmtmbG93L3N0YXRlL3dvcmtmbG93LmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMseURBSzRCO0FBRTVCLDhDQUE4QztBQUc5QyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBUXpCLFlBQ21CLEtBQW1CO1FBQW5CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFSdEMsVUFBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNuRCxXQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2pELGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDM0QsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDN0QsYUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUlqRCxDQUFDO0lBRUwsU0FBUyxDQUFDLGFBQTRDO1FBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ2pDLGFBQWEsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSw4Q0FBMkIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBa0I7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwwQ0FBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxzREFBbUMsRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksZ0RBQTZCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0YsQ0FBQTtBQTlCWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7R0FDQSxjQUFjLENBOEIxQjtBQTlCWSx3Q0FBYyJ9