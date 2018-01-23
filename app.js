
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

let arr = produceArray()
console.log('===============sort before:\n', arr);
let array = bubbleSort(arr);
console.log('===============sort after:\n', arr, '\n', array);

