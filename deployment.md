*  **create the instance** -> click on connect 
*  **create the runner**
   *  `github`
    * go to actions -> go to runner -> create the runner -> go to linux
   * `ec2 console` 
   	* now copy all the commands one by one fro github runner page  -> till configure first step
	* go to the runner -> after this it will be offline
	* when you will ls it will show : `svc.sh`-> 
		* install it using `sudo ./svc.sh install` -> 
		*  now start it `sudo ./svc.sh start` (you action runner will execute as a background runner) -> 
			* check for the active flag(in command)
			* check on Github -> it will show (idle)
	* **Runner is listening to my github repo**
* **Github secret variables** : 
  * * under security go to secrets and variables 
		* click on actions -> new repository file
			* `Name`:  file name
			* `SECRET`: all the key value pairs
* **ci/cd pipeline** -> these are set of steps that runner need to do after every update to deploy the most recent version of your application
*  **Github actions**
   *  add the action -> go to actions tab -> choose nodejs for ci/cd
  ```yml
  name: Node.js CI/CD
	on:
	push:
		branches: [ "main" ]

	jobs:
	build:
		runs-on: self-hosted
		strategy:
		matrix:
			node-version: [18.x]
			# See supported Node.js release schedule at https://nodejs.org/en/about/releases/

		steps:
		- uses: actions/checkout@v3
		- name: Use Node.js ${{ matrix.node-version }}
		uses: actions/setup-node@v3
		with:
			node-version: ${{ matrix.node-version }}
			cache: 'npm'
		- run: npm ci
		- run: |
			touch .env
			echo "${{ secrets.PROD_ENV_FILE }}" > .env
  ```

* **upating our machine  with required dependcies**
	* `sudo apt update`
	* install nodejs version 18
	``` curl
	curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
	sudo apt install nodejs 
	```
	* install pm2 gobally
  		```curl
  		sudo npm install -g pm2
  		pm2 start  server.js
  		pm2 restart  server.js
  		```
	* add pm2 command to yml file as well
  * configure nginx
	* install it , don't need to run it 
	```
	sudo apt-get install -y nginx
	```
	* open this file
```
sudo nano /etc/nginx/sites-available/default
```
* after doing the changes do ->  
* `sudo nginx -t`
* sudo systemctl restart nginx


 
	 

