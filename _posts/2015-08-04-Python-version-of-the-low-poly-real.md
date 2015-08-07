---
layout: post
title: Python版本的low-poly
date: 2015-08-04 22:37
comments: true
categories: low-poly,python
---

受[这个问题](http://www.zhihu.com/question/29856775)启发，用python写了个low-poly generater，十分丑陋需要自己调参，为了用一个Poisson Sampling还调用了Octave（用`oct2py`库），运行效率十分地下……

项目地址：[Github](https://github.com/footoredo/low_poly)

##Samples

Raw picture (`samples/raw/a.jpg`)

![Raw a.jpg](https://github.com/footoredo/low_poly/raw/master/samples/raw/a.jpg)

Processed picture (`samples/processed/a.jpg`)

![Processed a.jpg](https://github.com/footoredo/low_poly/raw/master/samples/processed/a.jpg)

Command line

	python low_poly.py samples/raw/a.jpg 60 3 samples/processed/a.jpg

---

Raw picture (`samples/raw/b.jpg`)

![Raw a.jpg](https://github.com/footoredo/low_poly/raw/master/samples/raw/b.jpg)

Processed picture (`samples/processed/b.jpg`)

![Processed a.jpg](https://github.com/footoredo/low_poly/raw/master/samples/processed/b.jpg)

Command line

	python low_poly.py samples/raw/b.jpg 60 3.5 samples/processed/b.jpg

---

Raw picture (`samples/raw/c.png`)

![Raw a.jpg](https://github.com/footoredo/low_poly/raw/master/samples/raw/c.png)

Processed picture (`samples/processed/c.png`)

![Processed a.jpg](https://github.com/footoredo/low_poly/raw/master/samples/processed/c.png)

Command line

	python low_poly.py samples/raw/c.png 30 2 samples/processed/c.png

---

Raw picture (`samples/raw/d.jpg`)

![Raw a.jpg](https://github.com/footoredo/low_poly/raw/master/samples/raw/d.jpg)

Processed picture (`samples/processed/d.jpg`)

![Processed a.jpg](https://github.com/footoredo/low_poly/raw/master/samples/processed/d.jpg)

Command line

	python low_poly.py samples/raw/d.jpg 50 1 samples/processed/d.jpg

---
