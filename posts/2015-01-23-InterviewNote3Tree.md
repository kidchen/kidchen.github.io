---
title: Interview Note - Binary Tree
date: '2015-01-23'
categories:
  - English
  - Interview
tags:
  - InterviewNote
  - BinaryTree
  - DFS
  - BFS
  - Divide&Conquer
  - QuickSort
  - MergeSort
slug: 2015/01/23/InterviewNote3Tree
layout: post
---

### 1. Binary Tree DFS Traversal
#### 1.1 Recursion
This method will cost `O(n)` time with no extra space. The space is assigned by system(which could be `O(1)` or `O(h)`, h is the height of the tree).
``` java
public ArrayList<Integer> preorderTraversal(TreeNode root) {
    ArrayList<Integer> result = new ArrayList<Integer>();
    helper(root, result);
    return result;
}

private void helper(TreeNode root, ArrayList<Integer> result) {
    if(root == null) {
        return;
    }
    result.add(root.val);
    helper(root.left, result);
    helper(root.right, result);
}
```

#### 1.2 Iteration
Use a stack to store the nodes. Pay attention to the order of storing. We store the right subtree node before the left one, so that we can get the preorder nodes when pop from the stack.
This method will cost `O(n)` time with `O(h)` extra space for the stack.
``` java
 */
public class Solution {
    public ArrayList<Integer> preorderTraversal(TreeNode root) {
        ArrayList<Integer> result = new ArrayList<Integer>();
        if(root == null) {
            return result;
        }
        
        Stack<TreeNode> stack = new Stack<TreeNode>();
        stack.push(root);
        while(!stack.isEmpty()) {
            TreeNode cur = stack.pop();
            result.add(cur.val);
            if(cur.right != null) {
                stack.push(cur.right);
            }
            if(cur.left != null) {
                stack.push(cur.left);
            }
        }
        
        return result;
    }
}
```

#### 1.3 Divide & Conquer
The different between this method and the recursion one is the return type: this method returns an arraylist, but the recursion method doesn't return anything. This method will cost `O(n)` time with `O(n)` space.
``` java
public class Solution {
    public ArrayList<Integer> preorderTraversal(TreeNode root) {
        ArrayList<Integer> result = new ArrayList<Integer>();
        if(root == null) {
            return result;
        }

        // divide
        ArrayList<Integer> leftSubtree = preorderTraversal(root.left);
        ArrayList<Integer> rightSubtree = preorderTraversal(root.right);
        
        // conquer
        result.add(root.val);
        result.addAll(leftSubtree);
        result.addAll(rightSubtree);
        
        return result;
    }
}
```

Divide & Conquer method is useful in sorting algorithm.
 
###### 1.3.1 Quick Sort
This is the most useful sorting algorithm in industry. Its average time complexity is `O(nlogn)`, but in worst case, it could be `O(n^2)` when the pivot we found is not ideal. This algorithm is in-place(no extra space needs) but not stable(*stable*: if after sorting [2,2',1,1'], we get[1,1',2,2'], we call it stable, otherwise it is not stable).
Related Problems:
[Partition Array](http://lintcode.com/en/problem/partition-array/)
[Sort Color II](http://lintcode.com/problem/sort-colors-ii)
[Median](http://lintcode.com/problem/median)
 
###### 1.3.2 Merge Sort
This algorithm costs `O(nlogn)` time and `O(n)` space. Although it is a stable algorithm, the space costs and the "move"(move the sorted result from temp space to the original position) step make it not that useful like quick sort.
Related Problems:
[Merge sorted array II](http://lintcode.com/problem/merge-sorted-array-ii)
[Merge k sorted lists](http://lintcode.com/en/problem/merge-k-sorted-lists/)

**Similar Problems**:
[Maximum Depth of the Binary Tree](http://lintcode.com/problem/maximum-depth-of-binary-tree)
[Balanced Binary Tree](http://lintcode.com/problem/balanced-binary-tree)
[Binary Tree Maximum Path Sum](http://lintcode.com/problem/binary-tree-maximum-path-sum)
[Lowest Common Ancestor](http://lintcode.com/problem/lowest-common-ancestor)
[Serialization and Deserialization of Binary Tree](http://lintcode.com/problem/serialization-and-deserialization-of-binary-tree)

### 2. Binary Tree BFS Traversal
Use a queue to store current degree(depth) of the nodes and traverse all the degree.
**Example:**
[Binary Tree Level Order Traversal](http://lintcode.com/problem/binary-tree-level-order-traversal):
``` java
public class Solution {
    public ArrayList<ArrayList<Integer>> levelOrder(TreeNode root) {
        ArrayList<ArrayList<Integer>> result = new ArrayList<ArrayList<Integer>>();
        if(root == null) {
            return result;
        }

        LinkedList<TreeNode> queue = new LinkedList<TreeNode>();
        ArrayList<Integer> level = new ArrayList<Integer>();
        queue.add(root);
        int lastNum = 1;
        int curNum = 0;

        while(!queue.isEmpty()) {
            TreeNode cur = queue.poll();
            level.add(cur.val);
            lastNum--;
            if(cur.left != null) {
                queue.add(cur.left);
                curNum++;
            }
            if(cur.right != null) {
                queue.add(cur.right);
                curNum++;
            }
            if(lastNum == 0) {
                lastNum = curNum;
                curNum = 0;
                result.add(level);
                level = new ArrayList<Integer>();
            }
        }

        return result;
    }
}
```

### 3. Binary Search Tree
[Remove Node in a BST](http://lintcode.com/problem/remove-node-in-binary-search-tree):
1. Find the node we need to remove
2. Find the minimum node in the right subtree (or the maximum node in the left subtree)
3. Replace the node with the minimum node in the right subtree (or the maximum node in the left subtree)
Replace:
If `node.right == null`: replace the node with its left child(`parent.child = node.left`)
Else if node has right child: replace the node with the smallest one that in its right subtree. To do that, we keep two nodes(`temp` and `father`), tracking to find the smallest node and replace it.

``` java
public class Solution {
    public TreeNode removeNode(TreeNode root, int value) {
        if(root == null) {
            return null;
        }

        TreeNode dummy = new TreeNode(0);
        dummy.left = root;
        TreeNode parent = find(root, value, dummy);
        TreeNode node;

        if(parent.left != null && parent.left.val == value) {
            node = parent.left;
        } else if(parent.right != null && parent.right.val == value) {
            node = parent.right;
        } else {
            return dummy.left;
        }

        remove(node, parent);

        return dummy.left;
    }
    
    private TreeNode find(TreeNode root, int value, TreeNode parent) {
        if(root == null) {
            return parent;
        }
        if(root.val == value) {
            return parent;
        } else if(root.val < value) {
            return find(root.right, value, root);
        } else {
            return find(root.left, value, root);
        }
    }
    
    private void remove(TreeNode node, TreeNode parent) {
        if(node.right == null) {
            if(parent.left == node) {
                parent.left = node.left;
            } else {
                parent.right = node.left;
            }
        } else {
            TreeNode temp = node.right;
            TreeNode father = node;
            while(temp.left != null) {
                father = temp;
                temp = temp.left;
            }
            if(father.right == temp) {
                father.right = temp.right;
            } else {
                father.left = temp.right;
            }
            if(parent.left == node) {
                parent.left = temp;
            } else {
                parent.right = temp;
            }
            temp.left = node.left;
            temp.right = node.right;
        }
    }
}
```

**Similar Problems:**
[Insert Node in a BST](http://lintcode.com/problem/insert-node-in-a-binary-search-tree)
[Validate BST](http://lintcode.com/problem/validate-binary-search-tree)
[Search Range in BST](http://lintcode.com/problem/search-range-in-binary-search-tree)
[Implement Iterator of BST](http://lintcode.com/problem/implement-iterator-of-binary-search-tree)