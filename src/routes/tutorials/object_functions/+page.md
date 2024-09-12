---
title: Functions on Objects
publishedOn: 1717800000000
author: Matt Flogram
summary: Adding Functions to Objects in Flogram
published: true
order: 14
---

<h2>Adding Functions to Objects in Flogram</h2>

In Flogram, functions can be embedded within objects, allowing you to encapsulate behavior with data. This enables more organized and reusable code. Here's how you can add functions to objects:

<h3>Defining Functions Inside Objects</h3>

Functions within an object are defined by simply indenting the function definition under the object declaration.

<h3>Accessing Object Variables with self</h3>

The `self` keyword within the function allows you to access variables belonging to the instance of the object the function is called on. An instance of an object is a specific realization of the object, containing its own set of data.

Here's an example:

```
object Rectangle:
  length: FP32
  width: FP32

  fn area() -> (a: FP32):
    return self.length * self.width
```

Here's how you can use the `area` function:

```
fn main():
  r:= Rectangle(length = 5, width = 2)
  # r.area() calls the function area on instance r of Rectangle
  draw(r.area())  # outputs 10
```

<h3>Mutating Variables with Functions</h3>

If a function within an object mutates (changes) variables belonging to the object, the `mut` keyword must precede the `fn` keyword in the function declaration:

```
object Counter:
  mut value: I32 = 0

  mut fn increment():
    self.value = self.value + 1
```

`mut` must also be used when calling a function that changes variables that belong to an object

Here's an example using the `Counter` object:

```
fn main():
  mut c:= Counter()  # c.value = 0
  mut c.increment()  # this is equivalent to c.value = c.value + 1
  draw(c.value)  # outputs 1

```

<h3>Productivity Tip!</h3>

Avoid attaching functions to objects unless it really makes sense for the object to own that function. Using stand-alone functions that accept objects as parameters instead often leads to more maintainable code.

<h2>Example for the Code Editor</h2>

```
object Point2D:
  mut x: FP32
  mut y: FP32

  fn distanceTo(other: Point2D) -> (distance: FP32):
    lengthX:= self.x - other.x
    lengthY:= self.y - other.y
    squareX:= lengthX * lengthX
    squareY:= lengthY * lengthY
    sum:= squareX + squareY
    distance:= sqrt(sum)
    return distance

  mut fn moveBy(dx: FP32, dy: FP32):
    self.x = self.x + dx
    self.y = self.y + dy
    return

fn main():
  p1:= Point2D(x = 1.0, y = 2.0)
  p2:= Point2D(x = 4.0, y = 6.0)
  draw(p1.distanceTo(p2)) # calculates the distance

  p1.moveBy(3.0, 4.0)         # moves p1
  draw(p1.distanceTo(p2)) # calculates the new distance
```
