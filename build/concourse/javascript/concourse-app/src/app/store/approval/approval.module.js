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
const approval_service_1 = require("./services/approval.service");
const approval_effects_1 = require("./state/approval.effects");
const approval_facade_1 = require("./state/approval.facade");
const fromApproval = require("./state/approval.reducer");
let ApprovalStoreModule = class ApprovalStoreModule {
};
ApprovalStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.Approval, fromApproval.reducer),
            effects_1.EffectsModule.forFeature([approval_effects_1.ApprovalEffects])
        ],
        providers: [approval_service_1.ApprovalService, approval_facade_1.ApprovalFacade]
    })
], ApprovalStoreModule);
exports.ApprovalStoreModule = ApprovalStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92YWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2FwcHJvdmFsL2FwcHJvdmFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCxrRUFBOEQ7QUFDOUQsK0RBQTJEO0FBQzNELDZEQUF5RDtBQUN6RCx5REFBeUQ7QUFTekQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7Q0FBSSxDQUFBO0FBQXZCLG1CQUFtQjtJQVAvQixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDO1lBQ2pFLHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsa0NBQWUsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsU0FBUyxFQUFFLENBQUMsa0NBQWUsRUFBRSxnQ0FBYyxDQUFDO0tBQzdDLENBQUM7R0FDVyxtQkFBbUIsQ0FBSTtBQUF2QixrREFBbUIifQ==