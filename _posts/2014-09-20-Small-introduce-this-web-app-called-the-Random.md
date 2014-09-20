---
layout: post
title: 小介绍下这个叫Random的web app
date: 2014-09-20 18:51
comments: true
categories: Random
---

暑假里闲来无事，写了个没什么用的东西。这个叫Random的app唯一作用是随机把自己重定向到另一个地址，而这个地址由用户指定的。具体来说，用户上传一个有很多URL的列表，Random就生成一个`id`作为你这个列表的标示符，每次你访问`/$id`的时候就会从URL列表中随机选一个地址进行一个302重定向。

##为什么要写Random呢？

写这个的主要原因是想给这个站的首页弄一个随机的封面图片，这东西按理说直接一个javascript语句就能解决，为什么要弄这种东西呢？闲的蛋疼虽然也是原因之一，但更主要的是我踏马那时候不会javascript，也压根没想到可以用javascript。。

##怎么用呢？

用法还是比较简单的（？），从[这里](http://footoredorandom.sinaapp.com)进去，点`Upload`，一行一个把URL填进去，**记得要加http://或https://之类的，否则会重定向到Random的域名底下。**再`Upload`，得到`id`，以后就可以通过访问`http://footoredorandom.sinaapp.com/$id`来使用了。*Edit功能我太懒还没弄。*

[Github Repo](https://github.com/footoredo/random)