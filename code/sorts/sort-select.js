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

module.exports = {
    selectSort: selectSort
}