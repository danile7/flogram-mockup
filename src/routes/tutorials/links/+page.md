---
title: Links
publishedOn: 1717800000000
author: Matt Flogram
summary: Links in Flogram
published: true
order: 17
---

<h2>Links in Flogram</h2>

<h3>Introduction </h3>


In this lesson, we'll explore the concept of links in Flogram. Links are Flogram's version of pointers, providing a way to reference and manipulate objects stored on the heap. However, unlike traditional pointers, links in Flogram are reference-counted and safe by default, helping prevent common memory-related issues.

<h2>Creating Links </h2>

<h3>To create a link to an object, you can use the Link(object) syntax. Here's an example:</h3>

```
ptLink: Link{Point} = Link(Point(x = 5, y = 5))
```


In this example, we create a link ptLink of type `Link{Point}` that points to a Point object allocated on the heap with coordinates (5, 5).
    
<h3>Accessing Linked Data</h3>

To access the data referenced by a link, you use the at(link) function. It returns the object referenced by the link. Here's an example:

```
fn loadTreasure(chestLink: Link{Chest}) -> (treasure: Treasure):
    chest = at(chestLink)
    treasure = chest.openTreasure()

```

In this example, the loadTreasure function takes a link chestLink of type `Link{Chest}` and retrieves the Chest object referenced by the link using at(chestLink). It then opens the chest and retrieves the treasure inside.

<h3>Passing Links</h3>

Links can be passed as function parameters and returned from functions. This allows you to efficiently share and manipulate objects across different parts of your program. Here's an example:

```
fn shareMap(map: Map) -> (mapLink: Link{Map}):
    mapLink = Link{Map}(map)
```

In this example, the shareMap function takes a Map object and creates a link mapLink to share the map with others.

<h3>Reference Counting and Safety</h3>

Flogram's links are reference-counted, meaning that the runtime keeps track of the number of references to an object. When the reference count of an object reaches zero, indicating that there are no more links pointing to it, the object is automatically deallocated, freeing up memory.

Furthermore, Flogram's compiler performs static analysis to detect potential memory-related issues, such as circular references. If a circular reference is found, the compiler will raise an error, prompting you to mark the links involved as safe using the cycle keyword.

Here's an example of marking a link as safe:

```
object Node{T}: 
    value: T 
    cycle nextNode:= Maybe{Link{Node{T}}}.None

fn constructor(value: T):
    self.value = value
```

In this example, the Node object contains a link nextNode that points to another Node object, forming a potential circular reference. By adding the cycle keyword before the link declaration, you acknowledge that you have checked for cycles and deem it safe.

<h3>Real-World Example: Building a Linked List</h3>

Let's consider a real-world example of using links in Flogram to build a linked list. A linked list is a data structure that consists of a sequence of nodes, where each node contains a value and a link to the next node.

```
object LinkedList{T}:
  head: Maybe{Link{Node{T}}}

  fn constructor():
    self.head = Maybe{Link{Node{T}}}.None

  fn append(value: T):
    newNode:= Node{T}(value) 

    if self.head == Maybe{Link{Node{T}}}.None:
      self.head = Link{T}(newNode) 
    else:
      currentNode:= self.head

      while currentNode.nextNode != Maybe{Link{Node{T}}}.None:
        currentNode = currentNode.nextNode
        currentNode.nextNode = Link(newNode)

  fn printValues():
    currentNode:= at(self.head)

    while currentNode != Maybe{Link{Node{T}}}.None:
      draw("{currentNode.value}, ") 
      if currentNode.nextNode != Maybe{Link{Node{T}}}.None:
        currentNode = currentNode.nextNode
      else:
        currentNode = Maybe{Link{Node{T}}}.None

fn main(): 
  linkedList:= LinkedList{String}() 
  linkedList.append("Apple")
  linkedList.append("Banana")
  linkedList.append("Orange")
  draw("Linked List Values:")

  linkedList.printValues()

```

In this example, we define a LinkedList object that represents the linked list. It has a head link that points to the first node in the list.

The LinkedList object provides methods like append to add a new value to the end of the list and printValues to print all the values in the list.

In the main function, we create an instance of LinkedList{String} to store strings. We append the values "Apple", "Banana", and "Orange" to the list using the append method. Finally, we call the printValues method to print all the values in the linked list.

This example demonstrates how links in Flogram can be used to build data structures like linked lists. By using links, we can efficiently connect nodes and traverse the list without the need for manual memory management.

<h3>Conclusion</h3>

Links in Flogram provide a safe and efficient way to work with references to objects allocated on the heap. They are reference-counted and checked for safety at compile-time, helping prevent common memory-related issues.

By using links, you can create more expressive and flexible code, allowing you to pass around and manipulate objects across different parts of your program. Flogram's static analysis and cycle keyword help ensure the safety of your code when dealing with potential circular references.

Remember to use links judiciously and consider the ownership and lifetime of the objects you are referencing. By understanding and leveraging links effectively, you can write more robust and efficient programs in Flogram.

Practice using links in your Flogram projects to familiarize yourself with their syntax and behavior. Experiment with different scenarios where links can be applied to improve code organization and performance.
