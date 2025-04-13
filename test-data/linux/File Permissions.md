Every file and directory is associated with an owner and a group

`rwx` - read / write / execute

`rwxrwxrwx` user-group-other

`chmod` change permissions
`chown` - change owner
`chgroup` - change group

`chmod [u/g/o][+/-/=][r/w/x][file]`

To give permissions to all user's use the following command:

`chmod u+rwx g+rwx o+rwx somefile.txt`
OR
`chmod 777 somefile.txt`

```
--- == 0
--x == 1
-w- == 2
-wx == 3
r-- == 4
r-x == 5
rw- == 6
rwx == 7
```

# SUDO
superuser do _
the superuser or root user has full control of the server

Additional users can be given sudo abilities in the `/etc/sudoers` file