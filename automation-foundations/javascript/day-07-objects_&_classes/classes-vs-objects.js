// Print section header to clearly separate this topic
console.log("=== OBJECTS VS CLASSES ===\n"); 

// ========================================== 
// USE OBJECTS WHEN: 
// ========================================== 

// 1. Single configuration - When you need ONE configuration object
// Objects are perfect for storing related settings that won't change structure
const config = { 
    timeout: 30000,     // Timeout value in milliseconds
    retries: 3,         // Number of retry attempts
    headless: true      // Boolean flag for headless mode
}; 
// Why object: You only need ONE config, not multiple copies with methods

// 2. Simple data grouping - When bundling related data together
// Objects are great for grouping related properties without behavior
const testResult = { 
    name: 'Login Test',   // Test name as string
    status: 'passed',     // Test status as string
    duration: 2.5         // Test duration in seconds
}; 
// Why object: Just data, no methods or behavior needed

// 3. One-time use - When you need data structure used once
// Objects are ideal for temporary data that doesn't need replication
const credentials = { 
    username: 'test@example.com',  // User's email/username
    password: 'pass123'             // User's password
}; 
// Why object: Used once for login, doesn't need to be a reusable template

// Display the simple objects we created above
console.log("Using objects for simple data:"); 
console.log("Config:", config);           // Show entire config object
console.log("Result:", testResult);       // Show entire testResult object

// ========================================== 
// USE CLASSES WHEN: 
// ========================================== 

// 1. Creating multiple similar instances - Need same structure repeated
// Classes provide a blueprint/template for creating many similar objects
class User { 
    // Constructor defines what properties each User instance will have
    constructor(username, email, role) { 
        this.username = username;         // Assign username parameter to instance
        this.email = email;               // Assign email parameter to instance
        this.role = role;                 // Assign role parameter to instance
        this.createdAt = new Date();      // Automatically set creation timestamp
    } 
    
    // Method that all User instances can use
    // Returns formatted string with user information
    getInfo() { 
        return `${this.username} (${this.role})`;  // Template literal with username and role
    } 
} 

// Create three separate User instances from the same class blueprint
// Each instance has same structure but different data
const user1 = new User('john', 'john@test.com', 'admin');  // Create first user
const user2 = new User('jane', 'jane@test.com', 'user');   // Create second user
const user3 = new User('bob', 'bob@test.com', 'user');     // Create third user

// Why class: Need multiple users with same properties and methods
// Class is more efficient than creating 3 separate object literals

console.log("\nUsing classes for multiple instances:"); 
console.log(user1.getInfo());  // Call getInfo method on user1 instance
console.log(user2.getInfo());  // Call getInfo method on user2 instance
console.log(user3.getInfo());  // Call getInfo method on user3 instance

// 2. Need inheritance - When you have shared behavior across related types
// Classes allow creating hierarchies where children inherit from parents

// Parent class - contains common behavior for all animals
class Animal { 
    // Constructor accepts name that all animals will have
    constructor(name) { 
        this.name = name;  // Store animal's name
    } 
    
    // Generic speak method that child classes can override
    speak() { 
        // Template literal to create message with animal's name
        console.log(`${this.name} makes a sound`); 
    } 
} 

// Child class - inherits from Animal but adds dog-specific behavior
class Dog extends Animal { 
    // Override parent's speak method with dog-specific implementation
    speak() { 
        console.log(`${this.name} barks`);  // Dogs bark instead of generic sound
    } 
    // Dog inherits constructor and name property from Animal
} 

// Another child class - inherits from Animal with cat-specific behavior
class Cat extends Animal { 
    // Override parent's speak method with cat-specific implementation
    speak() { 
        console.log(`${this.name} meows`);  // Cats meow instead of generic sound
    } 
    // Cat inherits constructor and name property from Animal
} 

// Why classes: Need inheritance hierarchy (Animal -> Dog/Cat)
// Can't achieve this shared behavior structure with plain objects

console.log("\nUsing classes for inheritance:"); 
// Create dog instance - inherits from Animal but uses Dog's speak method
const dog = new Dog('Rex'); 
// Create cat instance - inherits from Animal but uses Cat's speak method
const cat = new Cat('Whiskers'); 

dog.speak();  // Calls Dog's overridden speak method -> "Rex barks"
cat.speak();  // Calls Cat's overridden speak method -> "Whiskers meows"

// 3. Encapsulation and methods - When you need to protect internal state
// Classes allow hiding internal data and controlling how it's accessed

class Counter { 
    // Private field (# prefix) - cannot be accessed from outside the class
    // This protects the count from being directly modified
    #count = 0; 
    
    // Public method to increase count
    // Only way to increment the private #count field
    increment() { 
        this.#count++;  // Access private field with # prefix
    } 
    
    // Public method to decrease count
    // Only way to decrement the private #count field
    decrement() { 
        this.#count--;  // Access private field with # prefix
    } 
    
    // Public method to read count value
    // Only way to read the private #count field
    getValue() { 
        return this.#count;  // Return current count value
    } 
    // Note: There's no direct way to set #count to arbitrary value
    // This ensures count can only change by increment/decrement
} 

// Why class: Need to protect internal state (#count)
// Objects can't have truly private properties like this

console.log("\nUsing classes for encapsulation:"); 
const counter = new Counter();  // Create new Counter instance
counter.increment();            // Increase count by 1 (now 1)
counter.increment();            // Increase count by 1 (now 2)
console.log("Count:", counter.getValue());  // Read count value: 2

// Cannot do: counter.#count = 100  // ERROR! Private field not accessible
// Cannot do: counter.#count         // ERROR! Cannot read private field
// This protection is only possible with classes, not plain objects

// ========================================== 
// SUMMARY: OBJECTS VS CLASSES
// ========================================== 

/*
USE OBJECTS WHEN:
✓ Simple data structures
✓ Configuration settings
✓ One-time data grouping
✓ No methods needed
✓ No inheritance needed
✓ Just storing related values

Example: const point = { x: 10, y: 20 };

USE CLASSES WHEN:
✓ Creating multiple similar instances
✓ Need inheritance hierarchy
✓ Need private/protected data
✓ Methods that operate on data
✓ Need constructors for initialization
✓ Building reusable components

Example: class Rectangle { constructor(width, height) {...} }

RULE OF THUMB:
- If you need ONE thing → use Object
- If you need MANY similar things → use Class
- If it's just data → use Object
- If it has behavior (methods) → use Class
- If you need privacy → use Class
- If you need inheritance → use Class
*/