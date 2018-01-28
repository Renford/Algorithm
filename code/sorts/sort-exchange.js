
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
            arr[j--] = arr[i];
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
    return arr;
}


module.exports = {
    bubbleSort: bubbleSort,
    quickSort: quickSort
}