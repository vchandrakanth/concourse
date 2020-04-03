"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const moment = require("moment");
let TimeRangeComponent = class TimeRangeComponent {
    constructor() {
        this.change = new core_1.EventEmitter();
        this.currentRange = {
            label: 'Last 7 Days',
            lookBackDays: 7,
            lookBackHours: 168
        };
        this.ranges = [
            {
                label: 'Today',
                lookBackDays: 1,
                lookBackHours: 24
            },
            {
                label: 'Since Yesterday',
                lookBackDays: 2,
                lookBackHours: 48
            },
            {
                label: 'Last 7 Days',
                lookBackDays: 7,
                lookBackHours: 168
            },
            {
                label: 'Last 14 Days',
                lookBackDays: 14,
                lookBackHours: 336
            },
            {
                label: 'Last 28 Days',
                lookBackDays: 28,
                lookBackHours: 672
            },
            {
                label: 'Last 90 Days',
                lookBackDays: 90,
                lookBackHours: 2160
            }
        ];
        // TODO: enable datepicker functionality
        // {
        //   label: 'Custom',
        //   lookBackDays: undefined,
        //   lookBackHours: undefined,
        //   date: undefined
        // }
        this.isActive = false;
        this.bsValue = new Date();
    }
    ngOnInit() {
        this.addDates();
        if (this.initialValue) {
            this.setInitialValue();
        }
    }
    setInitialValue() {
        const obj = Object.entries(this.initialValue)[0];
        const defaultRange = this.ranges.filter(x => x[obj[0]] === obj[1]);
        this.currentRange = defaultRange[0];
    }
    /**
     * adds lookback dates at runtime based on today's date
     */
    addDates() {
        this.ranges.forEach(x => x.date = moment().subtract(x.lookBackDays, 'days').format('YYYY-MM-DD'));
    }
    /**
     * Opens the datepicker
     */
    openDatePicker() {
        event.stopPropagation();
        this.isActive = true;
        this.datePicker.toggle();
    }
    /**
     * Closes the dropdown
     */
    closeDropDown() {
        this.isActive = false;
    }
    /**
     * Shows/Hides the dropdown
     */
    toggle() {
        event.stopPropagation();
        this.isActive = !this.isActive;
    }
    onSelectRange(range, $event) {
        if (range.label === 'Custom') {
            this.openDatePicker();
            return;
        }
        event.stopPropagation();
        this.currentRange = range;
        this.toggle();
        this.change.emit(this.currentRange);
    }
    onDatePickerChange(e) {
        if (!e) {
            return;
        }
        this.closeDropDown();
        const formattedDate = moment(e).format('YYYY-MM-DD');
        const customRange = this.ranges.filter(x => x.label === 'Custom')[0];
        customRange.date = formattedDate;
        this.currentRange = customRange;
    }
};
__decorate([
    core_1.Input()
], TimeRangeComponent.prototype, "initialValue", void 0);
__decorate([
    core_1.Output()
], TimeRangeComponent.prototype, "change", void 0);
__decorate([
    core_1.ViewChild('datePicker')
], TimeRangeComponent.prototype, "datePicker", void 0);
TimeRangeComponent = __decorate([
    core_1.Component({
        selector: 'app-time-range',
        templateUrl: './time-range.component.html',
        styleUrls: ['./time-range.component.scss']
    })
], TimeRangeComponent);
exports.TimeRangeComponent = TimeRangeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1yYW5nZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvdGltZS1yYW5nZS90aW1lLXJhbmdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwRjtBQUMxRixpQ0FBaUM7QUFRakMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFBL0I7UUFHcUIsV0FBTSxHQUFHLElBQUksbUJBQVksRUFBYSxDQUFDO1FBRzFELGlCQUFZLEdBQWM7WUFDeEIsS0FBSyxFQUFFLGFBQWE7WUFDcEIsWUFBWSxFQUFFLENBQUM7WUFDZixhQUFhLEVBQUUsR0FBRztTQUNuQixDQUFDO1FBRUYsV0FBTSxHQUFnQjtZQUNwQjtnQkFDRSxLQUFLLEVBQUUsT0FBTztnQkFDZCxZQUFZLEVBQUUsQ0FBQztnQkFDZixhQUFhLEVBQUUsRUFBRTthQUNsQjtZQUNEO2dCQUNFLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLFlBQVksRUFBRSxDQUFDO2dCQUNmLGFBQWEsRUFBRSxFQUFFO2FBQ2xCO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLFlBQVksRUFBRSxDQUFDO2dCQUNmLGFBQWEsRUFBRSxHQUFHO2FBQ25CO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLFlBQVksRUFBRSxFQUFFO2dCQUNoQixhQUFhLEVBQUUsR0FBRzthQUNuQjtZQUNEO2dCQUNFLEtBQUssRUFBRSxjQUFjO2dCQUNyQixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLEdBQUc7YUFDbkI7WUFDRDtnQkFDRSxLQUFLLEVBQUUsY0FBYztnQkFDckIsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLGFBQWEsRUFBRSxJQUFJO2FBQ3BCO1NBRUYs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