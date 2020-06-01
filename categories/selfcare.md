---
layout: page
title:  Sunshine for the Soul
tag: categories
permalink: /are-you-learning-yet/
hidden: true
---

{% for post in site.categories.self-care %}
<h2 class="post-title">
	<a href="{{ post.url }}">
		{{ post.title }}
	</a>
</h2>

<span class="post-date">{{ post.date | date_to_string }}</span>
{% endfor %}
<img style="margin: auto;" src="/images/rosedivider.gif">