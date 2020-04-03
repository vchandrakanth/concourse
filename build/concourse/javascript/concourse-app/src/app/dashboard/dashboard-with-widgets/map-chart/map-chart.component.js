"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const echarts = require("echarts");
var registerMap = echarts.registerMap;
const mock_data_1 = require("src/app/dashboard/dashboard-with-widgets/map-chart/mock-data");
let MapChartComponent = class MapChartComponent {
    // TODO: remove after service will be done
    constructor() {
        this.latlong = {};
        this.max = -Infinity;
        this.min = Infinity;
        // show loading spinner:
        this.mapLoaded = false;
    }
    ngOnInit() {
        // hide loading:
        this.mapLoaded = true;
        // TODO: do refactor to applying theme
        const colors = {
            primary: '#b282fe',
            info: '#47a7f6',
            success: '#0174cd',
            warning: '#fee8ce',
            danger: '#faaf35'
        };
        this.bubbleTheme = {
            titleColor: '#003462',
            areaBorderColor: '#E8E8E8',
            areaColor: '#E8E8E8',
            areaHoverColor: '#E8E8E8'
        };
        registerMap('world', mock_data_1.worldMap);
        this.geoColors = [colors.primary, colors.info, colors.success, colors.warning, colors.danger];
        this.latlong = Object.create(mock_data_1.latlong);
        this.mapData = Object.create(mock_data_1.mapDataColored);
        this.mapData.forEach(itemOpt => {
            Object.defineProperty(itemOpt, 'color', { value: this.getRandomGeoColor(itemOpt), writable: false });
        });
        // TODO: remove after service will be done
        this.options = {
            title: {
                text: 'AWS and Azure regions',
                subtext: '* Two Azure Government Secret region locations undisclosed',
                left: 'center',
                top: '1px',
                textStyle: {
                    color: this.bubbleTheme.titleColor
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: params => `${params.name}: <br/>latitude: ${params.value[1]} <br/> longitude: ${params.value[0]}`
            },
            visualMap: {
                show: false,
                // min: 10,
                // max: 10,
                inRange: {
                    symbolSize: [8, 10]
                }
            },
            geo: {
                name: 'Test Map',
                type: 'map',
                map: 'world',
                emphasis: {
                    label: {
                        show: false,
                        areaColor: 'pink'
                    }
                },
                roam: true,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: this.bubbleTheme.areaColor,
                        borderColor: this.bubbleTheme.areaBorderColor
                    },
                    emphasis: {
                        areaColor: this.bubbleTheme.areaHoverColor
                    }
                },
                zoom: 2
            },
            series: [
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: this.mapData.map(itemOpt => ({
                        name: itemOpt.name,
                        value: [
                            this.latlong[itemOpt.code].longitude,
                            this.latlong[itemOpt.code].latitude,
                            itemOpt.value
                        ],
                        itemStyle: {
                            normal: {
                                color: itemOpt.color
                            }
                        }
                    })),
                    activeOpacity: 1,
                    label: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    symbolSize: 10,
                    // symbolSize: function (data) {
                    //     return Math.max(5, data[2] / 5);
                    // },
                    // Map pointer style
                    itemStyle: {
                        borderColor: '#fff'
                        // color: '#577ceb',
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                }
            ]
        };
    }
    ngOnDestroy() {
    }
    getRandomGeoColor(itemOpt) {
        // TODO: clear code
        if (itemOpt.type === 'azure') {
            const min = Math.ceil(0);
            const max = Math.floor(2);
            const index = Math.floor(Math.random() * (max - min + 1)) + min;
            return this.geoColors[index];
        }
        else if (itemOpt.status === 'announced') {
            return this.geoColors[3];
        }
    }
};
MapChartComponent = __decorate([
    core_1.Component({
        selector: 'app-map-chart',
        templateUrl: './map-chart.component.html',
        styleUrls: ['./map-chart.component.scss']
    })
], MapChartComponent);
exports.MapChartComponent = MapChartComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLXdpdGgtd2lkZ2V0cy9tYXAtY2hhcnQvbWFwLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBLHdDQUE2RDtBQUM3RCxtQ0FBbUM7QUFFbkMsSUFBTyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztBQUN6Qyw0RkFBaUg7QUFPakgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFZNUIsMENBQTBDO0lBQzFDO1FBWEEsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUdsQixRQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDaEIsUUFBRyxHQUFHLFFBQVEsQ0FBQztRQUVmLHdCQUF3QjtRQUN4QixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBSUYsQ0FBQztJQUVqQixRQUFRO1FBQ04sZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXRCLHNDQUFzQztRQUN0QyxNQUFNLE1BQU0sR0FBRztZQUNiLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLElBQUksRUFBRSxTQUFTO1lBQ2YsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLEdBQUc7WUFDakIsVUFBVSxFQUFFLFNBQVM7WUFDckIsZUFBZSxFQUFFLFNBQVM7WUFDMUIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsY0FBYyxFQUFFLFNBQVM7U0FDMUIsQ0FBQztRQUNGLFdBQVcsQ0FBQyxPQUFPLEVBQUUsb0JBQVEsQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxTQUFTLEdBQUcs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