---
title: Constants
publishedOn: 1717800000000
author: Matt Flogram
summary: Use of Constants in Flogram
published: true
order: 4
---

<h2> Constants in Flogram </h2>

In this lesson, we'll take a closer look at how to create and use constants in Flogram. We'll cover how to declare constants with explicit and implicit types.

Constants are used to store data. The data being stored can have different types associated with the data, such as integers only, or the ability to store text. We’ll dive deeper into this in the next lesson.

<h3><b>Declaring</b> Constants</h3>

In Flogram, constants are declared by specifying the constant name, a colon, the type, an equals sign, and the value assigned to the constant in that order.

For example:

```
PI:FP64 = 3.14
```

This creates a constant named PI, of type FP64 (which is a 64-bit floating-point number) and sets its value to 3.14 We will dive into the predefined types that Flogram variables can take in the next lesson.

Alternatively, constants in Flogram may also be created with implicit typing by simply omitting the type. In this scenario the type is automatically inferred from the context.

For example:

```
languageName:= "Flogram"
```

This creates a constant named language_name with an inferred type of String and sets its value to "Flogram".

Once a constant is created, its value cannot be later changed.

📝 **Note:** We generally recommend using implicit typing. The Flogram IDE can show you what the implicit types resolve to later if desired and you don’t have to worry about the mental overhead of thinking about what type to use.

<h3>Drawing constants</h3>

```
fn main ():
    mut languageName:= "C"
    languageName = "Flogram"
    draw("{languageName} is a fun language")
```

<h3>Scope of Constants and Blocks of Code</h3>

Constants declared within a block of code are only valid from the line they are declared at until the end of the current block of code.

We will explain this further once we cover creating your own functions.

<h3>Conclusion</h3>

In this lesson, we've covered the basics of constants in Flogram, including how to declare constants with explicit and implicit typing.

In the next lesson, we'll take a deeper dive into how to use constants in your Flogram programs and explore more advanced concepts such as scope and lifetime.

As you learn Flogram, keep in mind that the language is designed with two primary goals in mind: high productivity and high-performance. Here are a few tips to keep in mind as you work with constants:

- Initialize constants as close to the point of use as possible, rather than at the top of a function or block.
- Always use the smallest constant type that can represent the data to save memory, which can also impact performance.
