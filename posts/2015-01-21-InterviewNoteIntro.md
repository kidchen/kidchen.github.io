---
title: Interview Note - Intro
date: '2015-01-22'
categories:
  - English
  - Interview
tags:
  - InterviewNote
  - CodingStyle
  - Permutations
slug: 2015/01/21/InterviewNoteIntro
layout: post
---
## [](#Coding-Style)Coding Style

 Leave blank space around each operations Give meaningful names to parameters Add space line between two logic blocks  For example, [Implement strStr()](https://oj.leetcode.com/problems/implement-strstr/):

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
public class Solution {
 public String strStr(String haystack, String needle) {
 if(haystack.length() &lt; needle.length()) {
 return null;
 }
 if(haystack == null || needle == null || needle.length() == 0) {
 return haystack;
 }

 for(int i = 0; i &lt;= haystack.length() - needle.length(); i++) {
 boolean find = true;
 for(int j = 0; j &lt; needle.length(); j++) {
 if(haystack.charAt(i + j) != needle.charAt(j)) {
 find = false;
 break;
 }
 }
 if(find == true) {
 return haystack.substring(i);
 }
 }

 return null;
 }
}
 **Tips:** A well-known algorithm to solve this problem is using KMP. This method can run in O(m+n) time. But usually, during a 45 minutes interview, complete this O(m*n) method is enough. So, understanding what the point the interviewer asks is very important.

 Think it in this way. *If I were the interview*:
This guy may be my potential colleague. Is there any bug here? Because if there are many bugs, I will probably debug a lot for him when we are in a team.
Is he talktive? Well, I will give you limited conditions about the problem and I hope you can ask me for more details. Also, to every question, pay attention to the boundry condition.

 ## [](#When-we-solve-a-coding-problem)When we solve a coding problem

 Pay attention to the boundry condition Do communication during the writing part When finished coding, do a test case no matter the interviewer request or not  ## [](#Permutations-Problems)Permutations Problems

[Subsets](https://oj.leetcode.com/problems/subsets/):

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
public class Solution {
 public ArrayList&lt;ArrayList&lt;Integer&gt;&gt; subsets(int[] S) {
 ArrayList&lt;ArrayList&lt;Integer&gt;&gt; result = new ArrayList&lt;ArrayList&lt;Integer&gt;&gt;();
 ArrayList&lt;Integer&gt; subset = new ArrayList&lt;Integer&gt;();
 Arrays.sort(S);
 helper(result, subset, 0, S);
 return result;
 }
 
 private void helper(ArrayList&lt;ArrayList&lt;Integer&gt;&gt; result, ArrayList&lt;Integer&gt; subset, int len, int[] S) {
 result.add(new ArrayList&lt;Integer&gt;(subset));
 for(int i = len; i &lt; S.length; i++) {
 subset.add(S[i]);
 helper(result, subset,i + 1, S);
 subset.remove(subset.size() - 1);
 }
 }
}
 Similar Problems:
[SubsetsII](https://oj.leetcode.com/problems/subsets-ii/)
[Permutations](https://oj.leetcode.com/problems/permutations/)
[PermutationsII](https://oj.leetcode.com/problems/permutations-ii/)
[CombinationSum](https://oj.leetcode.com/problems/combination-sum/)
[Letter Combination of a Phone Number](https://oj.leetcode.com/problems/letter-combinations-of-a-phone-number/)
[Palindrome Partitioning](https://oj.leetcode.com/problems/palindrome-partitioning/)
[Restore IP address](https://oj.leetcode.com/problems/restore-ip-addresses/)
