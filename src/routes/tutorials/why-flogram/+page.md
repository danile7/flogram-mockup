---
title: Why Flogram
publishedOn: 1717800000000
author: Matt Flogram
summary: Main reasons to use Flogram
published: true
order: 2
---

<h2>Why Learn Flogram</h2>

You may be wondering why you should learn another programming language. What does Flogram have to offer that other languages don’t?

<h2 class='title-filled'>Versions for Beginner</h2>

<h3>Simplicity is Key</h3>

In Flogram, we believe that less is more. Unlike older languages that keep adding new features, Flogram sticks to a simple, straightforward way of doing things. Think of it like a toolset where every tool has a specific, clear purpose. This makes it easier for you to learn and use the language.

<h2 class='title-filled'>Go With the Flow or Go Fast</h2>

Flogram offers you two ways to code: “Flow mode” and “Fast mode”. In Flow mode, you can write simple, clean code that runs quickly. If you need more speed, switch to Fast mode to tap into advanced features. It's like having a car with an “Economy” and “Sport” driving mode; you can choose what suits you best and switch back and forth as needed.

<h3>A Fresh Way to Program</h3>

Flogram introduces a new way of programming called 'flow programming'. We've kept the syntax simple, similar to Python, to make it easier for you to read and write code. Imagine learning a new language that feels like a blend of your favorites!

<h3>All-in-One Language</h3>

Dream of coding everything in one language? Flogram is working on that! We aim to be a one-stop-shop for all your coding needs, from creating websites to managing databases. This means you won't have to juggle multiple languages to build a project.

<h3>Built for Speed</h3>

Flogram is designed to be fast, really fast. While we're still in the alpha stage, our goal is to eventually outpace even the quickest languages like C. So, we’ve decided to make those boundaries as seamless as possible including having both sides capable of working using a similar language.

<h3>Debugging Made Easy</h3>

We've eliminated many common pitfalls that make debugging a nightmare in other languages. Flogram is built to minimize bugs and make it easier for you to find and fix errors. It's like having a built-in safety net for your code without requiring the same mental overhead other languages do to maintain it.

<h3>Keep it Simple, Smart</h3>

In Flogram, you don't have to worry about complex rules for how data is accessed or changed as required for languages like C or Rust or Zig. The language automatically handles these details for you, making it easier to write safe and reliable code. It's like having a helpful guide that ensures you're always on the right path.

<h3>Consistency Throughout</h3>

In Flogram, everything works in a uniform manner. Whether you're working with simple numbers or complex objects, the rules are the same. This makes it easier for you to understand what your code is doing.

<h3>Built for the Future</h3>

Flogram is designed to work well with AI, making it a future-proof choice. We envision a world where humans and AI collaborate to write code, with Flogram serving as the common language.

<h2 class='title-filled'>Version For Professional Programmers:</h2>

<h3>One way to do one thing</h3>

A lot of commonly used languages are old. And over time they’ve introduced new and arguably better ways of doing the same things. But they still allow the old ways to work for the sake of backwards compatibility. The problem is that developers might use old features as well as new and now when working on teams in particular, programmers need to know the entire language which increases complexity and cognitive overhead.

While more powerful, Flogram wants to be like C in the sense that it is extremely well designed and will have minimal new features added over time. Flogram’s design is based on the best practices that have emerged over time.

The only deviations to this are in some places we have the default simple way to do something and the subtly different but higher performance way of doing things that leaves you with the risk of adding hard to debug bugs.

<h3>Flow programming paradigm</h3>

Flogram doesn’t fit neatly into an existing paradigm. Rather we are saying Flogram belongs to a new ‘flow programming’ paradigm. We try to stick to a ‘Python like’ syntax for ease of learning and familiarity and because it improves readability of code but we have some new ideas included. Many ideas in Flogram come from other languages like Rust. But we try to simplify things for both ease of learning as well as reducing cognitive overhead while working with the language.

<h3>Everything in one language</h3>

Though still a work in progress, Flogram’s goal is to be a full stack language. This means it’s one simple language that can replace: html, css, javascript, a ui framework, a backend language, a language for sending data like JSON, a database language, and a configuration file language.

Rest API calls can be replaced with function calls. Programmers spend the majority of their time dealing with code at the boundaries of languages. Anytime two languages need to work together, it greatly hurts productivity. So we’ve decided to make those boundaries as seamless as possible including having both sides capable of working using a similar language.

We currently have a frontend and backend language working with the ability to work with javascript libraries. More pieces are coming soon.

<h3>Flogram is FAST</h3>

A lot of languages claim to be fast. Flogram is designed so that it can run faster than C. We achieve this by building features in a way that is both fast and simple. For example, we have a better faster memory manager that seamlessly and invisibly integrates with the high-level language. Additionally, Flogram’s features allow writing code at a very high-level without thinking about the low-level details while allowing programmers to think about and enforce them if desired with a simplified Rust like ownership system.

Note that we are only releasing an alpha at the moment, a number of compile time optimizations have yet to be added even though they are planned. So, while still a fairly fast language, it can’t achieve better than C like speed just yet. Our goal is to build out language features knowing the optimizations we can add later, get it reasonably fast and optimize to achieve peak performance later.

Anything in Flogram marked with !! is similar to Rust’s unsafe feature and will be similar to standard Flogram features but can occasionally enable optimizations that naturally blend with the rest of the language.

<h3>Flogram is easy to debug</h3>

Flogram has eliminated features from the language that make it harder to debug code and found better workarounds. This includes eliminating function pointers, inheritance, and recursive loops in function calls. In Flogram, variables are "read-only" by default. This means once a variable is set, it can't be changed unless you explicitly allow it by using the mut keyword. This design feature narrows down the potential sources of bugs related to variable modification, making your debugging process more efficient and your code more robust.

Some examples of Flogram minimizing bugs are:
- By having math work in a way that doesn’t require thinking about order of operations, sneaky math bugs are eliminated.
- Flogram doesn’t allow variable shadowing.

<h3>Flogram is simple</h3>

Flogram has an ownership system that is as powerful as Rust while being much simpler and practically invisible. For example, Flogram can check Rust-like lifetimes of variables and guard against move errors without users needing to annotate lifetimes.

We’ve been very careful about which features we’ve added to the language vs leaving out. When possible, we’ve combined features. An example of this is Flogram’s objects which function as both structs and classes in other languages since realother languages since really, they are the same thing.

Unlike Rust and most languages, Flogram assignment uses the simpler to reason about copy by default for both primitives and objects. Unless the user opts into ‘move by default’ mode to allow them to see optimizations.

You will practically not need to learn any symbols to use Flogram. Other than a few natural and frequently used exceptions, we try to stick to short keywords over symbols.

<h3>Flogram is uniform</h3>

A lot of things in Flogram have been polished to work the same way.

For example, unlike a lot of languages that pass objects around using hidden pointers but primitive variables by value, both primitives and objects in Flogram are ‘passed by value’. This means you don’t have to think about different rules whether working with variables or objects or enums.

<h3>Flogram is made for AI</h3>

Between designing the language to allow stricter compile time checks and being made to read like plain english, Flogram is made to be written by AI and read by humans who can verify the code is doing what they expect. We believe the future of coding is humans manipulating English descriptions of programs which AI turns into code, then humans also providing code reviews since AI makes mistakes that must be corrected.
