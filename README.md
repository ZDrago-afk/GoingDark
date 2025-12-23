<p align="center">
  <img src="icons/icon.png" alt="GoingDark Logo" width="300">
</p>


## GoingDark - Browser Extension

GoingDark is a browser extension that transforms webpages into immersive
night-operation and surveillance-style visual modes.

Inspired by low-light optics and tactical interfaces, this project is built
for security education, visual experimentation, and creative exploration.

The extension is purely visual and privacy-first.
No data is read, stored, or transmitted.


## 🚀 Features

- **Three Vision Modes**
  - 🟢 **Green Zone** – Classic green night-vision with grain overlay
  - ⚫ **Static Feed** – High-contrast black & white CCTV-style noise
  - 🔵 **Cyber Scan** – Cyan-tinted futuristic scan effect
- ❌ **One-Click Reset** – Instantly restore the original webpage
- 🔐 **Privacy-First** – No tracking, logging, or network access
- ⚡ **Instant Toggle** – Effects apply without page reload


## 🛠️ Installation (Developer Mode)

1. Clone or download this repository.
2. Open your browser’s extension page:
   - Chrome / Edge: `chrome://extensions`
   - Firefox: `about:debugging#/runtime/this-firefox`
3. Enable **Developer Mode**.
4. Click **Load unpacked** and select the `GoingDark` folder.
5. The GoingDark icon will appear in the toolbar.


## 📖 Usage

1. Open any webpage.
2. Click the GoingDark extension icon.
3. Select one of the available vision modes.
4. Click **Go Light** or refresh the page to disable effects.


## 📂 Project Structure

| File / Folder | Purpose |
|--------------|---------|
| `manifest.json` | Extension configuration and permissions |
| `popup.html` | Popup interface layout |
| `popup.css` | Popup UI styling |
| `popup.js` | Popup logic and controls |
| `content.js` | Injects and removes visual modes |
| `styles.css` | Core CSS filters and overlays |
| `icons/` | Extension icons and branding |
| `README.md` | Project documentation |
| `LICENSE.txt` | MIT License |


## 🔧 How It Works

GoingDark applies visual transformations using CSS filters such as
`hue-rotate`, `contrast`, `grayscale`, and `brightness`.

A lightweight overlay is used to simulate grain and static noise
without blocking user interaction.

This approach is:
- Non-destructive (page content remains untouched)
- Performant (browser-optimized rendering)
- Reversible (effects removed by clearing CSS classes)


## ⚠️ Important Notes

- This extension is for educational and visual simulation purposes only.
- Designed to run safely in Developer Mode.
- Effects are applied per-tab and reset on refresh or navigation.
- Publishing to official stores may require additional review.


## 📄 License

This project is released under the MIT License
and is provided strictly for educational and creative use.
