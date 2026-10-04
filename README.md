```
 ██████╗██╗     ███████╗ █████╗ ███╗   ██╗███████╗██████╗
██╔════╝██║     ██╔════╝██╔══██╗████╗  ██║██╔════╝██╔══██╗
██║     ██║     █████╗  ███████║██╔██╗ ██║█████╗  ██████╔╝
██║     ██║     ██╔══╝  ██╔══██║██║╚██╗██║██╔══╝  ██╔══██╗
╚██████╗███████╗███████╗██║  ██║██║ ╚████║███████╗██║  ██║
 ╚═════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
                              T U B E
```

**Take back your YouTube.** Hide the clutter, block the distractions,
and switch between focus modes in one click.

[![Version](https://img.shields.io/badge/version-1.0.0-ff0033?style=for-the-badge)](https://github.com/your-username/cleaner-tube/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-22c55e?style=for-the-badge)](LICENSE)
[![Built with WXT](https://img.shields.io/badge/built%20with-WXT-0ea5e9?style=for-the-badge)](https://wxt.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

[Install](#-installation) · [Features](#-features) · [Presets](#-presets) · [Development](#-development) · [Contributing](#-contributing)

<img width="1919" height="1008" alt="image" src="https://github.com/user-attachments/assets/b2a38787-d7da-4ffc-9d9d-6d20ea99688b" />

<img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/3fc1114b-7c38-4c08-a4de-884a48c2adc3" />


## 📦 Installation

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)

### Clone the repository

```bash
git clone https://github.com/derick-kibiwott/cleaner-tube.git
cd cleaner-tube
```

### Install dependencies

```bash
npm install
```

### Run in development

Start the WXT development server:

```bash
npm run dev
```

WXT will build the extension and open the browser with the extension loaded for development.

### Load the extension manually

If you want to build the extension and load it manually:

```bash
npm run build
```

Then:

1. Open `chrome://extensions` in Chrome or another Chromium-based browser.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the generated `.output/chrome-mv3` directory.
5. Open YouTube and start using Cleaner Tube.

### Firefox

To develop for Firefox:

```bash
npm run dev:firefox
```

To create a Firefox build:

```bash
npm run build:firefox
```

The generated extension can be found in the `.output` directory.

### Create a distributable package

For Chrome/Chromium:

```bash
npm run zip
```

For Firefox:

```bash
npm run zip:firefox
```

### Type-check

Run TypeScript without emitting files:

```bash
npm run compile
```
