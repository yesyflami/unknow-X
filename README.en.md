<div align="center">

# unknow-X

**English | <a href="README.md">简体中文</a>**

<a href="https://github.com/yesyflami/unknow-X/releases/download/v1.2.1/unknow-X.zip">⬇️ Download the extension</a>

</div>

A Chrome and Edge extension for X (formerly Twitter). It keeps the lower-left avatar and account switcher usable while replacing the visible display name and @handle.

## Features

- The avatar and account-switching button remain usable.
- The real display name and @handle are not shown.
- Configure the nickname and ID independently.
- Leave either field empty to hide that line.
- Supports both `x.com` and `twitter.com`.
- Stays active through X single-page navigation, account switching, and DOM rerenders without repeated manual refreshes.
- Settings are stored in the browser's `chrome.storage.sync`.

## Installation

1. Click <a href="https://github.com/yesyflami/unknow-X/releases/download/v1.2.1/unknow-X.zip">Download the extension</a> above and unzip `unknow-X.zip`.
2. Open `chrome://extensions` in Chrome or `edge://extensions` in Edge.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the extracted `unknow-X` folder.
6. Open the extension's **Details** page and choose **Extension options**.
7. Enter a custom nickname and ID, then click **Save settings**.

After the first installation, reopen or refresh the current X tab once so the browser can inject the content script. X's internal navigation does not require manual refresh afterwards.

## Example

- Custom nickname: `Work account`
- Custom ID: `@company`

The switcher shows these custom values instead of the real account labels. Leave either input empty to hide only that line. The language button in the upper-right corner of the settings page switches the interface between English and Chinese.

## Updating

1. Download and unzip the new version into a new folder.
2. Open the browser's extensions page.
3. Find `unknow-X` and click **Reload**.
4. Refresh the X tab once if needed.

## Uninstalling

Remove `unknow-X` from `chrome://extensions` or `edge://extensions`. X will then show its original account labels again.

## Privacy

The extension runs only on `x.com` and `twitter.com`. Custom labels stay in browser extension storage and are not sent to a third-party server. Hiding the labels does not log you out; X may still reveal the real account in the account menu, profile pages, or posts.

## Troubleshooting

- Real labels are still visible: make sure the extension is enabled, click **Reload** in the extensions page, and refresh X once.
- Settings do not change: save them again in the extension options and confirm that the page is on `x.com` or `twitter.com`.
- Account switching is unavailable: do not disable or remove the lower-left button. This extension replaces text only and does not intercept clicks.

