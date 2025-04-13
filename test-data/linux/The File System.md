![[linux-file-system.png]]
`/` is the root directory
`/boot` contains Linux kernel
`/dev` contains external devices like hard drives
`/usr` user system resources which have binaries as well but are nonessential
`/bin` for binaries (all executable programs)
`/sbin` for system binaries (executables only done by root user)
`/home` contains directories owned by specific users 
`/lib` for shared libraries
`/otp` contains optional programs (nonessentials)
`/tmp` temporary files (not persisted between boots)
`/mnt` temporary mount point
`/var` contains log files
`/etc` editable text config
`/proc` virtual file system created by linux that contains info on processes and system info
`/sys` virtual file system created by linux that contains info on hardware and kernel subsystems

when you run a command like `ls` Linux looks for an executable binary on the system to execute

binary lives under `/usr` as well!