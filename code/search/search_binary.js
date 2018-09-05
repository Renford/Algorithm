
// ------------------二分查找-------------------//

// 折半查找，成功返回下标，不成功返回-1
const binarySearch = (arr, key) => {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        let temp = arr[mid];
        if (key < temp) {
            end = mid - 1;
        } else if (key > temp) {
            start = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}


// ------------------插值查找-------------------//
// 原理同折半查找，只是mid的取值不同，对均匀排列的有序序列查找较为方便

// 插值查找，成功返回下标，不成功返回-1
const insertValueSearch = (arr, key) => {
    let start = 0;
    let end = arr.length - 1;
    while (start < end) {
        let mid = start + Math.floor((key - arr[start]) / (arr[end] - arr[start]) * (end - start));
        let temp = arr[mid];
        if (key < temp) {
            end = mid - 1;
        } else if (key > temp) {
            start = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}

// ------------------斐波那契查找-------------------//
// 原理同折半查找，只是mid按照斐波那契数列取值

const FibonacciCount = 20;

// 生成一个斐波那契数列
const fibonacciArray = (max) => {
    const array = [];

    array[0] = 1;
    array[1] = 1;

    let n = 2;
    while (n < max) {
        array[n] = array[n - 1] + array[n - 2];
        n++;
    }

    return array;
}

// 插值查找，成功返回下标，不成功返回-1
const fibonacciSearch = (arr, key) => {
    let array = arr.slice(0);

    // 1、生成斐波那契数列
    const fbArray = fibonacciArray(FibonacciCount);

    // 2、查找需要斐波那契数列最小坐标
    let fbMinCount = 1;
    while (fbArray[fbMinCount] < array.length) {
        fbMinCount++;
    }
    
    // 3、用arr数列的最大值补全arr
    for (let i = array.length; i < fbArray[fbMinCount]; i++) {
        array[i] = array[i - 1];
    }

    console.log('3、array\n', array);

    // 4、查找
    let start = 0;
    let end = array.length - 1;
    let count = fbMinCount;
    while (start < end) {
        let mid = start + fbArray[count - 2] - 1;

        if (key < array[mid]) {
            count = count - 1;
            end = mid - 1;
        } else if (key > arr[mid]) {
            count = count - 2;
            start = mid + 1;
        } else {
            let index = mid;
            if (index >= arr.length) {
                index = arr.length - 1;
            }
            return index;
        }
    }

    return -1;
}

module.exports = {
    binarySearch: binarySearch,
    insertValueSearch: insertValueSearch,
    fibonacciSearch: fibonacciSearch
}
