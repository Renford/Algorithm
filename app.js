
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

// 冒泡
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

let arr = produceArray()
console.log('===============sort before:\n', arr);
let array1 = bubbleSort(arr);
console.log('===============buddle sort after:\n', arr, '\n', array1);
let array2 = selectSort(arr);
console.log('===============select sort after:\n', arr, '\n', array2);

