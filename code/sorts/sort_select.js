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

// 堆调增：使二叉树根节点最大，index为最后一个需要调整二叉树的节点
const heapAjust = (arr, index) => {
    // 取倒数第一个非叶子节点
    const tempIndex = Math.floor((index - 1) / 2);
    for(let i = tempIndex; i >= 0; i--) {
        if (2 * i + 2 <= index) {
            // 左右子树都需要调整
            let childIndex = 2 * i + 1;
            if (arr[2 * i + 2] > arr[2 * i + 1]) {
                childIndex = 2 * i + 2;
            }
    
            if (arr[childIndex] > arr[i]) {
                [arr[childIndex], arr[i]] = [arr[i], arr[childIndex]];
            }
    
        } else if (2 * i + 1 <= index) {
            // 只有左子树，或只需要调整左子树
            if (arr[2 * i + 1] > arr[i]) {
                [arr[2 * i + 1], arr[i]] = [arr[i], arr[2 * i + 1]];
            }
    
        } else {
            // 叶子节点，不做调整
        }
    }

}

// 堆排序
const heapSort = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
        heapAjust(arr, i);
        [arr[0], arr[i]] = [arr[i], arr[0]];
    }

    return arr;
}

module.exports = {
    selectSort: selectSort,
    heapSort: heapSort
}