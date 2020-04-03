"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const operators_1 = require("rxjs/operators");
let ModifySurfaceLayersComponent = class ModifySurfaceLayersComponent {
    constructor(fb, policyGroupFacade, surfaceLayerFacade) {
        this.fb = fb;
        this.policyGroupFacade = policyGroupFacade;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.policyGroup$ = this.policyGroupFacade.selectedWithRelated$;
        this.surfaceLayers$ = this.surfaceLayerFacade.listWithChildrenBySurface$;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.form = this.fb.group({
            surfaceLayers: [undefined]
        });
    }
    ngOnInit() {
        this.policyGroup$.pipe(operators_1.take(1)).subscribe(policyGroup => {
            this.form.get('surfaceLayers').patchValue(policyGroup.surfaceLayers);
        });
    }
    submit(pg) {
        if (this.form.valid) {
            this.policyGroupFacade.updateRelated(pg.copyWith({
                surfaceLayerIds: [...this.form.value.surfaceLayers.map(sl => sl.id)],
                status: 'DRAFT'
            }));
        }
    }
};
ModifySurfaceLayersComponent = __decorate([
    core_1.Component({
        selector: 'app-surface-layers',
        templateUrl: './modify-surface-layers.component.html',
        styleUrls: ['./modify-surface-layers.component.scss']
    })
], ModifySurfaceLayersComponent);
exports.ModifySurfaceLayersComponent = ModifySurfaceLayersComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LXN1cmZhY2UtbGF5ZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvbW9kaWZ5LXN1cmZhY2UtbGF5ZXJzL21vZGlmeS1zdXJmYWNlLWxheWVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFFbEQsdUVBQW9FO0FBRXBFLDhDQUFzQztBQVV0QyxJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE0QjtJQVF2QyxZQUNtQixFQUFlLEVBQ2YsaUJBQW9DLEVBQ3BDLGtCQUFzQztRQUZ0QyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBVnpELGlCQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDO1FBQzNELG1CQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDBCQUEwQixDQUFDO1FBQzNELFVBQUssR0FBRyxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLENBQUM7UUFDN0IsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUMzQixDQUFDLENBQUM7SUFNQyxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUNwQixnQkFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQWU7UUFDcEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQy9DLGVBQWUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEUsTUFBTSxFQUFFLE9BQU87YUFDaEIsQ0FBQyxDQUFDLENBQUM7U0FDTDtJQUNILENBQUM7Q0FDRixDQUFBO0FBOUJZLDRCQUE0QjtJQUx4QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixXQUFXLEVBQUUsd0NBQXdDO1FBQ3JELFNBQVMsRUFBRSxDQUFDLHdDQUF3QyxDQUFDO0tBQ3RELENBQUM7R0FDVyw0QkFBNEIsQ0E4QnhDO0FBOUJZLG9FQUE0QiJ9