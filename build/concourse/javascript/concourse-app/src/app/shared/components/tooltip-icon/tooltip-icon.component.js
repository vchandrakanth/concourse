"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faCircle_1 = require("@fortawesome/free-regular-svg-icons/faCircle");
const faInfo_1 = require("@fortawesome/free-solid-svg-icons/faInfo");
let TooltipIconComponent = class TooltipIconComponent {
    constructor() {
        this.tooltipContent = [];
        this.tooltipPlacement = 'top';
        this.icons = { faCircle: faCircle_1.faCircle, faInfo: faInfo_1.faInfo };
    }
    extractProperty(map) {
        const keys = map.split('.');
        const head = keys.shift();
        return keys.reduce((prop, key) => typeof prop !== 'undefined' && typeof prop[key] !== 'undefined' ? prop[key] : undefined, this.tooltipData[head || '']);
    }
};
__decorate([
    core_1.Input()
], TooltipIconComponent.prototype, "tooltipDescription", void 0);
__decorate([
    core_1.Input()
], TooltipIconComponent.prototype, "tooltipContent", void 0);
__decorate([
    core_1.Input()
], TooltipIconComponent.prototype, "tooltipData", void 0);
__decorate([
    core_1.Input()
], TooltipIconComponent.prototype, "tooltipPlacement", void 0);
TooltipIconComponent = __decorate([
    core_1.Component({
        selector: 'app-tooltip-icon',
        templateUrl: './tooltip-icon.component.html',
        styleUrls: ['./tooltip-icon.component.scss']
    })
], TooltipIconComponent);
exports.TooltipIconComponent = TooltipIconComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1pY29uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy90b29sdGlwLWljb24vdG9vbHRpcC1pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFpRDtBQUNqRCwyRUFBd0U7QUFDeEUscUVBQWtFO0FBU2xFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBQWpDO1FBRVcsbUJBQWMsR0FBcUIsRUFBRSxDQUFDO1FBRXRDLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixVQUFLLEdBQUcsRUFBRSxRQUFRLEVBQVIsbUJBQVEsRUFBRSxNQUFNLEVBQU4sZUFBTSxFQUFFLENBQUM7SUFXeEMsQ0FBQztJQVRDLGVBQWUsQ0FBQyxHQUFXO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQVMsRUFBRSxHQUFXLEVBQUUsRUFBRSxDQUM1QyxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FDdEgsQ0FBQztJQUNKLENBQUM7Q0FFRixDQUFBO0FBZlU7SUFBUixZQUFLLEVBQUU7Z0VBQTRCO0FBQzNCO0lBQVIsWUFBSyxFQUFFOzREQUF1QztBQUN0QztJQUFSLFlBQUssRUFBRTt5REFBa0I7QUFDakI7SUFBUixZQUFLLEVBQUU7OERBQTBCO0FBSnZCLG9CQUFvQjtJQUxoQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsK0JBQStCO1FBQzVDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO0tBQzdDLENBQUM7R0FDVyxvQkFBb0IsQ0FnQmhDO0FBaEJZLG9EQUFvQiJ9