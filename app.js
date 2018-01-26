
const sort = require('./code/sorts');

const MaxInteger = 10;

const produceArray = () => {
    const array = [];

    for (let i = 0; i < MaxInteger; i++) {
        let num = Math.ceil(Math.random() * MaxInteger);
        array.push(num)
    }

    return array;
}

// 归并排序

// 堆排序

// 桶排序

let arr = produceArray()
console.log('===============0、sort before:\n', arr);
let array1 = sort.bubbleSort(arr);
console.log('===============1、buddle sort after:\n', array1);
let array2 = sort.quickSort(arr, 0, arr.length - 1);
console.log('===============2、quick sort after:\n', array2);
let array3 = sort.selectSort(arr.slice(0));
console.log('===============3、select sort after:\n', array3);
let array4 = sort.insertSort(arr);
console.log('===============4、insert sort after:\n', array4);
let array5 = sort.shellSort(arr);
console.log('===============5、shell sort after:\n', array5);

