# Node.js & Express Learning Notes

## IPv4 Address vs Domain Name

**Example:**
```
Client: https://next.ashikdev.com/success
```

**URL Structure:**
- **Protocol** // **Domain Name** / **Resource**
- Example: `https://139.59.19.134:443`

---

## HTTP Requests & Responses

**HTTP Methods:**
- GET
- POST
- PATCH
- PUT
- DELETE

**Response Status Codes:**
- 200 (Success)
- 404 (Not Found)
- 500 (Server Error)

---

## Frontend vs Backend vs Database

### Architecture Components:
- **Load Balancer** - Distributes traffic
- **Vertical Scaling** - Increase server capacity
- **Horizontal Scaling** - Add more servers

### Database Architecture:
- **Master Database** - Handles write operations
- **Slave Database** - Handles read operations

---

## Static Website vs Dynamic Website

### Static Website
- Technologies: HTML, CSS, JavaScript
- Delivered directly to browser
- Pre-built files

### Dynamic Website
- Technologies: PHP, Python, Node.js
- Processed on server
- Generated on-the-fly

### Rendering Types:
1. **Client-Side Rendering** - Browser renders
2. **Server-Side Rendering** - Server renders
3. **Static Site Generation** - Pre-built static files

---

## JavaScript Engines by Browser

| Browser | Engine |
|---------|--------|
| Chrome | V8 |
| Firefox | SpiderMonkey |
| Safari | JavaScriptCore (Nitro) |

---

## JavaScript Runtime in Browser

**Core Components:**
- Call Stack
- Heap Memory

**Web APIs:**
- DOM (Document Object Model)
- Fetch API
- Callback Queue
- Timers
- Click Events

---

## Why Node.js is Popular

### Advantages:
- ✓ Server-side JavaScript execution
- ✓ Highly scalable backend applications
- ✓ Single-threaded, event-driven architecture
- ✓ Non-blocking I/O operations
- ✓ Perfect for real-time applications:
  - Chat applications
  - Gaming applications
  - Live streaming

### Disadvantages:
- ✗ Not ideal for CPU-intensive tasks
- ✗ Challenging for heavy computational work with multiple threads
- ⚠ Solution: Use Worker Threads for CPU-bound operations

---

## Event Loop vs Thread Pool

### Event Loop
- **What it is:** Core mechanism of Node.js that handles asynchronous operations
- **How it works:**
  1. Checks the call stack
  2. Processes callbacks from the callback queue
  3. Executes timers and I/O operations
  4. Repeats in phases (timers → pending callbacks → poll → check → close)
- **Single-threaded:** Runs on main thread
- **Best for:** I/O operations, network requests, file handling

### Thread Pool (libuv)
- **What it is:** Background worker threads managed by libuv library
- **How it works:**
  - Handles CPU-intensive operations
  - Executes heavy computations off main thread
  - Default size: 4 threads (configurable)
- **Multi-threaded:** Uses multiple threads
- **Best for:** File system operations, DNS lookups, some crypto operations

### Key Differences:

| Aspect | Event Loop | Thread Pool |
|--------|-----------|------------|
| **Threads** | Single main thread | Multiple background threads |
| **Purpose** | Coordinate async operations | Handle heavy computations |
| **Use Case** | I/O, callbacks, timers | CPU-bound tasks |
| **Blocking** | Non-blocking | Offloads blocking work |

---

## Node.js Architecture

### Event-Driven Architecture

Node.js is built on an event-driven model, which makes it highly efficient for handling concurrent operations.

### Key Components:

**1. Event Emitter**
- Special object that emits events
- Allows objects to communicate asynchronously
- Core to Node.js architecture

**2. Event Listener**
- Function that listens for specific events
- Executes when an event is emitted
- Can be attached to Event Emitters

**3. Event Loop**
- Continuously monitors for events and callbacks
- Executes callbacks in the correct order
- Manages asynchronous operations

**4. Process & Threads**
- **Process:** Entire Node.js application running
- **Main Thread:** Executes JavaScript code
- **Worker Threads:** Background threads for CPU-intensive tasks
- **Event Loop Thread:** Handles async operations

---

## Single-Threaded Server vs Multi-Threaded Server

### Single-Threaded Server (Node.js)

**How it works:**
- One main thread handles all requests
- Uses event loop for asynchronous operations
- Non-blocking I/O prevents thread blocking

**Advantages:**
- ✓ Lower memory consumption (no thread overhead)
- ✓ Simpler to develop and debug
- ✓ Excellent for I/O-heavy applications
- ✓ Scales horizontally easily
- ✓ Fewer context switches

**Disadvantages:**
- ✗ CPU-intensive tasks block the event loop
- ✗ Single core utilization by default
- ✗ Cannot leverage multiple CPU cores directly

### Multi-Threaded Server (Traditional: Java, PHP)

**How it works:**
- Creates a new thread for each incoming request
- Each thread handles one request independently
- Threads may be reused from a thread pool

**Advantages:**
- ✓ Can handle CPU-intensive operations
- ✓ Utilizes multiple CPU cores efficiently
- ✓ Straightforward request handling per thread

**Disadvantages:**
- ✗ High memory consumption (each thread needs memory)
- ✗ More complex context switching overhead
- ✗ Thread synchronization issues
- ✗ Difficult to scale to thousands of connections
- ✗ Harder to debug race conditions

### Comparison Table:

| Feature | Single-Threaded (Node.js) | Multi-Threaded (Java/PHP) |
|---------|---------------------------|--------------------------|
| **Memory Usage** | Low | High |
| **Scalability** | Very High | Limited |
| **CPU Utilization** | Single core (default) | Multiple cores |
| **Concurrency** | Event-based | Thread-based |
| **Best For** | I/O operations | CPU tasks |
| **Context Switch** | Minimal | Heavy |
| **Learning Curve** | Moderate | Steep | 

---

## Is Node.js Multi-Threaded?

### The Simple Answer: **Single-Threaded by Default, But Not Completely**

Node.js appears single-threaded to the developer, but it's actually a hybrid system:

### JavaScript Execution: Single-Threaded ✓
- Your JavaScript code runs on **ONE main thread**
- Event loop processes callbacks sequentially
- No concurrent code execution in JavaScript

### Behind the Scenes: Multi-Threaded (Hidden)
- **libuv Thread Pool** manages background threads
- Default: 4 threads (configurable via `UV_THREADPOOL_SIZE`)
- Handles:
  - File system operations
  - DNS lookups
  - Crypto operations
  - Some compression tasks
- **You don't directly control these threads**

### Optional: Add More Threads Manually
- **Worker Threads module** allows true parallelism
- For CPU-intensive tasks
- You create and manage them explicitly
- Can utilize multiple CPU cores

### Visual Breakdown:

```
┌─────────────────────────────────────────┐
│      Node.js Application                │
├─────────────────────────────────────────┤
│                                         │
│  🟢 Main Thread (Your JavaScript Code) │
│     - Single-threaded                   │
│     - Event loop                        │
│     - Processes callbacks sequentially  │
│                                         │
│  🟡 libuv Thread Pool (Hidden)          │
│     - 4 threads by default              │
│     - File I/O, DNS, Crypto             │
│     - Automatic management              │
│                                         │
│  🟠 Worker Threads (Optional)           │
│     - You create manually               │
│     - CPU-intensive tasks               │
│     - True parallelism                  │
│                                         │
└─────────────────────────────────────────┘
```

### Key Takeaway:

**Node.js ≠ Traditional Multi-Threaded Server (Java/PHP)**

Node.js = Single-threaded by default + Hidden thread pool for I/O + Optional Worker Threads for heavy computing

This hybrid approach gives Node.js the best of both worlds:
- ✓ Simplicity of single-threaded programming
- ✓ Efficiency of asynchronous I/O
- ✓ Power of multi-threading when needed

---

## Browser Runtime vs Node.js Runtime

### Global Objects

| Aspect | Browser Runtime | Node.js Runtime |
|--------|-----------------|-----------------|
| **Global Object** | `window` | `global` |
| **Module System** | ESM (built-in) | CommonJS or ESM |
| **DOM Access** | ✓ Available | ✗ Not available |
| **File System** | ✗ Not available | ✓ Available |

### Scope and Variables

**Both Browser and Node.js support:**
- Block scope: `var`, `let`, `const`
- Function scope
- IIFE (Immediately Invoked Function Expression): `(function(){})()`

### Code Example:

```javascript
// Browser Runtime
console.log(window);        // Global object
console.log(document);      // DOM access

// Node.js Runtime
console.log(global);        // Global object
console.log(module);        // Module system
```

---

## Module Systems in JavaScript

### Overview

JavaScript originally had **no built-in module system**. Different module systems emerged over time:

### 1. CommonJS (Node.js Native)

**When:** Early Node.js standard
**Syntax:**
```javascript
// Export
module.exports = { greet: () => 'Hello' };

// Import
const myModule = require('./myModule');
```

**Characteristics:**
- Synchronous loading
- Used in Node.js by default (until recently)
- `require()` and `module.exports`
- Not part of ES standard

### 2. ESM (ECMAScript Module) - Modern Standard

**When:** ES6 (2015) and later
**Syntax:**
```javascript
// Export
export const greet = () => 'Hello';
export default { /* ... */ };

// Import
import { greet } from './myModule.js';
import defaultExport from './myModule.js';
```

**Characteristics:**
- Asynchronous loading
- Built into JavaScript standard
- `import` and `export`
- Supported in browsers and modern Node.js
- Tree-shakeable (dead code elimination)

### Key Differences:

| Feature | CommonJS | ESM |
|---------|----------|-----|
| **Syntax** | `require()` / `module.exports` | `import` / `export` |
| **Loading** | Synchronous | Asynchronous |
| **Built-in** | Node.js only | JavaScript standard |
| **Tree-shaking** | No | Yes |
| **Browser Support** | No (native) | Yes |
| **Node.js Support** | Yes (default) | Yes (with .mjs or type: "module") |

### Using ESM in Node.js:

**Method 1:** Rename file to `.mjs`
```
myModule.mjs
```

**Method 2:** Add to `package.json`
```json
{
  "type": "module"
}
```  "# learn-nodejs-commonJS-ESM" 
