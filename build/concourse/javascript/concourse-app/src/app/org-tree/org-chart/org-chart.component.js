"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faMinusCircle_1 = require("@fortawesome/free-solid-svg-icons/faMinusCircle");
const faPlus_1 = require("@fortawesome/free-solid-svg-icons/faPlus");
const faPlusCircle_1 = require("@fortawesome/free-solid-svg-icons/faPlusCircle");
const operators_1 = require("rxjs/operators");
const modal_1 = require("@concourse/core/modal");
let OrgChartComponent = class OrgChartComponent {
    constructor(modalFacade, surfaceLayerFacade, pzService) {
        this.modalFacade = modalFacade;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.pzService = pzService;
        this.nodes$ = this.surfaceLayerFacade.listWithChildrenBySurface$;
        this.selectedId$ = this.surfaceLayerFacade.selectedWithRelated$.pipe(operators_1.map(node => node ? node.id : undefined));
        this.icons = { faMinusCircle: faMinusCircle_1.faMinusCircle, faPlus: faPlus_1.faPlus, faPlusCircle: faPlusCircle_1.faPlusCircle };
    }
    ngOnInit() {
        this.pzService.panzoom(this.container.nativeElement, {
            zoomDoubleClickSpeed: 1,
            maxZoom: 1.5,
            minZoom: 0.65,
            bounds: {
                top: 200,
                left: 400,
                right: 1200,
                bottom: 1000
            },
            onDoubleClick: _ => false
        });
    }
    trackNodes(_index, node) {
        return node.id;
    }
    nodeSelect(surfaceLayer) {
        this.surfaceLayerFacade.select(surfaceLayer.id);
    }
    collapseTree(surfaceLayer, $event) {
        if ($event) {
            $event.stopPropagation();
        }
        this.surfaceLayerFacade.collapse(surfaceLayer.id);
    }
    addChildNode(surfLayer) {
        this.modalFacade.openModal({
            component: modal_1.CreateNodeComponent,
            id: 'create-org-node',
            options: {
                class: 'modal-lg',
                initialState: {
                    surfaceLayer: surfLayer
                }
            }
        });
    }
};
__decorate([
    core_1.ViewChild('container')
], OrgChartComponent.prototype, "container", void 0);
OrgChartComponent = __decorate([
    core_1.Component({
        selector: 'app-org-chart',
        templateUrl: './org-chart.component.html',
        styleUrls: ['./org-chart.component.scss']
    })
], OrgChartComponent);
exports.OrgChartComponent = OrgChartComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9vcmctdHJlZS9vcmctY2hhcnQvb3JnLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5RTtBQUN6RSxtRkFBZ0Y7QUFDaEYscUVBQWtFO0FBQ2xFLGlGQUE4RTtBQUM5RSw4Q0FBcUM7QUFFckMsaURBQTREO0FBVTVELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBUTVCLFlBQ21CLFdBQTZCLEVBQzdCLGtCQUFzQyxFQUN0QyxTQUF5QjtRQUZ6QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxjQUFTLEdBQVQsU0FBUyxDQUFnQjtRQVQ1QyxXQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDBCQUEwQixDQUFDO1FBQzVELGdCQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FDN0QsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FDeEMsQ0FBQztRQUNPLFVBQUssR0FBRyxFQUFFLGFBQWEsRUFBYiw2QkFBYSxFQUFFLE1BQU0sRUFBTixlQUFNLEVBQUUsWUFBWSxFQUFaLDJCQUFZLEVBQUUsQ0FBQztJQU1yRCxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFO1lBQ25ELG9CQUFvQixFQUFFLENBQUM7WUFDdkIsT0FBTyxFQUFFLEdBQUc7WUFDWixPQUFPLEVBQUUsSUFBSTtZQUNiLE1BQU0sRUFBRTtnQkFDTixHQUFHLEVBQUUsR0FBRztnQkFDUixJQUFJLEVBQUUsR0FBRztnQkFDVCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxNQUFNLEVBQUUsSUFBSTthQUNiO1lBQ0QsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSztTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWMsRUFBRSxJQUFrQjtRQUMzQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELFVBQVUsQ0FBQyxZQUEwQjtRQUNuQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsWUFBWSxDQUFDLFlBQTBCLEVBQUUsTUFBYztRQUNyRCxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxZQUFZLENBQUMsU0FBdUI7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDekIsU0FBUyxFQUFFLDJCQUFtQjtZQUM5QixFQUFFLEVBQUUsaUJBQWlCO1lBQ3JCLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsVUFBVTtnQkFDakIsWUFBWSxFQUFFO29CQUNaLFlBQVksRUFBRSxTQUFTO2lCQUN4QjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUF2RHlCO0lBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO29EQUF1QjtBQURuQyxpQkFBaUI7SUFMN0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7S0FDMUMsQ0FBQztHQUNXLGlCQUFpQixDQXdEN0I7QUF4RFksOENBQWlCIn0=