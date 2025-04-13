Linux is an OS kernel written in C

kernel ring 0
userspace ring 3
system calls are the middleman between the kernel and user space

**GNU**: provides core utils for Linux
**Terminal**: shell provides a layer of protection between user space and kernel

# Commands

`man` - manual

CRUD
`touch` - create a file or many files
`rm` - delete

`mkdir` - create a directory
`mkdir foo/bar/baz -p` - creates parent directories
`rm -r` - delete directory (remove recursively)
`rm -rf` - force delete directory
\
`cp` - copy
`cp oldfile.txt newcopy.txt` - creates a duplicate file named `newcopy.txt`
`mv` - move is like copy but removes the original file
`mv a.txt b.txt c.txt /some-dir/` move multiple files to a certain directory

IO:
`>` input
`<` output

Printing:
`echo` - sends text to standard output (can print variables)
`cat` - read file contents
`cat -n` - read file contents with numbered lines
`stat` - file stats

Navigation:
`cd` - choose a directory
`cd ~` - navigate home
`cd -` go to the last directory
`cd ..` go to the parent directory
`pwd` - present working directory

List Files:
`ls` - list files
`ls -l` - more details
`ls -h` human readable
`ls -a` list all files including hidden files
`ls -sS` list files but sort by size

Users:
`whoami` - returns the current user
`id -u` - user ID (uid)
`id -g` group ID

root has uid of `0`

`sudo -l` check if the user has sudo perms

Kill:
`kill` - kill
`kill -9` - to force kill


# pipes
pipes allow you to take the output of one command and use it as input for the next
`cat somefile.txt | sort | uniq`
read `somefile.txt`, sort it, and grab the unique lines



# Kill program
