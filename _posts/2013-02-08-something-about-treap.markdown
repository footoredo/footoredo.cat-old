---
layout: post
title: "(´-ω-｀)一些关于treap的想法"
date: 2012-12-01 10:41
comments: true
categories: treap
---

treap是前几天学的。不得不说treap这种数据结构是在很好理解，代码量也偏低（相对于其他各种平衡树=-=）。关于treap的理论就不提了，满大街都是，这里只写一些实现方面的细节与技巧。
###树节点的存储方式
数组(mem[])模拟指针。需要的域有数值(data)、子节点(用了在zkw写的splay中的处理方法，用ch[2]来记录两个儿子的指针。会方便很多。)以及treap特有的标记(tag)。这里满足左子树数值小于自己数值；标记则是大根堆。

~~~
struct tree {
  int tag, ch[2];
  ll data;
  tree(): data(-oo), tag((rand()<<15)+rand()) { ch[0]=ch[1]=0; }
} mem[N];
~~~
{:lang="c++"}

*注：oo=∞。`(rand()<<15)+rand()`是一种不错的解决随机范围的方式哦=w=*
<!-- more -->
###对于操作中节点改动的处理
对于可能发生的节点改动，为了使父子关系对应正确，所有可能对结构改造的操作均返回改动后的节点指针。大概就是这样：

~~~
int operation(int T) {
  do_something;
  return new_T;
}
~~~
{:lang="c++"}

###旋转操作
传入一个布尔量d，表示将d子节点旋转至当前位置（与字面上的左旋、右旋相反），于是旋转只要一个。*(从zkw的splay那里学来的-v-)*

~~~
inline int rot(int T, bool d) {
  int x=mem[T].ch[d], y=mem[x].ch[!d];
  mem[T].ch[d]=y; mem[x].ch[!d]=T;
  return x;
}
~~~
{:lang="c++"}

###插入操作
插入操作采用的思想是先按传统BST的插入方法插入，然后对于每一层的节点与下一层节点比较，若不满足堆性质（子节点标记大于当前标记）则将子节点旋转上来。

~~~
int ins(int T, ll d0) {
  bool d;
  if (!T) { mem[cnt].data=d0; return size++; }
  mem[T].ch[d=(d0>=mem[T].data)]=ins(mem[T].ch[d], d0);
  if (mem[mem[T].ch[d]].tag>mem[T].tag) T=rot(T, d);
  return T;
}
~~~
{:lang="c++"}

*注：cnt表示当前使用的数组内存数。*
###查询/前趋/后继/最值操作
四合一。传入一个查询的数值d0及一个布尔量d，若d==0则表示寻找一个数值不小于d0的节点，反之则找不大于d0的节点。最小值只需调用fin(-oo,0)，最大值类似。

操作采用贪心逼近思想。
>    在树中查找，一旦遇到一个不大于这个元素的值的节点，更新当前的最优的节点，然后在当前节点的右子树中继续查找，目的是希望能找到一个更接近于这个元素的节点。如果遇到大于这个元素的值的节点，不更新最优值，节点的左子树中继续查找。直到遇到空节点，查找结束，当前最优的节点的值就是要求的前驱。求后继的方法与上述相似，只是要找不小于这个元素的值的节点。

~~~
int fin(int T, ll d0, int best, bool d) {
  if (!T) return best;
        if (mem[T].data==d0) return T;
  if (d^(mem[T].data>d0)) best=T;
  return fin(mem[T].ch[!(d^(best==T))],d0,best,d);
}
~~~
{:lang="c++"}

###删除操作
几个基本操作中最烦的。传入待删除数值todel，从根开始查找这一节点并开始删除。虽然也可以直接传入待删除指针并从该指针开始删除，但这就需要记录父亲指针，在维护节点时无疑会困难很多。因此在时间要求不特别严格是还是用这种方法较好。

利用标记的堆性质，将待删除节点不断与标记较大的子节点交换（旋转），直至成为叶子节点后返回0即可。

~~~
int del(int T, ll todel) {
  int ret=T; bool d;
  if (todel==mem[T].data) {
    if (!(mem[T].ch[0]||mem[T].ch[1])) return 0;
    ret=rot(T, d=(mem[mem[T].ch[0]].tag<mem[mem[T].ch[1]].tag));
    mem[ret].ch[!d]=del(T,todel);
  }
  else mem[T].ch[d=todel>mem[T].data]=del(mem[T].ch[d],todel);
  return ret;
}
~~~
{:lang="c++"}


有些部分略难懂，可以简单画一画再看

以上。
