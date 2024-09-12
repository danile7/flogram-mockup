---
title: Casting
publishedOn: 1717800000000
author: Matt Flogram
summary: Casting in Flogram
published: true
order: 7
---

<h2>Casting in Flogram</h2>

In programming, casting refers to the conversion of a variable from one data type to another. In Flogram, you can cast between primitive types and even use object constructors for casting between different object types.

<h3>Casting Between Primitive Types</h3>

In Flogram, you can cast a variable from one primitive type to another. Here's an example of casting an integer (`I32`) to a floating-point number (`FP32`):

```
iVar:= 5   # The inferred type of '5' is I32, a 32 bit integer
fpVar:= FP32(IVar)  # Convert to type FP32, a 32 bit floating point number
```

The `FP32(IVar)` syntax casts the integer variable `IVar` to a floating-point value.

<h3>Casting Between Objects</h3>

We’ll introduce objects soon but for those of you who know what they are from other languages, note that since object constructors work the same way as casting, you can also use them to cast from one type of object to another. This is just one more way that primitives and objects Flogram function the same and you don’t have to learn different rules for the two.

<h3>Productivity tip!</h3>

You should usually convert from one primitive type to another in a way that minimizes the amount of information that is lost. For example, Integers to Floating Point, less bits to more bits. This is likely to prevent bugs.

<h3>Summary</h3>

- You can cast between primitive types using the syntax `NewType(oldVariable)`.
- Object constructors can be used for casting between different object types, providing flexibility in handling complex data structures.
