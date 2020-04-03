"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = obj => {
    for (const propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
            // tslint:disable-next-line:no-dynamic-delete
            delete obj[propName];
        }
    }
    return obj;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqLWNsZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9oZWxwZXJzL29iai1jbGVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFO0lBQ3pCLEtBQUssTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO1FBQzFCLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssU0FBUyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDakYsNkNBQTZDO1lBQzdDLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RCO0tBQ0Y7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQyJ9