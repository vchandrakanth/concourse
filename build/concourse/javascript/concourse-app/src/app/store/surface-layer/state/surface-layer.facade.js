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
const router_actions_1 = require("@concourse/core/router/router.actions");
const selectors_1 = require("@concourse/store/selectors");
const surface_layer_actions_1 = require("./surface-layer.actions");
const query = require("./surface-layer.selectors");
let SurfaceLayerFacade = class SurfaceLayerFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.entities$ = this.store.pipe(store_1.select(query.getEntities));
        this.count$ = this.store.pipe(store_1.select(query.getSurfaceLayerCount));
        this.selectedWithRelated$ = this.store.pipe(store_1.select(selectors_1.getSelectedSurfaceLayerWithRelated));
        this.selectedWithChildren$ = this.store.pipe(store_1.select(selectors_1.getSelectedSurfaceLayerWithChildren));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
        this.listWithChildrenBySurface$ = this.store.pipe(store_1.select(selectors_1.getSurfaceLayersWithChildren));
        this.listBySurface$ = this.store.pipe(store_1.select(selectors_1.getAllSurfaceLayersBySurfaceId));
        this.selectedGroups$ = this.store.pipe(store_1.select(selectors_1.getSelectedOwningGroups, { permission: 'MANAGE_SURFACES' }));
    }
    create(surfaceLayer) {
        this.store.dispatch(new surface_layer_actions_1.AddSurfaceLayer(surfaceLayer));
    }
    update(surfaceLayer) {
        this.store.dispatch(new surface_layer_actions_1.UpdateSurfaceLayer(surfaceLayer));
    }
    remove(surfaceLayer) {
        this.store.dispatch(new surface_layer_actions_1.RemoveSurfaceLayer(surfaceLayer));
    }
    select(id) {
        if (id) {
            this.store.dispatch(new router_actions_1.RouterGo({ path: [`surfaces/${id}`] }));
        }
        else {
            this.store.dispatch(new router_actions_1.RouterGo({ path: ['surfaces'] }));
        }
    }
    collapse(id) {
        this.store.dispatch(new surface_layer_actions_1.ToggleCollapsedSurfaceLayer(id));
    }
};
SurfaceLayerFacade = __decorate([
    core_1.Injectable()
], SurfaceLayerFacade);
exports.SurfaceLayerFacade = SurfaceLayerFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS1sYXllci5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvc3VyZmFjZS1sYXllci9zdGF0ZS9zdXJmYWNlLWxheWVyLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsMEVBQWlFO0FBQ2pFLDBEQU1vQztBQUNwQyxtRUFLaUM7QUFFakMsbURBQW1EO0FBR25ELElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBWTdCLFlBQ21CLEtBQW1CO1FBQW5CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFadEMsVUFBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM5QyxjQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELFdBQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUM3RCx5QkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsOENBQWtDLENBQUMsQ0FBQyxDQUFDO1FBQ25GLDBCQUFxQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQywrQ0FBbUMsQ0FBQyxDQUFDLENBQUM7UUFDckYsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RCxnQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUMzRCwrQkFBMEIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsd0NBQTRCLENBQUMsQ0FBQyxDQUFDO1FBQ25GLG1CQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLDBDQUE4QixDQUFDLENBQUMsQ0FBQztRQUN6RSxvQkFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxtQ0FBdUIsRUFBRSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUlsRyxDQUFDO0lBRUwsTUFBTSxDQUFDLFlBQW1DO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksdUNBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxNQUFNLENBQUMsWUFBbUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwwQ0FBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxNQUFNLENBQUMsWUFBMEI7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwwQ0FBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxNQUFNLENBQUMsRUFBVTtRQUNmLElBQUksRUFBRSxFQUFFO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSx5QkFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHlCQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsRUFBVTtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLG1EQUEyQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUNGLENBQUE7QUF2Q1ksa0JBQWtCO0lBRDlCLGlCQUFVLEVBQUU7R0FDQSxrQkFBa0IsQ0F1QzlCO0FBdkNZLGdEQUFrQiJ9