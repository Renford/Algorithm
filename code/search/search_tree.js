
// -------------------------二叉树------------------------------//

// todo: 
// ===1、二叉树节点添加parent，方便查找
// ===2、左右旋转方法提取到二叉树BinaryTree中
// 3、子类旋转统统采用LR、LL型...
// ===4、重构BST插入、删除算法
class BinaryTreeNode {
    constructor(data, parent, left, right) {
        this.data = data;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}

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

    // 左旋转：即将当前节点作为左子树
    leftRotate(node) {
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
            this.root = tempNode;
        }
    
        tempNode.left = node;
        node.parent = tempNode;
    
        return tempNode;
    }

    // 右旋转：即将当前节点作为右子树
    rightRotate(node) {
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
            this.root = tempNode;
        }
    
        tempNode.right = node;
        node.parent = tempNode;
    
        return tempNode;
    }
}

// -------------------------二叉搜索树------------------------------//

// TODO: 递归实现二叉搜索树的插入、删除

// 二叉搜索树，所有方法都遵循二叉搜索树的规则
// 主要实现创建、插入、删除、遍历（先序、中序、后续）
class BinarySearchTree extends BinaryTree {

    constructor(arr) {
        super();

        if (arr != null) {
            this.root = null;
            for (let i = 0; i < arr.length; i++) {
                this.insertNodeByBST(arr[i]);
            }
        }
    }

    // 查找，存在返回该节点，不存在返回null
    searchNode(data) {
        return _searchNode(this.root, data);
    }

    // 节点插入，返回sucess
    insertNodeByBST(data) {
        let [success, node] = _insertNode(data, this.root);
        this.root = node;
        return success;
    }

    // 删除节点，返回sucess
    deleteNodeByBST(data) {
        let [success, node] = _deleteNode(data, this.root, this.root);
        this.root = node;
        return success;
    }

    // 获取最大节点
    getMaxNode(node) {
        return _getMaxNode(node);
    }

    // 获取最小节点
    getMinNode(node) {
        return _getMinNode(node);
    }
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

const _insertNode = (data, node) => {

    if (node == null) {
        let tempNode = new BinaryTreeNode(data);
        return [true, tempNode];
    }

    if (data == node.data) {
        return [false, null];
    }

    let success = true;
    if (data < node.data) {
        let [succ, tempNode] = _insertNode(data, node.left);
        success = succ;
        node.left = tempNode;
        tempNode.parent = node;
    } else {
        let [succ, tempNode] = _insertNode(data, node.right);
        success = succ;
        node.right = tempNode;
        tempNode.parent = node;
    }

    return [true, node];
}

const _deleteNode = (data, node) => {
    if (node == null) {
        return [false, null];
    }

    let success = true;
    if (data < node.data) {
        let [succ, tempNode] = _deleteNode(data, node.left);
        success = succ;
        node.left = tempNode;
    } else if (data > node.data) {
        let [succ, tempNode] = _deleteNode(data, node.right);
        success = succ;
        node.right = tempNode;
    } else {
        if (node.left == null && node.right == null) {
            // 叶子节点
            if (node.parent == null) {
                node = null;
            } else if (node == node.parent.left) {
                node.parent.left = null;
            } else {
                node.parent.right = null;
            }
        } else if (node.left != null && node.right == null) {
            // 只有左子树
            if (node.parent == null) {
                node = node.left;
            } else if (node == node.parent.left) {
                node.parent.left = node.left;
            } else {
                node.parent.right = node.left;
            }
        } else if (node.left == null && node.right != null) {
            // 只有右子树
            if (node.parent == null) {
                node = node.right;
            } else if (node == node.parent.left) {
                node.parent.left = node.right;
            } else {
                node.parent.right = node.right;
            }
        } else {
            // 左右都有:左子树的最右孩子（或者右子树的最左孩子），与该节点兑换，删除叶子节点
            let leftMaxNode = _getMaxNode(node.left);
            node.data = leftMaxNode.data;
            let [succ, tempNode] = _deleteNode(leftMaxNode, leftMaxNode.data);
            success = succ;
        }
    }

    return [success, node];
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


module.exports = {
    BinaryTreeNode: BinaryTreeNode,
    BinaryTree: BinaryTree,
    BinarySearchTree: BinarySearchTree,
}