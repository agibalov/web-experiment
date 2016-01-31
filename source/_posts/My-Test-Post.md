title: "My Test Post"
date: 2015-03-23 00:11:08
tags:
---

Hello there. Here's some code:
```javascript
console.log('hello world');
```
Bye.

{% colorize 'red' %}
Hi content! This should be red.
{% endcolorize %}

{% colorize 'pink' %}
Hi content! This should be pink.
{% endcolorize %}

{% viz %}
digraph g {
  Interface -> "Implementation 1";
  Interface -> "Implementation 2";
}
{% endviz %}

### Inclusion by tag

{% inc 'scripts/include.js' lang:js tag:mysnippet %}

### Complete inclusion

{% inc '.gitignore' %}
