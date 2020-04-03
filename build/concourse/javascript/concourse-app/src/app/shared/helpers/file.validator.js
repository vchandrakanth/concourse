"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileValidators {
    static mimeType(mimeType) {
        return (control) => {
            const file = control.value;
            if (file) {
                if ((!Array.isArray(mimeType) && file.type !== mimeType) || (Array.isArray(mimeType) && !mimeType.includes(file.type))) {
                    return {
                        mimeType: true
                    };
                }
                return undefined;
            }
            return undefined;
        };
    }
}
exports.FileValidators = FileValidators;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2hlbHBlcnMvZmlsZS52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFhLGNBQWM7SUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUEyQjtRQUN6QyxPQUFPLENBQUMsT0FBb0IsRUFBTyxFQUFFO1lBQ25DLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDM0IsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQ3RILE9BQU87d0JBQ0wsUUFBUSxFQUFFLElBQUk7cUJBQ2YsQ0FBQztpQkFDSDtnQkFDRCxPQUFPLFNBQVMsQ0FBQzthQUNsQjtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWZELHdDQWVDIn0=