## What is a System:
A set of **interconnected components** that has a specific behavior observed at the **interface** with its **environment**
- Components - things under consideration - depends on the purpose and granularity
	- looking at an aircraft as a flying object vs a passenger-handling system
	- aircraft designer's POV
- Environment: things not under consideration
	- Solar system and the rest of the universe
- Interface: Interaction between the system and environment
	- API's
	- displays, keyboards, speakers for a PC

Computer - system
User - Environment
Monitor - Interface

---
## Complexity
A system has a large number of components or large number of interconnections can be **difficult to understand the complexity**.
- No unified measure of complexity.
- Complexity can limit the system we build.

It is important to understand the common issues of complex systems, signs of complexity, sources of complexity, and how to migrate complexity.

Common issues:
1. Emergent Properties
2. Propagation of Effects
3. Incommensurate Scaling
4. Trade-offs

---
## Emergent Properties
Properties held by a system that is not defined by any of its individual components.

On it's own, there were no issues, but when it is being used, some issues may emerge. Can require retrofitting to these issues.

Example: Conway's Game of Life - zero player game
- World is made up of cells that can either be alive or dead. Once the game starts, the rules are applied
- Emergent properties appear when your rules can **interact** with themselves in **unpredictable** ways

--- 

## Propagation of Effects
Problems in one component can ripple through and impact other components.

Example: Interconnection of several nodes
- If one node fails, it causes failures to other subsequent nodes
- Can lead to changes in routing tables throughout the network

**Note**: There are no small changes in a large system

---

## Incommensurate Scaling
May be components that need to be scaled more than other components.

Different parts of a system don't scale proportionally as the system grows, leading to performance issues or unexpected behaviors.

Example: With SQL, we store data in different tables. If we increase the size of the database, the time to query is not proportional to the scaling the database (it can take much longer). The query time will increase faster than the database size.

Incommensurate scaling shows up in most systems. It is usually the factor that limits the size or speed range that a single system design can handle.

---

## Trade-Offs
Goals of a system can conflict with each other.

There is a limited amount of some form of goodness in the universe and the design challenge is first to maximize that goodness, second to avoid wasting it, and third to allocate it to the places where it will help the most.

Example: Time and space requirements of some sorting algorithm
- Merge sort scaled wall $(O(n\log(n)))$ but its recursive implementation can impose a burden on memory.
- Insertion sort does not scale well $(O(n^2))$ but it may be the most efficient for small or semi-sorted data sets.

Example: Spam filters
- Adding too many rules could cause you to mark important emails as spam.

---

## Signs of Complexity
1. Large number of components
	- Sheer size of a system certainly affects our view of whether or not a system
2. Large number of interconnections
	- Even a few components may be interconnected in an unmanageably large number of ways
	- ie a graph where each node has 5 connections vs a linked list with the same number of nodes, but each node has 1 or 2 connections.
3. Many irregularities
	- By themselves, a large number of components and interconnections may still represent a simple system, if the components are repetitive and interconnections are regular
	- Lack of regularity, as show by exceptions or.by non-repetitive interconnections, suggest complexity
4. A long term description
	- The best available description of a system may consist of a long laundry list of properties rather than a short, systematic specific of all aspects
	- Kolmogorov complexity - length of the shortest specification
	- May just be a reflection of the previous 3 signs
5. A large team of people
	- A fundamental issue in any system is whether or not it is is simple enough for a single person to understand all of it
	- If not, it is a complex system because its description, construction, and maintenance requires a team.

---
## Sources of Complexity
1. Cascading and interacting requirements
	- Each requirement, by itself, may seem straightforward and may appear to add only easily tolerable complexity
	- Problem: the accumulation of many requirements adds not only their individual complexity but also complexities from their interactions.
	- Meeting many requirements with a single design is sometimes expressed as a need generality
	- Generality contributes to complexity so it comes with a trade-off and the designer must use good judgement to decide how much of the generality is actually wanted
	- Example: a single tool for various tasks
	- We must avoid excessive generality - if its good for everything, its good for nothing.
2. Maintaining High Utilization
	- We desired high performance for our systems
	- Whenever a scarce resource is involved, an effort arises to keep its utilization high
	- Example: pipelining packets in a network as opposed to send and wait protocol to improve link utilization
		- However, we need to hold more data to track which packets we sent and when.
	- Law of diminishing returns: The more on improves some measure of goodness, the more effort the next improvement will require.

---

## How do we mitigate complexity
1. Modularity 
2. Abstraction
3. Layering
4. Hierarchy

---

## Modularity
Divide and conquer: design a system as a collection of interacting subsystems, called modules.

Modularity allows development of a smaller unit:
- Reduces the number of components and interactions
- Reduces the complexity
- Reduces the number of bugs

Allows incremental improvements in the system without rebuilding it completely
- Replace the module with a better one
- Replace a broken module

Modularity controls the complexity caused by change.

Note: It is easier to change the module than the modularity

Example: consider debugging a large program with N statements:
1. 1 Module
	- \# lines of code = $N$
	- \# bugs is proportional to $N$
	- Debugging time is proportional to \# lines $\times$ \# bugs = $N^2$
2. $K$ modules
	- \# lines per module = $N \div K$
	- \# of bugs per module is proportional to $N \div K$
	- Debugging time is proportional to $N \div K ^2 = N^2 \div K$ 

If you have $K$ modules, you could potentially reduce the amount of time to debug by a factor of $k$

Example: If you have a a program that has 3 functions, you can create subprocesses to execute a single function.

---

## Abstraction
For the numerical calculation of debugging time to hold true, there must be no propagation of effects from one module to another

The best divisions usually follow natural or logical boundaries
- Characterized by fewer interactions among modules and by less propagation of effects
- More generally, they are characterized by the ability of any module to treat all the others entirely on the basis of their external specifications (behavior) without need for knowledge about what goes on inside -- abstraction

Abstraction is the separation of interface from internals, of specific from implementation

Abstraction nearly always accompanies modularity

Treats each module like a black box. If modules depend on other modules - it is not considered a good abstraction.

You cannot have abstraction without modularity and vice versa.


---

## Layering -- INCOMPLETE
- Divide modules into different layers (each layer can include one or more modules). You limit interactions between modules between layers (only in the same layer or possibly adjacent layers).

An example using the network stack: the application layer does not need to know how the transport layer works, but still needs some interaction to get the data. Here you only interact with the module above or below you.

---

Question: is this like functions -> objects -> program -> applicatioin?
## Hierarchy
- Also used to reduce interconnections
	- Combine small groups of modules into small stable subsystems
	- Combine small subsystems into large subsystems
	- Combine large subsystems into systems
- Each module can interact only with members of its own subsystem, except for an interface module that also interacts with other members of a subsystem at the next higher level of hierarchy.
	- Limit the visibility of each level of abstraction hierarchy to limit complexity.

---

## Tying it Together: Names Make Connections
- The four techniques discussed provide ways of dividing things up and placing the resulting modules in a suitable relation to one another
- We need a way of connecting these modules: naming
	- One module names another module that it intends to use
- Naming helps us identify things in an independent way and allows
	- Postponing of decisions
	- Easy replacement of one module with a better one
	- Sharing of modules

---

## Computer systems are the same but different
There are at least two significant ways in which computer systems differ from every other kind of system with which designers have experience:
- The complexity of a computer system is not limited by physical laws
- The rate of change of computer system technology is unprecedented

Modest physical limits in hardware and very distant physical limits in software together give us the opportunity to create systems of unimaginable - and unmanageable - complexity, and the rapid pace of tech change ... 

---

## Coping with complexity
In the real, fast changing world of computer systems, it is hard to choose the right modularity abstraction layering and hierarchy from the vast sea of possibilities

Designers of computer systems have developed and refine one additional technique to cope with complexity: iteration
- Start by building a simple, working system that meets only a modest subset of the requirements and then evolve that system in small simple steps to gradually encompass more and more of the full set of requirements.

Finally, keep it simple so you can see what you are doing!

Well commented / documented code.