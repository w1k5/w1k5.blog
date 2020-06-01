---
layout: page
title: Directory
---

<h2 id="directory">Browse by Category
<br>
{% assign pages_list = site.pages %}
{% for node in pages_list %}
{% if node.tag == "categories" %}
{% if node.title != null %}
{% if node.layout == "page" %}
<a id="directory" href="{{ node.url }}">{{ node.title }}<br></a>
{% endif %}
{% endif %}
{% endif %}
{% endfor %}
<br>
All Posts</h2>
{% for post in site.posts %}
<h2 class="post-title">
	<a href="{{ post.url }}">
		{{ post.title }}
	</a>
</h2>

<span class="post-date">{{ post.date | date_to_string }}</span>
{% endfor %}
<img style="margin: auto;" src="/images/rosedivider.gif">
