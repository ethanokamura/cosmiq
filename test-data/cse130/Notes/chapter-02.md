# 2.1 Fundamentals of Abstractions

Three fundamental Abstractions

1. Memory
2. Interpreter
3. Communication Link

---

## Memory

Also called **storage**, is the system component that remembers values for use in computation.

Memory technology is wide-ranging

- Volatile (temporary) vs Non-volatile
- Tradeoff between latency and cost

**Note**: All memory devices fit a simple abstract model that has two operations, WRITE and READ

Memory devices read and write contiguous bits

- bytes, words, blocks, record, segment, or file

Two useful properties for a memory are:

1. Read/write coherence - result of the READ of a named cell is always the same as the most recent WRITE to that cell
2. Before-or-after atomicity - the result of every READ or WRITE is as if that READ or WRITE occurred either completely before or completely after any other READ or WRITE
   - All or nothing

There are several threats to maintaining the above properties

1. Concurrency of processes or threads
2. Remote storage (amplifies delays in READ/WRITE operations)
3. Replicated storage (to improve readability)

---

## Interpreter

Interpreters are the active elements of a computer system; they perform the actions that constitute computations.

Interpreters are also wide-ranging and layered

- ie: human user generating request in a calendar program -&gt; java interpreter -&gt; byte code interpreter layer -&gt; hardware

They too can be described with a simple abstraction

- Instruction reference: where is the next instruction?
- A repertoire - what actions can be performed?
- An environment reference - Where is the environment? (current state on which the interpreter should perform the action).

Many systems have **more than one interpreter**.

Multiple interpreters are usually asynchronous, which means that they run on separate, uncoordinated, clocks

As a result, they may progress at different rates, even if they are nominally identical and running the same program.

In designing algorithms that coordinate the work of multiple interpreters, one usually assumes that there is no fixed relation among their progress rates and therefore that there is **no way to predict the relative timing of instructions** they they issue

ie: Case of multi-threaded programs

---

## Communication Link

A communication link provides a way for information to move between physically separated components.

Again, a wide range of technologies with simple abstractions

- SEND
- RECIEVE

The semantics of SEND and RECEIVE are typically quite different from those associated with READ and WRITE due to complications of communication links:

- Unpredictable time to complete SEND or RECEIVE operations
- Hostile environment that threatens the integrity of data
- Loss of data
- Asynchronous and out of order arrival of data