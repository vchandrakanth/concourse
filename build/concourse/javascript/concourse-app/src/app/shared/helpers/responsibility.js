"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("./array");
const util_1 = require("./util");
exports.checkResponsibility = (responsibilities, requiredResponsibilities) => {
    if (util_1.Util.isUndefined(responsibilities)) {
        // surfaceLayer has no responsibilities set
        return false;
    }
    if (util_1.Util.isArray(requiredResponsibilities)) {
        // incoming requiredResponsibilities is an array
        return array_1.intersection(responsibilities, requiredResponsibilities, (a, b) => a === b).length > 0;
    }
    if (responsibilities.includes(requiredResponsibilities)) {
        // incoming requiredResponsibilities is a single string
        return true;
    }
    // nothing match, fallback to false (to continue checking ancestors - or die)
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2liaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2hlbHBlcnMvcmVzcG9uc2liaWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBdUM7QUFDdkMsaUNBQThCO0FBRWpCLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxnQkFBMEIsRUFBRSx3QkFBMkMsRUFBVyxFQUFFO0lBQ3RILElBQUksV0FBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ3RDLDJDQUEyQztRQUMzQyxPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsSUFBSSxXQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLEVBQUU7UUFDMUMsZ0RBQWdEO1FBQ2hELE9BQU8sb0JBQVksQ0FBQyxnQkFBZ0IsRUFBRSx3QkFBd0IsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQy9GO0lBQ0QsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsRUFBRTtRQUN2RCx1REFBdUQ7UUFDdkQsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELDZFQUE2RTtJQUM3RSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQyJ9