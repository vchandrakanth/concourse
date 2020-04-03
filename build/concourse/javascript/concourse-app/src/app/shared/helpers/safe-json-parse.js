"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeJSONParse = (str) => {
    if (typeof str !== 'string') {
        return false;
    }
    try {
        const result = JSON.parse(str);
        return result;
    }
    catch (err) {
        return false;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmZS1qc29uLXBhcnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9oZWxwZXJzL3NhZmUtanNvbi1wYXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsYUFBYSxHQUFHLENBQUMsR0FBVyxFQUFPLEVBQUU7SUFDaEQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7UUFBRSxPQUFPLEtBQUssQ0FBQztLQUFFO0lBQzlDLElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDLENBQUMifQ==