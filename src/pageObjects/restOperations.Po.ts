// import { protractor } from 'protractor/built/ptor';

// let rest = require('restler');
// let defered = protractor.promise.defer();
// export class YahooWeather {
//  YahooWeather = function () {
//     this.getCityWeather = function () {
//         rest.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Hyderabad%2C%20Tel%2C%20india%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys').on('complete', function (result) {
//             if (result instanceof Error) {
//                 // console.log('Error:', result.message);
//                 defered.reject(result.message);
//                 // this.retry(5000); // try again after 5 sec
//             } else {
//                 console.log(result);
//                 defered.fulfill(result.query.results.channel.location.country);
//             }

//         // });
//         return defered.promise;
// });
//  });
// };