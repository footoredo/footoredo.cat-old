---
layout: post
title: Python与MySQL的对接方案
date: 2016-01-30 19:31
comments: true
categories: python mysql
---

用到的包是这个：[MySQL-python](https://pypi.python.org/pypi/MySQL-python/1.2.5)。可以参考他的[User's Guide](http://mysql-python.sourceforge.net/MySQLdb.html)。

pip安装：

    pip install mysql-python
    
使用时：

    import MySQLdb
    
这个包先与mysql建立一个connection，再建立cursor对数据库进行操作。

###MySQLdb.connect()

    db = MySQLdb.connect(host="localhost", user="joebob",  passwd="moonpie", db="thangs")

###db.cursor()
    
    cur = db.cursor()

通过这个cursor,可以对连接到的mysql进行操作。

####取数据

    cur.execute("SELECT * FROM Writers")
    rows = cur.fetchall()
    print rows
        
Output:

    ((1L, 'Jack London'), (2L, 'Honore de Balzac'), (3L, 'Lion Feuchtwanger'), (4L, 'Emile Zola'), (5L, 'Truman Capote'))
    

`fetchall()`操作返回的是符合条件的数据的tuple，而每个数据又是由含有各个值的tuple构成的。要取单独一个数据可以用`fetchone()`。

#####Trick

在建立cursor的时候加入参数`MySQLdb.cursors.DictCursor`，即

    cur = db.cursor(MySQLdb.cursors.DictCursor)

可以使数据以dict的形式取回（不过`fetchall()`的结果还是用tuple组织起来的）。

####执行修改

    cur.execute("INSERT INTO Writers(Name) VALUES(%s)", ("Jack London"))

*假如要进行一条修改，并提交到服务器的话，在`execute()`后执行`db.commit()`。*

####Hint

貌似会出现与服务器超时断连的情况，可以使用`db.ping(True)`来测试异常，进行重链。