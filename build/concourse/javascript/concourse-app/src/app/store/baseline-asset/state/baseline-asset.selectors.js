"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@ngrx/store");
const enums_1 = require("@concourse/shared/enums");
const fromReducer = require("./baseline-asset.reducer");
exports.getState = store_1.createFeatureSelector(enums_1.StoreNames.BaselineAsset);
exports.getAll = store_1.createSelector(exports.getState, fromReducer.selectAll);
exports.getEntities = store_1.createSelector(exports.getState, fromReducer.selectEntities);
exports.getSelectedId = store_1.createSelector(exports.getState, fromReducer.selectedId);
exports.getStats = store_1.createSelector(exports.getState, fromReducer.stats);
exports.getContent = store_1.createSelector(exports.getState, fromReducer.content);
exports.getOverview = store_1.createSelector(exports.getState, fromReducer.overview);
exports.selected = store_1.createSelector(exports.getEntities, exports.getSelectedId, (ent, id) => ent[id]);
exports.getIsLoaded = store_1.createSelector(exports.getState, fromReducer.isLoaded);
exports.hasNextLink = store_1.createSelector(exports.getState, fromReducer.hasNextLink);
exports.getIsLoading = store_1.createSelector(exports.getState, fromReducer.loading);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXQuc2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Jhc2VsaW5lLWFzc2V0L3N0YXRlL2Jhc2VsaW5lLWFzc2V0LnNlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFvRTtBQUVwRSxtREFBcUQ7QUFDckQsd0RBQXdEO0FBRTNDLFFBQUEsUUFBUSxHQUFHLDZCQUFxQixDQUFvQixrQkFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzlFLFFBQUEsTUFBTSxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekQsUUFBQSxXQUFXLEdBQUcsc0JBQWMsQ0FBQyxnQkFBUSxFQUFFLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNuRSxRQUFBLGFBQWEsR0FBRyxzQkFBYyxDQUFDLGdCQUFRLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2pFLFFBQUEsUUFBUSxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkQsUUFBQSxVQUFVLEdBQUcsc0JBQWMsQ0FBQyxnQkFBUSxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzRCxRQUFBLFdBQVcsR0FBRyxzQkFBYyxDQUFDLGdCQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzdELFFBQUEsUUFBUSxHQUFHLHNCQUFjLENBQUMsbUJBQVcsRUFBRSxxQkFBYSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUUsUUFBQSxXQUFXLEdBQUcsc0JBQWMsQ0FBQyxnQkFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3RCxRQUFBLFdBQVcsR0FBRyxzQkFBYyxDQUFDLGdCQUFRLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2hFLFFBQUEsWUFBWSxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMifQ==