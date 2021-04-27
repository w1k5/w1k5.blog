---
layout: page
title: Search
permalink: /directory/
hidden: true
---

<div id="search-searchbar"></div>

<div class="post-list" id="search-hits">
 {% for post in site.posts %}
   <div class="post-item">
     {% assign date_format = site.minima.date_format | default: "%b %-d, %Y" %}
     <span class="post-meta">{{ post.date | date: date_format }}</span>

     <h2>
       <a class="post-link" href="{{ post.url | relative_url }}">
         {{ post.title | escape }}
       </a>
     </h2>

     <div class="post-snippet">{{ post.excerpt }}</div>
   </div>
 {% endfor %}

</div>

{% include algolia.html %}

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
