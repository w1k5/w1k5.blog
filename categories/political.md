---
layout: page
title:  The Political
tag: categories
permalink: /personal-is-political/
hidden: true
---

{% for post in site.categories.politics %}
<h2 class="post-title">
	<a href="{{ post.url }}">
		{{ post.title }}
	</a>
</h2>

<span class="post-date">{{ post.date | date_to_string }}</span>
{% endfor %}
<img style="margin: auto;" src="/images/rosedivider.gif">