// var fibonacci = function(n) {
//   if(typeof n !== 'number') {
//     throw new Error('n should be a Number');
//   }
//   if(n < 0) {
//     throw new Error('n should > 0')
//   }
//   if(n > 10) {
//     throw new Error('n should < 10');
//   }
//   if(n === 0 || n === 1) {
//     return n
//   }
//   return fibonacci(n-1) + fibonacci(n - 2)
// };

// exports.fibonacci = fibonacci;

// if(require.main === module) {
//   var n = Number(process.argv[2]);
//   console.log('fibonacci(' + n + ') is', fibonacci(n))
// }
// var Benchmark = require('benchmark')

// var int1 = function(str) {
//   return +str;
// }
// var int2 = function(str) {
//   return parseInt(str, 10)
// }
// var int3 = function(str) {
//   return Number(str);
// }

// var suite = new Benchmark.Suite;
// var number = 100;

// suite.add('+', function() {
//   int1(number);
// })
// .add('parseInt', function() {
//   int2(number);
// })
// .add('Number', function() {
//   int3(number);
// })
// .on('cycle',function(event) {
//   console.log(String(event.target))
// })
// .on('complete',function() {
//   console.log(this)
//   console.log('Fastest is' + this.filter('fastest').map('name'));
// })
// .run({ 'async': true });