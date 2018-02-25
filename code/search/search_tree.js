
// -------------------------二叉树------------------------------//

class BinaryTreeNode {
    constructor(data, left, right) {
        this.data = data;
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

        if (data == null) {
            return false;
        }

        let node = new BinaryTreeNode(data);
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

module.exports = {
    BinaryTreeNode: BinaryTreeNode,
    BinaryTree: BinaryTree,
    BinarySearchTree: BinarySearchTree,
}