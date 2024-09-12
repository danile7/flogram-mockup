---
title: While Loops
publishedOn: 1717800000000
author: Matt Flogram
summary: While Loops in Flogram
published: true
order: 12.5
---

<h2>While Loops in Flogram</h2>

<h3>Introduction </h3>

While loops are another fundamental control structure in programming that allow you to repeat a block of code as long as a specified condition is true. In Flogram, while loops provide a way to create flexible and dynamic iterations, making it easier to solve problems that require repetition based on a condition.


<h3>Basic Syntax </h3>

The basic syntax of a while loop in Flogram is as follows:

```
while condition:
  # code to be executed while the condition is true
```

Here, `condition` is an expression that evaluates to a Boolean value (`TRUE` or `FALSE`). The code inside the loop will continue to execute as long as the condition remains `TRUE`.


<h3>Example: Guessing Game </h3>

Let's create a simple guessing game using a while loop in Flogram:
```
fn guessing_game():
  secret_number:= 42
  mut guess:= -1

  while guess != secret_number:
  draw("Enter your guess:")
  guess:= input_number()

  if guess < secret_number:
    draw("Too low! Try again.")
  if guess > secret_number:
    draw("Too high! Try again.")

  draw("Congratulations! You guessed the secret number.")
```

In this example, the while loop continues to prompt the user for a `guess` until the guess matches the `secret_number`. The `input_number()` function (assumed to be defined elsewhere) reads the user's input as a number. The loop provides feedback to the user, indicating whether their guess is too low or too high.

<h3>Example: File Processing </h3>

Another common use case for while loops is processing files. Here's an example that reads lines from a file until the end of the file is reached:

```
fn process_file(file_path: String):
file:= open(file_path, "r")
mut line:= ""

while (line:= file.read_line()) != "":
  # Process each line
  draw("Processing line: {line}")

file.close()
draw("File processing complete.")
```

In this example, the while loop reads lines from the file using the `read_line()` method (assumed to be defined for the file object). The loop continues until `read_line()` returns an empty string, indicating the end of the file. Inside the loop, each line is processed as needed.


<h3>Best Practices </h3>

When using while loops in Flogram, consider the following best practices:
- Prefer foreach loops over for loops over while loops for performance and safety
- Ensure that the loop condition eventually becomes FALSE to avoid infinite loops.
- Use meaningful variable names for the loop condition and any variables used within the loop.
- Keep the loop body focused and concise, performing a single task or related set of tasks.
- Consider using a break statement to exit the loop early if a certain condition is met.

<h3>Conclusion </h3>

While loops in Flogram provide a powerful way to create dynamic iterations based on a condition.
By understanding the basic syntax and seeing practical examples, you can effectively use while loops to solve problems that require repetition.
