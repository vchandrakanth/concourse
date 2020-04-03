"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const shared_module_1 = require("@concourse/shared/shared.module");
const institutions_routing_module_1 = require("./institutions-routing.module");
const list_inst_component_1 = require("./list-inst/list-inst.component");
const view_inst_component_1 = require("./view-inst/view-inst.component");
let InstitutionsModule = class InstitutionsModule {
};
InstitutionsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            angular_fontawesome_1.FontAwesomeModule,
            shared_module_1.SharedModule,
            institutions_routing_module_1.InstitutionsRoutingModule
        ],
        declarations: [list_inst_component_1.ListInstComponent, view_inst_component_1.ViewInstComponent]
    })
], InstitutionsModule);
exports.InstitutionsModule = InstitutionsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb25zLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb25jb3Vyc2UtYWRtaW4vaW5zdGl0dXRpb25zL2luc3RpdHV0aW9ucy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSw0Q0FBK0M7QUFDL0Msd0NBQXlDO0FBQ3pDLDBFQUFxRTtBQUVyRSxtRUFBK0Q7QUFFL0QsK0VBQTBFO0FBQzFFLHlFQUFvRTtBQUNwRSx5RUFBb0U7QUFXcEUsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7Q0FBSSxDQUFBO0FBQXRCLGtCQUFrQjtJQVQ5QixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxxQkFBWTtZQUNaLHVDQUFpQjtZQUNqQiw0QkFBWTtZQUNaLHVEQUF5QjtTQUMxQjtRQUNELFlBQVksRUFBRSxDQUFDLHVDQUFpQixFQUFFLHVDQUFpQixDQUFDO0tBQ3JELENBQUM7R0FDVyxrQkFBa0IsQ0FBSTtBQUF0QixnREFBa0IifQ==