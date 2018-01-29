

// 合并数组
const mergeArray = (arr, start, mid, end) => {
    const tempArray = [];

    let [i, j] = [start, mid];
    while(i < mid && j < end) {
        if (arr[i] < arr[j]) {
            tempArray.push(arr[i++]);
        } else {
            tempArray.push(arr[j++]);
        }
    }

    if (i < mid) {
        while(i < mid) {
            tempArray.push(arr[i++]);
        }
    }

    if (j < end) {
        while(j < end){
            tempArray.push(arr[j++]);
        }
    }

    for (let k = 0; k < tempArray.length; k++) {
        arr[start + k] = tempArray[k];
    }

    return arr;
}

// 归并分组
const mergeGroup = (arr, gap) => {
    let i = 0;
    while (i + 2 * gap - 1 < arr.length) {
        arr = mergeArray(arr, i, i + gap, i + 2 * gap);
        i += 2 * gap;
    }

    if (i + gap - 1 < arr.length) {
        arr = mergeArray(arr, i, i + gap, arr.length);
    }

    return arr
}

// 归并排序
const mergeSort = (arr) => {
    let array = arr.slice(0);

    let gap = 1;
    while (gap < array.length) {
        array = mergeGroup(array, gap);
        gap *= 2;
    }
    return array;
}


module.exports = {
    mergeSort: mergeSort
}