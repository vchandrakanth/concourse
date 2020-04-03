"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function jsonValidator() {
    return (control) => {
        const error = { jsonInvalid: true };
        if (!!control.parent) {
            try {
                JSON.parse(control.value);
            }
            catch (e) {
                control.setErrors(error);
                return error;
            }
            control.setErrors(error);
        }
        return undefined;
    };
}
exports.jsonValidator = jsonValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWQtanNvbi52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2hlbHBlcnMvdmFsaWQtanNvbi52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxTQUFnQixhQUFhO0lBQzNCLE9BQU8sQ0FBQyxPQUFvQixFQUEyQixFQUFFO1FBQ3ZELE1BQU0sS0FBSyxHQUFxQixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUV0RCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBRXBCLElBQUk7Z0JBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0I7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixPQUFPLEtBQUssQ0FBQzthQUNkO1lBRUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUMsQ0FBQztBQUNKLENBQUM7QUFqQkQsc0NBaUJDIn0=