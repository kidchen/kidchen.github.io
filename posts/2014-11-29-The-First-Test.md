---
title: Markdown Reference
date: '2014-11-29'
categories:
  - English
  - Technology
  - Markdown
tags:
  - test
  - markdown
slug: 2014/11/29/The-First-Test
layout: post
---
***This template is used for later markdown reference.***
### Fonts:
``` bash
*Italics*
**Bold**
***Italics and Bold***
~~Scratch~~
It also works if you change the star(*) into underline(_).
```
*Italics*, **Bold**, ***Italics and Bold***, ~~Scratch~~

### Link: 
``` bash
[My Website](http://kidchen.github.io/)
```
[My Website](http://kidchen.github.io/)

### Reference:
Add "\>" before a line to express reference (add more "\>" to do nest).
> This is a reference.
> >This is a nested reference.

### Quote:
{% blockquote [Author A, Author B] [link] [source_link_title] %}
Say something.
{% endblockquote %}
For more information, visit [this page](http://hexo.io/docs/tag-plugins.html).

### Different subtitles:
Add one to six sharps(\#) and a space before the head.
# Head1
## Head2
### Head3
#### Head4
##### Head5
###### Head6

### Codes:
Use "\`" around the inline code or use "\`\`\`" to define coding area.

This is an `inline` code.

``` [language] [title] [url] [link text]
code snippet
```

``` bash
$ hexo new "My New Post"
```

### List:
Use "\*", "\+" or "\-" followed with a space to express unordered list.
- unordered list
 + nested unordered list
  - nested unordered list
   * nested unordered list
  - nested unordered list

Use numbers followed with a dot and a space to express ordered list.
1. ordered list
2. ordered list
9. ordered list

### Insert img:
``` bash
![text](/path/to/your/img.jpg "option-title")
```
![](/images/takeru_patamon.png "option-title")

### Miscellaneous：
Use three or more "\*", "\-" or "\_" to add divide line.
*Note: There is no other characters in the divide line except spaces*

Use "\\" as the escape character.

Use <\!\-\- more \-\-> to add "more" button.

A very nice [Cheat Sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for Markdown syntax.

