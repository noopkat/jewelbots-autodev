# jewelbots-autodev

A cli tool for compiling and uploading sketches for Jewelbots

**looking for alpha testers please** :sparkling_heart:

## How to install

Firstly, install the latest [Arduino IDE](https://www.arduino.cc/en/Main/Software). You do not have to have it open at all while using this tool.

Then:

```bash
npm install -g jewelbots-autodev
```

## How to use

### 1. Create a JSON config file in your project directory's root, and save it as `.jbauto`

The config file needs to know four things:

1. The path to the Jewelbots Arduino Library on your machine
2. The location of the Arduino IDE on your machine
3. Which directory you want the compiled files to be placed
4. The path and filename of the sketch you're looking to compile

OSX Example:

```json
{
  "jewelbots-lib": "/Users/noopkat/Library/Arduino15/packages/Jewelbots_Arduino_Library",
  "arduino-app": "/Applications/Arduino-1.6.13.app",
  "build-destination": "/Users/noopkat/code/jewelbots-fun/dist",
  "sketch-file": "/Users/noopkat/code/jewelbots-fun/sketches/blue.ino"
}
```

Windows config example coming soon!


### 2. Run jewelbots-autodev from your project's directory

#### To compile:

```bash
jewelbots-autodev compile
```

#### To upload:

Plug in your Jewelbot, and hold the action button to put it into coding mode first.

```bash
jewelbots-autodev upload
```

## Stuck?

This is early stages! Raise an issue on this project's repo if you hit a bug or weird error, and pull requests are very welcome!