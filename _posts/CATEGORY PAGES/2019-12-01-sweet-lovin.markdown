---
layout: page
title:  Sweet Lovin'
tag: catagories
permalink: /matters-of-the-heart/
hidden: true
---

<h1>{{ page.title }}</h1>
{% for post in site.categories.sweet-lovin %}
<p><a href="{{ post.url }}">{{ post.title }}</a><br>
<span>{{ post.date | date_to_string }}</span></p>
{% endfor %}