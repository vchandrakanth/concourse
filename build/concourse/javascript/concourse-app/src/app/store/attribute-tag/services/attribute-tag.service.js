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
let AttributeTagService = class AttributeTagService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'attribute-tags')).pipe(operators_1.map((response) => response.content.map(item => new models_1.AttributeTag().deserialize(item))));
    }
    paginatedList(size = '200', page = '0', sort = 'id,DESC') {
        const params = new http_1.HttpParams()
            .set('size', size)
            .set('page', page)
            .set('sort', sort);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'attribute-tags'), { params }).pipe(operators_1.map((response) => ({
            attributeTags: response.content.map(item => (new models_1.AttributeTag().deserialize(item))),
            hasNextLink: this.hasNextLink(response)
        })));
    }
    get(attributeTagId) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `attribute-tags/${attributeTagId}`)).pipe(operators_1.map(response => new models_1.AttributeTag().deserialize(response)));
    }
    create(payload) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'attribute-tags'), payload).pipe(operators_1.map(response => new models_1.AttributeTag().deserialize(response)));
    }
    update(attributeTag) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `attribute-tags/${attributeTag.id}`), attributeTag.serialize()).pipe(operators_1.map(response => new models_1.AttributeTag().deserialize(response)));
    }
    delete(attributeTagId) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `attribute-tags/${attributeTagId}`)).pipe(operators_1.map(response => response));
    }
    hasNextLink(pagination) {
        return pagination.links.filter(link => link.rel === 'next').length > 0;
    }
};
AttributeTagService = __decorate([
    core_1.Injectable()
], AttributeTagService);
exports.AttributeTagService = AttributeTagService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLXRhZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F0dHJpYnV0ZS10YWcvc2VydmljZXMvYXR0cmlidXRlLXRhZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQXlFO0FBQ3pFLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFDOUIsWUFDbUIsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUMvQixDQUFDO0lBRUwsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDbEYsZUFBRyxDQUFDLENBQUMsUUFBeUMsRUFBRSxFQUFFLENBQ2hELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxxQkFBWSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ25FLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsR0FBRyxFQUFFLElBQUksR0FBRyxTQUFTO1FBRXRELE1BQU0sTUFBTSxHQUFlLElBQUksaUJBQVUsRUFBRTthQUN4QyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzthQUNqQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzthQUNqQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJC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