
// import Sort from './code/sort.js'

const MaxInteger = 10;

const produceArray = () => {
    const array = [];

    for (let i = 0; i < MaxInteger; i++) {
        let num = Math.ceil(Math.random() * MaxInteger);
        array.push(num)
    }

    return array;
}

// 冒泡排序
const bubbleSort = (arr) => {
    let array = arr.slice(0)
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array
}

// 选择排序
const selectSort = (arr) => {
    let array = arr.slice(0);
    for (let i = 0; i < array.length - 1; i++) {
        let index = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[index]) {
                index = j;
            }
        }
        if (i !== index) {
            [array[i], array[index]] = [array[index], array[i]];
        }
    }
    return array;
}

// 快速排序
const partion = (arr, start, end) => {
    let [i, j] = [start, end];
    let temp = arr[i];
    while (i < j) {
        while (i < j && temp < arr[j]) {
            j--;
        }
        if (i < j) {
            arr[i++] = arr[j];
        }

        while(i < j && temp > arr[i]) {
            i++;
        }
        if (i < j) {
            arr[j++] = arr[i];
        }
    }
    arr[i] = temp;
    return i;
}

const quickSort = (arr, start, end) => {
    if (start < end) {
        let i = partion(arr, start, end);
        quickSort(arr, start, i - 1);
        quickSort(arr, i + 1, end);
    }
}

// 插入排序
const insertSort = (arr) => {
    let array = arr.slice(0);
    for (let i = 1; i < array.length; i++) {
        let temp = array[i];
        let j = i - 1;
        while (j >= 0) {
            if (array[j] < temp) {
                array[j + 1] = array[j];
                j--;
            } else {
                array[j + 1] = temp;
            }
        }
    }
    return array;
}

// 希尔排序

// 归并排序

// 堆排序

// 桶排序

let arr = produceArray()
console.log('===============sort before:\n', arr);
let array1 = bubbleSort(arr);
console.log('===============buddle sort after:\n', arr, '\n', array1);
let array2 = selectSort(arr);
console.log('===============select sort after:\n', arr, '\n', array2);
let array3 = selectSort(arr.slice(0));
console.log('===============select sort after:\n', arr, '\n', array3);
let array4 = insertSort(arr);
console.log('===============select sort after:\n', arr, '\n', array4);

