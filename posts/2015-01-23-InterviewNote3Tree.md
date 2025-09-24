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
  - Divide&amp;Conquer
  - QuickSort
  - MergeSort
slug: 2015/01/23/InterviewNote3Tree
layout: post
---
### [](#1-Binary-Tree-DFS-Traversal)1. Binary Tree DFS Traversal

#### [](#1-1-Recursion)1.1 Recursion

This method will cost `O(n)` time with no extra space. The space is assigned by system(which could be `O(1)` or `O(h)`, h is the height of the tree).

 1
2
3
4
5
6
7
8
9
10
11
12
13
14
public ArrayList&lt;Integer&gt; preorderTraversal(TreeNode root) {
 ArrayList&lt;Integer&gt; result = new ArrayList&lt;Integer&gt;();
 helper(root, result);
 return result;
}

private void helper(TreeNode root, ArrayList&lt;Integer&gt; result) {
 if(root == null) {
 return;
 }
 result.add(root.val);
 helper(root.left, result);
 helper(root.right, result);
}
 #### [](#1-2-Iteration)1.2 Iteration

Use a stack to store the nodes. Pay attention to the order of storing. We store the right subtree node before the left one, so that we can get the preorder nodes when pop from the stack.
This method will cost `O(n)` time with `O(h)` extra space for the stack.

 1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
 */
public class Solution {
 public ArrayList&lt;Integer&gt; preorderTraversal(TreeNode root) {
 ArrayList&lt;Integer&gt; result = new ArrayList&lt;Integer&gt;();
 if(root == null) {
 return result;
 }
 
 Stack&lt;TreeNode&gt; stack = new Stack&lt;TreeNode&gt;();
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
 #### [](#1-3-Divide-amp-Conquer)1.3 Divide &amp; Conquer

The different between this method and the recursion one is the return type: this method returns an arraylist, but the recursion method doesn’t return anything. This method will cost `O(n)` time with `O(n)` space.

 1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
public class Solution {
 public ArrayList&lt;Integer&gt; preorderTraversal(TreeNode root) {
 ArrayList&lt;Integer&gt; result = new ArrayList&lt;Integer&gt;();
 if(root == null) {
 return result;
 }

 // divide
 ArrayList&lt;Integer&gt; leftSubtree = preorderTraversal(root.left);
 ArrayList&lt;Integer&gt; rightSubtree = preorderTraversal(root.right);
 
 // conquer
 result.add(root.val);
 result.addAll(leftSubtree);
 result.addAll(rightSubtree);
 
 return result;
 }
}
 Divide &amp; Conquer method is useful in sorting algorithm.

 ###### [](#1-3-1-Quick-Sort)1.3.1 Quick Sort

This is the most useful sorting algorithm in industry. Its average time complexity is `O(nlogn)`, but in worst case, it could be `O(n^2)` when the pivot we found is not ideal. This algorithm is in-place(no extra space needs) but not stable(*stable*: if after sorting [2,2’,1,1’], we get[1,1’,2,2’], we call it stable, otherwise it is not stable).
Related Problems:
[Partition Array](http://lintcode.com/en/problem/partition-array/)
[Sort Color II](http://lintcode.com/problem/sort-colors-ii)
[Median](http://lintcode.com/problem/median)

 ###### [](#1-3-2-Merge-Sort)1.3.2 Merge Sort

This algorithm costs `O(nlogn)` time and `O(n)` space. Although it is a stable algorithm, the space costs and the “move”(move the sorted result from temp space to the original position) step make it not that useful like quick sort.
Related Problems:
[Merge sorted array II](http://lintcode.com/problem/merge-sorted-array-ii)
[Merge k sorted lists](http://lintcode.com/en/problem/merge-k-sorted-lists/)

 **Similar Problems**:
[Maximum Depth of the Binary Tree](http://lintcode.com/problem/maximum-depth-of-binary-tree)
[Balanced Binary Tree](http://lintcode.com/problem/balanced-binary-tree)
[Binary Tree Maximum Path Sum](http://lintcode.com/problem/binary-tree-maximum-path-sum)
[Lowest Common Ancestor](http://lintcode.com/problem/lowest-common-ancestor)
[Serialization and Deserialization of Binary Tree](http://lintcode.com/problem/serialization-and-deserialization-of-binary-tree)

 ### [](#2-Binary-Tree-BFS-Traversal)2. Binary Tree BFS Traversal

Use a queue to store current degree(depth) of the nodes and traverse all the degree.
**Example:**
[Binary Tree Level Order Traversal](http://lintcode.com/problem/binary-tree-level-order-traversal):

 1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
public class Solution {
 public ArrayList&lt;ArrayList&lt;Integer&gt;&gt; levelOrder(TreeNode root) {
 ArrayList&lt;ArrayList&lt;Integer&gt;&gt; result = new ArrayList&lt;ArrayList&lt;Integer&gt;&gt;();
 if(root == null) {
 return result;
 }

 LinkedList&lt;TreeNode&gt; queue = new LinkedList&lt;TreeNode&gt;();
 ArrayList&lt;Integer&gt; level = new ArrayList&lt;Integer&gt;();
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
 level = new ArrayList&lt;Integer&gt;();
 }
 }

 return result;
 }
}
 ### [](#3-Binary-Search-Tree)3. Binary Search Tree

[Remove Node in a BST](http://lintcode.com/problem/remove-node-in-binary-search-tree):

  Find the node we need to remove Find the minimum node in the right subtree (or the maximum node in the left subtree) Replace the node with the minimum node in the right subtree (or the maximum node in the left subtree)
Replace:
If `node.right == null`: replace the node with its left child(`parent.child = node.left`)
Else if node has right child: replace the node with the smallest one that in its right subtree. To do that, we keep two nodes(`temp` and `father`), tracking to find the smallest node and replace it.  1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
public class Solution {
 public TreeNode removeNode(TreeNode root, int value) {
 if(root == null) {
 return null;
 }

 TreeNode dummy = new TreeNode(0);
 dummy.left = root;
 TreeNode parent = find(root, value, dummy);
 TreeNode node;

 if(parent.left != null &amp;&amp; parent.left.val == value) {
 node = parent.left;
 } else if(parent.right != null &amp;&amp; parent.right.val == value) {
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
 } else if(root.val &lt; value) {
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
 **Similar Problems:**
[Insert Node in a BST](http://lintcode.com/problem/insert-node-in-a-binary-search-tree)
[Validate BST](http://lintcode.com/problem/validate-binary-search-tree)
[Search Range in BST](http://lintcode.com/problem/search-range-in-binary-search-tree)
[Implement Iterator of BST](http://lintcode.com/problem/implement-iterator-of-binary-search-tree)
