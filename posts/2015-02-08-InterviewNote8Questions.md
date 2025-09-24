---
title: Interview Note - Examples
date: '2015-02-09'
categories:
  - English
  - Interview
tags:
  - InterviewNote
slug: 2015/02/08/InterviewNote8Questions
layout: post
---
### [](#Single-Number)Single Number

**XOR** features:
a ^ b = c
a ^ c = b
b ^ c = a
a ^ 0 = a
a ^ a = 0
(a ^ b) ^ c = a ^ (b ^ c)

  I: all the numbers appear twice except one
XOR all the numbers, and the result is the one II: all the numbers appear three times except one
Use a `int[32]` to store each bit, if the number of this bit can be mod by 3, we set it as 0, otherwise we set it as 1. III: all the numbers appear twice except two
XOR all the numbers so we can get the `two` by XOR. Since these two elements are not the same, there is at least one bit that different. We find this `different` position and XOR all the elements which have 1 on position `different`, the result is one of the two. Finally, we XOR the found one with XOR-ed `two`, we can get another one.  ### [](#Majority-Number)Majority Number

 I: find the number appears more than half
Since it is a *strict* majority number, we only need to maintain a variable `result` and a `counter`. Initially, when the `counter` faces with a different number, minus one of counter and change the `result` to this new number, otherwise we only need to add 1 to the `counter`. And finally, the `result` we maintained is the result. (We need to do another pass to make sure this number is the one we are looking for) II: find the number appears more than 1/3
Similar with I, we maintain two variables and two counters so that we can get most appeared two numbers. And then we put these two numbers back to the array to find out which one appears more than 1/3. (We can’t use counter to find out, because counters have minus operation during the traversal) III: find the number appears more than 1/k
We maintain a `HashMap&lt;number, counter&gt;`. Since if majority, each k different numbers should have more than one element. When we get k entries in the map, we remove entries which values are 1. Finally, find the entry that have highest value(count), that key should be the majority number. In this way, we can implement this in `O(n)` time and `O(k)` extra space.1
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
public class Solution {
 public int majorityNumber(ArrayList&lt;Integer&gt; nums, int k) {
 if(nums == null || nums.size() == 0) {
 return -1;
 }

 HashMap&lt;Integer, Integer&gt; map = new HashMap&lt;Integer, Integer&gt;();
 for(int num : nums) {
 if(map.containsKey(num)) {
 map.put(num, map.get(num) + 1);
 } else {
 // if there are k entries, check if there are any entries that
 // its value == 1, that is not satisfied with "more than 1/k"
 if(map.size() == k) {
 Iterator&lt;Map.Entry&lt;Integer, Integer&gt;&gt; iter = map.entrySet().iterator();
 while(iter.hasNext()) {
 Map.Entry&lt;Integer, Integer&gt; entry = iter.next();
 if(entry.getValue() - 1 == 0) {
 // can't use: map.remove(entry.getKey());
 // above wrong code would lead the iter can't find its next !!!
 iter.remove();
 } else {
 map.put(entry.getKey(), entry.getValue() - 1);
 }
 }
 } else {
 map.put(num, 1);
 }
 }
 }

 // find the one that have highest value(count), that key should be the majority number
 int value = 0;
 int result = -1;
 for(Map.Entry&lt;Integer, Integer&gt; entry : map.entrySet()) {
 if(entry.getValue() &gt; value) {
 value = entry.getValue();
 result = entry.getKey();
 }
 }
 return result;
 }
}
  ### [](#Best-Time-to-Buy-and-Sale-Stock)Best Time to Buy and Sale Stock

 I: one time operation
Maintain two variables, `local` and `global`. The `local = Math.max(prices[i] - prices[i - 1] + local, 0)`, means when we sell the stock on day `i`, our max profit is this much. The `global` is the max of itself and `local`. II: any times operation
Our goal is to find all the increasing segments in the array. So if we face an increasing, we add the difference to the `maxProfit`. III: two times operation (–&gt; k times)
Maintain two `int[3]`, one is `local[j] = Math.max(global[j - 1] + Math.max(diff, 0), local[j] + diff)`, where `diff = prices[i + 1] - prices[i]`. This variable means at day *i*, we can get the max profit by *j* operation(s). The first half means we sell the stock on day *j* instead of on `global[j - 1]`, the second half means we sell it on day *j* anyway. And the `global[j] = Math.max(local[j], global[j])` as before.  **Follow Up: k operations**

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
 public int maxProfit(int[] prices) {
 return max(prices, 2);
 }
 // k: k times transactions
 public int max(int[] prices, int k) {
 int len = prices.length;
 if(len == 0) {
 return 0;
 }
 int[][] local = new int[len][k+1];
 int[][] global = new int[len][k+1];
 for(int i=1; i&lt;len; i++) {
 int diff = prices[i] - prices[i-1];
 for(int j=1; j&lt;=k; j++) {
 /*
 * local[i][j]: max profit till i day, j transactions, where there is transaction happening on i day
 * global[i][j]: max profit across i days, j transactions
 */
 local[i][j] = Math.max(global[i-1][j-1]+Math.max(diff,0), local[i-1][j]+diff);
 global[i][j] = Math.max(global[i-1][j], local[i][j]);
 }
 }
 return global[len-1][k];
 }
}
 ### [](#Maximum-Subarray)Maximum Subarray

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
public class Solution {
 /**
 * @param nums: A list of integers
 * @param k: An integer denote to find k non-overlapping subarrays
 * @return: An integer denote the sum of max k non-overlapping subarrays
 */
 public int maxSubArray(ArrayList&lt;Integer&gt; nums, int k) {
 // write your code
 if(nums == null || nums.size() == 0 || k &lt; 1) {
 return Integer.MIN_VALUE;
 }
 
 int[][] dp = new int[k][nums.size()];
 
 /* init the dp[][]:
 eg. -7,1,-1,-3,-4,-10,2,-100,-51,-12
 after first for loop:
 -7 0 0 0 0 0 0 0 0 0 
 0 -6 0 0 0 0 0 0 0 0 
 0 0 -7 0 0 0 0 0 0 0 
 0 0 0 -10 0 0 0 0 0 0 
 after second for loop:
 -7 1 0 -3 -4 -10 2 -98 -51 -12 
 0 -6 0 0 0 0 0 0 0 0 
 0 0 -7 0 0 0 0 0 0 0 
 0 0 0 -10 0 0 0 0 0 0 
 */
 int sum = 0;
 for(int i = 0; i &lt; k; i++) {
 sum += nums.get(i);
 dp[i][i] = sum;
 }
 for(int i = 1; i &lt; nums.size(); i++) {
 dp[0][i] = Math.max(nums.get(i), dp[0][i - 1] + nums.get(i));
 }
 
 for(int i = 1; i &lt; k; i++) {
 for(int j = i + 1; j &lt; nums.size(); j++) {
 int curMax = dp[i][j - 1] + nums.get(j);
 for(int m = i - 1; m &lt; j; m++) {
 if(dp[i - 1][m] + nums.get(j) &gt; curMax) {
 curMax = dp[i - 1][m] + nums.get(j);
 }
 }
 dp[i][j] = curMax;
 }
 }
 /*
 after the main loops:
 -7 1 0 -3 -4 -10 2 -98 -51 -12 
 0 -6 0 -2 -3 -9 3 -97 -49 -10 
 0 0 -7 -3 -4 -10 2 -97 -48 -9 
 0 0 0 -10 -7 -13 -1 -98 -49 -10 
 */
 
 int result = Integer.MIN_VALUE;
 for(int i = k - 1; i &lt; nums.size(); i++) {
 if(dp[k - 1][i] &gt; result) {
 result = dp[k - 1][i];
 }
 }
 return result;
 }
}
 ### [](#k-Sum)k-Sum

### [](#Partition-Array)Partition Array

### [](#Quick-Questions)Quick Questions
