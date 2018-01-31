
const search = require('../search');

const sortArray = [1, 12, 16, 33, 123, 459, 987, 1234, 34567, 98765];

console.log('binary search:\n');

const rlt11 = search.binarySearch(sortArray, 123);
console.log('binary search:', rlt11);
const rlt12 = search.insertValueSearch(sortArray, 123);
console.log('insert value search:', rlt12);
const rlt13 = search.fibonacciSearch(sortArray, 123);
console.log('fibonacci Search:', rlt13);