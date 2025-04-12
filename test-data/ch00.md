1. Understanding the problems in designing complex computer systems and how to manage them
2. Implement process concurrency and inter-process communication
3. Implement multi-threading and intra-process communication

Process - A program in execution

Multi-core chips allow us to run multiple processes run in parallel.

How can we pass data between processes?

Websites: Send req to web server and we get a response in the client (the webpage itself)

**Note**: Entire course is in C

A computer system is a combination of hardware and software (programs and operating systems), working together to perform tasks and processes.

If your chip only has one core, we can still run multiple processes concurrently (sort of)

Time sharing - a certain number of instructions are run for each process and and the data is saved in registers. P1 runs some instructions -> P1 saves state -> P2 runs instructions -> P2 saves state -> repeat until both processes are complete. 

The slices of time each program is run are so fast that it seems as though they are running at the same time.

Note - The operating system will store the state for us!

There is overhead - The cost of context switching.

In reality, even with multi-core machines, we wills still use time sharing. For most modern-day solutions, we use some mix of parallel processes while leveraging time sharing.


Designing a system with several interconnected components adds complexity
- Emergent properties: properties show up only when combining individual components
- Propagation of effects: problems in one component affect other components.
- Incommensurate scaling: not all parts of a system scale at the same rate
- Tradeoffs: what will I sacrifice for more of something else?

When we talk about about complex systems, we must be mindful of the different complexities that come with it.

Computer networks are some of the most complex computer systems

Principles of computer system design help us manage the complexity
- Abstraction - Black box (some input and some expected output)
	- Use unit testing to ensure correct abstraction
- Modularity and Layering
	- Modularization: Break up your code into smaller modules / components
	- Layering:
		- The application layer is the app itself (client)
		- The transport layer (TCP) ensures the message is delivered to the correct application
		- The network layer ensures that we receive the request
		- The link layer connects the different network layers? (maybe)
		- The physical layer sends data bit by bit
- Naming and name resolution
- Caching
- Virtualization 
	- We know there is memory that exists on our machine
	- It acts as though it already has ownership of that memory
	- Allows us to store data in the stack and heap before actually assigning it
	- We are using a machine that acts like it exists on our local machine, but it actually exists in the cloud
- Concurrency

Process concurrency and inter-process communication
- A process represents a program in execution
	- Code + processor state + memory + resource usage
- Multiple processes can run concurrently
	- Single-core machine: uses time sharing
	- Multiple-core machines: using multiple processors
	- Across multiple machines
- Concurrent processes may communicate with each other
	- Using **shared virtual memory** on the same machine
	- By passing messages across machines via **sockets**

When your transport layer needs to know which application needs to receive the message, we use sockets!

Multi-threading and intra-process communication
- A thread of execution is the smallest sequence of programmed instructions that can be managed independently by a scheduler (typically as part of an OS)
- By default, we have one thread of execution: `int main()`
- Several threads may run concurrently
- Important to **synchronize the threads** to protect shared memory
	- Mutexes
	- Condition variables

Note - The more threads we have the more stack memory is required.


User Land: Chunk of memory
1. Stack
2. Heap (can store buffer api's temporarily)
3. Globals / Buffer
4. Executables

Kernel Land: Process Control Block
1. Standard in (points to keyboard)
2. Standard out (points to terminal)
3. Standard error (also points to terminal)
4. File descriptor (low-level file interaction with buffered API's) (temporary)

Buffer API's:
- open, close, read, write, send, receive
If we use file buffer API's the pointer to the buffer is stored in the heap memory.

Each call we make with buffer API's in user land, get passed to kernal land
