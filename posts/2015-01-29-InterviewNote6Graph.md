---
title: Interview Note - Graph & Search
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
``` java
/**
 * Definition for undirected graph.
 * class UndirectedGraphNode {
 *     int label;
 *     ArrayList<UndirectedGraphNode> neighbors;
 *     UndirectedGraphNode(int x) { label = x; neighbors = new ArrayList<UndirectedGraphNode>(); }
 * };
 */
public class Solution {
    public UndirectedGraphNode cloneGraph(UndirectedGraphNode node) {
        if(node == null) {
            return null;
        }

        LinkedList<UndirectedGraphNode> queue = new LinkedList<UndirectedGraphNode>();
        HashMap<UndirectedGraphNode, UndirectedGraphNode> map = new HashMap<UndirectedGraphNode, UndirectedGraphNode>();
        queue.offer(node);
        map.put(node, new UndirectedGraphNode(node.label));

        while(!queue.isEmpty()) {
            UndirectedGraphNode cur = queue.poll();
            for(int i = 0; i < cur.neighbors.size(); i++) {
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
```

[Topological Sorting](http://lintcode.com/en/problem/topological-sorting/)
DFS: `O(n)` time with `O(n)` space for the map and the result.
``` java
/**
 * Definition for Directed graph.
 * class DirectedGraphNode {
 *     int label;
 *     ArrayList<DirectedGraphNode> neighbors;
 *     DirectedGraphNode(int x) { label = x; neighbors = new ArrayList<DirectedGraphNode>(); }
 * };
 */
public class Solution {
    /**
     * @param graph: A list of Directed graph node
     * @return: Any topological order for the given graph.
     */    
    public ArrayList<DirectedGraphNode> topSort(ArrayList<DirectedGraphNode> graph) {
        ArrayList<DirectedGraphNode> result = new ArrayList<DirectedGraphNode>();
        if(graph == null || graph.size() == 0) {
            return result;
        }
        // construct map with all nodes
        HashMap<DirectedGraphNode, Integer> map = new HashMap<DirectedGraphNode, Integer>();
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
    public boolean hasUnsorted(Map<DirectedGraphNode, Integer> map, ArrayList<DirectedGraphNode> graph){
        for (DirectedGraphNode node : graph) {
            if (map.get(node) == 0) {
                return true;
            }
        }
        return false;
    }
    
    // search and sort the graph
    public void sort(Map<DirectedGraphNode, Integer> map, ArrayList<DirectedGraphNode> graph, ArrayList<DirectedGraphNode> result, DirectedGraphNode node){
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
```

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
        Put the node<b, a> to the hashmap
        If it is the target node, do the backtrack and return the arraylist
        Otherwise, add the adjacent node(b) to the end of the queue
Return null if the loop terminated without finding the target

Tradeoff:
Better to find shortest path than DFS. But if there are too many nodes in each level, it will cost a lot of time.

**Implementation of the BFS method:**
The return type is `ArrayList<Actor>`, which is the path from actor_1 to actor_2. The degree of the separation is the length of the path. We can also calculate the degree during the path finding process. I use STDIO to output the degree when each level of the graph traversal ends.

**Data structures:**
Define an Actor class. When we call its movies, it returns all the movies the actor enrolled in. All the movies stored in a hash set.
``` java
public class Actor {
    HashSet<Movie> movies;
    Actor(HashSet<Movie> m) {
        movies = m;
    }
}
```

Similarly, define a movie class. When we call its actors, it returns all the actors appear in this movie. All the actors stored in a hash set.
``` java
public class Movie {
    HashSet<Actor> actors;
    Movie(HashSet<Actor> a) {
        actors = a;
    }
}
```

We use a queue to perform the BFS. It stores all the unvisited nodes in each level of the graph. A hash map, `visitedActors<actor1, actor2>`, to store each pair of actors who appear in the same movie. Another hash map, `visitedMovies<movie, boolean>`, to store all the movies we have visited and iterated.

``` java
public ArrayList<Actor> calculateDegree(Actor actor_1, Actor actor_2) {
    // input validation check
    ArrayList<Actor> result = new ArrayList<Actor>();
    if(actor_1 == null || actor_2 == null) {
         return result;
    }
    // initialize
    LinkedList<Actor> queue = new LinkedList<Actor>();
    queue.add(actor_1);
    HashMap<Actor, Actor> visitedActors = new HashMap<Actor, Actor>();
    HashMap<Movie, Boolean> visitedMovies = new HashMap<Movie, Boolean>();
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
```