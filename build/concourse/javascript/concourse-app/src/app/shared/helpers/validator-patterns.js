"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATOR_PATTERNS = (type) => {
    const regexp = {
        BOOLEAN: /^(true|false)$/g,
        STRING: /./g,
        DOUBLE: /([+-]?[0-9]+(?:\.[0-9]*)?)/gm,
        INTEGER: /([+-]?[0-9]+(?:\.[0-9]*)?)/gm,
        LONG: /^-?\d{1,19}$/,
        CIDR_BLOCK: /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/
    };
    return regexp[type];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLXBhdHRlcm5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9oZWxwZXJzL3ZhbGlkYXRvci1wYXR0ZXJucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVhLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxJQUFjLEVBQVUsRUFBRTtJQUMzRCxNQUFNLE1BQU0sR0FBa0M7UUFDNUMsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSw4QkFBOEI7UUFDdEMsT0FBTyxFQUFFLDhCQUE4QjtRQUN2QyxJQUFJLEVBQUUsY0FBYztRQUNwQixVQUFVLEVBQUUsNkRBQTZEO0tBQzFFLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDLENBQUMifQ==