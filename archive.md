---
layout: page
title: Directory
permalink: /directory/
hidden: true
---

<h2 id="directory">Browse by Category
<br>
{% assign pages_list = site.pages %}
{% for node in pages_list %}
{% if node.tag == "categories" %}
{% if node.title != "Archive" %}
{% if node.layout == "page" %}
<a id="post-title" href="{{ node.url }}">{{ node.title }}<br></a>
{% endif %}
{% endif %}
{% endif %}
{% endfor %}
<br>
<a href="{{ site.url }}/archive/" style="color: #b599b0;">All Posts</a></h2>

