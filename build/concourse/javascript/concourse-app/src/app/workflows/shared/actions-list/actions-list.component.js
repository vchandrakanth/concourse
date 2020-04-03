"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faCircle_1 = require("@fortawesome/free-solid-svg-icons/faCircle");
const faInbox_1 = require("@fortawesome/free-solid-svg-icons/faInbox");
let ActionsListComponent = class ActionsListComponent {
    constructor() {
        this.icons = { faCircle: faCircle_1.faCircle, faInbox: faInbox_1.faInbox };
    }
};
__decorate([
    core_1.Input()
], ActionsListComponent.prototype, "actions", void 0);
ActionsListComponent = __decorate([
    core_1.Component({
        selector: 'app-actions-list',
        templateUrl: './actions-list.component.html',
        styleUrls: ['./actions-list.component.scss']
    })
], ActionsListComponent);
exports.ActionsListComponent = ActionsListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC93b3JrZmxvd3Mvc2hhcmVkL2FjdGlvbnMtbGlzdC9hY3Rpb25zLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWlEO0FBQ2pELHlFQUFzRTtBQUN0RSx1RUFBb0U7QUFTcEUsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFBakM7UUFFVyxVQUFLLEdBQUcsRUFBRSxRQUFRLEVBQVIsbUJBQVEsRUFBRSxPQUFPLEVBQVAsaUJBQU8sRUFBRSxDQUFDO0lBQ3pDLENBQUM7Q0FBQSxDQUFBO0FBRlU7SUFBUixZQUFLLEVBQUU7cURBQWdEO0FBRDdDLG9CQUFvQjtJQUxoQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsK0JBQStCO1FBQzVDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO0tBQzdDLENBQUM7R0FDVyxvQkFBb0IsQ0FHaEM7QUFIWSxvREFBb0IifQ==