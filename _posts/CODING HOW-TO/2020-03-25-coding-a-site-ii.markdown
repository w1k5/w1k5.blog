---
layout: post
title:  "Don't know much about coding ii"
date:   2020-03-25 00:21:33 -0500
categories: "self-care"
---

Now that we've <a href="https://wiks.wiki/self-care/2020/03/20/coding-a-site-i.html" target="_blank">created a website</a> for you to play around with in terms of coding, the world is your oyster! Well, it always was from the start, but now you have the opportunity to learn so much! I've always though a website is like a home... you step inside, and immediately you make judgements, whether conscious or subconscious. All the pretty stuff you see on a website, from the setup to the colors to the sizes of text, is all done in CSS, or <a href="https://www.w3schools.com/css/css_intro.asp" target="_blank">Cascading Style Sheets</a>. All the text and <a href="https://www.w3schools.com/html/html_formatting.asp" target="_blank">formatting</a> (bold, italics, underline, etc.) is done in HTML. HTML also provides additional information for the website, specifically in the &lt;head&gt; tag, which gives a site its title, icon, and additional metadata. Now, let's get messy, baby...<!-- more -->

Alright, so if you edit the text in the &lt;p&gt; or &lt;h1&gt;, you can by just replacing the "Hello World" or "I'm hosted with Github Pages." because who would want to read that, right? Once you're ready, let's spruce it up a lil bit.

<ol><li>Make a CSS sheet to hold all of the decor for your site by making a new file using your text error in your given repository. Save it as <i>name</i>.css in your repository folder.</li>
<li>Let's <a href="https://www.w3schools.com/css/css_howto.asp" target="_blank">link your CSS sheet with your HTML file</a>. Go back to your index.html sheet, and add in what you see in italics below. Replace "mystyle.css" with whatever you named your CSS sheet. Be sure to save the file after you add it. This piece of code will link the two files together, so that what you do in <i>name</i>.css will be reflected when index.html is generated.
<pre><code><!DOCTYPE html>
&lt;html&gt;
<i>&lt;head&gt;
&lt;link rel="stylesheet" type="text/css" href="mystyle.css"&gt;
&lt;/head&gt;</i>
&lt;body&gt;
&lt;h1&gt;Hello World&lt;/h1&gt;
&lt;p&gt;I'm hosted with GitHub Pages.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre></li>
<li>Consider that &lt;p&gt; or &lt;h1&gt; are both pieces of texts, &lt;p&gt; being a <a href="https://www.w3schools.com/html/html_paragraphs.asp" target="_blank">paragraph</a> and &lt;h1&gt; being a <a href="https://www.w3schools.com/html/html_headings.asp" target="_blank">header</a>. Click the associated links to find out more. To make them less bland than the pre-set black Arial or Times New Roman font, you can attribute specific characteristics to each type using your Cascading Style Sheet! Go back into <i>name</i>.css and try this, saving it after you've added it:
<pre><code>p {
padding: 10px;
border-style: solid;
border-color: blue;
border-width: 2px;
background-color: #9EC7EB;
color: white;
font-family: arial,helvetica;
font-size: 11px;
font-weight: bold;
	}
</code></pre></li>
<li>Commit and push this code in your Github repository, and within a few minutes, see the changes on your page when you hit refresh on your browser!</li></ol>

So, the basis to CSS and HTML web design is that every piece of content or "thing" (including words and pictures) you place on a page is an <a href="https://www.w3schools.com/html/html_elements.asp" target="_blank">element</a>. &lt;p&gt; and &lt;h1&gt; in the code of your index.html are both elements. Each element can be broken down as a piece of content, surrounded by padding, enclosed by a border, and then surrounded by a margin-- specifically those terms. You can find more information on it <a href="https://www.w3schools.com/css/css_boxmodel.asp" target="_blank">here</a>. I highly suggest clicking into every link I attach to these tutorials because it'll give you a much clearer and more thorough rundown. It's essentially the basis to all front-end (meaning everything the user sees on the screen) web design.

In the CSS sheet we just made, because we started the line with p (referencing the element &lt;p&gt;), every occurance of &lt;p&gt; in the HTML file linked to the CSS file will reflect the traits listed in it. Every characteristic we change is called a style attribute, and must end with a semi-colon. You can find every potential style attribute <a href="https://www.w3schools.com/cssref/" target="_blank">here</a>. There's a ton that you can use, so I suggest using Ctrl + F and then using keywords to find what you want. 

If you want to create a specific variation of the specific element type, you can use <a href="https://www.w3schools.com/html/html_classes.asp" target="_blank">classes</a> by formatting it as <i>elementName</i>.<i>className</i> in the CSS file. When calling it in the HTML file, you'd call it by referring to it as  &lt;<i>elementName</i> class="<i>className</i>"&gt;. A more specific, unique version of a class is an <a href="https://www.w3schools.com/html/html_id.asp" target="_blank">ID</a>, but I personally don't use it that often. It comes more in handy when working with scripts, which we aren't really doing yet.

From here, I suggest you play around text and different style attributes! Create new blocks of texts by introducting new &lt;p&gt; and &lt;/p&gt; tags, with your desired text between them, editing your index.html file. Next, we're going to figure out how to structure your website by using CSS properties associated with box generation, whatever that means. It's late and I've got <a href="https://tinder.com/" target="_blank">Tinder</a> for Desktop open just for entertainment, with Sex & The City playing softly in the background... Please get in contact with me if you need any help with the website via Instagram <a href="https://www.instagram.com/radiantlimerence/" target="_blank">@radiantlimerence</a> or via email at vm2@williams.edu. Stay tuned for part iii of <em>Don't know much about coding</em>, where we begin to give your site some body and structure! Consider looking around the web for design inspiration! xxx