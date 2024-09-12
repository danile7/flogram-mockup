---
title: Math
publishedOn: 1717800000000
author: Matt Flogram
summary: Math in Flogram
published: true
order: 8
---

<h2>Math in Flogram</h2>

Mathematical operations in Flogram are performed using a syntax similar to traditional infix operators, but with a few key differences. 

Parentheses are required for operations involving multiple terms, but the outermost parentheses can be omitted.

📝 **Note:** Flogram does not use order of operations, parenthese must be used instead

<h3>Arithmetic Operations</h3>

- **Addition**: Use `a + b` to add `a` and `b`. If there are multiple terms, parentheses are required, e.g., `(a + b) + c`.
- **Subtraction**: Use `a - b` to subtract `b` from `a`. If there are multiple terms, parentheses are required, e.g., `(a - b) - c`.
- **Multiplication**: Use `a * b` to multiply `a` and `b`. If there are multiple terms, parentheses are required, e.g., `(a * b) * c`.
- **Division**: Use `a / b` to divide `a` by `b`. If there are multiple terms, parentheses are required, e.g., `(a / b) / c`.

<h3>Type Conversion for Math Operations</h3>

Before performing mathematical operations, values must be converted to the same type. This ensures that the calculation is performed correctly, regardless of the original types of the operands.

For example, if you have an integer `x` and `a` floating-point number `y`, you would first cast `x` to `FP32` before adding them:

```
x:= 5 # type inference makes this a I32
y:= 2.5 # type inference knows to use FP32
sum:= FP32(x) + y # We must convert I32 to FP32 as we can only add numbers of the same type
```

<h3>Summary</h3>

- Mathematical operations in Flogram are performed using infix operators like `a + b`, with parentheses required for operations involving multiple terms.
- The outermost parentheses can be omitted, e.g., `a + (b / c)` instead of `(a + (b / c))`.
- Values must be converted to the same type before performing math operations.

By understanding casting and mathematical operations in Flogram, you can write efficient and precise code that takes full advantage of the language's unique features.