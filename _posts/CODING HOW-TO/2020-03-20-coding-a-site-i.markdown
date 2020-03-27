---
layout: post
title:  "Don't know much about coding"
date:   2020-03-20 00:01:49 -0500
categories: "self-care"
---

Most tech blogs are pretty intimidating and only give you a snippet of what you’re supposed to do. I love my handmade website, and while services using pre-built website templates and drag and drop elements have become increasingly popular, I think they’re boring and limiting. They slap their brand all over your own personal site, and if I were you, I wouldn’t be a fan of it. I think creating a website using your own CSS and HTML is a fun, expressive way to introduce somebody to coding, so here, I’m going to show you how to do it! Note that it’ll be static, so the pages won’t change between user visits, but that’s perfect for a blog or photo gallery because in most cases, you wouldn’t even want that to change! I’ll be linking websites to specific terms if you’d like to do further research. Honestly, a lot of coding is just knowing how to look up the right thing on the web to find the solution to your problem.

This is a basic introduction to creating a website using Github pages (which is what I use at the time of writing this), and while you can use <a href="https://pages.github.com/" target="_blank">their how-to</a>, I'd like to think mine is a little bit more human.<!-- more -->

<ol><li>Make a <a href="https://github.com/" target="_blank">Github account</a>. This will let you create and host repositories of code using Github.</li>
<li>In the upper right hand corner, next to your account circle, click the + symbol and click “New Repository”.</li>
<li>Name your repository <i>username.github.io</i>, where "username" is your username for the Github account you just made. Make sure it’s set to public, and then hit “Create Repository”.</li>
<li>Now, because I like a graphic interface out of ease of access, I suggest you download <a href="https://desktop.github.com/" target="_blank">Github Desktop</a> in order to start pushing, or adding, code to your repository on your account. The alternative is using the straight up <a href="https://pages.github.com/#terminal-step-1" target="_blank">Terminal</a> but I don’t think that you or I are ready for a rundown of all the commands for that, especially to start.</li>
<li>Sign into your Github account on Github Desktop.</li>
<li>After you've logged in, click “Clone Repository”. Press the name of the repository you just made, take notice of (or change) the local path of where the repository (or "repo") will be located. I keep mine in the /Documents/GitHub folder, just because I’ve gotten used to it. Maybe you’ll want to keep yours on your desktop, or something. Dunno. Keep in mind the location of your folder for later use. This where everything will be located for your website on your computer.</li>
<li>Create an index.html file by opening TextEdit, the code editing software that comes with your macOS, and saving the file in your aforementioned repository folder. You can use a different text-editing software if you want. I recommend <a href="https://atom.io/" target="_blank">Atom</a> and <a href="https://macromates.com/" target="_blank">TextMate</a>, personally. By putting an index.html file in your repo, you'll create your homepage. You can put the following code in the file to put something on the page when you load it:
<pre><code><!DOCTYPE html>
&lt;html&gt;
&lt;body&gt;
&lt;h1&gt;Hello World&lt;/h1&gt;
&lt;p&gt;I'm hosted with GitHub Pages.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre></li>
<li>Then, after saving your file with the above code, go back to Github Desktop, press "Commit" on the bottom left to add these changes to your local repo, and then press "Push Origin" to upload these changes to the repository hosted by Github on the web.</li>
<li>Now all you need to do to see your website is to go to https://<i>username</i>.github.io, replacing <i>username</i> with your username! Isn't it cool? I remember being so delighted when I first got it working. Stay tuned for <a href="https://wiks.wiki/self-care/2020/03/25/coding-a-site-ii.html">the next part</a> of <em>Don't know much about coding</em>, where we begin to decorate your new site! xxx</li></ol>

Let me know of your website's URL if you used this tutorial!