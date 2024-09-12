---
title: Object Constructors & Destructors
publishedOn: 1717800000000
author: Matt Flogram
summary: Object Constructors and Destructors in Flogram
published: true
order: 15
---

<h2>Object Constructors and Destructors in Flogram</h2>

<h3>Introduction </h3>

In object-oriented programming, constructors and destructors are special functions that are automatically called when an object is created and destroyed, respectively. They play a crucial role in initializing and cleaning up objects. In this lesson, we'll explore how to define and use constructors and destructors in Flogram.

<h3>Default Constructors </h3>

In Flogram, if you don't explicitly define a constructor for an object, a default constructor is automatically provided. The default constructor allows you to create an instance of the object without passing any arguments. It initializes the object's data members to their default values.

Let's consider an example of a Point object that relies on the default constructor:
```
object Point: 
  x:FP32 = 0.0
  y:FP32 = 0.0

fn identity(a: FP32) -> (result: FP32): 
  mut point:= Point(x = 3.5, y = 5.0) 
  point.y = a 
  return point.y
```
In this example, the Point object has two data members: x of type FP32 and y of type I32. We haven't explicitly defined a constructor for the Point object, so the default constructor is used.

<h3>Using the Default Constructor </h3>

To create an instance of the Point object using the default constructor, you simply call the object name as if it were a function, optionally passing values for the data members.

Here's an example:

```
fn main() -> (): 
  p1:= Point(y = 5.0) # Create a Point object with default value for x 
  p2:= Point(x = 2.0, y = 3.0) # Create a Point object with specific values 
  draw("p1: ({p1.x}, {p1.y})")
  draw("p2: ({p2.x}, {p2.y})")
```

In this example, we create two instances of the Point object: p1 using the default constructor with no arguments, and p2 using the default constructor with specific values for x and y. The default constructor initializes the data members to their default values which are the values defined in the definition of the Point objects if no values are provided in the constructor.

<h3>Custom Constructors </h3>

While the default constructor is useful, you may want to define your own constructor to initialize objects with specific values or perform additional setup tasks. In Flogram, you can define a custom constructor using the fn constructor syntax within an object.

You can have different constructors and when creating the object you only call one or the other to construct the object.

```
object Temperature: 
  celsius: FP32

  fn constructor(celsius: FP32):
    self.celsius = celsius

  fn constructor(fahrenheit: FP32):
    self.celsius = (fahrenheit - 32.0) / 1.8

  fn getC() -> (result: FP32):
    return self.celsius

  fn getF() -> (result: FP32):
    return (self.celsius * 1.8) + 32.0

  fn isFreezing() -> (result: Bool):
    return self.celsius <= 0
```

<h3>Using the Custom Constructor </h3>

To create an instance of the Temperature object, you call the object name as a function, passing in the required arguments based on the desired constructor.

Here's an example:

```
fn main():
  temp:= Temperature(C= 24.5)
  draw("Temperature in Celsius: {temp.getC()}")
  draw("Temperature in Fahrenheit: {temp.getF()}")
  
  if temp.isFreezing():
    draw("It's freezing!")
  else:
    draw("It's not freezing.")
```
In this example, we create an instance of a Temperature object by calling `Temperature(C = 24.5)`. The custom constructor is called with the provided arguments, initializing the celsius data member. We then call the area function to calculate and print the area of the rectangle.

<h3>Destructors </h3>

Destructors are special functions that are automatically called when an object is about to be destroyed or deallocated from memory. They are responsible for cleaning up any resources held by the object and performing any necessary cleanup tasks. In Flogram, you can define a destructor using the fn destructor syntax within an object.

<h3>Example: Counter Object with Destructor </h3>

Let's consider an example of a Counter object that has a destructor:

```
object Counter: 
  mut count: I32

  fn constructor(): 
    self.count = 0 
    draw("Counter created")

  fn increment():
    self.count = self.count + 1

  fn destructor(): 
    draw("Counter destroyed, final count: {self.count}")
```

In this example, the Counter object has a constructor that initializes the count data member to 0 and prints a message indicating that the counter was created.

The increment function increments the count by 1.

The destructor is defined using fn destructor(). Inside the destructor, we print a message indicating that the counter is being destroyed and display the final count value.

Using the Destructor In Flogram, destructors are automatically called when an object goes out of scope or is no longer needed. You don't need to explicitly call the destructor. Here's an example:

```
fn main(): 
  counter:= Counter() 
  counter.increment() 
  counter.increment()
  
  #The Counter object 'counter' goes out of scope here
  #The destructor is automatically called
```

In this example, we create an instance of the Counter object using the constructor. We call the increment function twice to increase the count. When the counter object goes out of scope at the end of the main function, the destructor is automatically called, printing the final count value.

<h3>Conclusion </h3>

Constructors and destructors are fundamental concepts in object-oriented programming, and Flogram provides a straightforward way to work with them. Default constructors allow you to create objects without specifying arguments, while custom constructors enable you to initialize objects with specific values or perform additional setup tasks. Destructors, on the other hand, ensure that any resources held by an object are properly cleaned up when the object is destroyed.

By understanding how to use default constructors, define custom constructors, and utilize destructors in Flogram, you can create more flexible and efficient objects that manage their resources effectively. Remember to use constructors to initialize object data members and destructors to clean up when needed.
