
const tree = require('./search_tree.js')
const BinaryTreeNode = tree.BinaryTreeNode;
const BinarySearchTree = tree.BinarySearchTree;

// =========平衡二叉树：伸展树
// todo:调试插入方法

class SplayTreeNode extends BinaryTreeNode {
  
}

class SplayTree extends BinarySearchTree {

    constructor(arr) {
        super();

        this.root = null;
        if (arr != null) {
            for (let i = 0; i < arr.length; i++) {
                let success = this.insertNode(arr[i]);
                console.log('splay insert node ========', arr[i], success);
            }
        }
    }

    searchNode(data) {
        // return super.insertNode(data)
    }

    insertNode(data) {
        let [success, node] = _insertNode(data, this.root, this);
        this.root = node;
        return success;
    }

    deleteNode(data) {
        
    }
} 


const _insertNode = (data, node, that) => {
    if (node == null) {
        return [true, new SplayTreeNode(data)];
    } 
    
    let success = true;
    if (data < node.data) {

        let [success, tempNode] = _insertNode(data, node.left, that);
        node.left = tempNode;
        tempNode.parent = node;
        
        // node = _treeSplay(tempNode, that);

    } else if (data > node.data) {
        
        let [success, tempNode] = _insertNode(data, node.right, that);
        node.right = tempNode;
        tempNode.parent = node;

        // node = _treeSplay(tempNode, that);
        
    } else {
        success = false;
    }

    return [success, node];
}

const _deleteNode = (node, data, that) => {
    
}

// 将tree的node旋转到根节点
const _treeSplay = (node, that) => {
    if (node == that.root) {
        return node;
    } 
    
    let tempNode = null;
    while (node.parent != null) {
        if (node.parent.parent == null) {
            if (node == node.parent.left) {
                tempNode = that.rightRotate(node.parent);
            } else {
                tempNode = that.leftRotate(node.parent);
            }
        } else {
            if (node.parent == node.parent.parent.left) {
                if (node == node.parent.left) {
                    // LL
                    tempNode = that.rightRotate(node.parent.parent);
                    tempNode = that.rightRotate(node.parent);
                } else {
                    // LR
                    tempNode = that.leftRotate(node.parent.parent.left)
                    tempNode = that.rightRotate(node.parent);
                }
            } else {
                if (node == node.parent.left) {
                    // RL
                    node.parent.parent.right = that.rightRotate(node.parent.parent.right)
                    tempNode = that.leftRotate(node.parent);
                } else {
                    // RR
                    tempNode = that.leftRotate(node.parent.parent);
                    tempNode = that.leftRotate(node.parent);
                }
            }
        }
       
        node = tempNode;
    }
    
    return tempNode;
}

module.exports = {
    SplayTree: SplayTree
}