"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let UnderscoreRemovePipe = class UnderscoreRemovePipe {
    transform(input) {
        return input.replace(/_/g, ' ');
    }
};
UnderscoreRemovePipe = __decorate([
    core_1.Pipe({ name: 'removeUnderscore' })
], UnderscoreRemovePipe);
exports.UnderscoreRemovePipe = UnderscoreRemovePipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5kZXJzY29yZS1yZW1vdmUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcGlwZXMvdW5kZXJzY29yZS1yZW1vdmUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFvRDtBQUdwRCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUMvQixTQUFTLENBQUMsS0FBYTtRQUNyQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRixDQUFBO0FBSlksb0JBQW9CO0lBRGhDLFdBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxDQUFDO0dBQ3RCLG9CQUFvQixDQUloQztBQUpZLG9EQUFvQiJ9