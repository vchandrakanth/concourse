"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
function selectIdValue(entity, selectId) {
    const key = selectId(entity);
    if (core_1.isDevMode() && key === undefined) {
        console.warn('@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.', 'You should probably provide your own `selectId` implementation.', 'The entity that was passed:', entity, 'The `selectId` implementation:', selectId.toString());
    }
    return key;
}
exports.selectIdValue = selectIdValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3N0YXRlLWFkYXB0ZXIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMEM7QUFHMUMsU0FBZ0IsYUFBYSxDQUFJLE1BQVMsRUFBRSxRQUF1QjtJQUNqRSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFN0IsSUFBSSxnQkFBUyxFQUFFLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtRQUNwQyxPQUFPLENBQUMsSUFBSSxDQUNWLHNGQUFzRixFQUN0RixpRUFBaUUsRUFDakUsNkJBQTZCLEVBQzdCLE1BQU0sRUFDTixnQ0FBZ0MsRUFDaEMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUNwQixDQUFDO0tBQ0g7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFmRCxzQ0FlQyJ9