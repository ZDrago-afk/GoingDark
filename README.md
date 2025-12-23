# GoingDark - Browser Extension

A browser extension that transforms webpages with realistic surveillance camera and night vision visual effects, built for security education and creative exploration.

## 🎯 Features
- **Three Unique Visual Modes:**
  - **Green Zone:** Classic green-tinted night vision with grain overlay.
  - **Static Feed:** High-contrast black & white with animated noise.
  - **Cyber Scan:** Cyan-tinted scan with a moving tracking line.
- **One-Click Reset:** Instantly revert any webpage to its original state.
- **Privacy-First:** Only applies CSS filters locally. **No data is read, stored, or transmitted.**

## 🛠️ Installation (Developer Mode)

1.  Clone or download this repository.
2.  Open your browser's extension management page:
    - **Chrome/Edge:** Navigate to `chrome://extensions`
    - **Firefox:** Navigate to `about:debugging#/runtime/this-firefox`
3.  Enable **"Developer mode"** (toggle in the top-right).
4.  Click **"Load unpacked"** and select the `GoingDark` project folder.
5.  The "GoingDark" icon should appear in your toolbar.

## 📖 Usage
1.  Navigate to any webpage.
2.  Click the "GoingDark" extension icon in your toolbar.
3.  Choose a visual mode from the popup menu.
4.  To disable effects, click the **"Go Light"** button or refresh the page.

## 🏗️ Project Structure
GoingDark/
├── manifest.json # Extension configuration
├── popup.html # Popup user interface
├── popup.css # Popup styling
├── popup.js # Popup interaction logic
├── content.js # In-page script for applying effects
├── styles.css # Core CSS filters and effects
├── README.md # This documentation
└── icons/ # Extension icons (optional)


## 🔧 How It Works
The extension uses **CSS filters** (like `hue-rotate`, `contrast`, `grayscale`) and pseudo-elements (for overlays) to visually transform the entire `<html>` element of a webpage. This approach is:
- **Non-destructive:** Does not alter the underlying page content.
- **Performant:** Leverages browser-optimized graphics filters.
- **Reversible:** Effects are removed simply by deleting the CSS class.

## ⚠️ Important Notes
- This extension is for **visual simulation and educational purposes only**.
- It is designed to run safely in **Developer Mode**. Publishing to an official store may require additional security reviews.
- Effects are applied per-tab and will be lost if you navigate away or refresh.

## 📄 License
This project is provided for educational use under the MIT License.