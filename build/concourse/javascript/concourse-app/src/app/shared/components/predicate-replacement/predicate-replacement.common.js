"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PredicateReplacement {
    static matchByRegex(predicate) {
        const predicateRegex = /(\{[A-Za-z]\w+\})/g;
        return !!predicate.match(predicateRegex) ? predicate.match(predicateRegex).map(m => m.replace(/[{}]/g, '')) : [];
    }
}
exports.PredicateReplacement = PredicateReplacement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZGljYXRlLXJlcGxhY2VtZW50LmNvbW1vbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9wcmVkaWNhdGUtcmVwbGFjZW1lbnQvcHJlZGljYXRlLXJlcGxhY2VtZW50LmNvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQWEsb0JBQW9CO0lBQy9CLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBaUI7UUFDbkMsTUFBTSxjQUFjLEdBQUcsb0JBQW9CLENBQUM7UUFDNUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbkgsQ0FBQztDQUNGO0FBTEQsb0RBS0MifQ==