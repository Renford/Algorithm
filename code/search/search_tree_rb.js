const tree = require('./search_tree.js')
const BinaryTreeNode = tree.BinaryTreeNode;
const BinarySearchTree = tree.BinarySearchTree;

// =========平衡二叉树：红黑树

// 1.由于需要频繁操作叔父节点，所以添加父指针
// 2.red，布尔值，false表示黑色，true表示红色
class RBTreeNode extends BinaryTreeNode {
    constructor(data, red, parent, left, right) {
        super(data, parent, left, right);
        this.red = red;         
    }
}

// 红黑树五大特性：
// 1. 节点是红色或黑色
// 2. 根节点是黑色
// 3. 每个叶节点（NIL或空节点）是黑色的
// 4. 每个红色节点的两个子节点都是黑色。(从每个叶子到根的所有路径上不能有两个连续的红色节点)
// 5. 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点
class RBTree extends BinarySearchTree {
    constructor(arr) {
        super();
        this.root = null;
        for (let i = 0; i < arr.length; i++) {
            let success = this.insertNode(arr[i]);
            console.log('rb tree node insert======', arr[i], success);
        }
    }

    travalTreeByInOrder() {
        _travalTreeByInOrder(this.root);
    }

    searchNode(data) {
        return super.searchNode(data);
    }

    insertNode(data) {
        return _insertNode(data, this);
    }

    deleteNode(data) {

    }

}

const _travalTreeByInOrder = (node) => {
    if (node == null) {
        return;
    }
    _travalTreeByInOrder(node.left);
    console.log('rb in order:', node.data, node.red);
    _travalTreeByInOrder(node.right);
}

// 1. 特性2决定，第一次插入（即插入根节点）必须为黑色
// 2. 特性5决定，除根节点外，每次插入的新节点必须为红色
// 3. 插入节点的父节点为黑色，不需要处理
// 4. 插入节点的父节点、叔父节点为红色，将父节点、叔父节点都设为黑色，将祖父节点设为红色，当前节点变为祖父节点
// 5. 插入节点的父节点为红色、叔父节点为黑色，如当前节点为父节点的左子树，则将父节点作为当前节点，进行左旋转；反之，则将父节点作为当前节点，进行右旋转
const _insertNode2 = (data, that) => {
    if (that.root == null) {
        that.root = new RBTreeNode(data, false);
        return true;
    }

    let success = true;
    let node = new RBTreeNode(data, true);

    let tempNode = that.root;
    while (tempNode != null) {
        if (data < tempNode.data) {
            if (tempNode.left == null) {
                tempNode.left = node;
                node.parent = tempNode;
                break;
            } else {
                tempNode = tempNode.left;
            }
        } else if (data > tempNode.data) {
            if (tempNode.right == null) {
                tempNode.right = node;
                node.parent = tempNode;
                break;
            } else {
                tempNode = tempNode.right;
            }
        } else {
            success == false;
            break;
        }
    }

    if (success) {
        _fixRBTree(node, that);
    }

    return success;
}

const _deleteNode = (data, that) => {

}

// 按照红黑树的规则调整二叉树
const _fixRBTree = (node, that) => {
    if (node == null || node.parent == null) {
        return;
    }

    if (!node.parent.red) {
        return;
    }
    
    if (node.parent.parent == null) {
        if (node == node.parent.left) {
            that.root = that.rightRotate(node.parent);
        } else {
            that.root = that.leftRotate(node.parent);
        }
        return;
    }

    let parent = node.parent;
    let grandfather = node.parent.parent;

    if (parent == grandfather.left) {
        // 父节点是祖父节点的左子树

        let uncle = grandfather.right;
        if (uncle && uncle.red) {
            uncle.red = false;
        }

        if (node == parent.right) {
            node = parent;
            grandfather.left = that.leftRotate(parent, that);

            parent = node.parent;
            grandfather = parent.parent
        }

        parent.red = false;
        grandfather.red = true;

        let tempNode = that.rightRotate(grandfather, that);
        if (tempNode.parent == null) {
            that.root = tempNode;
        } else if (grandfather.parent.left == grandfather) {
            grandfather.parent.left = tempNode;
        } else {
            grandfather.parent.right = tempNode;
        }

    } else {
        // 父节点是祖父节点的右子树
        let uncle = grandfather.left;

        if (uncle && uncle.red) {
            uncle.red = false;
        }

        if (node == parent.left) {
            node = parent;
            grandfather.right = that.rightRotate(parent, that);

            parent = node.parent;
            grandfather = parent.parent;
        } 

        parent.red = false;
        grandfather.red = true;

        let tempNode = that.leftRotate(grandfather, that);
        if (tempNode.parent == null) {
            that.root = tempNode;
        } else if (grandfather.parent.left == grandfather) {
            grandfather.parent.left = tempNode;
        } else {
            grandfather.parent.right = tempNode;
        }
    }

    _fixRBTree(grandfather, that);
}

const _llRotate = (node, that) => {
    return that.rightRotate(node);
}

const _lrRotate = (node, that) => {
    node.left = that.leftRotate(node.left);
    return that.rightRotate(node);
}

const _rlRotate = (node, that) => {
    node.right = that.rightRotate(node.right);
    return that.leftRotate(node);
}

const _rrRotate = (node, that) => {
    return that.leftRotate(node);
}

module.exports = {
    RBTree: RBTree
}