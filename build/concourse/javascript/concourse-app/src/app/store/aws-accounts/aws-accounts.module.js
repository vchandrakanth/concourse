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
const store_1 = require("@ngrx/store");
const enums_1 = require("@concourse/shared/enums");
const aws_accounts_service_1 = require("./services/aws-accounts.service");
const aws_account_effects_1 = require("./state/aws-account.effects");
const aws_account_facade_1 = require("./state/aws-account.facade");
const fromAwsAccounts = require("./state/aws-account.reducer");
let AwsAccountsStoreModule = class AwsAccountsStoreModule {
};
AwsAccountsStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.AwsAccount, fromAwsAccounts.reducer),
            effects_1.EffectsModule.forFeature([aws_account_effects_1.AwsAccountEffects])
        ],
        providers: [aws_accounts_service_1.AwsAccountsService, aws_account_facade_1.AwsAccountFacade]
    })
], AwsAccountsStoreModule);
exports.AwsAccountsStoreModule = AwsAccountsStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWFjY291bnRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hd3MtYWNjb3VudHMvYXdzLWFjY291bnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCwwRUFBcUU7QUFDckUscUVBQWdFO0FBQ2hFLG1FQUE4RDtBQUM5RCwrREFBK0Q7QUFVL0QsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7Q0FBSSxDQUFBO0FBQTFCLHNCQUFzQjtJQVJsQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsT0FBTyxDQUFDO1lBQ3RFLHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsdUNBQWlCLENBQUMsQ0FBQztTQUM5QztRQUNELFNBQVMsRUFBRSxDQUFDLHlDQUFrQixFQUFFLHFDQUFnQixDQUFDO0tBQ2xELENBQUM7R0FFVyxzQkFBc0IsQ0FBSTtBQUExQix3REFBc0IifQ==