---
layout: post
title: C++黑魔法：神奇的pb_ds库
date: 2014-11-03 22:21
comments: true
categories: C++黑魔法
---

PBDS:Policy-Based Data Structures.
GNU GCC自带的库之一，实现了一些高效的数据结构（用在STL容器中）。
涵盖Heap,Trie,Balanced BST等。（[详细](https://gcc.gnu.org/onlinedocs/libstdc%2B%2B/ext/pb_ds/)）

CCF表示可以在NOI系列比赛中使用，用法小结在[这里](http://tieba.baidu.com/p/1953796498)。

简单介绍一下使用这里面的`priority_queue`来优化Dijkstra。

##优势

自带`modify`操作，实现Dijkstra再无门槛。
比STL的堆效率高，其中默认使用的`pairing_heap`可过[BZOJ3040](http://www.lydsy.com/JudgeOnline/problem.php?id=3040)。可使用的五种堆的介绍见[这里](http://tieba.baidu.com/p/2215390730)。

##如何使用

开头`#include <ext/pb_ds/priority_queue>`
定义`__gnu_pbds::priority_queue<element_type, cmp, heap_tag>`

##代码

<script src="https://gist.github.com/footoredo/e34d824d7f009cc9ff60.js"></script>
