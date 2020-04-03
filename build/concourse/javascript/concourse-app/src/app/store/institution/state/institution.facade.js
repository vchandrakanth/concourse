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
const institution_actions_1 = require("./institution.actions");
const query = require("./institution.selectors");
let InstitutionFacade = class InstitutionFacade {
    constructor(store) {
        this.store = store;
        this.loaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.idpConfig$ = this.store.pipe(store_1.select(query.getInstitutionConfig, { config: 'idp' }));
        this.selected$ = this.store.pipe(store_1.select(query.getSelected));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
        this.getValidateInfo$ = this.store.pipe(store_1.select(query.getValidateInfo));
        this.successResp$ = this.store.pipe(store_1.select(query.getSuccessResp));
    }
    invite(institution) {
        this.store.dispatch(new institution_actions_1.InviteInstitution(institution));
    }
    update(institution) {
        this.store.dispatch(new institution_actions_1.UpdateInstitution(institution));
    }
    register(formData, registrationToken) {
        const payload = {
            institution: formData,
            registrationToken,
            password: formData['password'],
            confirmPassword: formData['confirmPassword']
        };
        this.store.dispatch(new institution_actions_1.RegisterInstitution(payload));
    }
    regenerateInvitation(token) {
        this.store.dispatch(new institution_actions_1.RegenerateInvitation(token));
    }
    regenerateRegistration(token) {
        this.store.dispatch(new institution_actions_1.RegenerateRegistration(token));
    }
    validateInviteInstitutionToken(token, email, name) {
        this.store.dispatch(new institution_actions_1.ValidateInstToken({ token, email, name }));
    }
    validateConfirmToken(token) {
        this.store.dispatch(new institution_actions_1.ValidateRegistrationConfirmToken(token));
    }
    createConfig(config, data) {
        this.store.dispatch(new institution_actions_1.CreateInstitutionConfig({ config, data }));
    }
    updateConfig(config, data) {
        this.store.dispatch(new institution_actions_1.UpdateInstitutionConfig({ config, data }));
    }
};
InstitutionFacade = __decorate([
    core_1.Injectable()
], InstitutionFacade);
exports.InstitutionFacade = InstitutionFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24uZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2luc3RpdHV0aW9uL3N0YXRlL2luc3RpdHV0aW9uLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsK0RBVStCO0FBRS9CLGlEQUFpRDtBQUdqRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQVM1QixZQUE2QixLQUFtQjtRQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBUmhELFlBQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDckQsVUFBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM5QyxlQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEYsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RCxnQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUMzRCxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDbEUsaUJBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFFVCxDQUFDO0lBRXJELE1BQU0sQ0FBQyxXQUFpQztRQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHVDQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNELE1BQU0sQ0FBQyxXQUF3QjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHVDQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUE4QixFQUFFLGlCQUF5QjtRQUNoRSxNQUFNLE9BQU8sR0FBRztZQUNkLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLGlCQUFpQjtZQUNqQixRQUFRLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUM5QixlQUFlLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1NBQzdDLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHlDQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELG9CQUFvQixDQUFDLEtBQWE7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwwQ0FBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxLQUFhO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksNENBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsOEJBQThCLENBQUMsS0FBYSxFQUFFLEtBQWEsRUFBRSxJQUFZO1FBQ3ZFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksdUNBQWlCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsb0JBQW9CLENBQUMsS0FBYTtRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHNEQUFnQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELFlBQVksQ0FBQyxNQUFjLEVBQUUsSUFBUztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDZDQUF1QixDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsWUFBWSxDQUFDLE1BQWMsRUFBRSxJQUFTO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksNkNBQXVCLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FFRixDQUFBO0FBckRZLGlCQUFpQjtJQUQ3QixpQkFBVSxFQUFFO0dBQ0EsaUJBQWlCLENBcUQ3QjtBQXJEWSw4Q0FBaUIifQ==