

<h1 align="center">My Startpage</h1> 

<p align="center">
	<img src="https://img.shields.io/badge/Version-3.0-green.svg" alt="Version">
	<img src="https://img.shields.io/badge/Updated-January%202018-yellowgreen.svg" alt="Updated">
</p>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Release History](#release-history)
- [Contributions](#contributions)
- [License](#license)

### Introduction

Custom start & new-tab page using html/css + javascript.

### Features

The start page is pretty basic, as shown below in the default layout.

![Default page](https://raw.githubusercontent.com/dottomeister/Startpage/master/img/default-view.png)

When you first download and set this page as your startpage, all the links will be blank (redirecting to google), waiting for you to input your own urls into them. You can do this by clicking the upper-left gear icon, entering the 'edit-mode'.

![Edit mode](https://raw.githubusercontent.com/dottomeister/Startpage/master/img/edit-mode.png)

Each panel will show their settings, (enabled/disabled and locked/unlocked) and will allow you to change them. The enable/disable option toggles the visibility of each panel, in case you only want to use 1 or 2 panels for links,
The lock/unlock option toggles the ability to change the title of each panel.

![Category hiding](https://raw.githubusercontent.com/dottomeister/Startpage/master/img/category-hidden.png)

Finally, when in 'edit-mode' you will also be able to click on each link, and instead of redirecting to a url like it normally would, a new panel will appear allowing you to change the title and url of the link.

![Edit link](https://raw.githubusercontent.com/dottomeister/Startpage/master/img/edit-link.png)

That's about it, it's very basic, but I do recommend changing the ``js/Default.js `` values to your own default link values, since when a cache reset occurs, the browser loses all the changes you have made to your links, and will read them from the ``js/Default.js`` file. If you access a website very often, or a specific url is very long a complicated, it might be worth your time to change the default value so you don't have to do so again later on, should you clear the cache.

### Release History

* 0.0.1
	 <p style="margin-top: 0px">(30/01/2018) Version 1.0</p>

### Contributions

* Victor Rodriguez.

Please read the _[Contributions][contributions-link]_ file to conform to the coding standard used in this code when contributing.

### License

For information about our license please visit our _[License][license-link]_.

<!-- Link & img dfn's -->
[license-link]: https://github.com/dottomeister/Startpage/blob/master/LICENSE
[contributions-link]: https://github.com/dottomeister/Startpage/blob/master/Contributions.md
