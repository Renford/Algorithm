
class Sort {
    
    // 冒泡
    bubbleSort(arr) {
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
    selectSort(arr) {
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
}

export default Sort;