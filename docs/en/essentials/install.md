---
description: malyan installation guide - How to use malyan in your project.
---

# Install

### Direct Download / CDN

[https://unpkg.com/malyan](https://unpkg.com/malyan)

[Unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like `https://unpkg.com/malyan@0.0.3` .

``` html
// direct download
<script src="/js/malyan.min.js"></script>
// CDN
<script src="https://unpkg.com/malyan"></script>
```

### NPM

``` bash
npm install malyan --save
```

When used with a module system, you can import `malyan` like this:

``` js
import * as Malyan from 'malyan'
```

You don't need to do this when using global script tags.

### Dev Build

You will have to clone directly from GitHub and build `malyan` yourself if you want to use the latest dev build.

``` bash
git clone https://github.com/HarryChen0506/malyan.git
cd malyan
npm install
npm run build
```

