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
            // console.log('rb tree node insert======', arr[i], success);
        }
    }

    travalTreeByInOrder() {
        _travalTreeByInOrder(this.root);
    }

    searchNode(data) {
        return super.searchNode(data);
    }

    insertNode(data) {
        let [succ, tempNode] = _insertNode(data, this.root, this.root); 
        this.root = tempNode;
        // console.log('insert result =========after', this.root);
        return succ;
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
const _insertNode = (data, currNode, root) => {

    // console.log('========insert', data, currNode, root);

    if (root == null) {
        // 插入根节点
        let node = new RBTreeNode(data, false);
        return [true, node];
    } else if (currNode == null) {
        // 插入非根节点
        let node = new RBTreeNode(data, true);
        return [true, node];
    }

    let success = true;
    let node = new RBTreeNode(data, true);
    if (currNode.data == data) {
        // 数据存在，插入失败
        success = false
    } else if (data < currNode.data) {

        let [succ, tempNode] = _insertNode(data, currNode.left, root);
        success = succ;
        currNode.left = tempNode;
        tempNode.parent = currNode;

        // console.log('========insert before', data, currNode);
        // currNode = tempNode;
        currNode = _fixRBTree(tempNode, root);

        // console.log('========insert after', data, currNode);

    } else if (data > currNode.data) {

        let [succ, tempNode] = _insertNode(data, currNode.right, root);
        success = succ;
        currNode.right = tempNode;
        tempNode.parent = currNode;

        // currNode = tempNode;
        currNode = _fixRBTree(tempNode, root);

    }

    // currNode = _fixRBTree(currNode);
    console.log('========insert', data, root);

    return [success, currNode];
}

const _deleteNode = (currNode, data) => {

}

// 按照红黑树的规则调整二叉树
const _fixRBTree = (node, root) => {
    console.log('===============red:', node.data, root);

    if (node == null) {
        return root;
    } else if (node.parent == null) {
        return root;
    } else if (node.parent.parent == null) {
        return node
    }

    let parent = node.parent;
    let grandfather = node.parent.parent;

    if (parent == grandfather.left) {
        // 父节点是祖父节点的左子树

        let uncle = grandfather.right;

        // console.log('==========uncle', uncle);

        if (parent.red && uncle) {
            if (uncle.red) {
                parent.red = false;
                uncle.red = false;
                grandfather.red = true;
                
                // console.log('===============left before:', node.data, root);
                root = _fixRBTree(grandfather, root);
                // console.log('===============left after:', node.data, root);

            } else {

                let tempNode = null;
                if (node == parent.left) {
                    tempNode = _rlRotate(grandfather);
                } else {
                    tempNode = _rightRotate(grandfather);
                }

                if (tempNode.parent == null) {
                    root = tempNode;
                } else if (grandfather.parent.left == grandfather) {
                    grandfather.left = tempNode;
                } else {
                    grandfather.right = tempNode;
                }
            }
        } 

    } else {
        // 父节点是祖父节点的右子树

        let uncle = grandfather.left;

        if (parent.red && uncle) {
            if (uncle.red) {
                parent.red = false;
                uncle.red = false;
                grandfather.red = true;
                
                // root = _fixRBTree(parent.parent);
                
                // console.log('===============right before:', node.data, root);
                root = _fixRBTree(grandfather, root);
                // console.log('===============right after:', node.data, root);

            } else {
                let tempNode = null;
                if (node == parent.right) {
                    tempNode = _lrRotate(grandfather);
                } else {
                    tempNode = _leftRotate(grandfather);
                }
                if (tempNode.parent == null) {
                    root = tempNode;
                } else if (grandfather.parent.left == grandfather) {
                    grandfather.left = tempNode;
                } else {
                    grandfather.right = tempNode;
                }
            }
        } 
    }


    console.log('root=========root', root)


    return root
}

// 左旋转
const _leftRotate = (node) => {

    let tempNode = node.right;
    node.right = tempNode.left;

    if (tempNode.left != null) {
        tempNode.left.parent = node;
    }

    tempNode.parent = node.parent;

    if (node.parent == null) {

    } else {
        if (node == node.parent.left) {
            node.parent.left = tempNode;
        } else {
            node.parent.right = tempNode;
        }
    }

    tempNode.left = node;
    node.parent = tempNode;

    return tempNode;
}

// 右旋转
const _rightRotate = (node) => {

    console.log('========rotate', node);

    let tempNode = node.left;
    node.left = tempNode.right;

    if (tempNode.right != null) {
        tempNode.right.parent = node;
    }

    tempNode.parent = node.parent;

    if (node.parent == null) {

    } else {
        if (node == node.parent.right) {
            node.parent.right = tempNode;
        } else {
            node.parent.left = tempNode;
        }
    }

    tempNode.right = node;
    node.parent = tempNode;

    return tempNode;
}

// 1.左子树右旋转，2.左旋转
const _lrRotate = (node) => {
    let tempNode = _rightRotate(node.left);
    return _leftRotate(node);
}

// 1.右子树左旋转，2.右旋转
const _rlRotate = (node) => {
    let tempNode = _leftRotate(node.right);
    return _rightRotate(node);
}

module.exports = {
    RBTree: RBTree
}