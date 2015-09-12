---
layout: post
title: nginx配置强制使用https的正确姿势
date: 2015-09-12 14:09
comments: true
categories: nginx,https
---

使用两个site配置，一个只负责https，一个只负责http，负责http的直接301跳转到https。

https:
    
    server {
       listen 443;
       server_name example.com;

       ..SSL stuff..
    }

http:

    server {
       listen 80;
       server_name example.com;

       return 301 https://example.com$request_uri;
    }