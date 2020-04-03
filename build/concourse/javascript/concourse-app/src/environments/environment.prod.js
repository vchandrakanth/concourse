"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this is the PROD environment file.
// Do not enable feature flags here. Instead enable them in the Java Side
// the Frontend can still have the following in its HTML  *featureFlag="'FE_ANALYTICS'" to enable a flag
// flags will be determined visible by the Java Side
// If it's anything but your local machine It's java
exports.environment = {
    production: true,
    apiUseHttps: true,
    apiEnvironment: 'prod',
    apiDomain: 'concourselabs.io',
    apiPathPrefix: true,
    enableActivityTracking: true,
    preloadModules: true,
    featureFlags: []
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQucHJvZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudC5wcm9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBQ3JDLHlFQUF5RTtBQUN6RSx3R0FBd0c7QUFDeEcsb0RBQW9EO0FBQ3BELG9EQUFvRDtBQUN2QyxRQUFBLFdBQVcsR0FBRztJQUN6QixVQUFVLEVBQUUsSUFBSTtJQUNoQixXQUFXLEVBQUUsSUFBSTtJQUNqQixjQUFjLEVBQUUsTUFBTTtJQUN0QixTQUFTLEVBQUUsa0JBQWtCO0lBQzdCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLHNCQUFzQixFQUFFLElBQUk7SUFDNUIsY0FBYyxFQUFFLElBQUk7SUFDcEIsWUFBWSxFQUFFLEVBQUU7Q0FDakIsQ0FBQyJ9