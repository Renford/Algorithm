
const search = require('../search');


console.log('====================binary search:\n');
const sortArray = [1, 12, 16, 33, 123, 459, 987, 1234, 34567, 98765];

const rlt11 = search.binarySearch(sortArray, 123);
console.log('binary search:', rlt11);
const rlt12 = search.insertValueSearch(sortArray, 123);
console.log('insert value search:', rlt12);
const rlt13 = search.fibonacciSearch(sortArray, 123);
console.log('fibonacci Search:', rlt13);

console.log('\n====================binary tree:\n', search);
const arr = [45, 1, 2, 55, 98, 4, 12, 34, 54, 66, 88];

const tree21 = new search.BinarySearchTree(arr);
console.log('\nBST create result========:\n');
tree21.travalTreeByPreOrder(tree21.root);
tree21.travalTreeByInOrder(tree21.root);
tree21.travalTreeByPostOrder(tree21.root);

let result20 = tree21.searchNode(55);
console.log('\nBST node 55 search result:', result20);

let result21 = tree21.deleteNodeByBST(77);
console.log('\nBST node 77 delete result:', result21);
tree21.travalTreeByInOrder(tree21.root);
let result22 = tree21.deleteNodeByBST(54);
console.log('\nBST node 54 delete result:', result22);
tree21.travalTreeByInOrder(tree21.root);


const tree22 = new search.AVLBinaryTree(arr);
console.log('tree22======', tree22);
tree22.travalTreeByInOrder(tree22.root);
