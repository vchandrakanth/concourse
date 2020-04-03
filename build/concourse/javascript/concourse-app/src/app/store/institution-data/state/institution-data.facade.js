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
const institution_data_actions_1 = require("./institution-data.actions");
const query = require("./institution-data.selectors");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
let InstitutionDataFacade = class InstitutionDataFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.selected$ = this.store.pipe(store_1.select(query.getSelected));
        this.cidrs$ = this.store.pipe(store_1.select(query.getCIDRs));
        this.azureAccounts$ = this.store.pipe(store_1.select(query.getAzureAccounts));
        this.azureSubscriptions$ = this.store.pipe(store_1.select(query.getAzureSubscriptions));
        this.azureResourceTypes$ = this.store.pipe(store_1.select(query.getAzureResourceTypes));
        this.azureResourceGroups$ = this.store.pipe(store_1.select(query.getAzureResourceGroups));
        this.azureResourceTags$ = this.store.pipe(store_1.select(query.getAzureResourceTags), operators_1.filter(tags => tags), operators_1.map(tags => (tags.reduce((acc, curr) => {
            const [key, val] = curr.split(':');
            !acc[key] ? acc[key] = [val] : acc[key] = [...acc[key], val];
            return acc;
        }, {}))));
        this.selectedFieldData$ = new rxjs_1.BehaviorSubject({ id: undefined, key: undefined });
        this.selectedFieldValues$ = new rxjs_1.BehaviorSubject([]);
        this.azureResourceTagsKeys$ = this.azureResourceTags$.pipe(operators_1.map(tags => Object.keys(tags)));
        this.azureResourceTagsSelectedValues$ = this.selectedFieldData$.pipe(operators_1.mergeMap(key => this.azureResourceTags$.pipe(operators_1.map(tags => tags[key.key]), operators_1.startWith([]))));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
    }
    get(params, uri) {
        this.store.dispatch(new institution_data_actions_1.LoadInstitutionData({ uri, params }));
    }
    create(params, data) {
        this.store.dispatch(new institution_data_actions_1.CreateInstitutionData({ params, data }));
    }
    update(params, data) {
        this.store.dispatch(new institution_data_actions_1.UpdateInstitutionData({ params, data }));
    }
    delete(params, uri) {
        this.store.dispatch(new institution_data_actions_1.DeleteInstitutionData({ uri, params }));
    }
    loadAzureAccounts() {
        this.store.dispatch(new institution_data_actions_1.LoadAzureData('accounts'));
    }
    loadAzureSubscriptions() {
        this.store.dispatch(new institution_data_actions_1.LoadAzureData('subscriptions'));
    }
    loadAzureResourceGroups() {
        this.store.dispatch(new institution_data_actions_1.LoadAzureData('resourceGroups'));
    }
    loadAzureResourceTypes() {
        this.store.dispatch(new institution_data_actions_1.LoadAzureData('resourceTypes'));
    }
    loadAzureResourceTags() {
        this.store.dispatch(new institution_data_actions_1.LoadAzureData('resourceTags'));
    }
};
InstitutionDataFacade = __decorate([
    core_1.Injectable()
], InstitutionDataFacade);
exports.InstitutionDataFacade = InstitutionDataFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tZGF0YS5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvaW5zdGl0dXRpb24tZGF0YS9zdGF0ZS9pbnN0aXR1dGlvbi1kYXRhLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMseUVBT29DO0FBRXBDLHNEQUFzRDtBQUN0RCw4Q0FBa0U7QUFDbEUsK0JBQXVDO0FBR3ZDLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBK0JoQyxZQUE2QixLQUFtQjtRQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBOUJoRCxVQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlDLGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsV0FBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNqRCxtQkFBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLHdCQUFtQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1FBQzNFLHdCQUFtQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1FBQzNFLHlCQUFvQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1FBQzdFLHVCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNsQyxjQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLEVBQ2xDLGtCQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFDcEIsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDVixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzdELE9BQU8sR0FBRyxDQUFDO1FBQ2QsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUNOLENBQUMsQ0FDSCxDQUFDO1FBQ0YsdUJBQWtCLEdBQUcsSUFBSSxzQkFBZSxDQUFDLEVBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztRQUMxRSx5QkFBb0IsR0FBRyxJQUFJLHNCQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0MsMkJBQXNCLEdBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RixxQ0FBZ0MsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUM3RCxvQkFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FDMUMsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUMxQixxQkFBUyxDQUFDLEVBQUUsQ0FBQyxDQUNkLENBQUMsQ0FDRCxDQUFDO1FBQ0osY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RCxnQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFckQsR0FBRyxDQUFDLE1BQTZCLEVBQUUsR0FBVztRQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDhDQUFtQixDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQTZCLEVBQUUsSUFBcUI7UUFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxnREFBcUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUE2QixFQUFFLElBQXFCO1FBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksZ0RBQXFCLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBNkIsRUFBRSxHQUFXO1FBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksZ0RBQXFCLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHdDQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0Qsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksd0NBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCx1QkFBdUI7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSx3Q0FBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ0Qsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksd0NBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxxQkFBcUI7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSx3Q0FBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNGLENBQUE7QUFoRVkscUJBQXFCO0lBRGpDLGlCQUFVLEVBQUU7R0FDQSxxQkFBcUIsQ0FnRWpDO0FBaEVZLHNEQUFxQiJ9