---
title: Interview Note - Dynanmic Programming
date: '2015-01-25'
categories:
  - English
  - Interview
tags:
  - InterviewNote
  - DP
slug: 2015/01/25/InterviewNote5DP
layout: post
---
### 1. Dynamic Programming
A method for solving a complex problem by breaking it down into a collection of simpler sub-problems.

#### 1.1 When to use
1. One of the following three:
 - Maximum/Minimum Problem
 - Yes or No Question
 - Count all possible solutions
2. Can't do sort or swap operation

**Note:** DP can't return all results, it only returns max/min, yes/no or a certain value(like length, possible solutions, etc.).

#### 1.2 How to think
1. States: what we need to store for each sub-problem (usually an array).
2. Function: what is the relationship between each state.
3. Intialization: what is the start of each state.
4. Answer: what is the end of each state.

**Example:** [Number Triangle](http://lintcode.com/en/problem/number-triangle/)
We use an array `f[i][j]` to record the minimum sum from (0, 0) to (i, j). For a certain (i, j), we know it is either from (i - 1, j - 1) or (i - 1, j). So the sub-problem is to traverse all elements in the triangle and calculate all the `f[i][j] = min(f[i - 1][j - 1], f[i - 1][j]) + T[i]][j]`. The result will be the minimum one in `f[n - 1][0, ..., n - 1]`.
We can also do it from bottom up. First we find the minimum of each pair in the last row, then we do above similarly but from bottom up. Finally the only one element left in the array is the result we are looking for.
A bonus point is doing this using only `O(n)` extra space, where n is the total number of rows in the triangle. Since each time we calculate `f[i][j]`, the result is only related with `f[i - 1][]`, we can only use 1D array and update the elements in it in each for loop.
Here is the code from bottom up with `O(n)` space cost.
``` java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        if(triangle.size() == 0) {
            return 0;
        }

        int[] result = new int[triangle.size() + 1];
        
        for(int row = triangle.size() - 1; row >= 0; row--) {
            for(int col = 0; col <= row; col++) {
                result[col] = Math.min(result[col], result[col + 1]) + triangle.get(row).get(col);
            }
        }
        
        return result[0];
    }
}
```
Dynamic Programming uses extra space to remember the mid-result. So that it is more efficient than recursive searching, which may repeated calculate the same mid-result for many times. In the above example, if we do a brute force search, it cost `O(2^n)` time, where n is the height of the triangle (each row, we need to choose one from two, totally n rows). But it only costs `O(n^2)` in theoretical(m rows, each row has n elements, totally n^2) or `O(n)`, which means all numbers we only need to visit once. 

### 2. Category
#### 2.1 Matrix
Straightforward problems with usually 2D matrix. Using the first column and first row can reduce the space costs.
[Unique Path](http://lintcode.com/problem/unique-paths)
[Unique Path II](http://lintcode.com/problem/unique-paths-ii)
[Minimum Path Sum](http://lintcode.com/problem/minimum-path-sum)

#### 2.2 Sequence
[Longest Increasing Subsequence](http://lintcode.com/problem/longest-increasing-subsequence)
DP solution: `O(n^2)` time with `O(n)` space cost. 
The state array `result[i]` means when we make the *i*th element as the end of the subsequence, the maximum length of this sequence. The relationship is like `result[i] = max(result[i], result[j] + 1)`, where `result[j] + 1` happens when we found an increasing pair(the max length until j, and adding one to include j, which is an increasing element).
A very good explaination can be found [here](http://www.geeksforgeeks.org/longest-monotonically-increasing-subsequence-size-n-log-n/).
``` java
public class Solution {
    public int longestIncreasingSubsequence(int[] nums) {
        if(nums == null || nums.length == 0) {
            return 0;
        }

        int[] result = new int[nums.length];
        result[0] = 1;
        for(int i = 1; i < nums.length; i++) {
            result[i] = 1;
            for(int j = 0; j < i; j++) {
                if(nums[j] <= nums[i]) {
                    result[i] = Math.max(result[i], result[j] + 1);
                }
            }
        }
        int length = 1;
        for(int res : result) {
            length = Math.max(length, res);
        }

        return length;
    }
}
```

**Similar Problems:**
[Clambing stairs](http://lintcode.com/problem/climbing-stairs)
[Jump Game](http://lintcode.com/problem/jump-game)
[Jump Game II](http://lintcode.com/problem/jump-game-ii)
[Palindrome Partition II](http://lintcode.com/problem/palindrome-partitioning-ii)
[Word Segmentation](http://lintcode.com/problem/word-segmentation)

#### 2.3 Two sequences
[Longest Common Subsequence](http://lintcode.com/problem/longest-common-subsequence)
DP: `O(m * n)` time, `O(m * n)` space.
The state `result[i][j]` means for the subsequence ended at i in string A and the subsequence ended at j in string B, the maximum length of the common subsequence. The equation is in two situations: if two characters are the same, update the state to `result[i - 1][j - 1] + 1`, otherwise do a comparison with `result[i][j - 1]` and `result[i - 1][j]`, which means we continue finding the same character, but so far the longest one is either in A(i,j-1) or B(i-1,j).
Thinking of adding the last element to the array when writing the equation may be helpful.
Additionally, we can reduce this solution to [`O(2n)` space](https://github.com/kidchen/InterviewPreparation/blob/master/Longest%20Common%20Subsequence.java). Here we have to use two arrays to store the last row and the current one. If we only use one array, when we face matches more than once in a row, the result will be wrong, eg: [bdacde] & [dceab], (find d) the first row should be [0011111], but if we use only one array, it will be [0011122].
``` java
public class Solution {
    public int longestCommonSubsequence(String A, String B) {
        if(A.length() == 0 || B.length() == 0) {
            return 0;
        }
        int[][] result = new int[A.length() + 1][B.length() + 1];

        for(int i = 1; i <= A.length(); i++) {
            for(int j = 1; j <= B.length(); j++) {
                if(A.charAt(i - 1) == B.charAt(j - 1)) {
                    result[i][j] = result[i - 1][j - 1] + 1;
                } else {
                    result[i][j] = Math.max(result[i][j - 1], result[i - 1][j]);
                }
            }
        }

        return result[A.length()][B.length()];
    }
}
```

**Similar Problems:**
[Edit Distance](http://lintcode.com/problem/edit-distance)
[Distinct Subsequence](http://lintcode.com/problem/distinct-subsequences)
[Interleaving String](http://lintcode.com/problem/interleaving-string)
[Regular Expression Matching](http://lintcode.com/problem/regular-expression-matching)
[Wildcard Matching](https://oj.leetcode.com/problems/wildcard-matching/)

#### 2.4 Backpack Problem
[Backpack](http://lintcode.com/problem/backpack)
DP: `O(m * n)` time, `O(m)` space.
The state result[i] means we select items so that their weight sum equals to i, the closest sum is result[i].
``` java
public class Solution {
    public int backPack(int m, int[] A) {
        if(m == 0 || A == null || A.length == 0) {
            return 0;
        }

        // set an array that one size bigger than target
        int[] result = new int[m + 1];
        // outer: select an item
        for(int i = 0; i < A.length; i++) {
            int size = A[i];
            // inner: decide whether put it into the bag or not
            // from last to the one smaller or equals to target
            for(int j = m; j >= size; j--) {
                // max(not put in, put in)
                // put in: previous [j-size] items and current one(size)
                result[j] = Math.max(result[j], result[j - size] + size);
            }
        }

        return result[m];
    }
}
```
**Similar Problems:**
[Backpack II](http://lintcode.com/problem/backpack-ii)
[Minimum Adjustment Cost](http://lintcode.com/problem/minimum-adjustment-cost)