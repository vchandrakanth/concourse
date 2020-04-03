"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UtilMath {
    static trimArray(arr) {
        for (let index = 0; index < arr.length; index++) {
            arr[index] =
                arr[index]
                    .replace(/^\s\s*/, '')
                    .replace(/\s\s*$/, '');
        }
        return arr;
    }
    static randomFixedInteger(length) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    }
    /**
     * Returns dd MMM yyyy as 8  Mar 2019
     * @returns {string}
     */
    static getTodayDate(addDays = 0) {
        const today = new Date();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        today.setDate(today.getDate() + addDays);
        return `${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
    }
    /**
     * This JavaScript function always returns a random number between min and max (both included):
     * @param min
     * @param max
     * @returns {any}
     */
    static getRandomInteger(min = 1, max = 999) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static cleanArray(arr) {
        const newArray = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                newArray.push(arr[i]);
            }
        }
        return newArray;
    }
}
exports.UtilMath = UtilMath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHNNYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9lMmUvc3JjL3V0aWxzL3V0aWxzTWF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQWEsUUFBUTtJQUNqQixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQWE7UUFDMUIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDN0MsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDTixHQUFHLENBQUMsS0FBSyxDQUFDO3FCQUNMLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO3FCQUNyQixPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBR0QsTUFBTSxDQUFDLGtCQUFrQixDQUFFLE1BQU07UUFDN0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4SCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQztRQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3pCLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4RyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUN6QyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztJQUN2RixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRztRQUN0QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUM3RCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFhO1FBQzNCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDUixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUE3Q0QsNEJBNkNDIn0=