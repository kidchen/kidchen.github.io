---
title: Interview Note - Graph &amp; Search
date: '2015-01-29'
categories:
  - English
  - Interview
tags:
  - InterviewNote
  - Graph
slug: 2015/01/29/InterviewNote6Graph
layout: post
---
[Clone Graph](http://lintcode.com/problem/clone-graph)

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
/**
 * Definition for undirected graph.
 * class UndirectedGraphNode {
 * int label;
 * ArrayList&lt;UndirectedGraphNode&gt; neighbors;
 * UndirectedGraphNode(int x) { label = x; neighbors = new ArrayList&lt;UndirectedGraphNode&gt;(); }
 * };
 */
public class Solution {
 public UndirectedGraphNode cloneGraph(UndirectedGraphNode node) {
 if(node == null) {
 return null;
 }

 LinkedList&lt;UndirectedGraphNode&gt; queue = new LinkedList&lt;UndirectedGraphNode&gt;();
 HashMap&lt;UndirectedGraphNode, UndirectedGraphNode&gt; map = new HashMap&lt;UndirectedGraphNode, UndirectedGraphNode&gt;();
 queue.offer(node);
 map.put(node, new UndirectedGraphNode(node.label));

 while(!queue.isEmpty()) {
 UndirectedGraphNode cur = queue.poll();
 for(int i = 0; i &lt; cur.neighbors.size(); i++) {
 // !!! if node not in map, add a new node into the map !!!
 if(!map.containsKey(cur.neighbors.get(i))) {
 map.put(cur.neighbors.get(i), new UndirectedGraphNode(cur.neighbors.get(i).label));
 queue.offer(cur.neighbors.get(i));
 }
 // now we are sure that the node is existed, add the neighbors to the value
 map.get(cur).neighbors.add(map.get(cur.neighbors.get(i)));
 }
 }

 return map.get(node);
 }
}
 [Topological Sorting](http://lintcode.com/en/problem/topological-sorting/)
DFS: `O(n)` time with `O(n)` space for the map and the result.

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
/**
 * Definition for Directed graph.
 * class DirectedGraphNode {
 * int label;
 * ArrayList&lt;DirectedGraphNode&gt; neighbors;
 * DirectedGraphNode(int x) { label = x; neighbors = new ArrayList&lt;DirectedGraphNode&gt;(); }
 * };
 */
public class Solution {
 /**
 * @param graph: A list of Directed graph node
 * @return: Any topological order for the given graph.
 */ 
 public ArrayList&lt;DirectedGraphNode&gt; topSort(ArrayList&lt;DirectedGraphNode&gt; graph) {
 ArrayList&lt;DirectedGraphNode&gt; result = new ArrayList&lt;DirectedGraphNode&gt;();
 if(graph == null || graph.size() == 0) {
 return result;
 }
 // construct map with all nodes
 HashMap&lt;DirectedGraphNode, Integer&gt; map = new HashMap&lt;DirectedGraphNode, Integer&gt;();
 for(DirectedGraphNode node: graph) {
 // mark 0 as unsorted
 map.put(node, 0);
 }
 // find a new unsorted node to start sorting (if possible):
 while (hasUnsorted(map, graph)) {
 DirectedGraphNode node = null;
 for (DirectedGraphNode temp : graph) {
 if (map.get(temp) == 0) {
 node = temp;
 }
 }
 // get the node and do sort(search):
 sort(map, graph, result, node);
 }
 return result;
 }
 
 // check if there is any node that not yet been sorted
 public boolean hasUnsorted(Map&lt;DirectedGraphNode, Integer&gt; map, ArrayList&lt;DirectedGraphNode&gt; graph){
 for (DirectedGraphNode node : graph) {
 if (map.get(node) == 0) {
 return true;
 }
 }
 return false;
 }
 
 // search and sort the graph
 public void sort(Map&lt;DirectedGraphNode, Integer&gt; map, ArrayList&lt;DirectedGraphNode&gt; graph, ArrayList&lt;DirectedGraphNode&gt; result, DirectedGraphNode node){
 if (map.get(node) != 0) {
 // if 1: System.out.println("It is not a DAG");
 // if 2: sorted
 return;
 }
 // mark 1 as visited(not yet been sorted), do with its neighbors:
 map.put(node, 1);
 for (DirectedGraphNode next : node.neighbors) {
 sort(map, graph, result, next);
 }
 // mark 2 as sorted
 // map.put(node, 2);
 result.add(0, node);
 }
}
 **Similar Problems:**
[Permutations](http://lintcode.com/problem/permutations)
[Subsets](http://lintcode.com/problem/subsets)
[Subsets II](http://lintcode.com/problem/unique-subsets)
[N-Queens](http://lintcode.com/problem/n-queens)
[Palindrome Partition](http://lintcode.com/problem/palindrome-partitioning)
[Combination Sum](http://lintcode.com/problem/combination-sum)
[Combination Sum II](http://lintcode.com/problem/combination-sum-ii)
[Word Ladder](http://lintcode.com/problem/word-ladder)
[Word Ladder II](http://lintcode.com/problem/word-ladder-ii)

 A real interview problem, [Six Degree of Kevin Bacon](http://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon):
**DFS:**
Create a stack and initialize it with the start node.
While the stack is not empty
 Pop out the top of the stack as the current node
 If there is a node linked with it, do recursion and put the node into the stack
 If the node is the target node, pop out all the elements from the stack and return
 Otherwise, return to the upper level and do the recursion again
Return null if the recursion terminated without finding the target

 Tradeoff:
If the depth is large, the recursion will cost a lot of time. But the improvement of this method is returning to the upper level if the degree is bigger than 6 since the goal we searching is to find a path that no more than 6 steps.

 **BFS:**
Create a queue and initialize it with the start node.
While the queue is not empty
 Remove the first node(a) from the queue
 For each node(b) adjacent to the current node(a)
 If the node(b) is unvisited
 Put the node&lt;b, a&gt; to the hashmap
 If it is the target node, do the backtrack and return the arraylist
 Otherwise, add the adjacent node(b) to the end of the queue
Return null if the loop terminated without finding the target

 Tradeoff:
Better to find shortest path than DFS. But if there are too many nodes in each level, it will cost a lot of time.

 **Implementation of the BFS method:**
The return type is `ArrayList&lt;Actor&gt;`, which is the path from actor_1 to actor_2. The degree of the separation is the length of the path. We can also calculate the degree during the path finding process. I use STDIO to output the degree when each level of the graph traversal ends.

 **Data structures:**
Define an Actor class. When we call its movies, it returns all the movies the actor enrolled in. All the movies stored in a hash set.

 1
2
3
4
5
6
public class Actor {
 HashSet&lt;Movie&gt; movies;
 Actor(HashSet&lt;Movie&gt; m) {
 movies = m;
 }
}
 Similarly, define a movie class. When we call its actors, it returns all the actors appear in this movie. All the actors stored in a hash set.

 1
2
3
4
5
6
public class Movie {
 HashSet&lt;Actor&gt; actors;
 Movie(HashSet&lt;Actor&gt; a) {
 actors = a;
 }
}
 We use a queue to perform the BFS. It stores all the unvisited nodes in each level of the graph. A hash map, `visitedActors&lt;actor1, actor2&gt;`, to store each pair of actors who appear in the same movie. Another hash map, `visitedMovies&lt;movie, boolean&gt;`, to store all the movies we have visited and iterated.

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
53
54
public ArrayList&lt;Actor&gt; calculateDegree(Actor actor_1, Actor actor_2) {
 // input validation check
 ArrayList&lt;Actor&gt; result = new ArrayList&lt;Actor&gt;();
 if(actor_1 == null || actor_2 == null) {
 return result;
 }
 // initialize
 LinkedList&lt;Actor&gt; queue = new LinkedList&lt;Actor&gt;();
 queue.add(actor_1);
 HashMap&lt;Actor, Actor&gt; visitedActors = new HashMap&lt;Actor, Actor&gt;();
 HashMap&lt;Movie, Boolean&gt; visitedMovies = new HashMap&lt;Movie, Boolean&gt;();
 visitedActors.put(actor_1, null);
 int degree = 0;

 while (!queue.isEmpty()) {
 Actor cur_actor = queue.poll();
 
 // for all the movies the cur_actor enrolled:
 for (Movie m : cur_actor.movies) {
 if (visitedMovies.containsKey(m)) {
 continue;
 }
 
 // if this movie we didn't visited
 visitedMovies.put(m, true);
 // for all the actors in this movie:
 for (Actor a : m.actors) {
 if (visitedActors.containsKey(a)) {
 continue;
 }
 // if this actor we didn't visited
 visitedActors.put(a, cur_actor);

 // when we find the actor_2
 if (a == actor_2) { 
 // back track the path from actor_2 to actor_1: 
 while (a != null) {
 result.add(a);
 a = visitedActors.get(a);
 }
 Collections.reverse(result);
 return result;
 } else {
 queue.add(a);
 }
 }
 }
 // after each level of the graph, add one degree
 degree++;
 System.out.println(degree); 
 }

 return null;
}
