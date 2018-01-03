# SEPTA
Regional Rail | Bus | Trolley <br/>
Using React
#Check the Demo here https://realtime.septa.org/ or http://34.232.77.115/

### Getting Started
There are two methods for getting started with this repo.

#### With Git?
Checkout this repo, install dependencies, then start the process with the following:

```
> git clone https://github.com/czsyjss/SEPTA.git
> cd SEPTA/<search-train-new>
> npm install
> npm run serve
```

#### Without Git?
Click [here](https://github.com/czsyjss/SEPTA) then download the .zip file.  Extract the contents of the zip file, then open your terminal, change to the project directory, and:

```
> npm install
> npm run serve
```

### Adding the hidden file .babelrc to the project directory
There are two versions of .babelrc

#### .babelrc (default version: support IE 11 now)

```
{
  "presets": ["react","babel-preset-env"]
}
```

#### .babelrc (enhanced version)

```
{
  "presets": ["react", "babel-preset-env", "stage-1"]
}
```

### Running application from terminal forever?
Install nohup, then start the process with the following:

#### Using nohup
```
> npm install nohup
> sudo nohup npm run serve</dev/null &> /dev/null &
```

### Stopping running application from terminal?
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

