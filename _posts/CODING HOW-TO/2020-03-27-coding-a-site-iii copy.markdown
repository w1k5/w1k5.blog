---
layout: post
title:  "Don't know much about coding iii"
date:   2020-03-27 18:21:33 -0500
categories: "self-care"
---

This fancy software bro I know once told me that all programs are secretly very precarious. Programs use programs that use programs and plugins using other code that also uses other programs so if, like, one thing breaks, somewhere deep in some bit of code, it could all come crumbling down. That's what I understood from his lecture, at least. We're gonna introduce some of that to your blog now, just to make posting and structuring your entire website way easier. Well, actually, Github Pages runs through <a href="https://jekyllrb.com/" target="_blank">Jekyll</a> already, but we're going to get it running on your website specifically. If you don't want to read my tutorial, you could always use <a href="https://jekyllrb.com/docs/installation/" target="_blank">the official Jekyll installation tutorial</a>. Or you could just use mine! Up to you, hunnybunches.<!-- more -->

<ol><li>Open your Terminal. If you don't know how, open Spotlight on your Mac, which is a quick way of finding anything on your computer, by pressing Command (⌘) + Space. Then type in "Terminal" and open it.</li>
<li>Jekyll's based off <a href="https://www.ruby-lang.org/en/" target="_blank">Ruby</a>, so that means it's time to start adding programs to your computer. <a href="https://brew.sh/" target="_blank">Homebrew</a> is a package manager and will make it easier to install new plugins/packages/generators. Copy and paste the following code to install Homebrew, and then to install Ruby, which is the basis for Jekyll.
<pre><code>/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install ruby
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.bash_profile</code></pre></li>
<li>Type "ruby -v" into your terminal to check which version of Ruby you're running. If you get a real value, you've installed it successfully.</li>
<li>Install <a href="https://jekyllrb.com/docs/" target="_blank">Jekyll</a> by typing in the following command. If it doesn't work, put the word "sudo" before it.
<pre><code>gem install jekyll bundler</pre></code></li>
<li>Let's set up Jekyll in a new folder. Go into the folder where your repository is contained using "cd" and then by typing/pasting in the pathname of the folder's location.
<pre><code>cd /Users/<i>nameofAccount</i>/Documents/GitHub</pre></code></li>
<li>Make the new blog using Jekyll. Based off of the following command, it'll be called myblog.
<pre><code>jekyll new myblog</pre></code></li>
<li>Then go into that folder.
<pre><code>cd myblog</pre></code></li>
<li>Build the site and make it available on the local server on your computer.
<pre><code>bundle exec jekyll serve</pre></code></li>
<li>Hit <a href="http://localhost:4000" target="_blank">http://localhost:4000/</a></li></ol>