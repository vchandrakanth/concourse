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
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const style_guide_routing_module_1 = require("./style-guide-routing.module");
const style_guide_component_1 = require("./style-guide/style-guide.component");
const shared_module_1 = require("@concourse/shared/shared.module");
let StyleGuideModule = class StyleGuideModule {
};
StyleGuideModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            dynamic_form_1.DynamicFormModule,
            angular_fontawesome_1.FontAwesomeModule,
            shared_module_1.SharedModule,
            style_guide_routing_module_1.StyleGuideRoutingModule
        ],
        declarations: [style_guide_component_1.StyleGuideComponent]
    })
], StyleGuideModule);
exports.StyleGuideModule = StyleGuideModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtZ3VpZGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0eWxlLWd1aWRlL3N0eWxlLWd1aWRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFDekMsaUVBQW1FO0FBQ25FLDBFQUFxRTtBQUNyRSw2RUFBdUU7QUFDdkUsK0VBQTBFO0FBQzFFLG1FQUErRDtBQVkvRCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtDQUFJLENBQUE7QUFBcEIsZ0JBQWdCO0lBVjVCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHFCQUFZO1lBQ1osZ0NBQWlCO1lBQ2pCLHVDQUFpQjtZQUNqQiw0QkFBWTtZQUNaLG9EQUF1QjtTQUN4QjtRQUNELFlBQVksRUFBRSxDQUFDLDJDQUFtQixDQUFDO0tBQ3BDLENBQUM7R0FDVyxnQkFBZ0IsQ0FBSTtBQUFwQiw0Q0FBZ0IifQ==