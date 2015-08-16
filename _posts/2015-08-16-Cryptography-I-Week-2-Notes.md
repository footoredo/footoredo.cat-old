---
layout: post
title: Cryptography I Week 2 Notes
date: 2015-08-16 20:41
comments: true
categories: 
---

## PRPs and PRFs (and PRGs)
- Pseudo Random Fuction (PRF):
  - $$F:K \times X \to Y$$
  - Exists a "efficient" alg. to evaluate $$F$$
- Pseudo Random Permutation(PRP):
  - $$E:K \times X \to Y$$
  - Exists a "efficient" **deterministic** alg. to evaluate $$E$$
  - **Bijection**
  - Exists a "efficient" **inversion** alg.
- Pseudo Random Generator
  - $$G:\{0,1\}^s \to \{0,1\}^n, n \gg s$$
  - Exists a "efficient" **deterministic** alg. to evaluate $$G$$
 
## Secure PRF
- $$Funs[X,Y]:=$$All functions $$f:X \to Y$$
- $$S_F:=F(k,\cdot)$$
- A random function in $$Funs[X,Y]$$ is indistinguishable from a random function in $$S_F$$

## Secure PRP
- $$Perms[X]:=$$All **one-to-one** functions $$f:X \to X$$
- $$S_E:=E(k,\cdot)$$
- A random function in $$Perms[X]$$ is indistinguishable from a random function in $$S_E$$

## Feistel Network
- ![Feitel Network](http://7xk6q5.com1.z0.glb.clouddn.com/Feistel%20Network.png)
- **Invertible**
- **"Thm"** *(Luby-Rackoff '85):*
  - A secure PRF $$f:K \times \{0,1\}^n \to \{0,1\}^n$$
  - $$\Rightarrow$$ 3-Round Feistel $$F:K^3 \times \{0,1\}^{2n} \to \{0,1\}^{2n}$$ is a secure PRP

## DES
- ![16 Round Feistel network](http://7xk6q5.com1.z0.glb.clouddn.com/DES%2016%20round%20Feistel%20network.png)
- ![F(k_i,x)](http://7xk6q5.com1.z0.glb.clouddn.com/DES%20F(k_i,x).png)
- ![S-Boxes](http://7xk6q5.com1.z0.glb.clouddn.com/DES%20S-boxes.png)
  - No output bit should be close to a linear func. of the input bits

## Triple-DES
- $$3E:K^3 \times M \to M$$
- $$3E(k_1,k_2,k_3,m):=E(k_1,D(k_2,E(k_3,m)))$$

## AES
- ![AES is a Subs-Perm net work](http://7xk6q5.com1.z0.glb.clouddn.com/AES%20is%20a%20Subs-Perm%20net%20work.png)
- ![The round function](http://7xk6q5.com1.z0.glb.clouddn.com/AES%20round%20function.png)

## Build PRF from PRG: The GGM PRF
- $$G:K \to K^2$$
- Suppose $$G:k\to G(k)[0] || G(k)[1]$$
- Define $$F:\{0,1\}^n \times K \to K$$
- ![The GGM PRF](http://7xk6q5.com1.z0.glb.clouddn.com/GGM%20PRF.png)
- $$G$$ is a secure PRG $$\Rightarrow$$ $$F$$ is a secure PRF
