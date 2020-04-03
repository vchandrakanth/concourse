"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let VersionTextPipe = class VersionTextPipe {
    transform(entity) {
        if (!entity) {
            return '';
        }
        const { majorVersion, minorVersion } = entity;
        if (!majorVersion && !minorVersion) {
            return '--';
        }
        return `v${majorVersion}.${minorVersion}`;
    }
};
VersionTextPipe = __decorate([
    core_1.Pipe({
        name: 'versionText'
    })
], VersionTextPipe);
exports.VersionTextPipe = VersionTextPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi10ZXh0LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BpcGVzL3ZlcnNpb24tdGV4dC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQW9EO0FBS3BELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFFMUIsU0FBUyxDQUFDLE1BQVc7UUFDbkIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLElBQUksWUFBWSxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQzVDLENBQUM7Q0FDRixDQUFBO0FBWlksZUFBZTtJQUgzQixXQUFJLENBQUM7UUFDSixJQUFJLEVBQUUsYUFBYTtLQUNwQixDQUFDO0dBQ1csZUFBZSxDQVkzQjtBQVpZLDBDQUFlIn0=