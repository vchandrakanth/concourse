"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faPlus_1 = require("@fortawesome/free-solid-svg-icons/faPlus");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const modal_1 = require("@concourse/core/modal");
const search_actions_component_1 = require("@concourse/shared/components/search-actions/search-actions.component");
let PolicyGroupTemplateListComponent = class PolicyGroupTemplateListComponent {
    constructor(modalFacade, policyGroupTemplateFacade) {
        this.modalFacade = modalFacade;
        this.policyGroupTemplateFacade = policyGroupTemplateFacade;
        this.policyGroupTemplates$ = this.policyGroupTemplateFacade.list$;
        this.selectedPolicyGroupTemplate$ = this.policyGroupTemplateFacade.selectedWithRelated$;
        this.isUpdating$ = this.policyGroupTemplateFacade.isUpdating$;
        this.isLoaded$ = this.policyGroupTemplateFacade.isLoaded$;
        this.hasNextLink$ = this.policyGroupTemplateFacade.hasNextLink$;
        this.page = 0;
        this.icons = { faPlus: faPlus_1.faPlus };
    }
    ngOnInit() {
        this.searchComponent.searchField.valueChanges.pipe(operators_2.filter(s => s.length > 2 || s.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
            this.policyGroupTemplateFacade.resetSearch();
            if (searchText.length) {
                this.policyGroupTemplateFacade.search(searchText);
            }
        });
    }
    ngOnDestroy() {
        this.policyGroupTemplateFacade.resetSearch();
    }
    trackItems(_index, pgt) {
        return pgt.id;
    }
    newPolicyGroupTemplateModal() {
        this.modalFacade.openModal({
            component: modal_1.CreatePolicyGroupTemplateComponent,
            id: 'create-policy-group-template'
        });
    }
    onScrollEnd(hasNextLink, isLoaded) {
        if (hasNextLink && isLoaded) {
            this.page++;
            this.policyGroupTemplateFacade.getPaginatedList(this.page, 200);
        }
    }
};
__decorate([
    core_1.ViewChild(search_actions_component_1.SearchActionsComponent)
], PolicyGroupTemplateListComponent.prototype, "searchComponent", void 0);
PolicyGroupTemplateListComponent = __decorate([
    core_1.Component({
        selector: 'app-policy-group-template-list',
        templateUrl: './policy-group-template-list.component.html',
        styleUrls: ['./policy-group-template-list.component.scss']
    })
], PolicyGroupTemplateListComponent);
exports.PolicyGroupTemplateListComponent = PolicyGroupTemplateListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3BvbGljeS1ncm91cC10ZW1wbGF0ZS9wb2xpY3ktZ3JvdXAtdGVtcGxhdGUtbGlzdC9wb2xpY3ktZ3JvdXAtdGVtcGxhdGUtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBd0U7QUFDeEUscUVBQWtFO0FBRWxFLHlEQUF5RDtBQUN6RCw4Q0FBc0Q7QUFFdEQsaURBQTJFO0FBRTNFLG1IQUFvSTtBQVFwSSxJQUFhLGdDQUFnQyxHQUE3QyxNQUFhLGdDQUFnQztJQVUzQyxZQUNtQixXQUE2QixFQUM3Qix5QkFBb0Q7UUFEcEQsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFWdkUsMEJBQXFCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQztRQUM3RCxpQ0FBNEIsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsb0JBQW9CLENBQUM7UUFDbkYsZ0JBQVcsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDO1FBQ3pELGNBQVMsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDO1FBQ3JELGlCQUFZLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQztRQUMzRCxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ0EsVUFBSyxHQUFHLEVBQUUsTUFBTSxFQUFOLGVBQU0sRUFBRSxDQUFDO0lBS3hCLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDaEQsa0JBQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQzNDLHdCQUFZLENBQUMsK0NBQW9CLENBQUMsRUFDbEMsd0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FDbkIsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzdDLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNuRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFjLEVBQUUsR0FBd0I7UUFDakQsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwyQkFBMkI7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDekIsU0FBUyxFQUFFLDBDQUFrQztZQUM3QyxFQUFFLEVBQUUsOEJBQThCO1NBQ25DLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsV0FBb0IsRUFBRSxRQUFpQjtRQUNqRCxJQUFJLFdBQVcsSUFBSSxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLHlCQUF5QixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDakU7SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQWpEb0M7SUFBbEMsZ0JBQVMsQ0FBQyxpREFBc0IsQ0FBQzt5RUFBeUM7QUFEaEUsZ0NBQWdDO0lBTDVDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZ0NBQWdDO1FBQzFDLFdBQVcsRUFBRSw2Q0FBNkM7UUFDMUQsU0FBUyxFQUFFLENBQUMsNkNBQTZDLENBQUM7S0FDM0QsQ0FBQztHQUNXLGdDQUFnQyxDQWtENUM7QUFsRFksNEVBQWdDIn0=