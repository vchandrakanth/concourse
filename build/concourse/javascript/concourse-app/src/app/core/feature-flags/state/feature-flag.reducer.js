"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const feature_flag_actions_1 = require("./feature-flag.actions");
const env_1 = require("@concourse/env");
exports.initialState = {
    features: [...env_1.environment.featureFlags],
    institutionFeatures: []
};
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case feature_flag_actions_1.FeatureFlagTypes.LoadFeaturesSuccess: {
            return Object.assign(Object.assign({}, state), { features: [...new Set([...state.features, ...action.payload])] });
        }
        case feature_flag_actions_1.FeatureFlagTypes.LoadInstitutionFeaturesSuccess: {
            return Object.assign(Object.assign({}, state), { institutionFeatures: [...new Set([...state.institutionFeatures, ...action.payload])] });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
exports.features = (state) => state.features;
exports.institutionFeatures = (state) => state.institutionFeatures;
exports.combinedFeatures = (state) => [...state.features, ...state.institutionFeatures];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1mbGFnLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9mZWF0dXJlLWZsYWdzL3N0YXRlL2ZlYXR1cmUtZmxhZy5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUVBQThFO0FBRTlFLHdDQUE2QztBQU9oQyxRQUFBLFlBQVksR0FBVTtJQUNqQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLGlCQUFXLENBQUMsWUFBWSxDQUFDO0lBQ3ZDLG1CQUFtQixFQUFFLEVBQUU7Q0FDeEIsQ0FBQztBQUVGLFNBQWdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQVksRUFBRSxNQUEwQjtJQUN0RSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFFbkIsS0FBSyx1Q0FBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3pDLHVDQUNLLEtBQUssS0FDUixRQUFRLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFDOUQ7U0FDSDtRQUVELEtBQUssdUNBQWdCLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUNwRCx1Q0FDSyxLQUFLLEtBQ1IsbUJBQW1CLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUNwRjtTQUNIO1FBRUQsT0FBTyxDQUFDLENBQUM7WUFDUCxPQUFPLEtBQUssQ0FBQztTQUNkO0tBQ0Y7QUFDSCxDQUFDO0FBckJELDBCQXFCQztBQUVZLFFBQUEsUUFBUSxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0FBQzVDLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztBQUNsRSxRQUFBLGdCQUFnQixHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDIn0=