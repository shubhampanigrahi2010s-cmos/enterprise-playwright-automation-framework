# Day 7 - JavaScript Objects & Classes

## Part 1: JavaScript Objects

### What are Objects?
Objects are collections of key-value pairs that allow you to group related data and functionality together. They are one of the fundamental data structures in JavaScript.

### Creating Objects

#### Method 1: Object Literal (Most Common)
The simplest and most common way to create objects using curly braces. You define properties and their values directly inside the braces.

#### Method 2: Using new Object()
A more verbose way to create an empty object first, then add properties one by one. Less commonly used in modern JavaScript.

#### Method 3: Object.create()
Creates a new object with a specified prototype. Useful when you want one object to inherit properties from another.

### Accessing Object Properties

#### Dot Notation
The most common way to access properties when you know the property name at the time of writing code. Simple and readable.

#### Bracket Notation
Used when property names are dynamic (stored in variables) or contain special characters. More flexible but slightly less readable.

#### Checking Property Existence
Use the 'in' operator to check if a property exists in an object before trying to access it. Returns true or false.

### Modifying Objects

#### Adding Properties
You can add new properties to existing objects at any time by simply assigning a value to a new property name.

#### Updating Properties
Change the value of existing properties by reassigning them. The property name stays the same, only the value changes.

#### Deleting Properties
Use the delete operator to completely remove a property from an object. The property will no longer exist.

### Object Methods
Methods are functions stored as object properties. They can access other properties of the same object using the 'this' keyword.

#### Method Chaining
When methods return 'this' (the object itself), you can chain multiple method calls together in a single statement.

### Nested Objects
Objects can contain other objects as property values, creating hierarchical data structures. Access nested properties by chaining dot or bracket notation.

#### Optional Chaining
Modern syntax that safely accesses nested properties. If any property in the chain is undefined, it returns undefined instead of throwing an error.

### Object Destructuring
A convenient syntax for extracting multiple properties from an object into individual variables in a single statement.

#### Renaming During Destructuring
You can extract a property but assign it to a variable with a different name using colon syntax.

#### Default Values
Provide fallback values that are used if the property doesn't exist in the object.

#### Nested Destructuring
Extract values from nested objects in a single destructuring statement.

### Useful Object Methods

#### Object.keys()
Returns an array containing all the property names (keys) of an object.

#### Object.values()
Returns an array containing all the property values of an object.

#### Object.entries()
Returns an array of [key, value] pairs, useful for iterating over objects.

#### Object.assign()
Merges multiple objects together. Properties from later objects override earlier ones if they have the same name.

#### Spread Operator (...)
Modern alternative to Object.assign(). Spreads all properties from one or more objects into a new object.

## Part 2: JavaScript Classes

### What are Classes?
Classes are blueprints or templates for creating multiple objects with the same structure and behavior. They provide a cleaner, more organized way to create objects compared to constructor functions.

### Basic Class Syntax

#### Constructor Method
A special method that runs automatically when you create a new instance. Used to initialize object properties with values.

#### Instance Methods
Functions defined inside a class that can be called on any instance created from that class.

#### Creating Instances
Use the 'new' keyword followed by the class name to create a new object from the class blueprint.

### Getters and Setters

#### Getters
Methods that allow you to read a property as if it were a simple property, but run code when accessed. Useful for computed values.

#### Setters
Methods that allow you to set a property as if it were a simple assignment, but run validation or other logic before setting the value.

#### Private Properties Convention
Using underscore prefix for property names signals to developers that these properties should not be accessed directly from outside the class.

### Class Inheritance

#### Parent Class (Base Class)
A class that contains common functionality that will be shared by child classes.

#### Child Class (Derived Class)
A class that extends a parent class using the 'extends' keyword. Inherits all properties and methods from the parent.

#### super() Method
Calls the parent class constructor. Must be called in child constructor before using 'this'.

#### Method Overriding
Child classes can replace parent methods with their own implementation while keeping the same method name.

#### Calling Parent Methods
Use super followed by the method name to call the parent's version of a method from within the child class.

### Static Methods and Properties

#### Static Methods
Methods that belong to the class itself, not to instances. Called on the class name, not on objects created from the class.

#### When to Use Static
Use static methods for utility functions that don't need access to instance data, like helper functions or factory methods.

### Private Fields (Modern JavaScript)

#### Private Fields
Properties that start with # symbol and can only be accessed from inside the class. Truly private, not just by convention.

#### Private Methods
Methods that start with # and can only be called from other methods inside the same class.

#### Why Use Private Fields
Protects internal state from being modified in unexpected ways. Provides true encapsulation and data hiding.

## Part 3: Objects vs Classes

### When to Use Objects

#### Single Configuration
When you need just one configuration object with settings that won't be replicated.

#### Simple Data Grouping
When bundling related data together without needing methods or behavior.

#### One-Time Use
Temporary data structures that don't need to be reused or replicated.

#### Just Data, No Behavior
When you're only storing values and don't need functions to operate on that data.

### When to Use Classes

#### Creating Multiple Similar Instances
When you need to create many objects with the same structure and behavior.

#### Need Inheritance
When you have a hierarchy of related types that share common functionality.

#### Encapsulation Required
When you need to protect internal data and control how it's accessed and modified.

#### Data Plus Behavior
When your data needs associated methods that operate on that data.

### Decision-Making Guide

**Use Objects if:**
- You need ONE thing
- It's just data
- No methods needed
- No inheritance needed
- Simple and straightforward

**Use Classes if:**
- You need MANY similar things
- It has behavior (methods)
- You need privacy/encapsulation
- You need inheritance
- Building reusable components

## Key Concepts Summary

### Objects
- Collections of key-value pairs
- Flexible and easy to create
- Good for simple data structures
- Can be nested for complex data
- Destructuring for easy extraction

### Classes
- Templates for creating objects
- Support inheritance and polymorphism
- Provide encapsulation with private fields
- Include constructors for initialization
- Methods for object behavior
- Static methods for class-level utilities

### Best Practices
- Use object literals for simple, one-off data structures
- Use classes when you need multiple instances with shared behavior
- Keep objects simple and classes focused on single responsibilities
- Use descriptive names for properties and methods
- Leverage destructuring for cleaner code
- Use private fields to protect internal state
- Use getters and setters for controlled property access

## Practical Applications

### Objects Common Use Cases
- Configuration settings
- API response data
- Function parameters (options objects)
- Simple data transfer objects
- Temporary data grouping

### Classes Common Use Cases
- Page objects in test automation
- User models with authentication methods
- Test case runners with lifecycle methods
- Data models with validation
- Reusable UI components
- Service classes with API methods

## Summary
Objects and classes are fundamental to JavaScript programming. Objects are perfect for simple data structures and one-off configurations, while classes excel at creating reusable, organized code with multiple instances. Understanding when to use each is crucial for writing clean, maintainable code.