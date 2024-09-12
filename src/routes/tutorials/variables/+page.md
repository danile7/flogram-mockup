---
title: Variables
publishedOn: 1717800000000
author: Matt Flogram
summary: Variables in Flogram
published: true
order: 6
---

<h2>Variables</h2>

<h3>Introduction</h3>

Welcome to this lesson on variables in Flogram! Variables are essential in programming as they allow us to store, manipulate, and retrieve data. In this lesson, we'll explore how variables work in Flogram and how they differ from constants.

<h3>Constants vs. Variables</h3>

- **Constants**: Constants are values that cannot be changed once declared. They're useful for defining values that will remain the same throughout a program.
- **Variables**: Unlike constants, variables in Flogram can change their value during the execution of a program. This improves performance in some cases and allows data to be changed within loops which will be explained later.

<h3>Declaring Constants</h3>

In Flogram, as previously explained, you declare a constant using the following syntax:

```
pi: FP64 = 3.14
letter: Char = 'A'
```

The type and value of the constant are defined at the time of declaration, and they cannot be changed later.

Normally in Flogram you should use a new constant with a different name instead of using a variable:

```
temperatureBefore:=  readThermometer()
temperatureAfter:= readThermometer()
```

<h3>Declaring Variables</h3>

Variables in Flogram are declared similarly to constants, but with the keyword `mut` to indicate that the value can change or in other words is ‘mutable’. Here's the syntax:

```
mut video_chat_enabled:= FALSE
```

This creates a variable with the name 'video_chat_enabled' with an inferred type of bool (boolean) which is equal to FALSE

The value of video_chat_enabled may now be changed using an equals sign `=` without a colon `:`

```
video_chat_enabled = TRUE
```

<h3>Example: Constants vs. Variables</h3>

Consider the following code snippet, where we use both constants and variables:

```
fn main():
	pi:= 3.14
	draw("The value of PI is: {pi}")
	
	mut temperatureC:= 25.0
	draw("Current Temperature : {temperatureC}")
	
	temperatureC= 30.01
	draw("Updated Temperature : {temperatureC}")
```

Here, the value of `pi` remains the same throughout the code, while the value of `temperature` changes.

📝 **Note:**This code can be combined together into one line, we will explain more in the tutorial on Strings:

```
draw("The value of Pi is: ")
draw(pi)
```

Version that combines these together:

```
draw("The value of Pi is: {pi}")
```

<h3>Productivity Tips!</h3>

- Use constants instead of variables when the value is not going to change. Constants are needed much less often than most people use them.
- Do not worry about efficiency, Flogram will automatically reuse memory for you and using fresh constants to track state change instead of changing variables often leads to more maintainable programs and reduces bugs.
- Avoid using the same variable for different things in the same scope.

<h3>Summary</h3>

In this lesson, we've introduced the concept of variables in Flogram and explored how they differ from constants. Variables are a powerful tool in programming, allowing for dynamic and high-performance behavior in your code. Remember, while constants remain the same, variables can change their value, providing versatility to your programming projects. In the next lessons, we'll explore more ways to use and manipulate variables and other data types in Flogram.
