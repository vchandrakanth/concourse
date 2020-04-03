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
let NotificationService = class NotificationService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'notifications')).pipe(operators_1.map((response) => response.content.map(item => (new models_1.Notification().deserialize(item)))));
    }
    get(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `notifications/${id}`)).pipe(operators_1.map(response => new models_1.Notification().deserialize(response)));
    }
    dismiss(id) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `notifications/${id}/dismiss`), id).pipe(operators_1.map(response => response));
    }
    dismissAll() {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'notifications/dismiss-all'), {}).pipe(operators_1.map(response => response));
    }
};
NotificationService = __decorate([
    core_1.Injectable()
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9ub3RpZmljYXRpb24vc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSx3Q0FBMkM7QUFHM0MsOENBQXFDO0FBRXJDLG1EQUF5RTtBQUN6RSxtREFBdUQ7QUFDdkQsdURBQWdFO0FBR2hFLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBQzlCLFlBQ1UsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUN0QixDQUFDO0lBRUwsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3BGLGVBQUcsQ0FBQyxDQUFDLFFBQXlDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDOUUsSUFBSSxxQkFBWSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUNyQyxDQUFDLENBQUMsQ0FDSixDQUFDO0lBQ0osQ0FBQztJQUVELEdBQUcsQ0FBQyxFQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDMUYsZUFBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxxQkFBWSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQzFELENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTyxDQUFDLEVBQVU7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ3ZHLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQWUsQ0FBQyxDQUNqQyxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsUUFBUSxFQUFFLDJCQUEyQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNyRyxlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFlLENBQUMsQ0FDakMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBOUJZLG1CQUFtQjtJQUQvQixpQkFBVSxFQUFFO0dBQ0EsbUJBQW1CLENBOEIvQjtBQTlCWSxrREFBbUIifQ==