---
title: For Loops
publishedOn: 1717800000000
author: Matt Flogram
summary: For Loops in Flogram
published: true
order: 12.4
---

<h2>For Loops in Flogram</h2>

Introduction For loops are a fundamental control structure in programming that allow you to repeat a block of code a specified number of times. In Flogram, for loops provide a concise and flexible way to iterate over a range of values, making it easier to perform repetitive tasks and process data efficiently.

<h3>Basic Syntax </h3>

The basic syntax of a for loop in Flogram is as follows:

```
for i:= x up_to y by z:
  #code to be executed for each iteration
```

**:= x** is only required if variable is not already set

Here, `i` is a constant that holds the current value of the loop counter, `x` is the initial value, `up_to` can be replace by `almost_up_to`, `down_to`, or `almost_down_to`, `y` is the final value, and `z` is the amount by which the `i` is incremented or decremented in each iteration.
`i` cannot be modified within the for loop

<h3>Counting Up with 'up_to' and 'almost_up_to' </h3>

To create a for loop that counts up, you can use either the `up_to` or `almost_up_to` keyword. The difference between the two is the condition for terminating the loop.

**up_to:** The loop continues as long as `i` is less than or equal to `y` (`i <= y`).

**almost_up_to**: The loop continues as long as `i` is strictly less than end (`i < y`).

Here's an example that calculates the sum of numbers from 1 to 100:

```
fn calculate_sum():
  sum:= 0 

  for i:= 1 up_to 100 by 1: 
    sum = sum + i
    draw("The sum of numbers from 1 to 100 is: {sum}")
```

<h3>Counting Down with 'down_to' and 'almost_down_to' </h3>

Similarly, you can create a for loop that counts down using either the `down_to` or `almost_down_to` keyword:

**down_to:** The loop continues as long as `i` is greater than or equal to `y` (`i >= y`).

**almost_down_to:** The loop continues as long as `i` is strictly greater than `y` (`i > y`).

Here's an example that prints a countdown from 10 to 1:

```
fn countdown(): 
  for i:= 10 down_to 1 by 1: 
    draw(i) 
    draw("Liftoff!")
```

<h3>Specifying the Step Size </h3>

The by clause in a for loop allows you to specify the step size, which is the amount by which the loop counter is incremented or decremented in each iteration. This is useful when you need to iterate over a range of values with a specific interval.

Here's an example that prints even numbers from 0 to 20:

```
fn print_even_numbers():
  for i:= 0 up_to 20 by 2: 
  draw(i)
```

<h3>Best Practices </h3>

When using for loops in Flogram, consider the following best practices:

Use foreach loops over for loops when possible. foreach loops are less likely to be buggy

Use the appropriate direction keyword (`up_to`, `almost_up_to`, `down_to`, or `almost_down_to`) based on your requirements.

<h3>Conclusion </h3>

For loops in Flogram provide a powerful and flexible way to iterate over a range of values and perform repetitive tasks. By understanding the different direction keywords (`up_to`, `almost_up_to`, `down_to`, and `almost_down_to`) and the by clause for specifying the step size, you can create efficient and readable code.
