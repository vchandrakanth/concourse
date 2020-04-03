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
// import { getSelectedBaselineAssetWithRelated } from '@concourse/store/selectors';
const aws_account_actions_1 = require("./aws-account.actions");
const query = require("./aws-account.selectors");
let AwsAccountFacade = class AwsAccountFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
    }
    getAwsAccounts() {
        this.store.dispatch(new aws_account_actions_1.LoadAwsAccounts());
    }
    createAwsAccount(form) {
        this.store.dispatch(new aws_account_actions_1.CreateAwsAccount(form));
    }
    delete(id) {
        this.store.dispatch(new aws_account_actions_1.DeleteAwsAccount(id));
    }
    update(awsAccount) {
        this.store.dispatch(new aws_account_actions_1.UpdateAwsAccount(awsAccount));
    }
    enable(surfaceId, awsAccountId) {
        this.store.dispatch(new aws_account_actions_1.EnableSurfaceToAwsAccount({ surfaceId, awsAccountId }));
    }
    disable(surfaceId, awsAccountId) {
        this.store.dispatch(new aws_account_actions_1.DisableSurfaceToAwsAccount({ surfaceId, awsAccountId }));
    }
    enableSurfaceLayer(surfaceId, surfaceLayerId, awsAccountId) {
        this.store.dispatch(new aws_account_actions_1.EnableSurfaceLayerToAwsAccount({ surfaceId, surfaceLayerId, awsAccountId }));
    }
    disableSurfaceLayer(surfaceId, surfaceLayerId, awsAccountId) {
        this.store.dispatch(new aws_account_actions_1.DisableSurfaceLayerToAwsAccount({ surfaceId, surfaceLayerId, awsAccountId }));
    }
};
AwsAccountFacade = __decorate([
    core_1.Injectable()
], AwsAccountFacade);
exports.AwsAccountFacade = AwsAccountFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWFjY291bnQuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F3cy1hY2NvdW50cy9zdGF0ZS9hd3MtYWNjb3VudC5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSx3Q0FBMkM7QUFDM0MsdUNBQTRDO0FBRzVDLG9GQUFvRjtBQUNwRiwrREFFK0I7QUFFL0IsaURBQWlEO0FBR2pELElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBRzNCLFlBQ21CLEtBQW1CO1FBQW5CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFIdEMsVUFBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM5QyxjQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBR25ELENBQUM7SUFFTCxjQUFjO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxxQ0FBZSxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsSUFBd0I7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxzQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxNQUFNLENBQUMsRUFBVTtRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksc0NBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQThCO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksc0NBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQWlCLEVBQUUsWUFBb0I7UUFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwrQ0FBeUIsQ0FBQyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUNELE9BQU8sQ0FBQyxTQUFpQixFQUFFLFlBQW9CO1FBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksZ0RBQTBCLENBQUMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxTQUFpQixFQUFFLGNBQXNCLEVBQUUsWUFBb0I7UUFDaEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxvREFBOEIsQ0FBQyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxTQUFpQixFQUFFLGNBQXNCLEVBQUUsWUFBb0I7UUFDakYsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxxREFBK0IsQ0FBQyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7Q0FDRixDQUFBO0FBckNZLGdCQUFnQjtJQUQ1QixpQkFBVSxFQUFFO0dBQ0EsZ0JBQWdCLENBcUM1QjtBQXJDWSw0Q0FBZ0IifQ==