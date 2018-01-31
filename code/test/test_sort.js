
const sort = require('../sorts');

const MaxInteger = 100;

const produceArray = () => {
    const array = [];

    for (let i = 0; i < 10; i++) {
        let num = Math.ceil(Math.random() * MaxInteger);
        array.push(num)
    }

    return array;
}

let arr = produceArray()
console.log('0、===============sort before:\n', arr);

let array11 = sort.bubbleSort(arr.slice(0));
console.log('\n1、exchange class:\n bubble sort:\n', array11);
let array12 = sort.quickSort(arr, 0, arr.length - 1);
console.log('quick sort:\n', array12);


let array21 = sort.selectSort(arr.slice(0));
console.log('\n2、select class:\n select sort:\n', array21);
let array22 = sort.heapSort(arr.slice(0));
console.log('heap sort:\n', array22);


let array31 = sort.insertSort(arr.slice(0));
console.log('\n3、insert class:\ninsert sort:\n', array31);
let array32 = sort.binaryInsertSort(arr.slice(0));
console.log('binary insert sort:\n', array32);
let array33 = sort.shellSort(arr.slice(0));
console.log('shell sort:\n', array33);


let array41 = sort.mergeSort(arr.slice(0));
console.log('\n4、merge class:\nmerge sort:\n', array41);
let array42 = sort.bucketSort(arr.slice(0));
console.log('bukect sort:\n', array42);
let array43 = sort.radixSort(arr.slice(0));
console.log('radix sort:\n', array43);
