
class TreeNode {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {

    static createBinaryTree(arr) {
        let tree = null;
        for (let i = 0; i < arr.length; i++) {
            tree = insertBST(tree, arr[i]);
        }
    }

    static insertBST(tree, data) {
        if (data == null) {
            return tree;
        }

        let node = new TreeNode(data);
        if (tree == null) {
            return node;
        } else {
            if (data < tree.data) {
                if (tree.left == null) {
                    tree.left = node;
                    return tree;
                } else if (data > tree.left.data) {
                    node.left = tree.left
                    tree.left = node
                    return tree;
                } else {
                    return insertBST(tree.left, data)
                }
            } else {
                if (tree.right == null) {
                    tree.right = node;
                    return tree;
                } else if (data < tree.right.data) {
                    node.right = tree.right
                    tree.right = node
                    return tree;
                } else {
                    return insertBST(tree.right, data)
                }
            }

            return tree;
        }
    }
}

module.exports = {

}