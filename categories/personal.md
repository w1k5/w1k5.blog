---
layout: page
title:  Sweet Love
tags: [categories, algolia-ignore]
permalink: /matters-of-the-heart/
hidden: true
---

{% for post in site.categories.sweet-lovin %}
<h2 class="post-title">
	<a href="{{ post.url }}">
		{{ post.title }}
	</a>
</h2>

<span class="post-date">{{ post.date | date_to_string }}</span>
{% endfor %}
<img style="margin: auto;" src="/images/rosedivider.gif">
