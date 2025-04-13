PATH is a special env var that defines paths to directories separated by colons
`/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`

Path tells Linux where executables are located

`which` (binary executable) tells you which path the binary is in

```
$ which ls
/usr/bin/ls
```

When a command is executed it will execute the first found executable from the PATH

common to customize using `export PATH=some-dir/bin:$PATH` within the `.bashrc` or `.bash_profile` file

