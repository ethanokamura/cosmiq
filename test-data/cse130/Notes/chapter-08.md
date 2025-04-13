# Chapter 8 - Exceptional Control Flow

The program counter assumes a sequence of values:
$$
a_0,\; a_1 \; ...\; a_{n-1}
$$
where each $a_k$ is the address of some corresponding instruction $I_k$. 

Each transition $a_k \rightarrow a_{k+1}$ is called a **control transfer**. A sequence of such control transfers is called the _flow of control_ or **control flow** of the processor.

Control flows are "smooth" when the current and next instructions are _adjacent_. Typically abrupt changes (where the current and next instructions are not adjacent) to the "smooth" control flow are caused by jumps, calls and returns.

Examples of abrupt changes to the control flow:
1. Change in state
2. Hardware timer goes off 
3. Packets arrive at the network adapter (needing to be stored in memory)
4. Parent processes that create child processes must be notified when their children terminate

Abrupt changes are referred to as _exceptional control flow_ (**ECF**). ECF occurs at all levels of a computer system.

ECF is the basic mechanism that the operating systems use to implement I/O, processes, and virtual memory.

Applications request services from the operating system by using a form of ECF known as a _trap_ or _system call_. For example, writing data to a disk, reading data from a network, creating or terminating processes, etc.

ECF is a basic mechanism for implementing concurrency in computer systems (more on this in Chapter 12). Examples of concurrency include:
- An exception handler that interrupts the execution of an application program
- Processes and threads whose execution overlap in time
- A signal handler that interrupts the execution of an application program.

Languages like C++ provide software exception mechanisms via `try`, `catch` and `throw` statements. Software exceptions allow the program to make _nonlocal_ jumps (jumps that violate the usual call / return stack discipline) in response to error conditions. Nonlocal jumps are a form of application-level ECF, and are provided in C via the `setjump` and `longjump` functions.

---
# 8.1 - Exceptions
Exceptions are a form of ECF that are implemented partly by the hardware and partly by the operating system. Because they are partly implemented in hardware, the exact details vary from system to system.

An _exception_ is an abrupt change in the control flow in response to some change in the processor's state.

Change in state is called an **event**.

When the processor detects that the event has occurred, it makes an indirect procedure call (the exception), through a jump table called an _exception table_., to an os subroutine (the exception handler) that is specifically designed to process this particular kind of event.

When the exception handler finishes processing, one of three things happen (depending on the type of event that caused the exception):
1. The handler returns control to $I_\text{curr}$ (the instruction that was executing when the event occurred)
2. The handler returns control to $I_\text{next}$ (the instruction that would have executed next had the exception not occurred)
3. The handler aborts the interrupted program

---

## 8.1.1 - Exception Handling
Each type of possible exception in a system is assigned a unique _exception number_ (positive `int`). 

Examples of exceptions assigned by the processor include:
- Division by zero
- Page faults
- Memory access violations
- break-points
- arithmetic overflows

Examples of exceptions assigned by the operating system (os) include:
- System calls
- Signals from external I/O devices

The exception number is an index into the exception table, whose starting addressed is contained in a special CPU register called the **exception table base register**.

---

## 8.1.2 - Classes of Exceptions:
Exceptions can be divided into four classes:
1. Interrupts
	- Interrupts occur asynchronously as a result of signals from I/O devices that are external to the processor.
	- Exception handlers for interrupts are often called **interrupt handlers**.
	- Interrupt handlers return the control to $I_\text{next}$ 
2. Traps and System Calls
	- Traps are _intentional_ exceptions that occur as a result of executing an instruction. 
	- Trap handlers return the control to $I_\text{next}$ 
	- The most important use of traps is to provide a procedure-like interface between user programs and the kernel (**system calls**)
		- ie. `read`, `fork`, `execve`, `exit`
	- System calls run in _kernel mode_, which allows it to execute instructions, and access a stack defined in the kernel.
3. Faults
	- Faults result from error conditions that the handler might be able to correct.
	- When a fault occurs, the processor transfers control to the fault handler.
	- If it is able to correct the error, it returns the control to $I_\text{curr}$ (and re-executes)
	- If it is not able to correct the error, the handler aborts the routine in the kernel and terminates the application program that caused the fault.
4. Aborts
	- Aborts result from unrecoverable fatal errors, typically hardware errors such as parity errors that occur when `DRAM` or `SRAM` bits are corrupted
	- Abort handlers return control to the application program and terminates

---

# 8.2 - Processes
Exceptions allow the operating system to provide the notion of a **process**.

A **process** is _an instance of a program in execution_.

Each program in the system runs in the _context_ of some process. The context consists of the state that the program needs to run correctly. 

This state includes the following:
1. The program's code and data stored in memory
2. Its stack
3. The contents of its general-purpose registers
4. Its program counter
5. Environment variables
6. The set of open file descriptors.

Each time a user runs a program, the shell creates a new process and then runs the executable object file in the context of this new process. Application programs can also create new processes and run either their own code or other applications in the context of a new process.

The key abstractions that a process provides to the applications:
1. An independent _logical control flow_ that provides the illusion that our program has exclusive use of the processor.
2. A private address space that provides the illusion that our program has exclusive use of the memory system.

---

## 8.2.1 - Logical Control Flow
Even though many other programs are typically running concurrently on the system, a process provides each program with the illusion that it has exclusive use of the processor.

The sequence of PC (program counter) values is known as a _logical control flow_, or simply **logical flow**.

![[Screenshot 2025-04-07 at 10.59.46 AM.png ]]

Process $A$ runs for a while, followed by $B$ (which runs to completion). Process $C$ then starts and is followed by $A$ (until completion). Finally, $C$ runs to completion.

The key point here is that processes take turns using the processor. Each process executes a portion of its flow and then is _preempted_ (temporarily suspended) while other processes take their turns.

Nowadays, the computer processes each stint so fast, it appears as though that all 3 processes run at the same time.

---

## 8.2.2 -  Concurrent Flows
A logical flow whose execution overlaps in time with another flow is called a _concurrent flow_, and the two flows are said to run _concurrently_.

Flows $X$ and $Y$ are concurrent with respect to each other if and only if $X$ after $Y$ begins and before $Y$ finishes, or $Y$ begins after $X$ begins and before $X$ finishes.

In other words: if two flows overlap in time, they are concurrent.

From the above example, ($A$ and $B$) and ($A$ and $C$) run concurrently, but $B$ and $C$ do not.

**Multitasking** - The notion of a process taking turns with other processes.
**Time Slice** - Each time period that a process executes a portion of its flow
**Parallel Flows** - Two flows are running concurrently on different processor cores or computers (they are _running in parallel_ and have _parallel execution_).

---

## 8.2.3 -  Private Address Space


---

## 8.2.4 - User and Kernel Modes


---

## 8.2.5 - Context Switches


---

# 8.3 - System Call Error Handling


---

# 8.4 - Process Control


---

## 8.4.1 - Obtaining Process ID's

Each process has a unique positive process ID (PID). The `getpid()` function returns the PID of the calling process. The `getppid()` function returns the PID of its _parent_ (the process that created the calling process).

```c
#include <sys/types.h>
#include <unistd.h>

pid_t getpid(void);   // returns the PID of the current process
pid_t getppid(void);  // returns the PID of the parent process
```

---

## 8.4.2 - Creating and Terminating Processes

As the programmer, we can think a process as begin in one of three states:
1. **Running** - The process is either executing on the CPU or is waiting to be executed and will eventually be scheduled by the kernel
2. **Stopped** - The execution of the process is _suspended_ and will not be scheduled until it receives a signal to resume.
3. **Terminated** - The process is stopped permanently.
	1. Received a signal who's default action is to terminate the process
	2. Returning from the main routine
	3. Calling the `exit` function.

The `exit` function terminates the process with an _exit status_ of `status`
```c
#include <stdlib.h>

void exit(int status);
```

A _parent process_ creates a new running _child process_ by calling the `fork()` function.

```c
// returns 0 to child, PID of child to parent
// returns -1 on error
pid_t fork(void);
```

---

## 8.4.3 - Reaping Child Processes


---

## 8.4.4 - Putting Processes to Sleep


---

## 8.4.5 - Loading and Running Programs


---

## 8.4.6 - Using `fork` and `execve` to Run Programs


---
