# unknow-X

Chrome/Edge Manifest V3 extension for X. It keeps the lower-left avatar and account-switching button usable while replacing the visible account name and handle with custom text.

## Install

1. Open `chrome://extensions` (Chrome) or `edge://extensions` (Edge).
2. Turn on **Developer mode**.
3. Choose **Load unpacked** and select this folder.
4. Open the extension's **Details → Extension options**.
5. Enter the custom nickname and ID. Leave either field empty to hide it.

Settings are stored with `chrome.storage.sync` and apply to X's client-side navigation and DOM updates without requiring a full page refresh.
