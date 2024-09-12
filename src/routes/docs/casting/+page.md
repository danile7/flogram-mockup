---
title: Flogram/Casting
publishedOn: 1690934006000
author: Didier Munezero
summary: Query anguage for your APIs
published: true
order: 8
---

## Casting in Flogram

In programming, casting refers to the conversion of a variable from one data type to another. In Flogram, you can cast between primitive types and even use object constructors for casting between different object types.

##### Casting Between Primitive Types

In Flogram, you can cast a variable from one primitive type to another. Here's an example of casting an integer (`I32`) to a floating-point number (`FP32`):

```
IVar:= 5
fpVar:= FP32(IVar)
```

The `FP32(IVar)` syntax casts the integer variable `IVar` to a floating-point value.

##### Casting Between Objects

We’ll introduce objects soon but for those of you who know what they are from other languages.. note that since object constructors work the same way as casting, you can also use them to cast from one type of object to another. This is just one more way that primitives and objects Flogram function the same and you don’t have to learn different rules for the two.

##### Productivity tip!

You should usually convert from one primitive type to another in a way that minimizes the amount of information that is lost. For example, Integers to Floating Point, less bits to more bits. This is likely to prevent bugs.

##### Summary

- You can cast between primitive types using the syntax `NewType(OldVariable)`.
- Object constructors can be used for casting between different object types, providing flexibility in handling complex data structures.
