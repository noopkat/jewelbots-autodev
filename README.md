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
2. The path to the Jewelbots Firmware Library on your machine
3. The version number of the Jewelbots firmware you're on
4. The location of the Arduino IDE on your machine
5. Which directory you want the compiled files to be placed
6. The path and filename of the sketch you're looking to compile

OSX Example:

```json
{
  "jewelbots-lib": "/Users/noopkat/Library/Arduino15/packages/Jewelbots_Arduino_Library",
  "jewelbots-firmware": "/Users/noopkat/Library/Arduino15/packages/Jewelbots_Firmware_Update/",
  "firmware-version": "1.0.4",
  "arduino-app": "/Applications/Arduino-1.6.13.app",
  "build-destination": "/Users/noopkat/code/jewelbots-fun/dist",
  "sketch-file": "/Users/noopkat/code/jewelbots-fun/sketches/blue.ino"
}
```

Windows and Linux config examples coming soon!

### 2. Run jewelbots-autodev from your project's directory

#### To compile:

```bash
jewelbots-autodev compile
```

You can also override the `sketch-file` property in `.jbauto` by specifying it as such:

```bash
jewelbots-autodev compile /path/to/my/sketch.ino
```

You can also use a relative path from your current folder.

```bash
jewelbots-autodev compile sketch.ino 
```

#### To upload:

Plug in your Jewelbot, and hold the action button to put it into coding mode first.

```bash
jewelbots-autodev upload
```

#### To return back to "friendship mode":

Plug in your Jewelbot, and hold the action button to put it into coding mode first.

```bash
jewelbots-autodev friendship-mode
```

## Stuck?

This is early stages! Raise an issue on this project's repo if you hit a bug or weird error, and pull requests are very welcome!
