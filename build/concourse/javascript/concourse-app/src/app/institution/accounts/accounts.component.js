"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const create_aws_account_component_1 = require("@concourse/core/modal/components/create-aws-account/create-aws-account.component");
const update_aws_account_component_1 = require("@concourse/core/modal/components/update-aws-account/update-aws-account.component");
const faAws_1 = require("@fortawesome/free-brands-svg-icons/faAws");
let AccountsComponent = class AccountsComponent {
    constructor(modalFacade, awsAccountFacade) {
        this.modalFacade = modalFacade;
        this.awsAccountFacade = awsAccountFacade;
        this.awsAccounts$ = this.awsAccountFacade.list$;
        this.icons = { faAws: faAws_1.faAws };
    }
    onNewAWSAccount() {
        this.modalFacade.openModal({ component: create_aws_account_component_1.CreateAwsAccountComponent, id: 'create-aws-modal' });
    }
    onEditAWSAccount(account) {
        this.modalFacade.openModal({
            component: update_aws_account_component_1.UpdateAwsAccountComponent,
            id: 'update-aws-modal',
            options: {
                initialState: {
                    account
                }
            }
        });
    }
    onDeleteAWSAccount(account) {
        this.modalFacade.confirmDeleteModal(account.name, account.name, () => this.awsAccountFacade.delete(account.id));
    }
};
AccountsComponent = __decorate([
    core_1.Component({
        selector: 'app-accounts',
        templateUrl: './accounts.component.html',
        styleUrls: ['./accounts.component.scss']
    })
], AccountsComponent);
exports.AccountsComponent = AccountsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2luc3RpdHV0aW9uL2FjY291bnRzL2FjY291bnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFrRDtBQUlsRCxtSUFBNkg7QUFDN0gsbUlBQTZIO0FBRzdILG9FQUFpRTtBQU9qRSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUs1QixZQUNVLFdBQTZCLEVBQzdCLGdCQUFrQztRQURsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQU41QyxpQkFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7UUFFbEMsVUFBSyxHQUFHLEVBQUUsS0FBSyxFQUFMLGFBQUssRUFBRSxDQUFDO0lBS3ZCLENBQUM7SUFFTCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsd0RBQXlCLEVBQUUsRUFBRSxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsT0FBTztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsd0RBQXlCO1lBQ3BDLEVBQUUsRUFBRSxrQkFBa0I7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLFlBQVksRUFBRTtvQkFDWixPQUFPO2lCQUNSO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsT0FBTztRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUNqQyxPQUFPLENBQUMsSUFBSSxFQUNaLE9BQU8sQ0FBQyxJQUFJLEVBQ1osR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQy9DLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQWpDWSxpQkFBaUI7SUFMN0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSwyQkFBMkI7UUFDeEMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7S0FDekMsQ0FBQztHQUNXLGlCQUFpQixDQWlDN0I7QUFqQ1ksOENBQWlCIn0=