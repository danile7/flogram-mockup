---
title: Strings
publishedOn: 1717800000000
author: Matt Flogram
summary: String in Flogram
published: true
order: 10
---

<h2>Strings in Flogram</h2>

Characters can be used to represent letters or numbers. Strings are a sequence of characters and are one of the most common data types used in programming. In Flogram, strings are represented as arrays of characters, providing compatibility with JavaScript.

<h3>Declaring a String</h3>

Strings in Flogram can be declared as such:

```
myString: String = "Hello"
```

<h3>Accessing Characters</h3>

Strings are effectively just arrays of characters, you can access individual characters using their index, just like you would with an array:

```
firstChar:= myString[0]  # This will get the character 'H' from the string and store it into ‘firstChar’
```

<h3>Concatenating Strings </h3>

You can concatenate strings using `{}` within a string which will expand variables into strings:

```
greeting:= "Hello"
name:= "Flogram user"
fullGreeting:= "{greeting} {name}"  
# fullGreeting is now equal to "Hello Flogram user"
```

<h3>String Length</h3>

You can find the length of a string using the size function, the same way you would with an array:

```
length:= size(myString)
```

<h2 class="title-filled">Example Code</h2>

Here's a complete code example that demonstrates the above concepts related to strings. You can run this code in the Flogram IDE.

```
fn main():
  greeting:= "Hello"
  name:= "Flogram user"
  fullGreeting:= "{greeting} {name}!"
  draw(fullGreeting) # Outputs: Hello Flogram user!
  length:= size(fullGreeting)
  draw("Greeting length: {length}") # Outputs: Greeting length: 19
```

Strings are versatile and essential in any programming language, providing a way to handle text data. In Flogram, strings are treated as arrays of characters, allowing for convenient manipulation and access to individual characters.
