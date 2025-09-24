---
title: Interview Note - Linked List
date: '2015-01-24'
categories:
  - English
  - Interview
tags:
  - InterviewNote
  - LinkedList
slug: 2015/01/24/InterviewNote4LinkedList
layout: post
---
### 1. Introduce Dummy Node
When the head of the target list we want to return may be different from the original given list, we can use a dummy node linked to the result so that we can get what we want by calling `dummy.next`.

[Remove Duplicates from Sorted List II](http://lintcode.com/problem/remove-duplicates-from-sorted-list-ii):
``` java
public class Solution {
    public static ListNode deleteDuplicates(ListNode head) {
        if(head == null || head.next == null) {
            return head;
        }

        ListNode dummy = new ListNode(0);
        ListNode pre = dummy;
        ListNode cur = head;
        int dup = Integer.MIN_VALUE;

        while(cur != null && cur.next != null) {
            if(cur.val == cur.next.val) {
                dup = cur.val;
                while(cur.val == dup) {
                    cur = cur.next;
                    // if the rest of elements are all the same
                    if(cur == null) {
                        return dummy.next;
                    }
                }
            } else {
                pre.next = cur;
                pre = pre.next;
                cur = cur.next;
                // add null to pre.next: in case the rest of elements are the same and returned above
                pre.next = null;
            }
        }
        // add the last element (since cur.next != null skip this element)
        pre.next = cur;

        return dummy.next;
    }
}
```

[Reverse Linked List II](http://lintcode.com/problem/reverse-linked-list-ii):
``` java
public class Solution {
    public ListNode reverseBetween(ListNode head, int m, int n) {
        if(head == null) {
            return head;
        }

        // find the m position node
        int count = 1;
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;
        while(count < m) {
            pre = pre.next;
            count++;
        }

        // do the reverse: pre-> reverse[first->cur->next] ...
        ListNode first = pre.next;
        ListNode cur = pre.next.next;
        while(count < n) {
            ListNode next = cur.next;
            cur.next = pre.next;
            pre.next = cur;
            cur = next;
            count++;
            if(count == n) {
                first.next = next;
            }
        }

        return dummy.next;
    }
}
```

**Similar Problems:**
[Partition List](http://lintcode.com/problem/partition-list)
[Insertion Sort List](https://oj.leetcode.com/problems/insertion-sort-list/)
[Reverse Nodes in k-group](https://oj.leetcode.com/problems/reverse-nodes-in-k-group/)
[Remove Node in Binary Search Tree](http://lintcode.com/problem/remove-node-in-binary-search-tree)
[Copy List with Random Pointer](http://lintcode.com/problem/copy-list-with-random-pointer)
[Swap Nodes in pairs](https://oj.leetcode.com/problems/swap-nodes-in-pairs/)

### 2. Basic Operations
1. Insert a Node in sorted List
2. [Remove a Node from Linked List](http://lintcode.com/problem/remove-nth-node-from-end-of-list)
3. [Reverse a Linked List](http://lintcode.com/problem/reverse-linked-list)
4. [Merge Two Sorted Lists](http://lintcode.com/problem/merge-two-sorted-lists)
5. [Sort List](http://lintcode.com/problem/sort-list): 
Define a `ListNode separate(ListNode head)` and a `ListNode merge(ListNode l1, ListNode l2)` and do a merge sort. In the return statement (`return merge(separate(head1), separate(head2))`) of the separate method, we do the recursion until there is only one element left, do the merge method so that we can get sorted lists.
6. Find the middle of a linked list:
Use a fast pointer and a slow pointer to find the middle element. It is also used in finding [list cycle](http://lintcode.com/problem/linked-list-cycle-ii), or [Reorder List](http://lintcode.com/problem/reorder-list).

**Example:** [Merge k Sorted Lists](http://lintcode.com/problem/merge-k-sorted-lists)
###### Solution 1: Use Heap(PriorityQueue)
We maintain a heap (ATTENTION: `compare(o1, o2)`, return neg(o1 < o2), 0 (o1 == o2) or pos(o1 > o2)). The top of the heap will be the smallest element in the heap.
This method will cost O(nk) for traverse all elements and O(logk) time to insert it into heap, so O(nklogk), O(k) space cost for the heap.
``` java
public class Solution {
    public ListNode mergeKLists(ArrayList<ListNode> lists) {
        PriorityQueue<ListNode> heap = new PriorityQueue<ListNode>(11, new Comparator<ListNode>() {
            @Override
            public int compare(ListNode l1, ListNode l2) {
                return l1.val - l2.val;
            }
        });
        
        for(int i = 0; i < lists.size(); i++) {
            // !!! PriorityQueue DOES NOT allow null element !!!
            if(lists.get(i) != null) {
                heap.offer(lists.get(i));
            }
        }
        
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        while(heap.size() > 0) {
            ListNode node = heap.poll();
            cur.next = node;
            cur = cur.next;
            // !!! PriorityQueue DOES NOT allow null element !!!
            if(node.next != null) {
                heap.offer(node.next);
            }
        }
        return dummy.next;
    }
}
```

###### Solution 2: Divide & Conquer(Merge Sort)
Do merge sort the lists of linked list and merge each pair of them.
Cost: Merge Sort costs O(klogk) * O(n)Merge = O(nklogk), space O(logk) for the recursion stack.
``` java
public class Solution {
    public ListNode mergeKLists(List<ListNode> lists) {
        if(lists == null || lists.size() == 0) {
            return null;
        }
        return helper(lists, 0, lists.size() - 1);
    }
    
    // Merge sort the lists
    private ListNode helper(List<ListNode> lists, int first, int last) {
        if(first < last) {
            int mid = (first + last) / 2;
            return merge(helper(lists, first, mid), helper(lists, mid + 1, last));
        }
        // we finally only return the first one
        return lists.get(first);
    }
    
    private ListNode merge(ListNode l1, ListNode l2) {
        if(l1 == null) {
            return l2;
        }
        if(l2 == null) {
            return l1;
        }
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        while(l1 != null && l2 != null) {
            if(l1.val < l2.val) {
                cur.next = l1;
                l1 = l1.next;
            } else {
                cur.next = l2;
                l2 = l2.next;
            }
            cur = cur.next;
        }
        if(l1 != null) {
            cur.next = l1;
        }
        if(l2 != null) {
            cur.next = l2;
        }
        return dummy.next;
    }
}
```

**Similar Problems:**
[Convert Sorted List to BST](http://lintcode.com/problem/convert-sorted-list-to-binary-search-tree)