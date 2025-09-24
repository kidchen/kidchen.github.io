---
title: Interview Note - Intro
date: '2015-01-21'
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
## Coding Style
1. Leave blank space around each operations
2. Give meaningful names to parameters
3. Add space line between two logic blocks

For example, [Implement strStr()](https://oj.leetcode.com/problems/implement-strstr/):
``` java
public class Solution {
    public String strStr(String haystack, String needle) {
        if(haystack.length() < needle.length()) {
            return null;
        }
        if(haystack == null || needle == null || needle.length() == 0) {
            return haystack;
        }

        for(int i = 0; i <= haystack.length() - needle.length(); i++) {
            boolean find = true;
            for(int j = 0; j < needle.length(); j++) {
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
```

**Tips:** A well-known algorithm to solve this problem is using KMP. This method can run in O(m+n) time. But usually, during a 45 minutes interview, complete this O(m*n) method is enough. So, understanding what the point the interviewer asks is very important.

Think it in this way. *If I were the interview*: 
This guy may be my potential colleague. Is there any bug here? Because if there are many bugs, I will probably debug a lot for him when we are in a team. 
Is he talktive? Well, I will give you limited conditions about the problem and I hope you can ask me for more details. Also, to every question, pay attention to the boundry condition.

## When we solve a coding problem
1. Pay attention to the boundry condition
2. Do communication during the writing part
3. When finished coding, do a test case no matter the interviewer request or not

## Permutations Problems
[Subsets](https://oj.leetcode.com/problems/subsets/):
``` java
public class Solution {
    public ArrayList<ArrayList<Integer>> subsets(int[] S) {
        ArrayList<ArrayList<Integer>> result = new ArrayList<ArrayList<Integer>>();
        ArrayList<Integer> subset = new ArrayList<Integer>();
        Arrays.sort(S);
        helper(result, subset, 0, S);
        return result;
    }
    
    private void helper(ArrayList<ArrayList<Integer>> result, ArrayList<Integer> subset, int len, int[] S) {
        result.add(new ArrayList<Integer>(subset));
        for(int i = len; i < S.length; i++) {
            subset.add(S[i]);
            helper(result, subset,i + 1, S);
            subset.remove(subset.size() - 1);
        }
    }
}
```
Similar Problems:
[SubsetsII](https://oj.leetcode.com/problems/subsets-ii/)
[Permutations](https://oj.leetcode.com/problems/permutations/)
[PermutationsII](https://oj.leetcode.com/problems/permutations-ii/)
[CombinationSum](https://oj.leetcode.com/problems/combination-sum/)
[Letter Combination of a Phone Number](https://oj.leetcode.com/problems/letter-combinations-of-a-phone-number/)
[Palindrome Partitioning](https://oj.leetcode.com/problems/palindrome-partitioning/)
[Restore IP address](https://oj.leetcode.com/problems/restore-ip-addresses/)

