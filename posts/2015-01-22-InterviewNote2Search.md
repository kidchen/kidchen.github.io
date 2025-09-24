---
title: Interview Note - Binary Search & Sorted Array
date: '2015-01-22'
categories:
  - English
  - Interview
tags:
  - InterviewNote
  - BinarySearch
  - SortedArray
slug: 2015/01/22/InterviewNote2Search
layout: post
---
### Binary Search
For a given sorted array (ascending order) and a target number, find the first index of this number in O(log n) time complexity.
If the target number does not exist in the array, return -1.
**Example:**
If the array is [1, 2, 3, 3, 4, 5, 10], for given target 3, return 2.

``` java
class Solution {
    public int binarySearch(int[] nums, int target) {
        if(nums == null || nums.length == 0) {
            return -1;
        }

        int start = 0;
        int end = nums.length - 1;
        while(start < end) {
            int mid = start + (end - start) / 2;
            if(nums[mid] >= target) {
                end = mid;
            } else {
                start = mid + 1;
            }
        }

        return nums[start] == target ? start : -1;
    }
}
```

**Key Points:**
1. `while(start < end)`: when start and end are overlapped each other, break. At this moment, we can return start or end. But it is different when we need to return the index before or after the target(see point 3).
2. `int mid = start + (end - start) / 2`: in order to avoid overflow of `start + end`, we need to do a little trick here.
3. `while loop`: in the while loop, there are two different needs:
- return the index of the target: as the example above.
- return the one before(example below)/after the target: 
[Search Insert Position](https://oj.leetcode.com/problems/search-insert-position/)
``` java
while(start <= end) {
    int mid = start + (end - start) / 2;
    if(A[mid] == target) {
        return mid;
    } else if(A[mid] < target) {
        start = mid + 1;
    } else {
        end = mid - 1;
    }
}
```
Here, we need to use `while(start <= end)` so that when we break the loop, two pointers are at two different(but neighbored) positions. Besides, if we want to return the one before the index, we return `start`, otherwise we return `end`.

**Example:** [Search in rotated sorted array](https://oj.leetcode.com/problems/search-in-rotated-sorted-array/):
In line 15, we can't use `A[mid] < A[right]`, eg: [3,1,1], 3.
``` java
while(left <= right) {
    int mid = left + (right - left) / 2;
    if(A[mid] == target) {
        return true;
    }
    // left part is sorted
    if(A[mid] > A[left]) {
        // target is in the left
        if(A[mid] > target && A[left] <= target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
        // right part is sorted
    } else if(A[mid] < A[left]) {
        // target is in the right
        if(A[mid] < target && A[right] >= target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    } else {
        // mid == left or mid == right
        left++;
    }
}
```

**Similar Problems:**
[Search for a Range](https://oj.leetcode.com/problems/search-for-a-range/): 
When finding left position, if `mid == target`, move **`end`** so that when break the loop, `start` will be like: `[end, start(left-most one)])`. 
Similarly, when finding right position, if `mid == target`, move **`start`**, so that `end` will be like: `[end(right-most one), start]` when break.
[Search in rotated sorted array II](https://oj.leetcode.com/problems/search-in-rotated-sorted-array-II/): worst case will cost O(n) time
[Find minimum in rotated sorted array](https://oj.leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
[Find minimum in rotated sorted array II](https://oj.leetcode.com/problems/find-minimum-in-rotated-sorted-array-II/)
[Search a 2D matrix](http://lintcode.com/en/problem/search-a-2d-matrix/)
[Search a 2D matrix II](http://lintcode.com/en/problem/search-a-2d-matrix-ii/): from top-right to bottom-left, so that left element is always smaller.
[Find a peak](http://lintcode.com/en/problem/find-a-peak/): 
``` java
if(A[mid] < A[mid + 1]) {
    start = mid + 1;
} else {
    end = mid;
}
```

### Sorted Array
#### Using Swap:
Given a rotated sorted array, recover it to sorted array **in-place**.
1. Reverse the left part of the pivot
2. Reverse the right part of the pivot
3. Reverse the whole array
eg.
[4, 5, 1, 2, 3] -> [5, 4, 1, 2, 3] -> [5, 4, 3, 2, 1] -> [1, 2, 3, 4, 5]

**Similar Problems:**
[Rotate String](http://lintcode.com/problem/rotate-string)
[Reverse words in a string](http://lintcode.com/problem/reverse-words-in-a-string)

#### Find Top k:
[Median of two sorted arrays](http://lintcode.com/en/problem/median-of-two-sorted-arrays/):
General top-k problem. In this code, `k` is not the index, but the kth top number. So when we use `k` in an array, we need to `-1`.
``` java
public class Solution {
    public double findMedianSortedArrays(int A[], int B[]) {
        // check odd/even
        int len = A.length + B.length;
        if((A.length + B.length) % 2 == 1) {
            return helper(A, B, 0, 0, len / 2 + 1);
        } else {
            return (helper(A, B, 0, 0, len / 2) + helper(A, B, 0, 0, len / 2 + 1) ) / 2.0;
        }
    }

    private int helper(int[] A, int[] B, int astart, int bstart, int k) {
        // if not in A/B (need to add =, since if A is empty..)
        if(astart >= A.length) {
            return B[bstart + k - 1];
        }
        if(bstart >= B.length) {
            return A[astart + k - 1];
        }
        if(k == 1) {
            // !!! index should be astart/bstart rather than 0 !!!
            return Math.min(A[astart], B[bstart]);
        }
        // find kth top:
        int ak = astart + k/2 - 1 < A.length ? A[astart + k/2 - 1] : Integer.MAX_VALUE;
        int bk = bstart + k/2 - 1 < B.length ? B[bstart + k/2 - 1] : Integer.MAX_VALUE;
        // !!! k-k/2, eg: k=3, odd number !!!
        if(ak < bk) {
            // no need to -1, because we don't put it into arrays right now
            return helper(A, B, astart + k/2, bstart, k - k/2);
        } else {
            return helper(A, B, astart, bstart + k/2, k - k/2);
        }
    }
}
```

**Similar Problems:**
[Remove dulplicates from sorted array]()
[Remove dulplicates from sorted array II]()
[Merge sorted array](http://lintcode.com/problem/merge-sorted-array)
[Merge sorted array II](http://lintcode.com/problem/merge-sorted-array-ii)