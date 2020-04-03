"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let JoinPipe = class JoinPipe {
    transform(value, separator = ', ') {
        return Array.isArray(value) ? value.join(separator) : value;
    }
};
JoinPipe = __decorate([
    core_1.Pipe({
        name: 'join'
    })
], JoinPipe);
exports.JoinPipe = JoinPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9waXBlcy9qb2luLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBb0Q7QUFLcEQsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQUVuQixTQUFTLENBQUMsS0FBWSxFQUFFLFNBQVMsR0FBRyxJQUFJO1FBQ3RDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzlELENBQUM7Q0FFRixDQUFBO0FBTlksUUFBUTtJQUhwQixXQUFJLENBQUM7UUFDSixJQUFJLEVBQUUsTUFBTTtLQUNiLENBQUM7R0FDVyxRQUFRLENBTXBCO0FBTlksNEJBQVEifQ==