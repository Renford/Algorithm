
const tree = require('./search_tree.js')
const BinaryTreeNode = tree.BinaryTreeNode;
const BinarySearchTree = tree.BinarySearchTree;

// =========平衡二叉树：伸展树

class SplayTreeNode extends BinaryTreeNode {

}

class SplayTree extends BinarySearchTree {

    constructor(arr) {
        super(arr);
    }

    searchNode(data) {

    }

    insertNode(data) {

    }

    deleteNode(data) {
        
    }
} 

module.exports = {
    SplayTree: SplayTree
}