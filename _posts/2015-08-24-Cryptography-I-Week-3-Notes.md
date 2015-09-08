---
layout: post
title: Cryptography I Week 3 Notes
date: 2015-08-24 17:39
comments: true
categories: 
---

##Message Auth. Codes
- Goal:  **integrity**,    no confidentiality.
- **MAC** \\(I:=(S,V)\\)
  - \\(S:K \times M \to T\\)
  - \\(V:K \times T \to \text{yes or no}\\)

##Secure MACs
- ![Secure MACs](https://dn-footoredo.qbox.me/Seure%20MACs.png)
- **Thm:** If \\( F: K \times X \to Y \\) is a secure PRF and \\( 1/\|Y\| \\) is "negligible" , then \\( I_F \\) is a secure MAC.

##Constructions
- ![encrypted CBC-MAC](https://dn-footoredo.qbox.me/encrypted%20CBC-MAC.png)
- ![nested MAC](https://dn-footoredo.qbox.me/nested%20MAC.png)
- ![parallel MAC](https://dn-footoredo.qbox.me/parallel%20MAC.png)

##Carter­‐Wegman MAC
- One-time MAC \\( \Rightarrow \\) Many-time MAC
- Construction:
  - let \\( (S,V) \\) be a secure one-time MAC over \\( (K_I,M,\\{0,1\\}^n) \\)
  - let \\( F: K_F \times \\{0,1\\}^n \to \\{0,1\\}^n \\) be a secure PRF
  - \\( \text{CW}((k_1,k_2),m) = (r, F(k_1,r) \oplus S(k_2,m))\\) for random \\( r \leftarrow \\{0,1\\}^n \\)
