"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const free_regular_svg_icons_1 = require("@fortawesome/free-regular-svg-icons");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
let StyleGuideComponent = class StyleGuideComponent {
    constructor(toastr) {
        this.toastr = toastr;
        this.config = [
            {
                type: 'checkbox',
                label: 'checkbox',
                name: 'Unchecked'
            },
            {
                type: 'checkbox',
                label: 'checkbox',
                name: 'checked',
                checked: true
            },
            {
                type: 'checkbox',
                label: 'checkbox',
                name: 'Disabled',
                disabled: true
            },
            {
                type: 'checkbox',
                label: 'checkbox',
                name: 'Checked & Disabled',
                checked: true,
                disabled: true
            }
        ];
        this.config1 = [
            {
                type: 'checkbox',
                label: 'checkbox',
                exType: 'radio',
                name: 'Unchecked'
            },
            {
                type: 'checkbox',
                label: 'checkbox',
                exType: 'radio',
                name: 'checked',
                checked: true
            },
            {
                type: 'checkbox',
                label: 'checkbox',
                exType: 'radio',
                name: 'Disabled',
                disabled: true
            },
            {
                type: 'checkbox',
                label: 'checkbox',
                name: 'Checked & Disabled',
                exType: 'radio',
                checked: true,
                disabled: true
            }
        ];
        this.config2 = [
            {
                type: 'input',
                label: 'Text',
                name: 'text',
                placeholder: 'Text'
            }
        ];
        this.config3 = [
            {
                type: 'textarea',
                label: 'Textarea',
                name: 'Textarea',
                placeholder: 'Textarea'
            }
        ];
        this.config4 = [
            {
                type: 'typeahead',
                name: 'role',
                placeholder: 'Single select',
                options: [{ id: 1, text: 'O1' }, { id: 2, text: 'O2' }, { id: 3, text: 'O3' }]
            }
        ];
        this.config5 = [
            {
                type: 'typeahead',
                exType: 'multiselect',
                name: 'surfaceLayers',
                placeholder: 'Multi select',
                options: [{ id: 1, text: 'O1' }, { id: 2, text: 'O2' }, { id: 3, text: 'O3' }]
            }
        ];
        this.icons = {
            faBell: free_regular_svg_icons_1.faBell,
            faSearch: free_solid_svg_icons_1.faSearch,
            faPlus: free_solid_svg_icons_1.faPlus,
            faTrashAlt: free_regular_svg_icons_1.faTrashAlt,
            faCog: free_solid_svg_icons_1.faCog,
            faCircle: free_regular_svg_icons_1.faCircle,
            faClock: free_regular_svg_icons_1.faClock,
            faSlidersH: free_solid_svg_icons_1.faSlidersH,
            faSitemap: free_solid_svg_icons_1.faSitemap,
            faTimes: free_solid_svg_icons_1.faTimes,
            faLongArrowAltLeft: free_solid_svg_icons_1.faLongArrowAltLeft,
            faAngleDown: free_solid_svg_icons_1.faAngleDown,
            faAngleUp: free_solid_svg_icons_1.faAngleUp,
            faMinus: free_solid_svg_icons_1.faMinus
        };
    }
    onTimeChange(e) {
        this.toastr.show(e.label, 'You Selected', {}, 'success');
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], StyleGuideComponent.prototype, "form", void 0);
StyleGuideComponent = __decorate([
    core_1.Component({
        selector: 'app-style-guide',
        templateUrl: './style-guide.component.html',
        styleUrls: ['./style-guide.component.scss']
    })
], StyleGuideComponent);
exports.StyleGuideComponent = StyleGuideComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtZ3VpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0eWxlLWd1aWRlL3N0eWxlLWd1aWRlL3N0eWxlLWd1aWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFxRDtBQUNyRCxpRUFBbUY7QUFDbkYsZ0ZBQTRGO0FBQzVGLDRFQVcyQztBQVMzQyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQWlIOUIsWUFDVSxNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBaEgvQixXQUFNLEdBQWtCO1lBQ3RCO2dCQUNFLElBQUksRUFBRSxVQUFVO2dCQUNoQixLQUFLLEVBQUUsVUFBVTtnQkFDakIsSUFBSSxFQUFFLFdBQVc7YUFDbEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRDtnQkFDRSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLElBQUksRUFBRSxVQUFVO2dCQUNoQixRQUFRLEVBQUUsSUFBSTthQUNmO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLEtBQUssRUFBRSxVQUFVO2dCQUNqQixJQUFJLEVBQUUsb0JBQW9CO2dCQUMxQixPQUFPLEVBQUUsSUFBSTtnQkFDYixRQUFRLEVBQUUsSUFBSTthQUNmO1NBQ0YsQ0FBQztRQUVGLFlBQU8sR0FBa0I7WUFDdkI7Z0JBQ0UsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLEtBQUssRUFBRSxVQUFVO2dCQUNqQixNQUFNLEVBQUUsT0FBTztnQkFDZixJQUFJLEVBQUUsV0FBVzthQUNsQjtZQUNEO2dCQUNFLElB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