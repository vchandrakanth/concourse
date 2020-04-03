"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let CloseModalDirective = class CloseModalDirective {
    constructor(modalStoreFacade) {
        this.modalStoreFacade = modalStoreFacade;
    }
    onClick() {
        this.modalStoreFacade.closeModal();
    }
};
__decorate([
    core_1.HostListener('click')
], CloseModalDirective.prototype, "onClick", null);
CloseModalDirective = __decorate([
    core_1.Directive({
        selector: '[appCloseModal]'
    })
], CloseModalDirective);
exports.CloseModalDirective = CloseModalDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2UtbW9kYWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY2xvc2UtbW9kYWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXdEO0FBTXhELElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBTTlCLFlBQTZCLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQztJQUo1QyxPQUFPO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0NBSUYsQ0FBQTtBQU53QjtJQUF0QixtQkFBWSxDQUFDLE9BQU8sQ0FBQztrREFFckI7QUFKVSxtQkFBbUI7SUFIL0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxpQkFBaUI7S0FDNUIsQ0FBQztHQUNXLG1CQUFtQixDQVEvQjtBQVJZLGtEQUFtQiJ9