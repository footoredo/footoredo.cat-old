---
layout: post
title: 使用Github的API实现一个简单的commit
date: 2014-09-14 11:04
comments: true
categories: github git
---

这几天研究了下Github提供的API，与普通API不同的地方在于使用它的API必须先对[Git的内部原理](http://git-scm.com/book/zh/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86)有一定的了解，门槛较高。但如果只要实现添加修改文件的话会相对简单些，也能满足大多数的日常需要。

##流程

- GET `/repos/:user/:repo/git/refs/heads/master`
    + 获得最新commit的SHA (SHA-LATEST-COMMIT)
- GET `/repos/:user/:repo/git/commits/SHA-LATEST-COMMIT`
    + 获得commit所指向的tree的SHA (SHA-BASE-TREE)
- POST `/repos/:user/:repo/git/trees`
    + `base_tree`设定为SHA-BASE-TREE
    + `path`为要修改或创建的文件的完整路径
    + `content`为文件内容
    + 获得新tree的SHA (SHA-NEW-TREE)
- POST `/repos/:user/:repo/git/commits`
    + `parents`设定为一个包含SHA-LATEST-COMMIT的数组
    + `tree`为SHA-NEW-TREE
    + 获得新commit的SHA (SHA-NEW-COMMIT)
- POST `/repos/:user/:repo/git/refs/head/master`
    + `sha`设定为SHA-NEW-COMMIT
    + 可能要将`force`设为true

*via [Making a commit with the Github API](http://www.mdswanson.com/blog/2011/07/23/digging-around-the-github-api-take-2.html)*

##一个细节

POST操作需要验证，可以简单地附上自己的用户名、密码。

    curl -u username:password https://api.github.com/authorizations                 # using curl
    requests.get("https://api.github.com/authorizations", auth=(username,password)) # using requests

##Python实现（使用了requests）

{% highlight python %}
auth = ("username", "password")
base_url="https://api.github.com/repos/:user/:repo/git"

def GET(path):
	r=requests.get(base_url+path, auth=auth)
	return json.loads(r.content)

def POST(path, data):
	r=requests.post(base_url+path, data=data, auth=auth)
	return json.loads(r.content)

def commit(path, content, message):
	sha_latest_commit = GET("/refs/heads/master")[u"object"][u"sha"]
	sha_base_tree = GET("/commits/%s" % sha_latest_commit)[u"tree"][u"sha"]
	
	new_tree = {
		"base_tree": sha_base_tree,
		"tree": [ {
			"path": path,
			"mode": "100644",
			"type": "blob",
			"content": content
		} ]
	}
	sha_new_tree = POST("/trees", json.dumps(new_tree))[u'sha']

	new_commit = {
		"parents": [sha_latest_commit],
		"message": message,
		"tree": sha_new_tree
	}
	sha_new_commit = POST("/commits", json.dumps(new_commit))[u'sha']

	ref = {
		"sha": sha_new_commit,
		"force": "true"
	}
	POST("/refs/heads/master", json.dumps(ref))
{% endhighlight %}