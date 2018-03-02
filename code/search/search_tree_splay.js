
const tree = require('./search_tree.js')
const BinaryTreeNode = tree.BinaryTreeNode;
const BinarySearchTree = tree.BinarySearchTree;

// =========平衡二叉树：伸展树

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

    // 节点查找，将查找的节点作为根节点
    searchNode(data) {
        let tempNode = super.searchNode(data);
        if (tempNode != null) {
            this.root = _treeSplay(tempNode, this);
        }
        return tempNode;
    }

    // 节点插入，将新节点为根节点
    insertNode(data) {
        let success = super.insertNode(data);

        let tempNode = this.searchNode(data);
        this.root = _treeSplay(tempNode, this);

        return success;
    }

    // 节点删除，将需删除节点的父节点作为根节点
    deleteNode(data) {
        let tempNode = super.searchNode(data);
        tempNode = tempNode.parent;

        let success = super.deleteNode(data);

        if (tempNode != null) {
            this.root = _treeSplay(tempNode, this);
        }

        return success;
    }
} 

// 将node旋转到根节点
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
            let parent = node.parent;
            let grandfather = parent.parent;

            if (parent == grandfather.left) {
                if (node == parent.left) {
                    // LL
                    tempNode = that.rightRotate(grandfather);
                    tempNode = that.rightRotate(parent);
                } else {
                    // LR
                    grandfather.left = that.leftRotate(grandfather.left)
                    tempNode = that.rightRotate(grandfather);
                }
            } else {
                if (node == node.parent.left) {
                    // RL
                    grandfather.right = that.rightRotate(grandfather.right)
                    tempNode = that.leftRotate(grandfather);
                } else {
                    // RR
                    tempNode = that.leftRotate(grandfather);
                    tempNode = that.leftRotate(parent);
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