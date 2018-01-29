
const sort = require('./code/sorts');

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
let array1 = sort.bubbleSort(arr.slice(0));
console.log('1、===============buddle sort after:\n', array1);
let array2 = sort.quickSort(arr, 0, arr.length - 1);
console.log('2、===============quick sort after:\n', array2);
let array3 = sort.selectSort(arr.slice(0));
console.log('3、===============select sort after:\n', array3);
let array4 = sort.insertSort(arr.slice(0));
console.log('4、===============insert sort after:\n', array4);
let array5 = sort.shellSort(arr.slice(0));
console.log('5、===============shell sort after:\n', array5);
let array6 = sort.heapSort(arr.slice(0));
console.log('6、===============heap sort after:\n', array6);
let array7 = sort.mergeSort(arr.slice(0));
console.log('7、===============merge sort after:\n', array7);
let array8 = sort.bucketSort(arr.slice(0));
console.log('8、===============bukect sort after:\n', array8);
let array9 = sort.radixSort(arr.slice(0));
console.log('9、===============radix sort after:\n', array9);



