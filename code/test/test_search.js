
const search = require('../search');

console.log('\n\n============二分查找相关测试==============\n\n')

const arr1 = [1, 12, 16, 33, 123, 459, 987, 1234, 34567, 98765];

const rlt11 = search.binarySearch(arr1, 123);
console.log('binary search:', rlt11);
const rlt12 = search.insertValueSearch(arr1, 123);
console.log('insert value search:', rlt12);
const rlt13 = search.fibonacciSearch(arr1, 123);
console.log('fibonacci Search:', rlt13);


console.log('\n\n============二叉树相关测试==============\n\n')

console.log('============1、二叉搜索树\n')

const arr2 = [45, 1, 2, 55, 98, 4, 12, 34, 54, 66, 88];

const tree2 = new search.BinarySearchTree(arr2);
console.log('\n========BST create result:\n');
tree2.travalTreeByPreOrder(tree2.root);
tree2.travalTreeByInOrder(tree2.root);
tree2.travalTreeByPostOrder(tree2.root);

let rlt21 = tree2.searchNode(55);
console.log('\n========BST node 55 search result:', rlt21);

let rlt22 = tree2.deleteNodeByBST(77);
console.log('\n========BST node 77 delete result:', rlt22);
tree2.travalTreeByInOrder(tree2.root);
let rlt23 = tree2.deleteNodeByBST(54);
console.log('\n========BST node 54 delete result:', rlt23);
tree2.travalTreeByInOrder(tree2.root);


console.log('============2、平衡二叉树\n')

const arr3 = [45, 1, 2, 55, 98, 4];
const tree3 = new search.AVLBinaryTree(arr3);
console.log('tree3==========avl tree:');
tree3.travalTreeByPreOrder(tree3.root);
tree3.travalTreeByInOrder(tree3.root);
tree3.travalTreeByPostOrder(tree3.root);

const rlt31 = tree3.deleteNodeByAVL(45);
console.log('\n========AVL node 45 delete result:', rlt31);
tree3.travalTreeByInOrder(tree3.root);
const rlt32 = tree3.deleteNodeByAVL(100);
console.log('\n========AVL node 100 delete result:', rlt32);
tree3.travalTreeByInOrder(tree3.root);