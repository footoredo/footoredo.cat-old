---
layout: post
title: "[BZOJ 4161 & 4162] Shlw loves matrix I && II 题解"
date: 2015-07-06 07:56
comments: true
categories: bzoj
---

4161题解[见此](http://footoredo.cat/K-order-constant-coefficient-homogeneous-linear-recursive-O--k---2-logn--algorithm/)。

*4162解法较无脑，建议不得已之下再查看题解*

由4161得到启发，只要能求出一个矩阵的特征多项式，便能在`O(k^2logn+k^3)`的时间内解决矩阵乘方问题。问题就在于如何求一个一般矩阵的特征多项式。

由特征多项式的定义可以发现特征多项式一定是一个$$k$$次多项式。于是任取$$k+1$$个值带入求值后插值或消元即可，复杂度`O(k^4)`。暂时想不到什么更优解法。

code:
{% highlight c++ %}
#include <bits/stdc++.h>
using namespace std;
#define rep(i,s,t) for (int i=(s);i<=(t);i++)
#define per(i,s,t) for (int i=(s);i>=(t);i--)
#define REP(i,n) rep(i,0,(n)-1)
#define PER(i,n) per(i,(n)-1,0)
typedef long long LL;

const int K=55,MODN=1000000007;
int k,a[K],f[K*2];
char n[11111];

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
void pw(char *n) {
  cur[1]=1; ret[0]=1;
  int len=strlen(n);
  PER(i,len) {
    if ((n[i]-'0')&1) mult(ret,ret,cur);
    mult(cur,cur,cur);
  }
}

inline int rev(int x) {
  int n=MODN-2,cur=x,ret=1;
  for (;n;n>>=1) {
    if (n&1) ret=LL(ret)*cur%MODN;
    cur=LL(cur)*cur%MODN;
  }
  //printf("%d %d\n",x,ret);
  return ret;
}

inline int gauss(int A[K][K],int n,int m) {
  int ret=1;
  REP(i,n) {
    rep(j,i+1,n-1) if (A[j][i]) {
      if (!A[i][i]) {
	ret=MODN-ret;
	rep(k,i,m-1) swap(A[i][k],A[j][k]);
      }
      else {
	int c=LL(rev(A[i][i]))*A[j][i]%MODN;
	rep(k,i,m-1) A[j][k]=(A[j][k]-LL(c)*A[i][k])%MODN;
      }
    }
  }
  return ret;
}

int adj[K][K],mat[K][K];
inline int solve(int lambda) {
  REP(i,k) REP(j,k) mat[i][j]=(MODN-adj[i][j])%MODN;
  REP(i,k) (mat[i][i]+=lambda)%=MODN;
  int ret=gauss(mat,k,k);
  REP(i,k) ret=LL(ret)*mat[i][i]%MODN;
  return ret;
}

int eq[K][K];
map<int,bool> used;
void calc_a() {
  REP(i,k) REP(j,k) scanf("%d",&adj[i][j]);
  REP(i,k+1) {
    int lambda,cur=1;
    for (;used[lambda=rand()%MODN];); used[lambda]=1;
    REP(j,k+1) {
      eq[i][j]=cur; cur=LL(cur)*lambda%MODN;
    }
    eq[i][k+1]=solve(lambda);
  }
  gauss(eq,k+1,k+2);
  PER(i,k+1) {
    LL c=LL(rev(eq[i][i]))*eq[i][k+1]%MODN;
    REP(j,i) eq[j][k+1]=(eq[j][k+1]-c*eq[j][i])%MODN;
    if (i!=k) a[k-i-1]=(MODN-c)%MODN;
  }
}

int ans[K][K],tmpm[K][K];

int main() {
  scanf("%s%d",n,&k);
  calc_a();

  pw(n);
  REP(i,k) REP(j,k) mat[i][j]=ans[i][j]=0;
  REP(i,k) mat[i][i]=1;
  REP(i,k) {
    REP(a,k) REP(b,k) ans[a][b]=(ans[a][b]+LL(ret[i])*mat[a][b])%MODN,tmpm[a][b]=0;
    REP(c,k) REP(a,k) REP(b,k) tmpm[a][b]=(tmpm[a][b]+LL(mat[a][c])*adj[c][b])%MODN;
    REP(a,k) REP(b,k) mat[a][b]=tmpm[a][b];
  }

  REP(i,k) REP(j,k) printf(j==k-1?"%d\n":"%d ",(ans[i][j]+MODN)%MODN);

  return 0;
}
{% endhighlight %}
