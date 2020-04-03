"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const helpers_1 = require("@concourse/shared/helpers");
let UnCamelizePipe = class UnCamelizePipe {
    transform(text, chars = '\\s') {
        return helpers_1.Util.isString(text)
            ? text
                .trim()
                .replace(/\s+/g, '')
                .replace(/[A-Z]/g, (c, k) => k ? ` ${c.toLowerCase()}` : c.toLowerCase())
            : text;
    }
};
UnCamelizePipe = __decorate([
    core_1.Pipe({ name: 'unCamelize' })
], UnCamelizePipe);
exports.UnCamelizePipe = UnCamelizePipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW4tY2FtZWwtY2FzZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9waXBlcy91bi1jYW1lbC1jYXNlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBb0Q7QUFDcEQsdURBQWlEO0FBR2pELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFJekIsU0FBUyxDQUFDLElBQVMsRUFBRSxLQUFLLEdBQUcsS0FBSztRQUNoQyxPQUFPLGNBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxJQUFJO2lCQUNILElBQUksRUFBRTtpQkFDTixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztpQkFDbkIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQVMsRUFBRSxDQUFNLEVBQUUsRUFBRSxDQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1gsQ0FBQztDQUNGLENBQUE7QUFiWSxjQUFjO0lBRDFCLFdBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQztHQUNoQixjQUFjLENBYTFCO0FBYlksd0NBQWMifQ==