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
const institution_service_1 = require("./services/institution.service");
const institution_effects_1 = require("./state/institution.effects");
const institution_facade_1 = require("./state/institution.facade");
const fromInstitution = require("./state/institution.reducer");
let InstitutionStoreModule = class InstitutionStoreModule {
};
InstitutionStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.Institution, fromInstitution.reducer),
            effects_1.EffectsModule.forFeature([institution_effects_1.InstitutionEffects])
        ],
        providers: [institution_service_1.InstitutionService, institution_facade_1.InstitutionFacade]
    })
], InstitutionStoreModule);
exports.InstitutionStoreModule = InstitutionStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2luc3RpdHV0aW9uL2luc3RpdHV0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCx3RUFBb0U7QUFDcEUscUVBQWlFO0FBQ2pFLG1FQUErRDtBQUMvRCwrREFBK0Q7QUFTL0QsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7Q0FBSSxDQUFBO0FBQTFCLHNCQUFzQjtJQVBsQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsT0FBTyxDQUFDO1lBQ3ZFLHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsd0NBQWtCLENBQUMsQ0FBQztTQUMvQztRQUNELFNBQVMsRUFBRSxDQUFDLHdDQUFrQixFQUFFLHNDQUFpQixDQUFDO0tBQ25ELENBQUM7R0FDVyxzQkFBc0IsQ0FBSTtBQUExQix3REFBc0IifQ==