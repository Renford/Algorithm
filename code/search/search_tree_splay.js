
const tree = require('./search_tree.js')
const BinaryTreeNode = tree.BinaryTreeNode;
const BinarySearchTree = tree.BinarySearchTree;

// =========平衡二叉树：伸展树

class SplayTreeNode extends BinaryTreeNode {
    constructor(data, parent, left, right) {
        super(data, left, right);
        this.parent = parent;     
    }
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

// 单R型，左旋转
const _leftRotate = (node) => {
    if (node == null) {
        return null;
    }

    let tempNode = node.right;
    node.right = tempNode.left;

    if (tempNode.left == null) {
        tempNode.left.parent = node;
    }
    tempNode.parent = node.parent;

    if (node.parent != null) {
        if (node == node.parent.left) {
            node.parent.left = tempNode;
        } else {
            node.parent.right = tempNode;
        }
    } else {
        // 根节点
    }

    tempNode.left = node;
    node.parent = tempNode;

    return tempNode;
}

// 单L型，右旋转
const _rightRotate = (node) => {
    if (node == null) {
        return null;
    }

    let tempNode = node.left;
    node.left = tempNode.right;

    if (tempNode.right == null) {
        tempNode.right.parent = node;
    }
    tempNode.parent = node.parent;

    if (node.parent != null) {
        if (node == node.parent.left) {
            node.parent.left = tempNode;
        } else {
            node.parent.right = tempNode;
        }
    } else {
        
    }

    tempNode.right = node;
    node.parent = tempNode;

    return tempNode;
}

module.exports = {
    SplayTree: SplayTree
}