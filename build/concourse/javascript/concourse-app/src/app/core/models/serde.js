"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
/* tslint:disable:comment-type */
exports.PLUCK_PROPERTIES_KEY = 'serde:pluck_properties';
exports.EXCLUDED_PROPERTIES_KEY = 'serde:excluded_properties';
class Serde extends Object {
    removeableProperty(key) {
        return this.hasOwnProperty(key) && !(Reflect.getMetadata(exports.EXCLUDED_PROPERTIES_KEY, this) || []).includes(key);
    }
    recursiveSerialize(value) {
        if (helpers_1.Util.isArray(value)) {
            return value.map(v => v instanceof Serde ? v.serialize() : v);
        }
        return value instanceof Serde ? value.serialize() : value;
    }
    copyWith(input) {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this, input);
    }
    deserialize(input) {
        Object.assign(this, input);
        return this;
    }
    serialize() {
        const pluckProperties = Reflect.getMetadata(exports.PLUCK_PROPERTIES_KEY, this);
        return Object.entries(this)
            .filter(([key, value]) => this.removeableProperty(key))
            .reduce((obj, [key, value]) => {
            if (!!pluckProperties) {
                const properties = pluckProperties[key];
                if (!helpers_1.Util.isUndefined(properties)) {
                    if (helpers_1.Util.isArray(value)) {
                        obj[key] = helpers_1.Util.isArray(properties) ?
                            value.map(v => properties.reduce((nv, p) => (Object.assign(Object.assign({}, nv), { [p]: v[p] })), {})) :
                            value.map(v => v[properties]);
                    }
                    else {
                        obj[key] = helpers_1.Util.isArray(properties) ?
                            properties.reduce((nv, p) => (Object.assign(Object.assign({}, nv), { [p]: value[p] })), {}) :
                            value[properties];
                    }
                    return obj;
                }
            }
            obj[key] = this.recursiveSerialize(value);
            if (helpers_1.Util.isFunction(this.customSerialize)) {
                obj = this.customSerialize(obj);
            }
            return obj;
        }, {});
    }
}
exports.Serde = Serde;
class EntityMetadata extends Serde {
}
__decorate([
    Exclude()
], EntityMetadata.prototype, "created", void 0);
__decorate([
    Exclude()
], EntityMetadata.prototype, "createdBy", void 0);
__decorate([
    Exclude()
], EntityMetadata.prototype, "updated", void 0);
__decorate([
    Exclude()
], EntityMetadata.prototype, "updatedBy", void 0);
__decorate([
    Exclude()
], EntityMetadata.prototype, "createdByUser", void 0);
__decorate([
    Exclude()
], EntityMetadata.prototype, "updatedByUser", void 0);
exports.EntityMetadata = EntityMetadata;
class VersionedEntity extends EntityMetadata {
}
__decorate([
    Exclude()
], VersionedEntity.prototype, "majorVersion", void 0);
__decorate([
    Exclude()
], VersionedEntity.prototype, "minorVersion", void 0);
__decorate([
    Exclude()
], VersionedEntity.prototype, "lineageId", void 0);
__decorate([
    Exclude()
], VersionedEntity.prototype, "isLatest", void 0);
exports.VersionedEntity = VersionedEntity;
/* tslint:disable:variable-name only-arrow-functions */
/**
 * Adding this decorator prevents the property from being included in the object built by Serde.serialize()
 */
function Exclude() {
    return function (target, key) {
        Reflect.defineMetadata(exports.EXCLUDED_PROPERTIES_KEY, [
            ...Reflect.getMetadata(exports.EXCLUDED_PROPERTIES_KEY, target) || [],
            key
        ], target);
    };
}
exports.Exclude = Exclude;
/**
 * Adding this decorator allows for plucking out an T[] or {T: v}[]
 *
 * @param field  - use 'fieldName' when creating string|number[],
 * use ['fieldName'] when creating {[fieldName]: value}[]
 */
function Pluck(field) {
    return function (target, key) {
        Reflect.defineMetadata(exports.PLUCK_PROPERTIES_KEY, Object.assign(Object.assign({}, Reflect.getMetadata(exports.PLUCK_PROPERTIES_KEY, target) || {}), { [key]: field }), target);
    };
}
exports.Pluck = Pluck;
/* tslint:enable:variable-name */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RlbHMvc2VyZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx1REFBaUQ7QUFFakQsaUNBQWlDO0FBQ3BCLFFBQUEsb0JBQW9CLEdBQUcsd0JBQXdCLENBQUM7QUFDaEQsUUFBQSx1QkFBdUIsR0FBRywyQkFBMkIsQ0FBQztBQUVuRSxNQUFzQixLQUFTLFNBQVEsTUFBTTtJQUNqQyxrQkFBa0IsQ0FBQyxHQUFXO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQywrQkFBdUIsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0csQ0FBQztJQUVTLGtCQUFrQixDQUFDLEtBQVU7UUFDckMsSUFBSSxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxPQUFPLEtBQUssWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzVELENBQUM7SUFFRCxRQUFRLENBQWMsS0FBdUM7UUFDM0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDMUMsSUFBSSxFQUNKLEtBQUssQ0FDTixDQUFDO0lBQ0osQ0FBQztJQU1ELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsU0FBUztRQUNQLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsNEJBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUN4QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3RELE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxDQUFDLGVBQWUsRUFBRTtnQkFDckIsTUFBTSxVQUFVLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsY0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDakMsSUFBSSxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzRCQUNuQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLGlDQUFNLEVBQUUsS0FBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3FCQUNqQzt5QkFBTTt3QkFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzRCQUNuQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsaUNBQU0sRUFBRSxLQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDOUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUNyQjtvQkFDRCxPQUFPLEdBQUcsQ0FBQztpQkFDWjthQUNGO1lBQ0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxJQUFJLGNBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUN6QyxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqQztZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxFQUFFLEVBQWdCLENBQUMsQ0FBQztJQUN6QixDQUFDO0NBRUY7QUF6REQsc0JBeURDO0FBRUQsTUFBYSxjQUFrQixTQUFRLEtBQVE7Q0FROUM7QUFOWTtJQUFWLE9BQU8sRUFBRTsrQ0FBZTtBQUNkO0lBQVYsT0FBTyxFQUFFO2lEQUFvQjtBQUNuQjtJQUFWLE9BQU8sRUFBRTsrQ0FBZTtBQUNkO0lBQVYsT0FBTyxFQUFFO2lEQUFvQjtBQUNuQjtJQUFWLE9BQU8sRUFBRTtxREFBZ0I7QUFDZjtJQUFWLE9BQU8sRUFBRTtxREFBZ0I7QUFQNUIsd0NBUUM7QUFFRCxNQUFhLGVBQW1CLFNBQVEsY0FBaUI7Q0FLeEQ7QUFKWTtJQUFWLE9BQU8sRUFBRTtxREFBc0I7QUFDckI7SUFBVixPQUFPLEVBQUU7cURBQXNCO0FBQ3JCO0lBQVYsT0FBTyxFQUFFO2tEQUFtQjtBQUNsQjtJQUFWLE9BQU8sRUFBRTtpREFBbUI7QUFKL0IsMENBS0M7QUFFRCx1REFBdUQ7QUFDdkQ7O0dBRUc7QUFDSCxTQUFnQixPQUFPO0lBQ3JCLE9BQU8sVUFBVSxNQUFXLEVBQUUsR0FBVztRQUN2QyxPQUFPLENBQUMsY0FBYyxDQUNwQiwrQkFBdUIsRUFDdkI7WUFDRSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsK0JBQXVCLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRTtZQUM3RCxHQUFHO1NBQ0osRUFDRCxNQUFNLENBQ1AsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUM7QUFYRCwwQkFXQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsS0FBSyxDQUFDLEtBQXdCO0lBQzVDLE9BQU8sVUFBVSxNQUFXLEVBQUUsR0FBVztRQUN2QyxPQUFPLENBQUMsY0FBYyxDQUFDLDRCQUFvQixrQ0FDdEMsT0FBTyxDQUFDLFdBQVcsQ0FBQyw0QkFBb0IsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQ3ZELEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FDbEIsTUFBTSxDQUFDLENBQUM7SUFDYixDQUFDLENBQUM7QUFDSixDQUFDO0FBUEQsc0JBT0M7QUFFRCxpQ0FBaUMifQ==