
const search = require('../search');

console.log('\n\n============1、二分查找相关测试==============\n\n')

const arr1 = [1, 12, 16, 33, 123, 459, 987, 1234, 34567, 98765];

const rlt11 = search.binarySearch(arr1, 123);
console.log('binary search:', rlt11);
const rlt12 = search.insertValueSearch(arr1, 123);
console.log('insert value search:', rlt12);
const rlt13 = search.fibonacciSearch(arr1, 123);
console.log('fibonacci Search:', rlt13);


console.log('\n\n============2、二叉搜索树相关测试==============\n\n')

const arr2 = [45, 1, 2, 55, 98, 4, 12, 34, 54, 66, 88];

const tree2 = new search.BinarySearchTree(arr2);
console.log('\n========BST create result:\n');
tree2.travalTreeByPreOrder(tree2.root);
tree2.travalTreeByInOrder(tree2.root);
tree2.travalTreeByPostOrder(tree2.root);

let rlt21 = tree2.searchNode(55);
console.log('\n========BST node 55 search result:', rlt21);

let rlt22 = tree2.deleteNode(77);
console.log('\n========BST node 77 delete result:', rlt22);
tree2.travalTreeByInOrder(tree2.root);
let rlt23 = tree2.deleteNode(45);
console.log('\n========BST node 45 delete result:', rlt23);
tree2.travalTreeByInOrder(tree2.root);


console.log('\n\n============3、平衡二叉树: AVL树相关测试==============\n\n')

const arr3 = [45, 1, 2, 55, 98, 4];
const tree3 = new search.AVLBinaryTree(arr3);
console.log('tree3==========avl tree:');
tree3.travalTreeByPreOrder(tree3.root);
tree3.travalTreeByInOrder(tree3.root);
tree3.travalTreeByPostOrder(tree3.root);

let rlt31 = tree3.searchNode(55);
console.log('\n========AVL node 55 search result:', rlt31);

const rlt32 = tree3.deleteNodeByAVL(45);
console.log('\n========AVL node 45 delete result:', rlt32);
tree3.travalTreeByInOrder(tree3.root);
const rlt33 = tree3.deleteNodeByAVL(100);
console.log('\n========AVL node 100 delete result:', rlt33);
tree3.travalTreeByInOrder(tree3.root);


console.log('\n\n============4、平衡二叉树: 红黑树相关测试==============\n\n')

// // const arr4 = [11, 2, 14, 1, 7, 15, 5, 8, 4];
// const arr4 = [11, 2, 14, 1];
// const tree4 = new search.RBTree(arr4);
// console.log('tree4==========rb tree:');
// tree4.travalTreeByInOrder();


console.log('\n\n============5、平衡二叉树: 伸展树相关测试==============\n\n')
const arr5 = [8, 11, 9, 14, 1];
const tree5 = new search.SplayTree(arr5);
tree5.travalTreeByInOrder(tree5.root);
const node50 = tree5.searchNode(8);
const node51 = tree5.searchNode(9);
const node52 = tree5.searchNode(11);