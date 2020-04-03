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
const institution_data_service_1 = require("./services/institution-data.service");
const institution_data_effects_1 = require("./state/institution-data.effects");
const institution_data_facade_1 = require("./state/institution-data.facade");
const fromInstitutionData = require("./state/institution-data.reducer");
let InstitutionDataStoreModule = class InstitutionDataStoreModule {
};
InstitutionDataStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.InstitutionData, fromInstitutionData.reducer),
            effects_1.EffectsModule.forFeature([institution_data_effects_1.InstitutionDataEffects])
        ],
        providers: [institution_data_service_1.InstitutionDataService, institution_data_facade_1.InstitutionDataFacade]
    })
], InstitutionDataStoreModule);
exports.InstitutionDataStoreModule = InstitutionDataStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tZGF0YS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvaW5zdGl0dXRpb24tZGF0YS9pbnN0aXR1dGlvbi1kYXRhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCxrRkFBNkU7QUFDN0UsK0VBQTBFO0FBQzFFLDZFQUF3RTtBQUN4RSx3RUFBd0U7QUFTeEUsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7Q0FBSSxDQUFBO0FBQTlCLDBCQUEwQjtJQVB0QyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7WUFDL0UsdUJBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxpREFBc0IsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsU0FBUyxFQUFFLENBQUMsaURBQXNCLEVBQUUsK0NBQXFCLENBQUM7S0FDM0QsQ0FBQztHQUNXLDBCQUEwQixDQUFJO0FBQTlCLGdFQUEwQiJ9