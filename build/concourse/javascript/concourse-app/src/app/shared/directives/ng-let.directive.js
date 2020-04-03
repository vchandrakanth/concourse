"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class NgLetContext {
    constructor() {
        this.$implicit = undefined;
        this.ngLet = undefined;
    }
}
exports.NgLetContext = NgLetContext;
let NgLetDirective = class NgLetDirective {
    constructor(_vcr, _templateRef) {
        this._vcr = _vcr;
        this._templateRef = _templateRef;
        this._context = new NgLetContext();
    }
    set ngLet(value) {
        this._context.$implicit = this._context.ngLet = value;
    }
    ngOnInit() {
        this._vcr.createEmbeddedView(this._templateRef, this._context);
    }
};
__decorate([
    core_1.Input()
], NgLetDirective.prototype, "ngLet", null);
NgLetDirective = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[ngLet]'
    })
], NgLetDirective);
exports.NgLetDirective = NgLetDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZGlyZWN0aXZlcy9uZy1sZXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBTXVCO0FBRXZCLE1BQWEsWUFBWTtJQUF6QjtRQUNFLGNBQVMsR0FBUSxTQUFTLENBQUM7UUFDM0IsVUFBSyxHQUFRLFNBQVMsQ0FBQztJQUN6QixDQUFDO0NBQUE7QUFIRCxvQ0FHQztBQU1ELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFRekIsWUFDbUIsSUFBc0IsRUFDdEIsWUFBdUM7UUFEdkMsU0FBSSxHQUFKLElBQUksQ0FBa0I7UUFDdEIsaUJBQVksR0FBWixZQUFZLENBQTJCO1FBVHpDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBVTNDLENBQUM7SUFQTCxJQUFJLEtBQUssQ0FBQyxLQUFVO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN4RCxDQUFDO0lBT0QsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakUsQ0FBQztDQUNGLENBQUE7QUFaQztJQURDLFlBQUssRUFBRTsyQ0FHUDtBQU5VLGNBQWM7SUFKMUIsZ0JBQVMsQ0FBQztRQUNULDhDQUE4QztRQUM5QyxRQUFRLEVBQUUsU0FBUztLQUNwQixDQUFDO0dBQ1csY0FBYyxDQWdCMUI7QUFoQlksd0NBQWMifQ==