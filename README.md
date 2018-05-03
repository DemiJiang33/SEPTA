# Realtime
Repository for responsive, realtime apps <br>
Check the Demo here https://realtime.septa.org/ or https://rttest.septa.org/ 

## Updating npm & node before getting started
```
> npm install -g npm 
> npm install -g node
```
## Checking after version installation
```
> npm -v
> node -v
```
## Fixing npm issues
```
> npm rebuild
```
This command runs the npm build command on the matched folders. 
This is useful when you install a new version of node, and must recompile all your C++ addons with the new binary.


## Getting Started
There are two methods for getting started with this repo.
### With Git?
Checkout this repo, install dependencies, then start the process with the following:
```
> git clone https://github.com/czsyjss/SEPTA.git
> cd SEPTA
> npm install
> npm run <serve/build>
```
### Without Git?
Click [here](https://github.com/septadev/realtime/) then download the .zip file.  Extract the contents of the zip file, then open your terminal, change to the project directory, and:
```
> npm install
> npm run serve <serve/build>
```

## Adding the hidden file .babelrc to the project directory before npm run serve <serve/build>
### .babelrc (support IE 11 now)
```
{
  "presets": ["react","babel-preset-env"]
}
```


## Development Mode

### `npm run serve`
Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.
The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Running application on webpack-dev-server from terminal forever?
Install nohup, then start the process with the following:
#### Using Nohup
```
> npm install nohup
> sudo nohup npm run serve</dev/null &> /dev/null &
```

### Stopping running application on webpack-dev-server from terminal?
Open the terminal, then change to the project directory, and:
#### Finding the PID number:
```
> ps -ef
```
#### Killing the PID number:
```
> kill -9 <PID>
```

### Running webpack-dev-server on different host or port?
In package.json file
#### Changing the "scripts" from 
```
"scripts": {
    "serve": "webpack-dev-server",
    ...
  }
```
#### To
```
"scripts": {
    "serve": "webpack-dev-server --inline --host <hostname/ip> --port <number>",
    ...
  }
```

### Running webpack-dev-server on IE 9 and IE 10?
Open the terminal, then change to the project directory, and:
#### Changing the "webpack-dev-server" from latest version
```
> npm uninstall webpack-dev-server
```
#### To version @2.7.1 or earlier
```
> npm install --save-dev webpack-dev-server@2.7.1 
```


## Production Mode

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### Getting react routing to work with Apache
change your .htaccess and insert this:
```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```
Check [link1](https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writting-manually)
or [link2](https://www.reddit.com/r/reactjs/comments/4e6lbt/getting_react_routing_to_work_with_apache2/y) for your refernece.
