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
const selectors_1 = require("@concourse/store/selectors");
const user_actions_1 = require("./user.actions");
const query = require("./user.selectors");
let UserFacade = class UserFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.selected$ = this.store.pipe(store_1.select(query.getSelected));
        this.selectedWithRelated$ = this.store.pipe(store_1.select(selectors_1.getSelectedUserWithRelated));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
        this.formPending$ = this.store.pipe(store_1.select(query.getFormPending));
        this.token$ = this.store.pipe(store_1.select(query.getToken));
        this.email$ = this.store.pipe(store_1.select(query.getEmail));
        this.authenticatedUser$ = this.store.pipe(store_1.select(selectors_1.getAuthenticatedUserWithRelated));
        this.getActivatedUsers$ = this.store.pipe(store_1.select(query.getAllActivated));
        this.isRegistrationSuccess$ = this.store.pipe(store_1.select(query.isRegistrationSuccess));
        this.authType$ = this.store.pipe(store_1.select(query.getAuthType));
        this.securityQuestions$ = this.store.pipe(store_1.select(query.getSecurityQuestions));
        this.hasNextLink$ = this.store.pipe(store_1.select(query.hasNextLink));
    }
    invite(user) {
        this.store.dispatch(new user_actions_1.InviteUser(user));
    }
    delete(user) {
        this.store.dispatch(new user_actions_1.DeleteUser(user.id));
    }
    updatePassword(userId, updatePasswordRequest) {
        this.store.dispatch(new user_actions_1.UpdatePassword({ userId, updatePasswordRequest }));
    }
    updateUser(user) {
        this.store.dispatch(new user_actions_1.UpdateUser(user));
    }
    search(searchText) {
        this.store.dispatch(new user_actions_1.SearchUsers(searchText));
    }
    resetSearch() {
        this.store.dispatch(new user_actions_1.ResetUserSearchResults());
    }
    regenerateInvitation(token) {
        this.store.dispatch(new user_actions_1.RegenerateInvitation(token));
    }
    register(token, user) {
        this.store.dispatch(new user_actions_1.RegisterUser({ token, user }));
    }
    regenerateRegistration(token) {
        this.store.dispatch(new user_actions_1.RegenerateConfirmation(token));
    }
    ListByPagination(page, size) {
        this.store.dispatch(new user_actions_1.LoadUsersByPagination({ page: page.toString(), size }));
    }
};
UserFacade = __decorate([
    core_1.Injectable()
], UserFacade);
exports.UserFacade = UserFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvdXNlci9zdGF0ZS91c2VyLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsMERBQXlHO0FBQ3pHLGlEQVd3QjtBQUV4QiwwQ0FBMEM7QUFHMUMsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtJQWdCckIsWUFDbUIsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQWhCdEMsVUFBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM5QyxjQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELHlCQUFvQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxzQ0FBMEIsQ0FBQyxDQUFDLENBQUM7UUFDM0UsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RCxnQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUMzRCxpQkFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUM3RCxXQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMs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