## Process Basics
A process is an instance of a program being executed

In a multiprocessing OS
- Multiple programs can be executed at the same time
- Multiple instances of program can be executed at the same time
- In practice - we have a combination of the two

With multiple cores, we can have **true concurrency**, meaning we can have multiple processes running without the need for time-sharing.

With a single core, we can only have concurrency using time-sharing.

Executing multiple programs
- Single-core: time-sharing
- Multi-core: true parallelism and time-sharing

When you run a particular program (by executing) it creates a process.

Process Information:
- PID
- State of variables
- What files are open (stdin / stdout / stderror)

---

## Process Management: OS view
OS maintains on process table
- Each process has a table entry, called process control block (PCB)
- Typical PCB info

OS scheduler picks processes to be executed at any given time
- When a process is suspended, its state is saved in PCB

Must know:
- PID
- UserID
- Parent Process
- Memory Management
- File Management (file descriptors and permissions)

Multiple processes are scheduled and distributed using the OS.

---

## Paged Virtual Memory: How Processes Share Memory

![[Screenshot 2025-04-08 at 11.49.35 AM.png]]

The operating system maintains the distribution of memory chunks.

Every process thinks it has sole ownership of the chunk of memory. 

**User Space** - The chunk of memory each process has access to.

Side note - Heap builds up (low to high) and Stack builds down (high to low)

There are sections of memory which cannot be accessed by processes (locked and saved for the OS processes)

In practice you do not run out of memory, but you still don't want to use more than you need.

---

## Process Management: User's View

Two main things:
1. How do you create
2. How do you terminate

Starts at init (typically when you start your system)

The tree starts and builds off the initial process

Each process on the machine starts from another process. To create 3 processes, you clone the parent process for each new process (not including the first).

Events which cause creation:
1. System initialization
2. User request to create a new process (eg. shell command)
3. Executing a shell script, which may create many processes

Events which cause process termination
1. Normal program exit (finishes process)
2. Error exit
3. Fatal error (`seg fault`)
4. Killed by the user command or signal (`Ctrl+C`)

---

## Useful Commands
- `ps`  - List of running processes (normally `ps` and `bash`)
- `pstree` - shows ALL the processes running on your system (in a tree-like structure).
	- This shows the init (eg. `docker-init`)
- `top` - Dynamic view of memory & CPU usage + processes that use the most resources (to exit `top` press `q`)
	- 
- `kill` - Kill a process given its process ID (Try `-9` option if simple kill does not work)

---

## Process Management: Programmer's View

To create a subprocess, you use the `fork()` function.

The list of files included in a process, the clone has the exact same instances of files (stdin / stdout / stderr )

1. Process Birth
	- Processes are created by other processes
	- A process always starts as a **clone** of its parent process
	- Then the process may **upgrade itself** to run a different executable
	- Child process **retains access** to the files open in parents
2. Process Life
	- Child process can create its own children
3. Process Death
	- Eventually, terminates normally or calls `exit` or `abort` to commit "suicide"
	- Orphan Processes - The parents are killed.
		- If you want to kill child processes you must do this manually
	- Gets killed with `kill` or `-9`

---

## Birth Via Cloning

The child and parent are **independent**. They share the same instances of files, but changing one will not change the other. Shared kernel space, independent user space

The function to create a new process in your code
```c
#include <unistd.h>
#include <sys/types.h>  // includes pid_t

pid_t fork(void);
```

`fork()` takes no arguments

Child is an exact copy of the parent
- Both return from `fork()`
- Only difference is the returned value
	- In parent process
		- `fork()` returns the PID of the child (`> 0`)
		- If a failure occurred, it returns `-1` and sets `errno`
	- In the child process, `fork()` returns `0`

```sh
echo "Hello" | md5sum
```

Bash (the parent) creates two child processes `echo` and `md5sum`
- The pipeline `|` allows for communication and passing of data between processes
- In this example, the output of `echo` is used as input of `md5sum`
- Each child is killed after the process finishes.
- Note that killing the child does not kill bash. This is because of the child / parent relationship.
 
---

## Concurrency

Parent and child processes return from `fork()` concurrently
- Makes it hard to set up automated tasks

---

## Cloning Effect

On memory
- The parent and child memory are 100% identical, but are viewed as distinct by the OS ("copy-on-write")
- Any memory change (stack / heap) affects only that copy
- Thus, the parent and child can quickly diverge

On files:
- All files open the parent are accessible in the child (same copy)!
- I/O operations in either one move 

In particular:
- stdin, stdout and stderr of the parent are accessible in the child

In the kernel space, both parent and child point to the same instances. However, closing a file in kernel space only closes for the processes that calls close (not both).

`0` being stdinput
`1` being stdout
`1` being error

---

## What Can the Parent Do?

You want the parent to die after the child. If the child dies, it goes into a zombie state. If the parent dies first, the child becomes an orphan and needs to be adopted by another process. Typically if no adoption is specified, the child is inherited by the init process

---

## Waiting on a Child

We return 0

If the parent receives a 0 from the death of the child, we know the child died a good death, but if the return value is not 0 there must have been an error killing the child

---

## Zombies

if child dies when parent is still allive it goes into a zombie state

---

## Fork Examples

```c
int main() {
	pid_t value = fork();
	printf("The value = %d\n", value);  // getpid(), getppid()

	return 0;
}

// outputs:
// The value = 56724  // parent
// The value = 0      // child
```

```c
int main() {
	pid_t value = fork();
	printf("The value = %d. The process id is %d. The process of the parent process is %d\n", value, getpid(), getppid());

	return 0;
}
```

Output:

```
The value = 57822. The process id is 57821. The parents process is 51526 parent.
The value = 0. The process id is 57822. The parents process is 57821 parent.
```

Fork bombs are when you continuously call fork. The number of processes will grow exponentially.

With $n$ calls to `fork()`, there will be $2n$ processes.

When creating a clone, the FDT in the kernel space stays the same, but the memory chunk in the user space can be wiped out (create a new stack, new heap, etc)

---

## Exec

Act of **upgrading** is done by the child using the `exec` family of functions
- Many variants. `man -S3 execl` for all details

```
int execl(const char *path, const char *arg0, ..., NULL);
```

The path to the executable to load inside the address space (`bin/ls`)
- Give the path where the executable is found `bin/ls`
List of arguments to be passed at the command line to the new executable
- Give the executable name and parameters `arg0`
A final `NULL` ptr to give the "end of the argument list"
- Stop execution after `execl` finishes.

If `execl()` is successful, it does not return.
- Instead, control is transferred to the main function of the new executable.