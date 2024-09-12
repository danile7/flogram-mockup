---
title: Flogram/Mathematics
publishedOn: 1688604006050
author: Didier Munezero
summary: Intro before starting
published: true
order: 6
---

## Math in Flogram

Mathematical operations in Flogram are performed using a unique syntax. While traditional infix operators like a `+ b` will be supported eventually, the current syntax uses functions for these operations.

##### Arithmetic Operations

- **Addition**: Use `+(a, b)` to add `a` and `b`.
- **Subtraction**: Use `-(a, b)` to subtract `b` from `a`.
- **Multiplication**: Use `*(a, b)` to multiply `a` and `b`.
- **Division**: Use `/(a, b)` to divide `a` by `b`.

##### Type Conversion for Math Operations

Before performing mathematical operations, values must be converted to the same type. This ensures that the calculation is performed correctly, regardless of the original types of the operands.

For example, if you have an integer `x` and a floating-point number `y`, you would first cast `x` to `FP32` before adding them:

```
x := 5  # type inference makes this a I32
y := 2.5 # type inference knows to use FP32
sum := +(FP32(x), y) # We must convert I32 to FP32 as we can only add numbers of the same type
```

##### Summary

- Mathematical operations in Flogram are currently performed using functions like `+(a, b)`.
- Values must be converted to the same type before performing math operations.
- The syntax `(a + b)` will be supported eventually as a preferred alternative.

By understanding casting and mathematical operations in Flogram, you can write efficient and precise code that takes full advantage of the language's unique features.
