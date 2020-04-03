"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const models_1 = require("@concourse/core/models");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let SurfaceService = class SurfaceService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'surfaces')).pipe(operators_1.map((response) => response.content.map(item => new models_1.Surface().deserialize(item))));
    }
    get(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `surfaces/${id}`)).pipe(operators_1.map((response) => new models_1.Surface().deserialize(response)));
    }
    create(surface, createGroup) {
        let params = new http_1.HttpParams();
        if (createGroup) {
            params = params.set('createGroup', createGroup.toString());
        }
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'surfaces'), surface, { params }).pipe(operators_1.map(response => new models_1.Surface().deserialize(response)));
    }
    update(surface) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `surfaces/${surface.id}`), surface.serialize()).pipe(operators_1.map(response => new models_1.Surface().deserialize(response)));
    }
    delete(id) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `surfaces/${id}`)).pipe(operators_1.map(response => response));
    }
};
SurfaceService = __decorate([
    core_1.Injectable()
], SurfaceService);
exports.SurfaceService = SurfaceService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3N1cmZhY2Uvc2VydmljZXMvc3VyZmFjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBR2dDO0FBQ2hDLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUN6QixZQUNtQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQy9CLENBQUM7SUFFTCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDbEYsZUFBRyxDQUFDLENBQUMsUUFBb0MsRUFBRSxFQUFFLENBQzNDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxnQkFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQzlELENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxHQUFHLENBQUMsRUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN4RixlQUFHLENBQUMsQ0FBQyxRQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLGdCQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FDaEUsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBeUIsRUFBRSxXQUFvQjtRQUNwRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlCQUFVLEVBQUUsQ0FBQztRQUM5QixJQUFJLFdBQVcsRUFBRTtZQUNmLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUM1RDtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3RHLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksZ0JBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUNyRCxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUFtQixDQUN0QyxvQkFBWSxDQUFDLFdBQVcsRUFDeEIsWUFBWSxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDekIsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUNwQixDQUFDLElBQUksQ0FDSixlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLGdCQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxNQUFNLENBQUMsRUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMzRixlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFlLENBQUMsQ0FDakMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBM0NZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtHQUNBLGNBQWMsQ0EyQzFCO0FBM0NZLHdDQUFjIn0=