## Cosmiq Server
This is the official backend for the cosmiq desktop application.

This is the main landing point for our API's and any future interaction with databases / external API's.

---

## Running the Server

To run the server you must have docker installed on your machine.

Once docker has been installed, run the following commands while in this directory:

If the image has not been built:
```sh
# Image has not been built
docker-compose up --build
```

If the image has already been built and you would just like to run the server, run the following command in the terminal:
```sh
# Image already exists
docker-compose up
```

Finally, if all you want to do is build an image (or rebuild), run this command:
```sh
# Build Image
docker-compose build
```