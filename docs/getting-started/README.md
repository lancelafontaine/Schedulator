# Getting Started

### Launching the server on your local machine
- Install Node `v5.5.0`
- Make sure npm is installed: `npm --version`
- Go to the project directory: `cd schedule-app`
- Install all needed packages: `npm install`
- Launch the server: `npm start`
- Open the app in your browser at `localhost:3000`.

# How to install Mongodb

- Go to https://www.mongodb.org/downloads
- Download mongodb for your respective operating system
- Extract the zip file 
- Go into mongo directory
- Go into bin directory
- open your terminal
- type `sudo bash`
- type your password
- type `mkdir -p /data/db`
- type `chmod 777 /data/db`
- type `ls -l /data/db`
- type `ls -ld /data/db`
- type `exit`
- type `./mongod`
- open a second terminal
- type `./mongo`
- now you can insert and remove data from the database
- Example:
	Use Student //automatically creates a db named Student
	db.[document].insert({[fieldsname]: "name", etc}) -- db.loginInfo.insert({'username':'johny', 'password': 'wantstosleep'})
- by doing the above command it adds the table loginInfo into the Student database with username johny and password wanttosleep
- the same kind of syntax is used to update, remove, find, findOne(),etc
- Read the following URL(`https://docs.mongodb.org/manual/reference/method/`) for more information




