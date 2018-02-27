const tree = require('./search_tree.js')
const BinaryTreeNode = tree.BinaryTreeNode;
const BinarySearchTree = tree.BinarySearchTree;

// =========平衡二叉树：AVL树

class AVLNode {
    constructor(data, height, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.height = height;
    }
}

// 插入、删除都按照AVL树的规则操作
class AVLBinaryTree extends BinarySearchTree {
    constructor(arr) {
        super();
        if (arr != null) {
            this.root = null;
            for (let i = 0; i < arr.length; i++) {
                let success = this.insertNodeByAVL(arr[i]);
                console.log('insert======', arr[i], success);
            }
        }
    }

    searchNode(data) {
        return super.searchNode(data);
    }

    // 节点插入
    insertNodeByAVL(data) {
        let [success, avlNode] = _insertNodeByAVL(this.root, data);
        this.root = avlNode;
        return success;
    }

    // 节点删除
    deleteNodeByAVL(data) {
        let [success, avlNode] = _deleteNodeByAVL(this.root, data);
        this.root = avlNode;
        return success;
    }
}

const _insertNodeByAVL = (avlNode, data) => {
    let success = true;
    if (avlNode == null) {
        avlNode = new AVLNode(data);
    } else if (data < avlNode.data) {
        let [succ, leftNode] = _insertNodeByAVL(avlNode.left, data);
        avlNode.left = leftNode;
        success = succ;

        if (_getNodeHeight(avlNode.left) - _getNodeHeight(avlNode.right) > 1) {
            if (data < avlNode.left.data) {
                // 左左旋转
                avlNode = _llRotate(avlNode);
            } else {
                // 左右旋转
                avlNode = _lrRotate(avlNode);
            }
        }
    } else if (data > avlNode.data) {
        let [succ, rightNode] = _insertNodeByAVL(avlNode.right, data);
        success = succ;
        avlNode.right = rightNode;
       
        if (_getNodeHeight(avlNode.right) - _getNodeHeight(avlNode.left) > 1) {
            if (data > avlNode.right.data) {
                // 右右旋转
                avlNode = _rrRotate(avlNode);
            } else {
                // 右左旋转
                avlNode = _rlRotate(avlNode);
            }   
        }
    } else {
        // 重复数据、插入失败
        success = false
    }

    avlNode.height = Math.max(_getNodeHeight(avlNode.left), _getNodeHeight(avlNode.right)) + 1;

    return [success, avlNode];
}


const _deleteNodeByAVL = (avlNode, data) => {

    if (avlNode == null) {
        return [false, null];
    }

    let success = true;

    if (data == avlNode.data) {

        if (avlNode.left != null && avlNode.right != null) {
            // 左右子树均不为空
            let node = null;
            if (_getNodeHeight(avlNode.left) > _getNodeHeight(avlNode.right)) {
                // 左子树高度大
                let node = _getMaxNode(avlNode.left);
                avlNode.data = node.data
                let [succ, tempNode] = _deleteNodeByAVL(avlNode.left, node.data);
                sucess = succ;
                avlNode.left = tempNode;
            } else {
                // 右子树高度大
                let node = _getMinNode(avlNode.right);
                avlNode.data = node.data
                let [succ, tempNode] = _deleteNodeByAVL(avlNode.right, node.data);
                success = succ;
                avlNode.right = tempNode;
            }

        } else {
            if (avlNode.left != null) {
                avlNode = avlNode.left;
            } else if (avlNode.right != null) {
                avlNode = avlNode.right;
            } else {
                avlNode = null;
            }
        }

    } else if (data < avlNode.data) {
        
        let [succ, tempNode] = _deleteNodeByAVL(avlNode.left, data)
        success = succ;
        avlNode.left = tempNode;

        if (_getNodeHeight(avlNode.right) - _getNodeHeight(avlNode.left) > 1) {
            // 不满足平衡条件，需要做调整
            if (_getNodeHeight(avlNode.right.left) > _getNodeHeight(avlNode.right.right)) {
                avlNode =  _rlRotate(avlNode)
            } else {
                avlNode =  _rrRotate(avlNode)
            }

        } else {
            // 满足平衡条件，调整高度即可
            avlNode.height = Math.max(_getNodeHeight(avlNode.left), _getNodeHeight(avlNode.right)) + 1;
        }

    } else if (data > avlNode.data) {

        let [succ, tempNode] = _deleteNodeByAVL(avlNode.right, data);
        success = succ;
        avlNode.right = tempNode;

        if (_getNodeHeight(avlNode.left) - _getNodeHeight(avlNode.right) > 1) {
            // 不满足平衡条件，需要做调整
            if (_getNodeHeight(avlNode.left.left) > _getNodeHeight(avlNode.left.right)) {
                avlNode =  _llRotate(avlNode)
            } else {
                avlNode =  _lrRotate(avlNode)
            }

        } else {
            // 满足平衡条件，调整高度即可
            avlNode.height = Math.max(_getNodeHeight(avlNode.left), _getNodeHeight(avlNode.right)) + 1;
        }
    }

    return [success, avlNode];
}

// 获取二叉树的高度
const _getNodeHeight = (node) => {
    let height = -1;
    if (node != null) {
        height = node.height;
    }
    return height;
}

// 获取二叉树最大值的节点
const _getMaxNode = (node) => {
    if (node == null) {
        return null;
    }
    if (node.right == null) {
        return node;
    }
    return _getMaxNode(node.right);
}

// 获取二叉搜索树最小值的节点
const _getMinNode = (node) => {
    if (node == null) {
        return null;
    }
    if (node.left == null) {
        return node;
    }
    return _getMinNode(node.left);
}

// LL型：右旋转
const _llRotate = (avlNode) => {
    return _rightRotate(avlNode);
}

// RR型：左旋转
const _rrRotate = (avlNode) => {
    return _leftRotate(avlNode);
}

// LR型：先左子树左旋转，然后在右旋转
const _lrRotate = (avlNode) => {
    avlNode.left = _rrRotate(avlNode.left);
    return _llRotate(avlNode);
}

// RL型：先右子树右旋转，然后在左旋转
const _rlRotate = (avlNode) => {
    avlNode.right = _llRotate(avlNode.right);
    return _rrRotate(avlNode);
}

// 左旋转
const _leftRotate = (node) => {
    let tempNode = node.right;
    node.right = tempNode.left;
    tempNode.left = node;
    tempNode.height = Math.max(_getNodeHeight(tempNode.left), _getNodeHeight(tempNode.right)) + 1;
    node.height = Math.max(_getNodeHeight(node.left), _getNodeHeight(node.right)) + 1;
    return tempNode;
}

// 右旋转
const _rightRotate = (node) => {
    let tempNode = node.left;
    node.left = tempNode.right;
    tempNode.right = node;
    node.height = Math.max(_getNodeHeight(node.left), _getNodeHeight(node.right)) + 1;
    tempNode.height = Math.max(_getNodeHeight(tempNode.left), _getNodeHeight(tempNode.right)) + 1;
    return tempNode;
}

module.exports = {
    AVLBinaryTree: AVLBinaryTree,
}