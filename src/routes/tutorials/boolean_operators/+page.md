---
title: Boolean Operators
publishedOn: 1717800000000
author: Matt Flogram
summary: Boolean Operators in Flogram
published: true
order: 12.1
---

<h2>Boolean Operators</h2>

Booleans are a fundamental type in programming that can hold one of two values: `TRUE` or `FALSE`.
They are incredibly useful for decision making in your code, as you will soon see when we introduce conditional statements like `if` and loops like `while`.
But first, let's master the basics of Booleans and Boolean operators.

<h3>What are Booleans?</h3>

Booleans represent truth values and are named after George Boole, who first defined an algebraic system of logic in the mid-19th century.
In Flogram, as in many programming languages, the Boolean values are denoted as `TRUE` and `FALSE`.


<h3>Creating Boolean Variables</h3>

In Flogram, you can create a Boolean constant by using the `:=` operator.
If you want a Boolean that can change during the execution of your program, you prepend `mut` to declare a mutable Boolean variable.
Here's how you can create Booleans:

```
isTodaySunny:= TRUE  # A Boolean constant
mut isShopOpen:= FALSE  # A mutable Boolean variable
```

<h3>Boolean Operators</h3>

Booleans become particularly powerful when used with Boolean operators.
These operators allow you to combine or invert Boolean values.
Here are the basic Boolean operators in Flogram:

- Logical AND (and): This operator returns TRUE if both operands are true.
- Logical OR (or): This operator returns TRUE if at least one of the operands is true.

Here’s how you might use these operators:

```
isHoliday:= TRUE
isWeekend:= FALSE
canRelax:= isHoliday or isWeekend  # Evaluates to TRUE
```

<h3>Comparison Operators</h3>

To compare values and derive a Boolean result, Flogram uses standard comparison operators.
Here are the key comparison operators:
- Equal to (`==`): Checks if two values are equal.
- Not equal to (`!=`): Checks if two values are not equal.
- Greater than (`>`), Less than (`<`), Greater than or equal to (`>=`), Less than or equal to (`<=`).

Examples of using comparison operators:
```
savingsBalance:= 1200
checkingBalance:= 2000
# isSavingsLess is TRUE because 1200 is less than 2000
isSavingsLess:= savingsBalance < checkingBalance
```

<h3>Using Boolean and Comparison Operators Together</h3>

Combining comparison and Boolean operators can lead to more complex and useful expressions:

```
participantAge:= 16
minAge:= 12
maxAge:= 20

# isEligible is TRUE because 16 is between 12 and 20
isEligible:= (participantAge > minAge) and (participantAge < maxAge)
```

<h3>Summary</h3>

Booleans and Boolean operators are essential for controlling the flow of logic in your programs. They help you make decisions within your code, determining whether certain blocks of code execute. As you progress, you’ll see how these simple tools enable complex and powerful functionalities in your Flogram applications, aligning with Flogram's goals of simplicity and performance.

By understanding Booleans, you’re taking a big step towards writing more dynamic and responsive programs.
