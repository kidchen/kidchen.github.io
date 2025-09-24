---
title: Interview Note - Union Find
date: '2017-03-01'
categories:
  - English
  - Interview
tags:
  - InterviewNote
  - UnionFind
slug: 2017/02/28/InterviewNoteUnionFind
layout: post
---
### [](#Union-Find)Union Find

From [wiki](https://en.wikipedia.org/wiki/Disjoint-set_data_structure):
In computer science, a **disjoint-set** data structure, also called a **union–find** data structure or **merge–find** set, is a data structure that keeps track of a set of elements partitioned into a number of disjoint (nonoverlapping) subsets. It supports two useful operations:
**Find**: Determine which subset a particular element is in. Find typically returns an item from this set that serves as its “representative”; by comparing the result of two Find operations, one can determine whether two elements are in the same subset.
**Union**: Join two subsets into a single subset.

 **Example:**
[261. Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/?tab=Description)
Given `n` nodes labeled from `0` to `n - 1` and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

 For example:
Given `n = 5` and `edges = [[0, 1], [0, 2], [0, 3], [1, 4]]`, return `true`.
Given `n = 5` and `edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]`, return `false`.

 Hint:
Given `n = 5` and `edges = [[0, 1], [1, 2], [3, 4]]`, what should your return? Is this case a valid tree?
According to the definition of tree on Wikipedia: “a tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.”

 Note: you can assume that no duplicate edges will appear in `edges`. Since all edges are undirected, `[0, 1]` is the same as `[1, 0]` and thus will not appear together in `edges`.

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
public class Solution {
 public boolean validTree(int n, int[][] edges) {
 UnionFind uf = new UnionFind(n);
 for (int i = 0; i &lt; edges.length; i++) {
 if (!uf.union(edges[i][0], edges[i][1])) {
 return false;
 }
 }
 return uf.size == 1;
 }
 
 private class UnionFind {
 int size;
 int[] nodes;
 
 UnionFind(int size) {
 this.size = size;
 this.nodes = new int[size];
 for (int i = 0; i &lt; size; i++) {
 nodes[i] = i;
 }
 }
 
 boolean union(int a, int b) {
 int label_a = nodes[a];
 int label_b = nodes[b];
 if (label_a == label_b) {
 return false;
 } else {
 for (int i = 0; i &lt; nodes.length; i++) {
 if (nodes[i] == label_a) {
 nodes[i] = label_b;
 }
 }
 size--;
 return true;
 }
 }
 }
}
 **Example:**
[305. Number of Islands II](https://leetcode.com/problems/number-of-islands-ii/?tab=Description):
A 2d grid map of `m` rows and `n` columns is initially filled with water. We may perform an addLand operation which turns the water at position (row, col) into a land. Given a list of positions to operate, **count the number of islands after each addLand operation**. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

 Example:
Given `m = 3, n = 3`, `positions = [[0,0], [0,1], [1,2], [2,1]]`.
Initially, the 2d grid `grid` is filled with water. (Assume 0 represents water and 1 represents land).
0 0 0
0 0 0
0 0 0
Operation #1: addLand(0, 0) turns the water at grid[0][0] into a land.
1 0 0
0 0 0 Number of islands = 1
0 0 0
Operation #2: addLand(0, 1) turns the water at grid[0][1] into a land.
1 1 0
0 0 0 Number of islands = 1
0 0 0
Operation #3: addLand(1, 2) turns the water at grid[1][2] into a land.
1 1 0
0 0 1 Number of islands = 2
0 0 0
Operation #4: addLand(2, 1) turns the water at grid[2][1] into a land.
1 1 0
0 0 1 Number of islands = 3
0 1 0
We return the result as an array: [1, 1, 2, 3]

 Challenge:
Can you do it in time complexity O(k log mn), where k is the length of the `positions`?

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
51
52
public class Solution {
 public List&lt;Integer&gt; numIslands2(int m, int n, int[][] positions) {
 List&lt;Integer&gt; result = new ArrayList&lt;&gt;();
 if (positions == null || positions.length == 0 || positions[0].length == 0) {
 return result;
 }

 // id for each position, init with -1
 int[] id = new int[m * n];
 Arrays.fill(id, -1);
 // number of islands
 int count = 0;

 // directions
 int[][] directions = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
 for (int i = 0; i &lt; positions.length; i++) {
 // init this position with its own index id, and update count
 int index = positions[i][0] * n + positions[i][1];
 id[index] = index;
 count++;

 // check surroundings
 for (int j = 0; j &lt; directions.length; j++) {
 int x = positions[i][0] + directions[j][0];
 int y = positions[i][1] + directions[j][1];
 // check validation of x,y and if it is an island
 if (x &gt;= 0 &amp;&amp; x &lt; m &amp;&amp; y &gt;= 0 &amp;&amp; y &lt; n &amp;&amp; id[x * n + y] != -1) {
 // find the island that it's index is this neighbor island id
 int originalIslandId = getOriginalIslandId(id, x * n + y);

 // when the neighbor island id is different with current island, union
 // union: change neighbor island (original) to current island id
 if (originalIslandId != index) {
 id[originalIslandId] = index;
 count--;
 }
 }
 }
 result.add(count);
 }
 return result;
 }

 public static int getOriginalIslandId(int[] id, int i) {
 // in order to reduce the height of the tree, find the root
 while (i != id[i]) {
 id[i] = id[id[i]];
 i = id[i];
 }
 return i;
 }
}
 **Similar Problems:**
[128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/?tab=Description)
[200. Number of Islands](https://leetcode.com/problems/number-of-islands/?tab=Description)
