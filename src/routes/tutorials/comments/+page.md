---
title: Comments
publishedOn: 1717800000000
author: Matt Flogram
summary: Comments in Flogram
published: true
order: 3
---

<h2>Comments in Flogram</h2>

Welcome to your first lesson on Flogram, a programming language designed for simplicity and power. Before we dive into variables, functions, and all those exciting topics, let's start with something foundational yet often overlooked: comments.

Comments allow you to annotate your code with descriptive text, making it easier for both you and others to understand what the code is doing and why. In Flogram, adding a comment is easy—you just use the # symbol followed by your comment text.

<h3>Single-Line Comments</h3>

In Flogram, you can add a single-line comment by starting the line with a # symbol:

```
# This is a single-line comment
```
The comment will extend to the end of the line, and Flogram will ignore it when running the code.

<h3>Why Use Comments?</h3>

Good code is self-explanatory most of the time, thanks to well-named variables and straightforward logic. However, there are times when explaining the why behind a piece of code becomes essential. That's where comments come in handy. Here are some good use-cases:

- Explaining complex or unintuitive logic
- Providing context or rationale for why a particular solution was chosen
- Marking TODOs or temporary hacks
- Providing meta-information, such as authorship or modify date

<h3>Best Practices</h3>

While commenting is good, over-commenting or stating the obvious can clutter your code and make it harder to read. Stick to these best practices:

- **[Code Tells You How, Comments Tell You Why](https://blog.codinghorror.com/code-tells-you-how-comments-tell-you-why/)**: Your code should be self-explanatory. Comments should generally explain _why_ you're doing something, not _what_ you're doing.
- **Be Concise**: Keep your comments short and to the point.
- **Keep Them Updated**: Outdated comments can be more confusing than no comments at all. Which is a big reason you should use them sparingly.

<h3>Example: Good vs. Bad Comments</h3>

Here are examples to illustrate:

```
# Good: Explains the why, not the how
# Using bitwise shift to perform fast division by 2
result = n >> 1

# Bad: Stating the obvious, which code already explains
result = n + 1  # Increments n by 1
```

In this introductory lesson, we haven't covered what the code is doing, but we wanted to highlight the importance of commenting and how to do it effectively. As you continue through the course, you'll see how comments can be integrated effectively into more complex examples. Note because this is a tutorial, I will at times go against my own advice and add comments that explain what the code is doing because that is the purpose of a tutorial and different from normal code.
