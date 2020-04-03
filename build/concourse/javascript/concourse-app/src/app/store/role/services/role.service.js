"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ngx_cacheable_1 = require("ngx-cacheable");
const operators_1 = require("rxjs/operators");
const models_1 = require("@concourse/core/models");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let RoleService = class RoleService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'roles')).pipe(operators_1.map((response) => response.content.map(r => new models_1.Role().deserialize(r))));
    }
};
__decorate([
    ngx_cacheable_1.Cacheable()
], RoleService.prototype, "list", null);
RoleService = __decorate([
    core_1.Injectable()
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3JvbGUvc2VydmljZXMvcm9sZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0Esd0NBQTJDO0FBQzNDLGlEQUEwQztBQUcxQyw4Q0FBcUM7QUFFckMsbURBQWlFO0FBQ2pFLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUV0QixZQUNtQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQy9CLENBQUM7SUFFUSxJQUFJO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDeEUsZUFBRyxDQUFDLENBQUMsUUFBaUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGFBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2pHLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQUxjO0lBQVoseUJBQVMsRUFBRTt1Q0FJWDtBQVZVLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtHQUNBLFdBQVcsQ0FXdkI7QUFYWSxrQ0FBVyJ9