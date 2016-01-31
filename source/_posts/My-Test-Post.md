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
  rankdir=LR;
  node [shape=box, color="#000000", fillcolor="#ffcc00", style=filled, fontname="open sans", fontsize=10, margin="0.2,0.1"];  
  interface [label="Interface", shape=circle];
  impl1 [label="Implementation #1"];
  impl2 [label="Implementation #2"];
  impl3 [label="Implementation #2"];
  something1;
  something2;
  something3;
  something4;
  interface -> impl1 [ color="red" ];
  interface -> impl2;
  interface -> impl3;
  impl3 -> something1;
  impl3 -> something2;
  impl3 -> something3;
  impl3 -> something4;
}
{% endviz %}

### Inclusion by tag

{% inc 'scripts/inc.js' lang:js tag:mysnippet %}

### Inclusion by other tag

{% inc 'scripts/inc.js' lang:js tag:myothersnippet %}

### Complete inclusion

{% inc '.gitignore' %}
