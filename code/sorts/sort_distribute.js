
// 初始化桶
const BucketCount = 10;
const bucketInit = (count) => {
    const buckets = new Array(count);
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }
    return buckets;
}

// -----桶排序----- //

// 插入时，完成排序
const insertSort = (arr, value) => {
    let j = arr.length - 1;
    while (j >= 0) {
        if (arr[j] > value) {
            arr[j + 1] = arr[j];
            j--;
        } else {
            arr[j + 1] = value;
            break;
        }
    }

    if (j < 0) {
        arr[0] = value;
    }

    return arr;
}

// 桶排序
const bucketSort = (arr) => {
    const buckets = bucketInit(BucketCount + 1);

    for (let i = 0; i < arr.length; i++) {
        const index = Math.floor(arr[i] / BucketCount);

        buckets[index] = insertSort(buckets[index], arr[i]);
    }

    let tempArray = []
    for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            tempArray.push(buckets[i][j]);
        }
    } 

    arr = tempArray;
    return arr;
}

// -----基数排序----- //

// 1、数据分发
const distributeData = (arr, buckets, index) => {
    let maxLength = 1;
    for (let i = 0; i < arr.length; i++) {
        if (maxLength < arr[i].toString().length) {
            maxLength = arr[i].toString().length;
        }

        let tempIndex = Math.floor(arr[i] / Math.pow(10, index)) % 10;
        buckets[tempIndex].push(arr[i]);
    }
    return maxLength;
}

// 2、数据收集
const collectData = (buckets) => {
    let tempArray = []
    for(let i = 0; i < buckets.length; i++) {
        for(let j = 0; j < buckets[i].length; j++) {
            tempArray.push(buckets[i][j]);
        }
    }
    return tempArray;
}

// 3、基数排序
const radixSort = (arr) => {
    let array = arr.slice(0);

    let buckets = bucketInit(BucketCount);
    const maxLength = distributeData(array, buckets, 0);
    array = collectData(buckets);

    let i = 1;
    while (i < maxLength) {
        buckets = bucketInit(BucketCount);
        distributeData(array, buckets, i);
        array = collectData(buckets);
        i++;
    }

    return array;
}

// 计数排序

// 珠排序

module.exports = {
    bucketSort: bucketSort,
    radixSort: radixSort
}