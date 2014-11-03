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

{% highlight C++ %}
#include <bits/stdc++.h>
#include <ext/pb_ds/priority_queue.hpp>
using namespace std;
typedef long long ll;
#define rep(i,s,t) for (int i=(s); i<=(t); i++)
#define REP(i,n) rep(i,0,(n)-1)

const int N=1111111, M=N*10;
int n, m;

int adj[N], nxt[M], v[M], w[M], e;
inline void add(int u0, int v0, int w0) {
	nxt[e]=adj[u0]; v[e]=v0; w[e]=w0; adj[u0]=e++;
}

ll dist[N];
struct cmp {
	inline bool operator()(const int& a, const int& b) const {
		return dist[a]>dist[b];
	}
};
typedef __gnu_pbds::priority_queue<int,cmp,__gnu_pbds::pairing_heap_tag> pq_t;

pq_t PQ;
pq_t::point_iterator node[N];

int main() {
	memset(adj,-1,sizeof adj);
	scanf("%d%d", &n, &m);
	
	ll T, rxa, rxc, rya, ryc, rp, x=0, y=0, z=0;
	cin>>T>>rxa>>rxc>>rya>>ryc>>rp;
	REP(i,T) {
		x=(x*rxa+rxc)%rp;
		y=(y*rya+ryc)%rp;
		add(min(x%n+1,y%n+1),max(y%n+1,y%n+1),100000000-100*min(x%n+1,y%n+1));
	}
	REP(i,m-T) {
		int u, v, w;
		scanf("%d%d%d", &u, &v, &w);
		add(u, v, w);
	}
	
	dist[1]=0, node[1]=PQ.push(1); 
	rep(i,2,n) dist[i]=1LL<<62, node[i]=PQ.push(i);
	
	REP(i,n) {
		int u=PQ.top(); PQ.pop();
		ll curd=dist[u];
		for (int e=adj[u]; ~e; e=nxt[e])
			if (curd+w[e]<dist[v[e]]) dist[v[e]]=curd+w[e], PQ.modify(node[v[e]], v[e]);
	}
	
	cout<<dist[n]<<endl;
	
	return 0;
}
{% endhighlight %}
