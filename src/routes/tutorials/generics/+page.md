---
title: Generics
publishedOn: 1717800000000
author: Matt Flogram
summary: Generics in Flogram
published: true
order: 16
---

<h2>Generics in Flogram</h2>

<h3>Introduction </h3>

In this lesson, we'll explore the concept of generics in Flogram. Generics allow you to write code that can work with different types, providing flexibility and reusability. Flogram supports generics for both functions and objects, enabling you to create more versatile and adaptable code.

<h3>What are Generics? </h3>

Generics are a way to write code that can handle different types without having to specify the exact type at the time of writing. Instead, you use a placeholder type that can be substituted with a specific type when the code is used. This allows you to write functions or objects that can work with various types, reducing code duplication and increasing code reusability.

<h3>Generics in Functions</h3>

In Flogram, you can define generic functions using curly braces `{}` followed by the generic type parameter. Let's consider an example:

```
fn identity{T}(a: T) -> (b: T):
	return a
    
fn main():
    num:= 42 
    i:= identity{I32}(num)  
    draw(i)  # Output: 42 
    name:= "Alice"
    s:= identity{String}(name) 
    draw(s)  # Output: "Alice”
```

In this example, we define a generic function called identity that takes a parameter of type `T` and returns a value of the same type `T`. The generic type parameter `T` is specified within curly braces `{}`.

When calling the identity function, we provide the specific type we want to use within curly braces. In the main function, we call `identity{I32}` to use the identity function with an integer type, and `identity{String}` to use it with a string type.

<h3>Generics in Objects </h3>

Flogram also supports generics in objects, allowing you to define objects that can work with different types. Let's consider an example of a generic Stack object:

```
object Stack{T}:
	elements: [T]
	size: I32
	capacity: I32

	fn constructor(capacity: I32):
		self.capacity = capacity 
		self.elements =                      # Change it from the examples, or tutorial this is missing in the WEB tutorial.
		self.size = 0
  
	fn push(item: T):    
		if self.size == self.capacity:    
			draw("Stack is full")    
		return        
		self.elements[self.size] = item       
		self.size = self.size + 1
  
	fn pop() -> (item: T):
		if self.isEmpty():
			draw("Stack is empty")
		return
		self.size = self.size - 1
		return self.elements[self.size]
  
	fn isEmpty() -> (empty: Bool):
		return self.size == 0
        
fn main():
  intStack:= Stack{I32}(5)
  intStack.push(10)
  intStack.push(20)
  draw(intStack.pop())  # Output: 20
  stringStack:= Stack{String}(3)
  stringStack.push("Hello")
  stringStack.push("World")
  draw(stringStack.pop())  # Output: "World"
```

In this example, we define a generic Stack object that can work with different types. The generic type parameter `T` is specified within curly braces `{}` after the object name.

The Stack object has an array of elements of type [T] to store the stack elements, and size and capacity variables to keep track of the stack's size and maximum capacity.

We define methods like push, pop, and isEmpty that work with the generic type T. The push method adds an item of type T to the stack, the pop method removes and returns the top item of type T, and the isEmpty method checks if the stack is empty.

In the main function, we create instances of the Stack object with different types. We create an intStack of type `Stack{I32}` to store integers and a stringStack of type `Stack{String}` to store strings. We can push and pop elements of the respective types using the Stack object's methods.

```Real-World Example: Generic Cache```

Let's consider a real-world example of using generics in Flogram. Suppose you're building a caching system that can cache different types of data, such as images, videos, or user profiles. You can use generics to create a generic Cache object that can handle various data types.

```
object Cache{T}:
    data: [T]
    capacity: I32

    fn evict():
        if not self.data.isEmpty():
            self.data.removeFirst()

    fn constructor(capacity: I32):
        self.capacity = capacity
        self.data = []
        
    fn put(item: T):
        if size(self.data) >= self.capacity:
            self.evict()
            self.data.append(item)
            
    fn get(index: I32) -> (item: T):
        if index >= 0 and index < size(self.data):
            return self.data[index]
        else:
            draw("Invalid index")
        return
                   
fn main():
    imageCache:= Cache{Image}(10)
    imageCache.put(Image("image1.jpg"))
    imageCache.put(Image("image2.jpg"))
    img:= imageCache.get(0)
    draw(img)  # Output: Image("image1.jpg")
    videoCache:= Cache{Video}(5)
    videoCache.put(Video("video1.mp4"))
    videoCache.put(Video("video2.mp4"))
    vid:= videoCache.get(1)
    draw(vid)  # Output: Video("video2.mp4")
```

In this example, we define a generic Cache object that can store and retrieve items of different types. The generic type parameter `T` represents the type of data stored in the cache.

The Cache object has an array data of type [T] to store the cached items and a capacity variable to specify the maximum number of items the cache can hold.

We define methods like put to add an item to the cache, get to retrieve an item by index, and evict to remove the oldest item when the cache reaches its capacity.

In the main function, we create instances of the Cache object for different data types. We create an imageCache of type `Cache{Image}` to cache images and a videoCache of type `Cache{Video}` to cache videos. We can put and get items of the respective types using the Cache object's methods.

<h3>Conclusion</h3>

Generics in Flogram provide a powerful way to write flexible and reusable code. By using generic type parameters, you can create functions and objects that can work with different types, reducing code duplication and increasing code adaptability.

Remember to specify the generic type parameter within curly braces `{}` when defining generic functions or objects, and provide the specific type when using them.

Generics are particularly useful when dealing with collections, data structures, or utility functions that need to handle various types. They allow you to write more expressive and maintainable code, making your programs more robust and easier to understand.

Practice using generics in your Flogram projects to familiarize yourself with their syntax and behavior. Experiment with different scenarios where generics can be applied to improve code reusability and flexibility.

