# 🌍 Globe Proxy Wallpaper Tool

<a href="https://devglobe.xyz/projects/devglobe-wallpaper?utm_source=badge&utm_medium=embed" target="_blank" rel="noopener">
  <img src="https://devglobe.xyz/badges/built-on-devglobe-dark.svg" alt="Built on DevGlobe" width="250" height="54" />
</a>

A Node.js proxy server that intercepts and modifies the content of [devglobe.xyz](https://devglobe.xyz) in real time to turn it into a clean, usable live wallpaper.

This project is designed to be used with [Lively Wallpaper](https://www.rocksdanister.com/lively/) to display a fully customized globe as a desktop wallpaper.


## Purpose

The goal of this project is to transform a complex web interface into a minimal, fullscreen, distraction-free wallpaper optimized for real-time display using Lively Wallpaper.


## Features

* HTTP proxy to devglobe.xyz
* HTML response interception
* Dynamic JavaScript injection
* DOM manipulation (UI removal / cleanup)
* Fullscreen globe mode
* Optional interaction blocking for wallpaper use
* Real-time UI simplification for desktop display


## Installation

```bash
npm install
```


## Run the project

```bash
node server.js
```

Then open: [http://localhost:54321/space](http://localhost:54321/space)


## Usage with Lively Wallpaper

1. Install [Lively Wallpaper](https://www.rocksdanister.com/lively/)

2. Open Lively Wallpaper

3. Add a new wallpaper → “Webpage URL”

4. Enter: [http://localhost:54321/space](http://localhost:54321/space)

5. Apply as wallpaper


## Configuration

Change the port in server.js:

```js
const PORT = 54321;
```

## Project Structure

```
proxy-globe/  
├── .gitignore  
├── package-lock.json  
├── package.json  
├── README.md
└── server.js  
```

## Credits

[DevGlobe](https://devglobe.xyz) is developed and maintained by [CaadriFR](https://github.com/CaadriFR) and [Nakooo](https://github.com/Nako0).