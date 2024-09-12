---
title: If Statements
publishedOn: 1717800000000
author: Matt Flogram
summary: If Statements in Flogram
published: true
order: 12.2
---

<h2>If Statements</h2>

In this tutorial, we'll explore how to use `if` statements in Flogram to make decisions in your code. `if` statements allow you to execute different parts of your code based on certain conditions.

<h3>What is an If Statement?</h3>

An `if` statement checks a condition: if the condition is true, it executes a block of code. Flogram simplifies decision-making in code by using `if` statements, although it does not support `else` directly because using `switch` cases (which we will cover in a future lesson) is generally recommended for more complex conditions.

<h3>Basic Syntax of If Statements</h3>

In Flogram, you write an `if` statement using the `if` keyword followed by a condition. Here's a basic example:

```
fn checkEqual(a: I32, b: I32):
  if a == b:
    draw("a and b are equal")
```
This function, `checkEqual`, will display a message if `a` and `b` are equal.

<h3>Checking Temperature</h3>

Let's use an `if` statement to check if the temperature is suitable for a picnic:

```
fn decidePicnic(temperature: I32):
  if temperature > 75:
    draw("Great weather for a picnic!")

```
This function checks if the temperature is above 75 degrees. If it is, it suggests that the weather is great for a picnic.

<h3>Verifying User Age</h3>

Suppose you have an application that requires the user to be at least 18 years old. You can use an `if` statement to verify the user's age:

```
fn verifyAge(userAge: I32):
  if userAge >= 18:
    draw("You are eligible.")
  if userAge < 18:
    draw("You are not eligible.")
```

This function displays whether the user is eligible based on their age.

<h3>Using Boolean Operations with If Statements</h3>

You can also use more complex conditions with Boolean operators:

```
fn checkAccess(hasTicket: Bool, hasInvitation: Bool):
  if hasTicket or hasInvitation:
    draw("Access granted.")
  else:
    draw("Access denied.")
```

This function grants access if the user has either a ticket or an invitation.

<h3>Conclusion</h3>

`if` statements are a powerful tool in Flogram that help you control the flow of your program based on conditions. By learning to use these effectively, you can make your programs smarter and more responsive to different situations. As you continue to learn Flogram, you'll find that these conditional statements are essential in many programming tasks, reflecting Flogram's commitment to performance and simplicity.

Introduction In this lesson, we'll explore the foreach loop in Flogram, a powerful tool for iterating over arrays and other iterable objects. The foreach loop provides a concise and readable way to process each element in a collection, making your code more expressive and efficient.
