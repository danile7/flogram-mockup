---
title: Understanding Objects
publishedOn: 1717800000000
author: Matt Flogram
summary: Understanding Objects in Flogram
published: true
order: 13
---

<h2>Understanding Objects in Flogram</h2>

<h3>Introduction</h3>

Objects are central to organizing data in many programming languages, and Flogram is no different. In this lesson, we'll explore the concept of objects in Flogram, focusing specifically on treating them as collections of data, akin to structs in other languages.

<h3>Objects as Collections of Data</h3>

An object in Flogram is essentially a collection of data that allows you to group other objects and primitive variables together. This makes them incredibly versatile and useful for structuring your code.

<h3>Defining Objects</h3>

You can define an object by specifying its name and the variables it contains, along with their types. Here's an example:

```
object Point:
  x: FP32
  y: FP32
  z: FP32 = 0
```

This Point object contains three variables: x, y, and z. Note that z is given a default value of 0, so it doesn't need to be defined when a Point object is created.

<h3>Creating Instances of Objects</h3>

To create an instance of an object, you use the object's name and specify the values for its variables.

For example:
```
pt:= Point(x = 5, y = 2.5)
ptOrigin:= Point(x = 0, y = 0)
```
Note that most functions must start with a lowercase letter. Except for this special case, when a function is being called with an uppercase letter it is creating and returning a new object whose name matches the name of the object.

<h3>Objects with mutable variables</h3>

Like primitive variables, objects can be mutable or immutable. If you want to change the value of an object's variable after it's been created, you must declare it with the mut keyword:

In the following example, an object called MutablePoint is defined below as an object having an x and y coordinate that are variables and can be changed and z is a constant that cannot be changed after the object is created.

```
object MutablePoint:
  mut x: FP32
  mut y: FP32
  z: FP32 = 0

mut pt:= MutablePoint(x = 3, y = 4) # Create a MutablePoint at x =3, y =4, z =0
pt.x = 10                                            # Changing the value of x
draw(pt.x)                                          # Outputs 10 to the screen
draw(pt)                                            # Outputs MutablePoint(x = 10, y =4, z =0) to the screen
draw(“pt.x:{pt.x}, pt.y:{pt.y}, pt.z:{pt.z}”) # pt.x:10, pt.y:4, pt.z:0

```

<h3>Copying Objects</h3>

Objects are always copied when passed into functions or assigned to another object. This may seem inefficient, but Flogram optimizes this behavior behind the scenes to avoid unnecessary copying when possible.

<h3>Example: Working with Mutable and Immutable Objects</h3>

Here's an example that demonstrates the use of mutable and immutable objects:

```
object Person:
  mut name: String
  age: I32

fn main():
  mut person:= Person(name = "Alice", age = 30)
  person.name = "Bob"  # Changing the name
  draw(person.name)   # outputs Bob
  draw(person.age)  # outputs 30
  person.age = 35   # Error! age is not mutable
```

<h3>Conclusion</h3>

Objects in Flogram act as powerful tools for grouping data, providing a way to create complex structures and organize information. Understanding how to define, create, and work with objects, both mutable and immutable, will enable you to write clean and effective code in Flogram. Experiment with objects in your own projects to see how they can help you create more organized and flexible programs.


<h3>EXAMPLE CODE FOR CODE EDITOR</h3>

```
object Point2D:
  mut x: FP32
  mut y: FP32
  z: FP32 = 0

fn modify_point(mut p: Point2D):
  p.x = 50
  p.y = 60
  
fn main():
  original_point:= Point2D(x = 10, y = 20)
  draw("Original point (before):", original_point.x, original_point.y) # outputs Original point (before): 10 20

  copied_point:= original_point  # Copying the object
  modify_point(mut copied_point)  # Modifying the copied object

  draw("Original point (after):", original_point.x, original_point.y) # outputs Original point (after): 10 20
  draw("Copied point (after):", copied_point.x, copied_point.y)     # outputs Copied point (after): 50 60
```
