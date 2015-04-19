---
layout: post
title: 一些OI比赛中的技巧
date: 2015-04-19 19:06
comments: true
categories: 省选
---

Round2连浪两试把自己浪出队了。。写一点最近学会的技巧派遣下心情 顺便防止以后忘记

##1.long long范围内模意义下的的整数乘法

也就是求$a*b \mod n$，其中n一般是质数，a,b超过int范围，直接转成long long的话会炸。
方法有几种。

####1.1.类似快速幂

$$a*b \mod n=( (a* \lfloor b/2 \rfloor \mod n)*2 + a * ( b \mod 2) ) \mod n$$
像快速幂那样递归非递归都可以

####1.2.一种有限制的O(1)算法

设$M=\sqrt n$，$x=\lfloor b/M \rfloor$，$y=b \mod M$，那么
$$a*b \mod n=( (a*x \mod n)*M + a*y ) \mod n$$
与上一种差不多，优势在于复杂度O(1)，缺陷在于由于有与$\sqrt n$级别的数相乘的操作，只能做到$10^{12}$级别。

####1.3.奇怪的O(1)算法

直接上代码。

    ans=a*b-(long long)((long double)a/n*b+EPS)*n
    
用到的原理是

$$ a*b \mod n = a*b- \lfloor \frac {a*b} n \rfloor*n $$
观察代码，在计算$\lfloor \frac {a*b} n \rfloor $时采用的方法是计算$ (a/n)*b $再取整，`long double`类型精度有18位，基本没有问题。

在计算过程中利用了自然溢出。不考虑符号位的话自然溢出相当于将结果对$ 2^{64} $取模，设$ x=a*b \mod 2^{64} $，$ y=\lfloor \frac {a*b} n \rfloor \mod 2^{64} $，利用自然溢出后得到的结果为$ ans $或$ ans-2^{64} $，由于$ans<2^{64}$所以后一种是个负数。考虑计算机中有关补码的知识，$ ans-2^{64} $应是$ 2^{64}-ans $各位取反后再+1，当做65位2进制来考虑，各位取反相当于用$2^{65}-1$去减，可以得到
$$ (2^{65}-1)-(2^{64}-ans)+1=2^{64}+ans $$
由于实际上是64位二进制，最高位舍去，结果即为ans。

##2.循环队列的常数优化

在做SPFA及用到SPFA的费用流时会用到循环队列，否则就要吃RE，循环队列的写法有两种：一种是每次判断是否加过界，是则减回0，代码比较丑陋；一种是每次取模。两种方法都有一定的常数。考虑方法二，其常数在于取模（本身也只有取模），于是可以利用自然溢出来进行优化。即将l,r指针定义为`unsigned short`类型，其范围为[0,65536)，每次运算相当于自动对65536取模。

一个条件是由于SPFA队列中最多会有n个点，所以点数要少于65536。

##3.生成数据相关

####3.1.生成数据时快速更改种子

为了使每次初始种子不同，一种常见的方法是`srand(time(0))`，但这样的话每1秒才能换一次，效率低下。

    unsigned int gs() { unsigned long long seed;
        freopen("seed.txt", "r", stdin); cin>>seed;
        freopen("seed.txt", "w", stdout); cout<<seed=f(seed)<<endl;
        return seed;
    }
    
这是我的处理方法，其中`f(seed)`是一个随机数生成函数。

####3.2.windows中rand()范围太小

windows中rand()的取值只有short范围，处理方法为

    int rd() {
        return (rand()<<16)+rand();
    }

##4.倍增求LCA被卡空间而又不会tarjan

用树链剖分来代替，由于不用套任何数据结构所以其实常数很小，由于不要考虑一些边界情况实际代码可能比倍增更短。

---
先更这么多，想到再写吧。
