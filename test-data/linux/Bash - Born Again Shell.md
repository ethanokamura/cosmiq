Bash is a shell
The shell provides a safe layer of abstraction between the user and kernel
Bash is also an interpreted programming language

Script Example:

```bash
#!/usr/bin/bash
# tells us to use the bash interpreter

# my_script.sh
echo "enter your age"
read age
if [ $age -ge 18 ]; then
	echo "access granted"
else
	echo "access denied"
fi
```

execute:
`./my_script.sh`


## My bash scripts

Flutter

```bash
#!/bin/bash

# create_models.sh
# Find all the data models files in the project
find . -name "models.dart" | while read -r file; do
# Navigate to the directory containing the data models
dir=$(dirname "$file")
echo "Building data model files in $dir"
(cd "$dir" && flutter pub run build_runner build)
done
```

```bash
#!/bin/bash

# flutter_clean.sh
# Clean all pubspec.yaml files in the project
find . -name "pubspec.yaml" | while read -r file; do
# Navigate to the directory containing the pubspec.yaml
dir=$(dirname "$file")
echo "Cleaning directory $dir"
(cd "$dir" && flutter clean)
done
```

```bash
#!/bin/bash

# run_pub_get.sh
# Find all pubspec.yaml files in the project
find . -name "pubspec.yaml" | while read -r file; do
# Navigate to the directory containing the pubspec.yaml
dir=$(dirname "$file")
echo "Installing packages in $dir"
(cd "$dir" && dart pub get)
done
```

PerfectLine Linux Server

```bash
#!/bin/bash

# createstudent.sh
# function to create a new user
username=$1
password=$2
sudo useradd -m -d /home/$username -s /bin/bash  $username
sudo usermod -a -G students $username
sudo chmod 744 /home/$username
echo "$username:$password" | sudo chpasswd
echo "User '$username' has been created with passwd '$password'"
```


my terminal colors:
`PS1='\[\033[01;33m\][\t]\[\033[00m\] \[\033[01;32m\]\u\[\033[00m\]@\[\033[01;36m\]\h\[\033[00m\]: \[\033[01;34m\]\w\[\033[00m\] \$ '`