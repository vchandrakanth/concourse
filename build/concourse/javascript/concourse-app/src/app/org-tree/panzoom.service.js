"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const panzoom_1 = require("panzoom");
let PanzoomService = class PanzoomService {
    constructor() {
        this.panzoom = panzoom_1.default;
    }
};
PanzoomService = __decorate([
    core_1.Injectable()
], PanzoomService);
exports.PanzoomService = PanzoomService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuem9vbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL29yZy10cmVlL3Bhbnpvb20uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyxxQ0FBOEI7QUFHOUIsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUEzQjtRQUNFLFlBQU8sR0FBRyxpQkFBTyxDQUFDO0lBQ3BCLENBQUM7Q0FBQSxDQUFBO0FBRlksY0FBYztJQUQxQixpQkFBVSxFQUFFO0dBQ0EsY0FBYyxDQUUxQjtBQUZZLHdDQUFjIn0=