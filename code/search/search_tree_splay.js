
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

    searchNode(data) {
        return super.searchNode(data)
    }

    insertNode(data) {
        let [success, node] = _insertNode(data, this.root, this);
        this.root = node;

        let tempNode = this.searchNode(data);
        this.root = _treeSplay(tempNode, this);

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
    let tempNode = null;
    if (data < node.data) {

        let [success, tempNode] = _insertNode(data, node.left, that);
        node.left = tempNode;
        tempNode.parent = node;

    } else if (data > node.data) {
        
        let [success, tempNode] = _insertNode(data, node.right, that);
        node.right = tempNode;
        tempNode.parent = node;
        
    } else {
        success = false;
    }

    // if (success && tempNode != null && tempNode.left == null && tempNode.right == null) {
    //     // 新节点插入，完成伸展操作
    //     that.root = _treeSplay(tempNode, that);
    // }

    return [success, node];
}

const _deleteNode = (node, data, that) => {
    
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