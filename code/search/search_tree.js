
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
            let rlt = this.insertNodeByAVL(arr[i]);
            console.log('insert result===========:', i, rlt);
            this.travalTreeByPreOrder(this.root);
        }
    }

    insertNodeByAVL(data) {

        let node = new TreeNode(data)
        if (this.root == null) {
            this.root = node;
            return true;
        }

        let success = true;
        let n0 = null;      // n1的父节点
        let n1 = this.root; // data要插入路径上第一个只有一个子树的节点
        while(1) {

            if (data == n1.data) {
                success = false;
                break;
            }

            if (n1.left != null && n1.right == null) {
                // only left
                if (data < n1.data) {
                    if (data < n1.left.data) {
                        // node - left - left
                        if (n0 == null) {
                            this.root = n1.left;
                        } else if (n0.left == n1) {
                            n0.left = n1.left;
                        } else {
                            n0.right = n1.left;
                        }
                        n1.left.left = node;
                        n1.left.right = n1.left;
                        n1.left = null;
                    } else if (data > n1.left.data) {
                        // node - left - right
                        if (n0 == null) {
                            this.root = node
                        } else if (n0.left == n1) {
                            n0.left = node;
                        } else {
                            n0.right = node;
                        }
                        node.left = n1.left;
                        node.right = n1;
                        n1.left = null;
                    } else {
                        success = false;
                    }
                } else {
                    n1.right = node;
                }
                break;
            } else if (n1.left == null && n1.right != null) {
                // only right
                if (data > n1.data) {
                    if (data > n1.right.data && n1.right.left == null) {
                        // node - right - right
                        if (n0 == null) {
                            this.root = n1.right
                        } else if (n0.left == n1) {
                            n0.left = n1.right;
                        } else {
                            n0.right = n1.right;
                        }
                        n1.right.left = n1;
                        n1.right.right = node;
                        n1.right = null;
                    } else if (data < n1.right && n1.right.right == null) {
                        // node - right - left
                        if (n0 == null) {
                            this.root = node
                        } else if (n0.left == n1) {
                            n0.left = node;
                        } else {
                            n0.right = node;
                        }
                        node.left = n1;
                        node.right = n1.right;
                        n1.right = null;
                    } else {
                        success = false;
                    }
                } else {
                    n1.left = node;
                }
                break;
            } else if (n1.left != null && n1.right != null) {
                // left and right
                if (data < n1.data) {
                    n0 = n1;
                    n1 = n1.left;
                    
                } else if (data > n1.data) {
                    n0 = n1;
                    n1 = n1.right;
                } else {
                    success = false;
                    break;
                }
                
            } else {
                // 叶子节点
                if (data < n1.data) {
                    n1.left = node; 
                } else if (data > n1.data) {
                    n1.right = node;
                } else {
                    success = false;
                }
                break;
            }
            
        }

        return success;
    }

    deleteNodeByAVL(data) {

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

module.exports = {
    BinaryTree: BinaryTree,
    BinarySearchTree: BinarySearchTree,
    AVLBinaryTree: AVLBinaryTree
}