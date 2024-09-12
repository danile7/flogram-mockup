---
title: Primitive Types
publishedOn: 1689994006000
author: Didier Munezero
summary: Primitive Types in Flogram
published: true
order: 4
---

## Primitive Types in Flogram

In Flogram, constants can be of various core data types, each serving different purposes and having unique characteristics.

#### Integers

Integers are whole numbers that can be positive, negative, or zero. They are represented using `I` followed by the bit length. For example, `I32` represents a 32-bit integer.

#### Unsigned Integers

Unlike integers, unsigned integers can only be positive or zero. They are denoted with `U` followed by the bit length. For instance, `U8` is an 8-bit unsigned integer.

#### Floating-Point Numbers

Floating-point numbers can represent real numbers, including fractions. They can be of 32 or 64 bits and are represented using `FP32` or `FP64`.

#### Characters

Characters represent single Unicode scalar values, usually occupying 8 bits.

#### Bool

A boolean data type, represented as `Bool`, can have one of two values: `TRUE` or `FALSE`.

### Table: Primitive Types in Flogram

<table>
  <tr>
   <td><strong>Basic Type</strong>
   </td>
   <td><strong>Example</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>Integer
   </td>
   <td><code>I8, I16, I32, I64</code>
   </td>
   <td>Signed integer of length 8, 16, 32, or 64 bits
   </td>
  </tr>
  <tr>
   <td>Unsigned Integer
   </td>
   <td><code>U8, U16, U32, U64</code>
   </td>
   <td>Unsigned integer of length 8, 16, 32, or 64 bits
   </td>
  </tr>
  <tr>
   <td>Floating Point
   </td>
   <td><code>FP32, FP64</code>
   </td>
   <td>Numbers that allow decimals of length 32 or 64 bits
   </td>
  </tr>
  <tr>
   <td>Character
   </td>
   <td><code>Char</code>
   </td>
   <td>Unicode character, 8 bits
   </td>
  </tr>
  <tr>
   <td>Boolean
   </td>
   <td><code>Bool</code>
   </td>
   <td>Boolean value, TRUE or FALSE
   </td>
  </tr>
</table>

### Type Inference

Type inference is Flogram’s way of picking the type for you if you don’t explicitly specify it.

If type inference is used for plain numbers in code represented by text including integers, unsigned integers, and floating-point numbers default to 32-bit length. If the assigned number doesn't fit into 32 bits, it's upgraded to 64 bits.

#### **Example Code**

Here's an example of Flogram code declaring various variables of different types and lengths:

```
answer: I32 = 42
y: U8 = 255
pi: FP64 = 3.14
a: Char = 'A'
flag: Bool = TRUE
```

This code declares five variables with different primitive types and assigns them initial values. The specific length of the integers and floating-point numbers is explicitly stated.
