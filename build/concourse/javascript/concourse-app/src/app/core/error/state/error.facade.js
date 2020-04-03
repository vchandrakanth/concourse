"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const error_actions_1 = require("./error.actions");
const query = require("./error.selectors");
let ApplicationErrorFacade = class ApplicationErrorFacade {
    constructor(store) {
        this.store = store;
        this.errors$ = this.store.pipe(store_1.select(query.getAll));
        this.formErrors$ = this.store.pipe(store_1.select(query.getFormErrors));
    }
    dismiss(id) {
        this.store.dispatch(new error_actions_1.DismissApplicationError(id));
    }
    dismissByType(type) {
        this.store.dispatch(new error_actions_1.DismissApplicationErrorByDisplayType(type));
    }
};
ApplicationErrorFacade = __decorate([
    core_1.Injectable()
], ApplicationErrorFacade);
exports.ApplicationErrorFacade = ApplicationErrorFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvZXJyb3Ivc3RhdGUvZXJyb3IuZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLHVDQUE0QztBQUU1QyxtREFBcUg7QUFFckgsMkNBQTJDO0FBRzNDLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBSWpDLFlBQ21CLEtBQW1CO1FBQW5CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFKdEMsWUFBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNoRCxnQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUl2RCxDQUFDO0lBRUwsT0FBTyxDQUFDLEVBQVU7UUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSx1Q0FBdUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxhQUFhLENBQUMsSUFBWTtRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLG9EQUFvQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNGLENBQUE7QUFmWSxzQkFBc0I7SUFEbEMsaUJBQVUsRUFBRTtHQUNBLHNCQUFzQixDQWVsQztBQWZZLHdEQUFzQiJ9