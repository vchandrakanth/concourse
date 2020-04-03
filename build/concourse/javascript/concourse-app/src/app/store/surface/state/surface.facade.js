"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const selectors_1 = require("@concourse/store/selectors");
const surface_actions_1 = require("./surface.actions");
const query = require("./surface.selectors");
let SurfaceFacade = class SurfaceFacade {
    constructor(store) {
        this.store = store;
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.selected$ = this.store.pipe(store_1.select(query.getSelected));
        this.selectedWithRelated$ = this.store.pipe(store_1.select(selectors_1.getSelectedSurfaceWithRelated));
        this.selectedGroups$ = this.store.pipe(store_1.select(selectors_1.getSelectedOwningGroups, { permission: 'MANAGE_SURFACES' }));
        this.selectedId$ = this.store.pipe(store_1.select(query.getSelectedId));
    }
    getAll() {
        this.store.dispatch(new surface_actions_1.LoadSurfaces());
    }
    create(newSurface, createGroup) {
        this.store.dispatch(new surface_actions_1.CreateSurface({ newSurface, createGroup }));
    }
    getById(id) {
        this.store.dispatch(new surface_actions_1.LoadSurface(id));
    }
    delete(surface) {
        this.store.dispatch(new surface_actions_1.DeleteSurface(surface.id));
    }
    update(surface) {
        this.store.dispatch(new surface_actions_1.UpdateSurface(surface));
    }
};
SurfaceFacade = __decorate([
    core_1.Injectable()
], SurfaceFacade);
exports.SurfaceFacade = SurfaceFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvc3VyZmFjZS9zdGF0ZS9zdXJmYWNlLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsMERBQW9HO0FBQ3BHLHVEQU0yQjtBQUUzQiw2Q0FBNkM7QUFHN0MsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQVN4QixZQUNtQixLQUFtQjtRQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBVHRDLGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDM0QsVUFBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM5QyxjQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELHlCQUFvQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyx5Q0FBNkIsQ0FBQyxDQUFDLENBQUM7UUFDOUUsb0JBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsbUNBQXVCLEVBQUUsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEcsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFJdkQsQ0FBQztJQUVMLE1BQU07UUFDSixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDhCQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBNEIsRUFBRSxXQUFvQjtRQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLCtCQUFhLENBQUMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxPQUFPLENBQUMsRUFBVTtRQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDZCQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQWdCO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksK0JBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQWdCO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksK0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FFRixDQUFBO0FBakNZLGFBQWE7SUFEekIsaUJBQVUsRUFBRTtHQUNBLGFBQWEsQ0FpQ3pCO0FBakNZLHNDQUFhIn0=