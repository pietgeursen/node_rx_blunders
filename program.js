var nums = process.argv.slice(2);
var sum = nums.reduce(function(a,b){return +a + +b});
console.log(sum);