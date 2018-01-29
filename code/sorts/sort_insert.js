
// 插入排序
const insertSort = (arr) => {
    let array = arr.slice(0);
    for (let i = 1; i < array.length; i++) {
        let temp = array[i];
        let j = i - 1;
        while (j >= 0) {
            if (array[j] > temp) {
                array[j + 1] = array[j];
                j--;
            } else {
                array[j + 1] = temp;
                break;
            }
        }

        if (j < 0) {
            array[0] = temp;
        }
    }
    return array;
}

// 希尔排序
const shellSort = (arr) => {
    let array = arr.slice(0);
    let count = Math.floor(array.length / 2);
    while(count != 1) {
        let start = 0;
        while(start < array.length - count) {

            let end = start + count - 1
            array = insertSort(array, start, end)
            start = end
        }

        count = Math.floor(count / 2);
    }

    array = insertSort(arr, 0, arr.length - 1);

    return array;
}

module.exports = {
    insertSort: insertSort,
    shellSort: shellSort
}
