"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeatureFlagTypes;
(function (FeatureFlagTypes) {
    FeatureFlagTypes["LoadAllFeatures"] = "[FeatureFlag] Load All Features";
    FeatureFlagTypes["LoadFeatures"] = "[FeatureFlag] Load Features";
    FeatureFlagTypes["LoadFeaturesSuccess"] = "[FeatureFlag] Load Features Success";
    FeatureFlagTypes["LoadFeaturesFailure"] = "[FeatureFlag] Load Features Failure";
    FeatureFlagTypes["LoadInstitutionFeatures"] = "[FeatureFlag] Load Institution Features";
    FeatureFlagTypes["LoadInstitutionFeaturesSuccess"] = "[FeatureFlag] Load Institution Features Success";
    FeatureFlagTypes["LoadInstitutionFeaturesFailure"] = "[FeatureFlag] Load Institution Features Failure";
})(FeatureFlagTypes = exports.FeatureFlagTypes || (exports.FeatureFlagTypes = {}));
class LoadAllFeatures {
    constructor() {
        this.type = FeatureFlagTypes.LoadAllFeatures;
    }
}
exports.LoadAllFeatures = LoadAllFeatures;
class LoadFeatures {
    constructor() {
        this.type = FeatureFlagTypes.LoadFeatures;
    }
}
exports.LoadFeatures = LoadFeatures;
class LoadFeaturesSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = FeatureFlagTypes.LoadFeaturesSuccess;
    }
}
exports.LoadFeaturesSuccess = LoadFeaturesSuccess;
class LoadFeaturesFailure {
    constructor() {
        this.type = FeatureFlagTypes.LoadFeaturesFailure;
    }
}
exports.LoadFeaturesFailure = LoadFeaturesFailure;
class LoadInstitutionFeatures {
    constructor() {
        this.type = FeatureFlagTypes.LoadInstitutionFeatures;
    }
}
exports.LoadInstitutionFeatures = LoadInstitutionFeatures;
class LoadInstitutionFeaturesSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = FeatureFlagTypes.LoadInstitutionFeaturesSuccess;
    }
}
exports.LoadInstitutionFeaturesSuccess = LoadInstitutionFeaturesSuccess;
class LoadInstitutionFeaturesFailure {
    constructor() {
        this.type = FeatureFlagTypes.LoadInstitutionFeaturesFailure;
    }
}
exports.LoadInstitutionFeaturesFailure = LoadInstitutionFeaturesFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1mbGFnLmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9mZWF0dXJlLWZsYWdzL3N0YXRlL2ZlYXR1cmUtZmxhZy5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBWSxnQkFVWDtBQVZELFdBQVksZ0JBQWdCO0lBQzFCLHVFQUFtRCxDQUFBO0lBRW5ELGdFQUE0QyxDQUFBO0lBQzVDLCtFQUEyRCxDQUFBO0lBQzNELCtFQUEyRCxDQUFBO0lBRTNELHVGQUFtRSxDQUFBO0lBQ25FLHNHQUFrRixDQUFBO0lBQ2xGLHNHQUFrRixDQUFBO0FBQ3BGLENBQUMsRUFWVyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQVUzQjtBQUVELE1BQWEsZUFBZTtJQUE1QjtRQUNXLFNBQUksR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUM7SUFDbkQsQ0FBQztDQUFBO0FBRkQsMENBRUM7QUFFRCxNQUFhLFlBQVk7SUFBekI7UUFDVyxTQUFJLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ2hELENBQUM7Q0FBQTtBQUZELG9DQUVDO0FBQ0QsTUFBYSxtQkFBbUI7SUFFOUIsWUFBbUIsT0FBaUI7UUFBakIsWUFBTyxHQUFQLE9BQU8sQ0FBVTtRQUQzQixTQUFJLEdBQUcsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUM7SUFDYixDQUFDO0NBQzFDO0FBSEQsa0RBR0M7QUFDRCxNQUFhLG1CQUFtQjtJQUFoQztRQUNXLFNBQUksR0FBRyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztJQUN2RCxDQUFDO0NBQUE7QUFGRCxrREFFQztBQUVELE1BQWEsdUJBQXVCO0lBQXBDO1FBQ1csU0FBSSxHQUFHLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDO0lBQzNELENBQUM7Q0FBQTtBQUZELDBEQUVDO0FBQ0QsTUFBYSw4QkFBOEI7SUFFekMsWUFBbUIsT0FBaUI7UUFBakIsWUFBTyxHQUFQLE9BQU8sQ0FBVTtRQUQzQixTQUFJLEdBQUcsZ0JBQWdCLENBQUMsOEJBQThCLENBQUM7SUFDeEIsQ0FBQztDQUMxQztBQUhELHdFQUdDO0FBQ0QsTUFBYSw4QkFBOEI7SUFBM0M7UUFDVyxTQUFJLEdBQUcsZ0JBQWdCLENBQUMsOEJBQThCLENBQUM7SUFDbEUsQ0FBQztDQUFBO0FBRkQsd0VBRUMifQ==