---
description: malyan installation guide - How to use malyan in your project.
---

# 安装

### 直接下载 / CDN
[https://unpkg.com/malyan](https://unpkg.com/malyan)

[Unpkg.com](https://unpkg.com) 提供基于NPM的CDN链接. 上面的链接总是指向最新的发布版本。你可以使用类似下面的URLs来指定版本 `https://unpkg.com/cornerstone-core@2.0.0`.

``` html
// 直接下载
<script src="/js/malyan.min.js"></script>
// CDN
<script src="https://unpkg.com/malyan"></script>
```

### NPM

``` bash
npm install malyan --save
```
当使用模块化引入js库时，可以如下方式 `import 'malyan'`
``` js
import * as Malyan from 'malyan'
```
当使用了全局`script`标签，可以不必这样做，直接使用`window.Malyan`

### Dev Build

如果你想使用最新当开发版本，可以克隆项目并构建malyan

``` bash
git clone https://github.com/HarryChen0506/malyan.git
cd malyan
npm install
npm run build
```
