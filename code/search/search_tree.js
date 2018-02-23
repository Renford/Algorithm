
class TreeNode {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// -------------------------二叉树------------------------------//

// 二叉树
class BinaryTree {

    constructor(arr) {
        this.root = null;
    }

    // 先序遍历
    travalTreeByPreOrder(node) {
        if (node == null) {
            return;
        }
        console.log('prev order:', node.data);
        this.travalTreeByPreOrder(node.left);
        this.travalTreeByPreOrder(node.right);
    }

    // 中序遍历
    travalTreeByInOrder(node) {
        if (node == null) {
            return;
        }
        this.travalTreeByInOrder(node.left);
        console.log('in order:', node.data);
        this.travalTreeByInOrder(node.right);
    }

    // 后序遍历
    travalTreeByPostOrder(node) {
        if (node == null) {
            return;
        }
        this.travalTreeByPostOrder(node.left);
        this.travalTreeByPostOrder(node.right);
        console.log('post order:', node.data);
    }
}

// -------------------------二叉搜索树------------------------------//

// 二叉搜索树，所有方法都遵循二叉搜索树的规则
// 主要实现创建、插入、删除、遍历（先序、中序、后续）
class BinarySearchTree extends BinaryTree {

    constructor(arr) {
        super();

        this.root = null;
        for (let i = 0; i < arr.length; i++) {
            this.insertNodeByBST(arr[i]);
        }
    }

    // 节点插入，返回sucess
    insertNodeByBST(data) {

        if (data == null) {
            return false;
        }

        let node = new TreeNode(data);
        if (this.root == null) {
            this.root = node;
            return true;
        }

        let success = true;
        let tempNode = this.root;
        while (1) {
            if (data > tempNode.data) {
                if (tempNode.right == null) {
                    tempNode.right = node;
                    break;
                } else {
                    tempNode = tempNode.right;
                }
            } else if (data < tempNode.data) {
                if (tempNode.left == null) {
                    tempNode.left = node;
                    break;
                } else {
                    tempNode = tempNode.left;
                }
            } else {
                success = false;
                break;
            }
        }

        return success;
    }

    // 删除节点，返回sucess
    deleteNodeByBST(data) {
        
        let [node, superNode] = _searchNodeAndSuper(this.root, data);
        if (node == null) {
            return false;
        }  
        
        let result = true;
        if (node.left == null && node.right == null) {
            // 叶子节点:直接删除
            if (superNode == null) {
                this.root = null;
            } else if (superNode.left == node) {
                superNode.left = null;
            } else if (superNode.right == node) {
                superNode.right = null;
            }
        } else if (node.left != null && node.right == null) {
            // 只有左子树:
            if (superNode == null) {
                this.root = node.left
            } else if (superNode.left == node) {
                superNode.left = node.left;
            } else if (superNode.right == node) {
                superNode.right = node.left;
            }

        } else if (node.left == null && node.right != null) {
            // 只有右子树:
            if (superNode == null) {
                this.root = node.right
            } else if (superNode.left == node) {
                superNode.left = node.right;
            } else if (superNode.right == node) {
                superNode.right = node.right;
            }
        } else {
            // 左右都有:左子树的最右孩子（或者右子树的最左孩子），与该节点兑换，删除叶子节点
            let [left_rightNode, left_rightSuperNode] = [node.left, null];
            while(left_rightNode.right != null) {
                left_rightSuperNode = left_rightNode;
                left_rightNode = left_rightNode.right;
            }

            left_rightNode.left = node.left;
            left_rightNode.right = node.right;
            if (superNode == null) {
                this.root = left_rightNode;
            } else if (superNode.left == node) {
                superNode.left = left_rightNode;
            } else if (superNode.right == node) {
                superNode.right = left_rightNode;
            }

            node.left = null;
            node.right = null;
            left_rightSuperNode.right = null;
        }

        return result;
    }

    // 查找，存在返回该节点，不存在返回null
    searchNode(data) {
        return _searchNode(this.root, data);
    }
}

// -------------------------平衡二叉树------------------------------//

class AVLNode extends TreeNode {
    constructor(data, height, left, right) {
        super(data, left, right);
        this.height = height;
    }
}

// 平衡二叉树
// 插入、删除都按照平衡二叉树的规则操作
class AVLBinaryTree extends BinaryTree {
    constructor(arr) {
        super();
        this.root = null;
        for (let i = 0; i < arr.length; i++) {
            let [success, avlNode] = this.insertNodeByAVL(this.root, arr[i]);
            this.root = avlNode;
        }
    }

    insertNodeByAVL(avlNode, data) {
        return _insertNodeByAVL(avlNode, data);
    }

    deleteNodeByAvl(avlNode, data) {
        return _deleteNodeByAVL(avlNode, data);
    }
}

// 查找，存在：返回该节点与父节点，不存在：返回[null, super]
const _searchNodeAndSuper = (tree, data) => {
    let node = tree;
    let superNode = null;
    while (node != null) {
        if (data < node.data) {
            superNode = node;
            node = node.left;
        } else if (data > node.data) {
            superNode = node;
            node = node.right;
        } else {
            break;
        }
    }
    return [node, superNode];
}

const _searchNode = (node, data) => {
    if (node == null) {
        return null;
    }

    if (data < node.data) {
        return _searchNode(node.left, data);
    } else if (data > node.data) {
        return _searchNode(node.right, data);
    } else {
        return node;
    }
}

const _insertNodeByAVL = (avlNode, data) => {
    let sucess = true;
    if (avlNode == null) {
        avlNode = new AVLNode(data);
    } else if (data < avlNode.data) {
        let [sucess, leftNode] = _insertNodeByAVL(avlNode.left, data);
        if (sucess == true) {
            avlNode.left = leftNode;
        }

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
        let [success, rightNode] = _insertNodeByAVL(avlNode.right, data);
        if (sucess == true) {
            avlNode.right = rightNode;
        }
       
        if (_getNodeHeight(avlNode.right) - _getNodeHeight(avlNode.left) > 1) {
            if (data > avlNode.data) {
                // 右右旋转
                avlNode = _rrRotate(avlNode);
            } else {
                // 右左旋转
                avlNode = _rlRotate(avlNode);
            }   
        }
    } else {
        // 重复数据、插入失败
        sucess = false
    }

    avlNode.height = Math.max(_getNodeHeight(avlNode.left), _getNodeHeight(avlNode.right)) + 1;

    return [sucess, avlNode];
}


const _deleteNodeByAVL = (avlNode, data) => {
    
    if (avlNode == null) {
        return [false, null];
    }

    let sucess = true;

    if (data == avlNode.data) {

        if (avlNode.left != null && avlNode.right != null) {
            // 左右子树均不为空
            if (_getNodeHeight(avlNode.left) > _getNodeHeight(avlNode.right)) {
                // 左子树高度大

            } else {
                // 右子树高度大

            }

        } else {

        }

    } else if (data < avlNode.data) {
        
        _deleteNodeByAVL(avlNode.right, data)

    } else if (data > avlNode.data) {

        _deleteNodeByAVL(avlNode.left, data)

    }

    return [sucess, avlNode];
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

// 左左旋转
const _llRotate = (avlNode) => {
    let node = avlNode.left;
    avlNode.left = node.right;
    node.right = avlNode;
    avlNode.height = Math.max(_getNodeHeight(avlNode.left), _getNodeHeight(avlNode.right)) + 1;
    node.height = Math.max(_getNodeHeight(node.left), _getNodeHeight(node.right)) + 1;
    return node;
}

// 右右旋转
const _rrRotate = (avlNode) => {
    let node = avlNode.right;
    avlNode.right = node.left;
    node.left = avlNode;
    node.height = Math.max(_getNodeHeight(node.left), _getNodeHeight(node.right)) + 1;
    avlNode.height = Math.max(_getNodeHeight(avlNode.left), _getNodeHeight(avlNode.right)) + 1;
    return node;
}

// 左右旋转
const _lrRotate = (avlNode) => {
    _rrRotate(avlNode.left);
    return _llRotate(avlNode);
}

// 右左旋转
const _rlRotate = (avlNode) => {
    _llRotate(avlNode.right);
    return _rrRotate(avlNode);
}

module.exports = {
    BinaryTree: BinaryTree,
    BinarySearchTree: BinarySearchTree,
    AVLBinaryTree: AVLBinaryTree,
}