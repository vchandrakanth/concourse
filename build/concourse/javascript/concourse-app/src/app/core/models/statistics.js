"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const serde_1 = require("./serde");
class ChartResponse extends serde_1.Serde {
    deserialize(input) {
        Object.assign(this, input);
        return this;
    }
}
exports.ChartResponse = ChartResponse;
class ChartResponseArrayItem {
}
exports.ChartResponseArrayItem = ChartResponseArrayItem;
class ChartData extends serde_1.Serde {
    get hasSeriesData() {
        return this.data.filter(d => d.isSeries).length > 0;
    }
    deserialize(input) {
        Object.assign(this, input);
        if (!helpers_1.Util.isUndefined(input.data)) {
            this.data = input.data.map(d => new ChartItem().deserialize(d));
        }
        return this;
    }
}
exports.ChartData = ChartData;
class ChartItem extends serde_1.Serde {
    get isSeries() {
        return !helpers_1.Util.isUndefined(this.series) && helpers_1.Util.isArray(this.series);
    }
    deserialize(input) {
        Object.assign(this, input);
        if (!helpers_1.Util.isUndefined(input.series)) {
            this.series = input.series.map(d => new ChartItem().deserialize(d));
        }
        return this;
    }
}
exports.ChartItem = ChartItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGlzdGljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGVscy9zdGF0aXN0aWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQWlEO0FBQ2pELG1DQUFnQztBQUVoQyxNQUFhLGFBQWMsU0FBUSxhQUFvQjtJQUlyRCxXQUFXLENBQUMsS0FBSztRQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTNCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBVEQsc0NBU0M7QUFJRCxNQUFhLHNCQUFzQjtDQUlsQztBQUpELHdEQUlDO0FBRUQsTUFBYSxTQUFVLFNBQVEsYUFBZ0I7SUFLN0MsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqRTtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBaEJELDhCQWdCQztBQUVELE1BQWEsU0FBVSxTQUFRLGFBQWdCO0lBUTdDLElBQUksUUFBUTtRQUNWLE9BQU8sQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckU7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQW5CRCw4QkFtQkMifQ==