"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const models_1 = require("@concourse/core/models");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let SurfaceLayerService = class SurfaceLayerService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'surface-layers')).pipe(operators_1.map((response) => response.content.map(item => new models_1.SurfaceLayer().deserialize(item))));
    }
    create(surfaceLayer) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `surface-layers/${surfaceLayer.parent}`), surfaceLayer).pipe(operators_1.map(response => new models_1.SurfaceLayer().deserialize(response)));
    }
    remove(surfaceLayerId) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `surface-layers/${surfaceLayerId}`)).pipe(operators_1.map(response => response));
    }
    update(surfLayer) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `surface-layers/${surfLayer.id}`), surfLayer.serialize()).pipe(operators_1.map(response => new models_1.SurfaceLayer().deserialize(response)));
    }
};
SurfaceLayerService = __decorate([
    core_1.Injectable()
], SurfaceLayerService);
exports.SurfaceLayerService = SurfaceLayerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS1sYXllci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3N1cmZhY2UtbGF5ZXIvc2VydmljZXMvc3VyZmFjZS1sYXllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0Esd0NBQTJDO0FBRzNDLDhDQUFxQztBQUVyQyxtREFBeUU7QUFDekUsbURBQXVEO0FBQ3ZELHVEQUFnRTtBQUdoRSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUU5QixZQUNtQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQy9CLENBQUM7SUFFTCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN4RixlQUFHLENBQUMsQ0FBQyxRQUFnQyxFQUFFLEVBQUUsQ0FDdkMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHFCQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDbkUsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFtQztRQUN4QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQiw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQ3RGLFlBQVksQ0FDYixDQUFDLElBQUksQ0FDSixlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHFCQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FDMUQsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsY0FBc0I7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDN0csZUFBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBZSxDQUFDLENBQ2pDLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQWdDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ2xCLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsV0FBVyxFQUFFLGtCQUFrQixTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDL0UsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUN0QixDQUFDLElBQUksQ0FDSixlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHFCQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FDMUQsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBckNZLG1CQUFtQjtJQUQvQixpQkFBVSxFQUFFO0dBQ0EsbUJBQW1CLENBcUMvQjtBQXJDWSxrREFBbUIifQ==