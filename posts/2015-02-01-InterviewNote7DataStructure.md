---
title: Interview Note - Data Structure
date: '2015-02-02'
categories:
  - English
  - Interview
tags:
  - InterviewNote
  - DataStructure
slug: 2015/02/01/InterviewNote7DataStructure
layout: post
---
**Data Structure** is a way to organize data. It provides some methods to handle data stream, e.g. insert, delete, etc.

 ### [](#Linear-Data-Structure)Linear Data Structure

#### [](#Queue-amp-Stack)Queue &amp; Stack

[Min Stack](http://lintcode.com/problem/min-stack)
Use two stacks, one is storing the input, when calling `pop()` or `peek()`, pop from another stack, which stores the minimum values from top to bottom.

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
class MinStack {
 ArrayList&lt;Integer&gt; stack = new ArrayList&lt;Integer&gt;();
 ArrayList&lt;Integer&gt; minStack = new ArrayList&lt;Integer&gt;();
 public void push(int x) {
 stack.add(x);
 if(minStack.isEmpty() || minStack.get(minStack.size() - 1) &gt;= x) {
 minStack.add(x);
 }
 return;
 }

 public void pop() {
 if(stack.isEmpty()) {
 return;
 }
 int elem = stack.remove(stack.size() - 1);
 if(!minStack.isEmpty() &amp;&amp; minStack.get(minStack.size() - 1) == elem) {
 minStack.remove(minStack.size() - 1);
 }
 return;
 }

 public int top() {
 if(!stack.isEmpty()) {
 return stack.get(stack.size() - 1);
 }
 return 0;
 }

 public int getMin() {
 if(!minStack.isEmpty()) {
 return minStack.get(minStack.size() - 1);
 }
 return 0;
 }
}
 [Implement Queue by stacks](http://lintcode.com/en/problem/implement-queue-by-stacks/)
Use two stacks, one is for storing elements. When calling `pop()` or `top()`, pop the elements from the first stack and push them into the second one.

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
public class Solution {
 private Stack&lt;Integer&gt; stack1;
 private Stack&lt;Integer&gt; stack2;

 public Solution() {
 // do initialization
 stack1 = new Stack&lt;Integer&gt;();
 stack2 = new Stack&lt;Integer&gt;();
 }
 
 public void push(int element) {
 stack1.push(element);
 }

 public int pop() {
 if(stack2.isEmpty()) {
 while(!stack1.isEmpty()) {
 stack2.push(stack1.pop());
 }
 }
 return stack2.pop();
 }

 public int top() {
 if(stack2.isEmpty()) {
 while(!stack1.isEmpty()) {
 stack2.push(stack1.pop());
 }
 }
 return stack2.peek();
 }
}
 [Largest Rectangle in Histogram](http://lintcode.com/problem/largest-rectangle-in-histogram)
Brute force: totally `O(n^2)` windows and `O(n)` to find the minimun one in each window, so we need `O(n^3)` time.
Improve: for each number, search both side of it until find two smaller number, calculate the result, `O(n^2)` cost.
Best: use a stack to store the **index** (all increased heights), when faced with a smaller one, pop out from tha stack and calculate the area until the value bigger than the peek() one. This method cost `O(n)` time, with `O(n)` space in worst case (two passes).

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
public class Solution {
 public int largestRectangleArea(int[] height) {
 if(height == null || height.length == 0) {
 return 0;
 }
 LinkedList&lt;Integer&gt; stack = new LinkedList&lt;Integer&gt;();
 int max = 0;
 for(int i = 0; i &lt; height.length; i++) {
 while(!stack.isEmpty() &amp;&amp; height[i] &lt;= height[stack.peek()]) {
 int index = stack.pop();
 // !!! i-stack.peek()-1, rather than i-index: [1,2,2] the last one to calculate the area
 // WHEN stack[0,2], not consecutive, we need to calculate from stack.peek() + 1 ~ i !!!
 max = Math.max(max, stack.isEmpty() ? i * height[index] : (i - stack.peek() - 1) * height[index]);
 }
 stack.push(i);
 }
 // Note: another solution is use another int[] which add a 0 at the end of the height[] and do a while
 // for this solution, we just do another while when stack is not empty after the for loop
 while(!stack.isEmpty()) {
 int index = stack.pop();
 // i --&gt; height.length, imagine we add a 0 at the end of height[]
 max = Math.max(max, stack.isEmpty() ? height.length * height[index] : (height.length - stack.peek() - 1) * height[index]);
 }
 return max;
 }
} 
 **expanded:** [Maximal Rectangle](https://oj.leetcode.com/problems/maximal-rectangle/)

 [Max Tree](http://lintcode.com/en/problem/max-tree/)
Method 1: Divide &amp; Conquer - O(n^2)
Method 2: Use stack to build the tree from bottom to top - O(n)

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
/**
 * Definition of TreeNode:
 * public class TreeNode {
 * public int val;
 * public TreeNode left, right;
 * public TreeNode(int val) {
 * this.val = val;
 * this.left = this.right = null;
 * }
 * }
 */
public class Solution {
 public TreeNode maxTree(int[] A) {
 if(A == null || A.length == 0) {
 return null;
 }

 LinkedList&lt;TreeNode&gt; stack = new LinkedList&lt;TreeNode&gt;();
 for(int i : A) {
 TreeNode cur = new TreeNode(i);
 if(!stack.isEmpty()) {
 TreeNode top = stack.peek();
 // compare with the current node value and the one on the top of the stack,
 // back track to find the one that smaller than the current one in the stack.
 while(!stack.isEmpty() &amp;&amp; stack.peek().val &lt; cur.val) {
 top = stack.pop();
 }
 if(stack.isEmpty()) {
 cur.left = top;
 } else {
 // 6 - 0 - 3 - 1 
 /* 6 6 - 3 6 - 3 
 / \ / / / / \
 0 0 0 1
 / / / /
 null null null null
 */ 
 cur.left = stack.peek().right;
 stack.peek().right = cur;
 }
 }
 stack.push(cur);
 }

 while(stack.size() &gt; 1) {
 stack.pop();
 }
 return stack.pop();
 }
}
 #### [](#Hash)Hash

**How to get Hash Value?**

  Easily use MD5 to convert string into integers, and then mod by the size of the hash table. Use magic number 33(APR):1
2
3
4
5
6
7
8
int hashFunction(String key) {
 int sum = 0;
 for(int i = 0; i &lt; key.length(); i++) {
 sum = sum * 33 + (int)(key.charAt(i));
 sum = sum % Hash_Table_Size;
 }
 return sum;
}
  **How to deal with collision?**

  Open hashing: use linkedlist(cost extra space) Closed hashing: use existed data(cost extra time, worst case O(n))
To get the best performance of Hash Table, we usually insert elements no more than 10% of the hash table’s capacity. When the elements beyond 10%, we will do rehash to expand the capacity(double).  **Hash in Java!**

 **Hashtable**: thread safe
**HashSet** and **HashMap**: not thread safe

 **Related Problems:**
[LRU cache](https://oj.leetcode.com/problems/lru-cache/)
[Longest Consecutive Subsequence]

 ### [](#Tree-Data-Structure)Tree Data Structure

#### [](#Heap)Heap

In Java, it is PriorityQueue. Basically, a heap is a binary tree. If it is a minimum heap, a node has a smaller value comparing to its children.

 [Median Number II](http://lintcode.com/en/problem/median-ii/)
[Building Outline](http://www.glassdoor.com/Interview/Given-a-set-of-2D-coordinates-for-the-4-corners-of-each-building-in-a-city-skyline-as-if-in-a-photograph-how-would-you-d-QTN_345912.htm)(Swiping Line Algorithm):
Separate (x1, x2, height) to (x1, height, BUILDING_START), (x2, height, BUILDING_END). Sort all items by x’s ascending order. Swipe the items from left to right, keep a max heap store heights, when meet a BUILDING_START item, insert the height into the heap, when meet a BUILDING_END item, delete the height in the heap. The max height in the heap is height in outline with current x you meet.

 #### [](#Trie)Trie

From Retrieve. A kind of dictionary tree, which has 26 children for each node. Here is an [implementation](https://community.oracle.com/thread/2070706) of trie tree. A typical problem solving by trie tree is [Word Search II](http://lintcode.com/problem/word-search-ii), which can be solved by [BFS](https://github.com/kidchen/InterviewPreparation/blob/master/Word%20Search%20II.java) or [trie](http://www.toptal.com/java/the-trie-a-neglected-data-structure).
