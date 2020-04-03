"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const faMinusSquare_1 = require("@fortawesome/free-solid-svg-icons/faMinusSquare");
const faPlusSquare_1 = require("@fortawesome/free-solid-svg-icons/faPlusSquare");
const helpers_1 = require("@concourse/shared/helpers");
// tslint:disable-next-line:no-forward-ref
exports._componentFactory = core_1.forwardRef(() => SurfaceLayerTreeSelectorComponent);
let SurfaceLayerTreeSelectorComponent = class SurfaceLayerTreeSelectorComponent {
    constructor() {
        this.multiSelect = false;
        this.selectedSurfaceLayers = new Map();
        this.collapsedSurfaceLayers = new Set();
        this._surfaceLayersList = new Map();
        this.icons = { faMinusSquare: faMinusSquare_1.faMinusSquare, faPlusSquare: faPlusSquare_1.faPlusSquare };
        this.propagateChange = (_) => { };
    }
    set surfaceLayers(surfaceLayers) {
        this._surfaceLayers = surfaceLayers;
        this.setSurfaceLayersList(surfaceLayers);
    }
    get surfaceLayers() {
        return this._surfaceLayers;
    }
    get value() {
        let array = Array.from(this.selectedSurfaceLayers.values());
        if (!helpers_1.Util.isUndefined(this.returnValue)) {
            array = array.map(a => a[this.returnValue]);
        }
        return this.multiSelect ? array : array.pop();
    }
    ngOnInit() {
        this.selectedSurfaceLayers.clear();
        this.collapsedSurfaceLayers.clear();
        this.collapseAllSurfaceLayers();
    }
    writeValue(value) {
        if (!helpers_1.Util.isNullOrUndefined(value)) {
            if (helpers_1.Util.isArray(value)) {
                value.forEach(sl => {
                    const id = helpers_1.Util.isNullOrUndefined(sl.id) ? sl : sl.id;
                    this.selectedSurfaceLayers.set(id, this._surfaceLayersList.get(id));
                });
            }
            else {
                this.selectedSurfaceLayers.set(value.id, this._surfaceLayersList.get(value.id));
            }
            this.propagateChange(this.value);
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    trackNodes(_index, node) {
        return node.id;
    }
    setSurfaceLayersList(surfaceLayers) {
        surfaceLayers.forEach(layer => {
            this._surfaceLayersList.set(layer.id, layer);
            if (layer.children) {
                this.setSurfaceLayersList(layer.children);
            }
        });
    }
    selectSurfaceLayer(surfaceLayer) {
        if (this.selectedSurfaceLayers.has(surfaceLayer.id)) {
            this.selectedSurfaceLayers.delete(surfaceLayer.id);
        }
        else {
            if (!this.multiSelect) {
                this.selectedSurfaceLayers.clear();
            }
            this.selectedSurfaceLayers.set(surfaceLayer.id, surfaceLayer);
        }
        this.propagateChange(this.value);
    }
    isCollapsed(surfaceLayerId) {
        return this.collapsedSurfaceLayers.has(surfaceLayerId);
    }
    toggleTreeCollapse(surfaceLayer) {
        if (this.collapsedSurfaceLayers.has(surfaceLayer.id)) {
            this.collapsedSurfaceLayers.delete(surfaceLayer.id);
        }
        else {
            this.collapsedSurfaceLayers.add(surfaceLayer.id);
        }
    }
    collapseAllSurfaceLayers() {
        if (!this.surfaceLayers) {
            return;
        }
        this.collapsedSurfaceLayers = new Set(this.surfaceLayers.map(l => l.id));
    }
    isSelected(id) {
        return this.selectedSurfaceLayers.has(id);
    }
};
__decorate([
    core_1.Input()
], SurfaceLayerTreeSelectorComponent.prototype, "surfaceLayers", null);
__decorate([
    core_1.Input()
], SurfaceLayerTreeSelectorComponent.prototype, "selectedPolicyGroup", void 0);
__decorate([
    core_1.Input()
], SurfaceLayerTreeSelectorComponent.prototype, "multiSelect", void 0);
__decorate([
    core_1.Input()
], SurfaceLayerTreeSelectorComponent.prototype, "returnValue", void 0);
SurfaceLayerTreeSelectorComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'surface-layer-tree-selector',
        templateUrl: './surface-layer-tree-selector.component.html',
        styleUrls: ['./surface-layer-tree-selector.component.scss'],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: exports._componentFactory,
                multi: true
            }
        ]
    })
], SurfaceLayerTreeSelectorComponent);
exports.SurfaceLayerTreeSelectorComponent = SurfaceLayerTreeSelectorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS1sYXllci10cmVlLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZm9ybS1jb21wb25lbnRzL3N1cmZhY2UtbGF5ZXItdHJlZS1zZWxlY3Rvci9zdXJmYWNlLWxheWVyLXRyZWUtc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXFFO0FBQ3JFLDBDQUF5RTtBQUN6RSxtRkFBZ0Y7QUFDaEYsaUZBQThFO0FBRzlFLHVEQUFpRDtBQU1qRCwwQ0FBMEM7QUFDN0IsUUFBQSxpQkFBaUIsR0FBRyxpQkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFlckYsSUFBYSxpQ0FBaUMsR0FBOUMsTUFBYSxpQ0FBaUM7SUFBOUM7UUFVVyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUU3QiwwQkFBcUIsR0FBd0MsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQVV2RSwyQkFBc0IsR0FBZ0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNoRCx1QkFBa0IsR0FBd0MsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUUzRCxVQUFLLEdBQUcsRUFBRSxhQUFhLEVBQWIsNkJBQWEsRUFBRSxZQUFZLEVBQVosMkJBQVksRUFBRSxDQUFDO1FBQ2pELG9CQUFlLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQTZFcEMsQ0FBQztJQXRHVSxJQUFJLGFBQWEsQ0FBQyxhQUF1QztRQUNoRSxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUNwQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNELElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLGNB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