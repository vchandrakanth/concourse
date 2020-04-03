"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let GetInitialsPipe = class GetInitialsPipe {
    /**
     * Checks to see if an undefined, null, empty, or string of special/number characters is passed.
     * @param name - String to convert into into initials
     * @returns - An all uppercase string of initials
     */
    transform(name) {
        if (!name || !/^[A-Za-z,\.\-\'\ ]*$/.test(name)) {
            return '';
        }
        return name.split(/['\,\.\-\ ]+/).map(([n]) => n).join('').toUpperCase();
    }
};
GetInitialsPipe = __decorate([
    core_1.Pipe({
        name: 'getInitials'
    })
], GetInitialsPipe);
exports.GetInitialsPipe = GetInitialsPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWluaXRpYWxzLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BpcGVzL2dldC1pbml0aWFscy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQW9EO0FBS3BELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFDMUI7Ozs7T0FJRztJQUVILFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBRSxPQUFPLEVBQUUsQ0FBQztTQUFFO1FBQy9ELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0UsQ0FBQztDQUNGLENBQUE7QUFYWSxlQUFlO0lBSDNCLFdBQUksQ0FBQztRQUNKLElBQUksRUFBRSxhQUFhO0tBQ3BCLENBQUM7R0FDVyxlQUFlLENBVzNCO0FBWFksMENBQWUifQ==