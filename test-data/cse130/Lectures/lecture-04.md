# Redirections and Pipes

Inter-process communication

---

## File APIs

C standard library IO APIs:

- The "f" family (`fopen`, `fclose`, `fread`, `fgetc`, `fscanf`, ...)
- All these use a `FILE*` abstraction to represent a file
- They rely on buffering in the C library
- Support line-ending translation when opening in "text mode"

Linux has lower-level APIs for file handling

- `open`, `close`, `read`, `write`, `dup`, `dup2`, ...
- Use **file descriptors** (integers)
- No buffering
- Only deals with bytes

---

## File Descriptor Table

!\[\[Screenshot 2025-04-10 at 11.07.52 AM.png\]\]

---

## Shell Redirections

**Redirections** - We can change the mapping between the file descriptors and the `FILE*` so that a process reads from and to a file

Implementation using the open / close / dup technique:

- `command < infile > outfile`
- ie: `sort < file.tex > sorted.txt`
  - Sort will read lines from `file.txt`, instead of the keyboard
  - The output will be saved in `sorted.txt`, instead of being displayed on the terminal

---

## Open a File:

```c
#include <fcntl.h>
#include <unistd.h>

int open(const char *path, int oflag);
```

Parameters:

- `path` - The path to the file that will be opened / created
- `oflag`: read, write, read and write, and more

The function returns a file descriptor (a small, non-negative integer)

- Returns `-1` on error

Flags in `open()`

1. `O_RDONLY` (read only)
2. `O_WRONLY` (write only)
3. `O_RDWR` (read and write)

Note that flags can be or-ed with `|` with many optional flags

1. `O_TRUNC` - Truncate the file (remove existing contents) if opening a file for write
2. `O_CREAT` - Create a file if it does not exist

Examples:

```c
fd1 = open("a.txt", O_RDONLY);          // open for read
fd2 = open("a.txt", O_RDWR);            // open for read and write
fd3 = open("a.txt", O_RDWR | O_TRUNC);  // read, write, truncate the file
```

Create a file with `open()`A mode must be provided if `O_CREAT` is set

- Mode (octal number) specifies the permissions when a new file is created

```c
int open(const char *path, int oflag, int mode);
```

Example:

```c
open("a.txt", O_WRONLY | O_TRUNC | O_CREAT, 0600);
```

This code does the following:

1. Opens `a.txt` in write mode (`O_WRONLY`)
2. If the file exists, its contents are cleared (`O_TRUNC`)
3. Otherwise, create a file and set the permissions so that the owner of the file can read and write, but others cannot `O_CREAT, 0600`

---

## Close a File:

```c
#include <unistd.h>
int close(int fildes);
```

Parameters:

- `fildes` - the file descriptor to be closed

If successful, the function returns `0`; otherwise, it returns `-1`

---

## Duplicating a File Descriptor

```c
#include <unistd.h>
int dup(int fildes);
```

Parameters:

- `fildes` - the file descriptor to be duplicated

Duplicates the `fd` to the **first unused entry** in the FDT (we just redirected input)

---

## Redirecting `stdin`

To redirect `stdin`, we do the following:

1. Call `open()` to open a file to read from. The call to `open()` returns the `fd` for the file.
2. Call `close(0)` to close `stdin`
3. Call `dup(fd)` to copy the file descriptor to `0`
4. Call `close(fd)` to close the file descriptor as it is no longer needed

---

## File Descriptors After `fork()` and `exec()`

Upon calling `fork()`, the child process **inherits all opened files** in the parent

- Example: the child process can access `FD`s `0`, `1`, and `2`

The opened files are **not affected** by the upgrade (`exec`) operation

- Example: if `execl()` is successful in the given example, `gcc` can access `FD`s `0`, `1`, and `2`

!\[\[Screenshot 2025-04-10 at 11.54.41 AM.png\]\]

---

## Pipes

Pipes allow inter-process communication. One process writes and the other one reads

Pipes in Linux shell:

- `command 1 | command 2 | command 3 | ...`

Pipes in C:

- `int pipe(int pipefd[2]);`
- Creates a one-way pipe (a buffer to store a byte stream)
- Two FDs are used. `pipefd[0]` is the read end and `pipefd[1]` is the write end
- If successful, it returns a `0`.

---

## Connecting a Parent and Child Process:

1. Parent creates a pipe and gets two `FD`s (ie 3 and 4)
2. After `fork()`, the child inherits all open `FD`s, including 3 and 4
3. Then, one process can write to `FD 4` and the other can read `FD 3`

!\[\[Screenshot 2025-04-10 at 12.31.55 PM.png\]\]

---

## Closing `FD`s Not in Use

If the pipe is for parent to read and for child to write

- Parent: `close(4)`
- Child: `close(3)`

!\[\[Screenshot 2025-04-10 at 12.33.06 PM.png\]\]

---

## Pipe Illustration

- Start a pipeline in a program $S$ (aka the shell): `A | B`

High-level strategy (missing clean up)

- Create a pipe
- Fork #1
  - In a child process:
    - Redirect `stdout` to the write end of the pip
    - Start `A`, by calling `exec`
- Fork #2
  - In child process
    - Redirect `stdin` to the read end of the pipe
    - Start `B`, by calling `exec`