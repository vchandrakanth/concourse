"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ResourceTimelineComponent = class ResourceTimelineComponent {
    constructor() {
        this.onSelectResource = new core_1.EventEmitter();
    }
    onClickResource(resource) {
        this.onSelectResource.emit(resource);
    }
};
__decorate([
    core_1.Input()
], ResourceTimelineComponent.prototype, "selectedResource", void 0);
__decorate([
    core_1.Input()
], ResourceTimelineComponent.prototype, "resources", void 0);
__decorate([
    core_1.Output()
], ResourceTimelineComponent.prototype, "onSelectResource", void 0);
ResourceTimelineComponent = __decorate([
    core_1.Component({
        selector: 'app-resource-timeline',
        templateUrl: './resource-timeline.component.html',
        styleUrls: ['./resource-timeline.component.scss']
    })
], ResourceTimelineComponent);
exports.ResourceTimelineComponent = ResourceTimelineComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtdGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3dvcmtmbG93cy9zaGFyZWQvcmVzb3VyY2UtdGltZWxpbmUvcmVzb3VyY2UtdGltZWxpbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXVFO0FBT3ZFLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBQXRDO1FBSXFCLHFCQUFnQixHQUFHLElBQUksbUJBQVksRUFBTyxDQUFDO0lBTWhFLENBQUM7SUFKQyxlQUFlLENBQUMsUUFBUTtRQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Q0FFRixDQUFBO0FBUlU7SUFBUixZQUFLLEVBQUU7bUVBQWtCO0FBQ2pCO0lBQVIsWUFBSyxFQUFFOzREQUFXO0FBQ1Q7SUFBVCxhQUFNLEVBQUU7bUVBQXFEO0FBSm5ELHlCQUF5QjtJQUxyQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0tBQ2xELENBQUM7R0FDVyx5QkFBeUIsQ0FVckM7QUFWWSw4REFBeUIifQ==