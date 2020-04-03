"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let EntityMetadataPipe = class EntityMetadataPipe {
    constructor(versionTextPipe) {
        this.versionTextPipe = versionTextPipe;
    }
    transform(entity, id) {
        let entityString = '';
        entityString += `${id || entity.id}`;
        entityString += entity.status ? ` | ${entity.status}` : '';
        entityString += typeof entity.isLatest !== 'undefined' && entity.isLatest ? ' | latest' : '';
        entityString += typeof entity.majorVersion !== 'undefined' ? ` | ${this.versionTextPipe.transform(entity)}` : '';
        return entityString;
    }
};
EntityMetadataPipe = __decorate([
    core_1.Pipe({
        name: 'entityMetadata'
    })
], EntityMetadataPipe);
exports.EntityMetadataPipe = EntityMetadataPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LW1ldGFkYXRhLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BpcGVzL2VudGl0eS1tZXRhZGF0YS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQW9EO0FBTXBELElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBRTdCLFlBQ21CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUMvQyxDQUFDO0lBRUwsU0FBUyxDQUFDLE1BQVcsRUFBRSxFQUFXO1FBQ2hDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN0QixZQUFZLElBQUksR0FBRyxFQUFFLElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3JDLFlBQVksSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNELFlBQVksSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzdGLFlBQVksSUFBSSxPQUFPLE1BQU0sQ0FBQyxZQUFZLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqSCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0NBRUYsQ0FBQTtBQWZZLGtCQUFrQjtJQUg5QixXQUFJLENBQUM7UUFDSixJQUFJLEVBQUUsZ0JBQWdCO0tBQ3ZCLENBQUM7R0FDVyxrQkFBa0IsQ0FlOUI7QUFmWSxnREFBa0IifQ==