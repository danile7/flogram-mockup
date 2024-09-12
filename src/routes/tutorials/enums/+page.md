---
title: Enums
publishedOn: 1717800000000
author: Matt Flogram
summary: Enums in Flogram
published: true
order: 12.6
---

<h2>Enums in Flogram</h2>

Let's dive deeper into enums, a powerful feature in Flogram that allows you to define a custom type with a fixed set of possible values.

<h3>Defining an Enum</h3>

To define an enum in Flogram, use the enum keyword followed by the name of the enum, and then list the possible values the enum can take. Here's an example:

```
enum Weather:
  Sunny
  Cloudy
  Rainy
  Snowy
```

In this example, we've defined an enum called Weather. It can only have one of four possible values: Sunny, Cloudy, Rainy, or Snowy.

<h3>Using Enums</h3>

Once you've defined an enum, you can create variables of that enum type. Here's how you might use our Weather enum:

```
fn main():
  todayWeather:= Weather.Sunny
  if todayWeather == Weather.Sunny:
    draw("It's a sunny day!")
  if todayWeather == Weather.Rainy:
    draw("Don't forget your umbrella!")

```

In this code, we create a variable called todayWeather of type Weather and assign it the value Weather.Sunny. We then use if statements to check the value of todayWeather and print an appropriate message.

<h3>Enums with Associated Data </h3>

Flogram enums can also hold associated data, similar to Rust-like enums. Let's look at an example representing different types of messages in a chat application:

```
enum Message: 
  Text(String) 
  Image(url:String, width:I32, height:I32) 
  Video(url:String, duration:FP32) 
  File(url:String, size:I32)
```

This Message enum has four variants:
- Text has one associated String value, representing the text content of the message.
- Image has three associated values (a String, and two I32s), which could represent the image URL, width, and height.
- Video has two associated values (a String and an FP32), possibly representing the video URL and duration.
- File has two associated values (a String and an I32), which could represent the file URL and file size.

You can create instances of these enum variants like this:

```
fn main(): 
  textMessage:= Message.Text("Hello, how are you?") 
  imageMessage:= Message.Image("https://example.com/image.jpg", 800, 600)
  videoMessage:= Message.Video("https://example.com/video.mp4", 120.5)
  fileMessage:= Message.File("https://example.com/file.zip", 1024)
```

In this example, the Message enum represents different types of messages in a chat application. Each variant holds data specific to that type of message. The Text variant holds the text content, the Image variant holds the URL, width, and height of the image, the Video variant holds the URL and duration of the video, and the File variant holds the URL and size of the file.

In the main function, we create instances of each type of message by calling the appropriate enum variant and providing the necessary data.

This example demonstrates how enums with associated data can be used to represent complex data structures in a clean and expressive way.

<h3>Enums in Action: A Shape Calculator</h3>

Let's put our knowledge of enums to use by creating a simple shape calculator. We'll define an enum called Shape with three variants: Circle (with a radius), Rectangle (with a width and height), and Triangle (with a base and height).

```
enum Shape:
  Circle(radius:FP32)
  Rectangle(width:FP32, height:FP32)
  Triangle(base:FP32, height:FP32)

fn area(shape: Shape) -> (result: FP32):
  if shape == Shape.Circle:
    return 3.14159 * (shape.radius * shape.radius)
  if shape == Shape.Rectangle:
    return (shape.width * shape.height)
  if shape == Shape.Triangle:
    return (shape.base * shape.height) / 2.0

fn main():
  circle:= Shape.Circle(radius: 5.0)
  rectangle:= Shape.Rectangle(width: 4.0, height: 6.0)
  triangle:= Shape.Triangle(base: 3.0, height: 8.0)
  draw("Area of circle: {area(circle)}")
  draw("Area of rectangle: {area(rectangle)}")
  draw("Area of triangle: {area(triangle)}")
```

In this code, we define a function area that takes a Shape and uses if statements to check which variant of Shape it is. Based on the variant, it calculates and returns the appropriate area.

In the main function, we create instances of each shape and then print out their areas by calling the area function.

<h3>Conclusion</h3>

Enums in Flogram provide a way to define custom types with a fixed set of possible values, and they can also hold associated data. They're great for representing a set of related but distinct possibilities.

In this lesson, we saw how to define enums, create instances of enum variants, and use if statements to check which variant an enum instance is. We also saw a practical example of using enums to create a simple shape calculator.
