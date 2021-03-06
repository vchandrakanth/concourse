"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@ngrx/store");
const enums_1 = require("@concourse/shared/enums");
const fromAttributeTags = require("./attribute-tag.reducer");
exports.getState = store_1.createFeatureSelector(enums_1.StoreNames.AttributeTag);
exports.getAll = store_1.createSelector(exports.getState, fromAttributeTags.selectAll);
exports.getEntities = store_1.createSelector(exports.getState, fromAttributeTags.selectEntities);
exports.getIsLoaded = store_1.createSelector(exports.getState, fromAttributeTags.isLoaded);
exports.getIsUpdating = store_1.createSelector(exports.getState, fromAttributeTags.isUpdating);
exports.getSelectedId = store_1.createSelector(exports.getState, fromAttributeTags.selectedId);
exports.getSelected = store_1.createSelector(exports.getEntities, exports.getSelectedId, (entities, id) => entities[id]);
exports.hasNextLink = store_1.createSelector(exports.getState, fromAttributeTags.hasNextLink);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLXRhZy5zZWxlY3RvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYXR0cmlidXRlLXRhZy9zdGF0ZS9hdHRyaWJ1dGUtdGFnLnNlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFvRTtBQUVwRSxtREFBcUQ7QUFDckQsNkRBQTZEO0FBRWhELFFBQUEsUUFBUSxHQUFHLDZCQUFxQixDQUEwQixrQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ25GLFFBQUEsTUFBTSxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvRCxRQUFBLFdBQVcsR0FBRyxzQkFBYyxDQUFDLGdCQUFRLEVBQUUsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDekUsUUFBQSxXQUFXLEdBQUcsc0JBQWMsQ0FBQyxnQkFBUSxFQUFFLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ25FLFFBQUEsYUFBYSxHQUFHLHNCQUFjLENBQUMsZ0JBQVEsRUFBRSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN2RSxRQUFBLGFBQWEsR0FBRyxzQkFBYyxDQUFDLGdCQUFRLEVBQUUsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdkUsUUFBQSxXQUFXLEdBQUcsc0JBQWMsQ0FBQyxtQkFBVyxFQUFFLHFCQUFhLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RixRQUFBLFdBQVcsR0FBRyxzQkFBYyxDQUFDLGdCQUFRLEVBQUUsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMifQ==