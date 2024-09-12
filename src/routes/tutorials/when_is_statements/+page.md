---
title: When-Is Statements
publishedOn: 1717800000000
author: Matt Flogram
summary: When-Is Statements in Flogram
published: true
order: 12.7
---

<h2>When-Is Statements in Flogram</h2>

<h3>Introduction </h3>

In this lesson, we'll explore the when-is construct in Flogram, which provides a powerful way to match a value against specific patterns and execute code based on the matched pattern. We'll start by using when-is to match against specific values and then discuss its usage with enums.

<h3>The When-Is Construct </h3>

The when-is construct in Flogram allows you to match an expression against different values and execute code based on the matched value. It provides a concise and efficient way to handle different cases based on the value of an expression.


<h3>Basic Syntax </h3>

The basic syntax of a when-is statement is as follows:

```
when expression: 
  is value1: 
    # code to execute if expression matches value1 
  is value2: 
    # code to execute if expression matches value2 
    ... 
  else: 
    # code to execute if no pattern matches
```

The expression is the value you want to match against. The is keyword is used to define each pattern, which represents a specific value or condition. The code block following each pattern is executed if the expression matches that pattern.

Note that when-is cannot be used to match against variables. If statements must be used for this for now.

<h3>Matching Against Specific Values </h3>

Let's consider an example that demonstrates using when-is to match against specific values:

```
fn get_day_name(day_number: I32) -> String:
  when day_number:
    is 1:
      return "Monday"
    is 2:
      return "Tuesday"
    is 3:
      return "Wednesday"
    is 4:
      return "Thursday"
    is 5:
      return "Friday"
    is 6:
      return "Saturday"
    is 7:
      return "Sunday"
    else:
      return "Invalid day number”
  
fn main():
  day:= 3
  day_name:= get_day_name(day)
  draw("Day {day} is {day_name}")
```

In this example, the get_day_name function uses a when-is statement to match the day_number against specific integer values representing the days of the week. Based on the matched value, it returns the corresponding day name as a string.

<h3>Performance Considerations </h3>

When possible, it's recommended to use when-is statements instead of multiple if statements for matching against specific values. The when-is construct is optimized for performance and can lead to more efficient code execution.

<h3>Using When-Is with Enums </h3>

In addition to matching against specific values, the when-is construct is also commonly used with enums to match against enum variants and unwrap their associated values. Here's an example:

```
enum Color: 
  Red
  Green
  Blue
  RGB(r: U8, g: U8, b: U8)

fn main(): 
  color:= Color.Red
  when color:
    is Red: 
      draw("It's red!")
    is Green: 
      draw("It's green!") 
    is Blue: 
      draw("It's blue!") 
    is RGB: 
      draw("Custom RGB color: ({color.r}, {color.g}, {color.b})")
```

In this example, the when-is statement matches the color value against each enum variant. Since color is Color.Red, the code block following ‘is Red:’ is executed, and "It's red!" is printed.

<h3>Conclusion </h3>

The when-is construct in Flogram provides a powerful and efficient way to match a value or expression against specific values including enums and execute code based on the matched value. When used for matching against specific values, it can lead to more performant code compared to using multiple if statements.

Additionally, when-is is often used with enums to match against enum variants and unwrap their associated values, providing a concise and expressive way to handle different cases based on the enum value.

Remember to use when-is statements judiciously and consider the readability and maintainability of your code. Practice using when-is in your own projects to familiarize yourself with its syntax and behavior.
