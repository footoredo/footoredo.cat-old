---
layout: post
title: k阶常系数齐次线性递推O(k^2logn)算法
date: 2015-07-01 19:00
comments: true
categories: 递推
---

*参考论文：郭晓旭，杨宽.「[线性递推关系与矩阵乘法](http://wenku.baidu.com/view/bac23be1c8d376eeafaa3111.html)」*

所谓k阶常系数齐次线性递推，既有

$$ h_n=c_1h_{n-1}+a_2h_{n-2}+ \cdots + a_k h_{n-k},\forall n\gt k $$

`O(k^3logn)`的矩阵乘法优化做法不再赘述。用其转移矩阵

$$  \mathbf{M}=
\begin{bmatrix}
a_1 & a_2 & a_3 & \cdots & a_{k-2} & a_{k-1} & a_{k} \\
1 & 0 & 0 & \cdots & 0 & 0 & 0 \\
0 & 1 & 0 & \cdots & 0 & 0 & 0 \\
0 & 0 & 1 & \cdots & 0 & 0 & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots & \vdots & \vdots \\
0 & 0 & 0 & \cdots & 1 & 0 & 0 \\
0 & 0 & 0 & \cdots & 0 & 1 & 0 \\
\end{bmatrix}_{k \times k}
$$

其特征多项式

$$ 
\begin{align}
f(\lambda)=|\lambda \mathbf{E} - \mathbf{M}| & =
\begin{vmatrix}
\lambda - a_1 & -a_2 & -a_3 & \cdots & -a_{k-2} & -a_{k-1} & -a_{k} \\
-1 & \lambda & 0 & \cdots & 0 & 0 & 0 \\
0 & -1 & \lambda & \cdots & 0 & 0 & 0 \\
0 & 0 & -1 & \cdots & 0 & 0 & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots & \vdots & \vdots \\
0 & 0 & 0 & \cdots & -1 & \lambda & 0 \\
0 & 0 & 0 & \cdots & 0 & -1 & \lambda \\
\end{vmatrix}_{k \times k} \\
& = \lambda ^ k - a_1 \lambda ^ {k-1} - a_2 \lambda ^ {k-2} - \cdots - a_k
\end{align}
$$

注意到有

$$ f(\mathbf{M})=0 $$

下面要将任意$$\mathbf{M}^{i}$$表示为$$\mathbf{E},\mathbf{M}^{1},\mathbf{M}^{2},\ldots,\mathbf{M}^{k-1}$$的线性组合，设其为$$g(i)(\mathbf{M})$$

首先

$$\forall 0 \leq i \leq k-1, g(i)(\mathbf{M})=\mathbf{M}^{i} $$

否则我们可以先令

$$g_0(\mathbf{M})=g(j)(\mathbf{M}) \times g(i-j)(\mathbf{M}),1\leq j \lt i$$

此时得到的$$g_0(\mathbf{M})$$是一个$$2k-2$$次多项式。

由之前的$$f(\mathbf{M})=0$$可以得到$$\mathbf{M}^{i}f(\mathbf{M})=0$$，展开之后有

$$ \mathbf{M}^{i+k} = \sum_{j=1}^{k} a_j\mathbf{M}^{i+k-j}$$

即可将$$ \mathbf{M}^{i+k} $$降维。从高到低依次对$$g_0(\mathbf{M})$$的每一个次数超过$$k-1$$的项进行操作即可。

每次求解`g(n)`时，取`j=n/2`即可递归进行。单次求解多项式乘法与降维都可以在`O(k^2)`的时间解决，总复杂度`O(k^2logn)`

设

$$  \mathbf{F_{0}} =
\begin{bmatrix}
h_k\\
\vdots\\
h_2\\
h_1\\
\end{bmatrix}
$$

则

$$
\mathbf{F} = \mathbf{M}^{n-k}\times\mathbf{F_{0}}=\sum_{i=0}^{k-1}b_i\mathbf{M}^i\mathbf{F_{0}}
$$

所以

$$
h_n=\sum_{i=0}^{k-1}b_i*h_{k+i}
$$

预处理出$$h_{k+1}$$到$$h_{2k-1}$$即可。

code:
{% highlight c++ %}
#include <bits/stdc++.h>
using namespace std;
#define rep(i,s,t) for (int i=(s);i<=(t);i++)
#define per(i,s,t) for (int i=(s);i>=(t);i--)
#define REP(i,n) rep(i,0,(n)-1)
#define PER(i,n) per(i,(n)-1,0)
typedef long long LL;

const int K=2222,MODN=1000000007;
int n,k,a[K],f[K*2];

int tmp[K*2];
inline void mult(int C[K],int A[K],int B[K]) {
  memset(tmp,0,sizeof(tmp[0])*k*2);
  REP(i,k) if (A[i]) REP(j,k) if (B[j]) tmp[i+j]=(tmp[i+j]+LL(A[i])*B[j])%MODN;
  per(i,2*k-2,k) if (tmp[i]) {
    REP(j,k) tmp[i-j-1]=(tmp[i-j-1]+LL(tmp[i])*a[j])%MODN;
    tmp[i]=0;
  }
  memcpy(C,tmp,sizeof(tmp[0])*k);
}

int cur[K],ret[K];
void pw(int n) {
  cur[1]=1; ret[0]=1;
  for (;n;n>>=1) {
    if (n&1) mult(ret,ret,cur);
    mult(cur,cur,cur);
  }
}

int main() {
  scanf("%d%d",&n,&k);
  REP(i,k) scanf("%d",a+i);
  REP(i,k) scanf("%d",f+i);
  if (n<k) { printf("%d\n",f[n]); return 0; }
  n-=k-1;

  pw(n);
  rep(i,k,2*k-1) REP(j,k) f[i]=(f[i]+LL(f[i-j-1])*a[j])%MODN;
  int fn=0;
  REP(i,k) fn=(fn+LL(f[i+k-1])*ret[i])%MODN;
  printf("%d\n",(fn+MODN)%MODN);

  return 0;
}

{% endhighlight %}
