<div align="center">

# unknow-X

**<a href="README.en.md">English</a> | 简体中文**

<a href="https://github.com/yesyflami/unknow-X/releases/download/v1.3.1/unknow-X.zip">⬇️ 下载插件</a>

</div>

一个适用于 Chrome 和 Edge 的 X（原 Twitter）浏览器扩展。它保留左下角头像和账号切换功能，只替换显示出来的昵称和 @ID。

## 功能

- 头像和账号切换按钮保持可用；
- 真实昵称和真实 @ID 不显示；
- 可以上传自定义头像，并随时移除；
- 可以分别设置自定义昵称和自定义 ID；
- 任意一项留空，就隐藏对应文字；
- 支持 `x.com` 和 `twitter.com`；
- 页面内部跳转、切换账号或重新渲染时持续生效，无需反复刷新；
- 设置保存在浏览器的 `chrome.storage.sync` 中。

## 安装

1. 点击上方的<a href="https://github.com/yesyflami/unknow-X/releases/download/v1.3.1/unknow-X.zip">下载插件</a>并解压 `unknow-X.zip`。
2. 打开 [chrome://extensions](chrome://extensions)，或 [edge://extensions](edge://extensions)。
3. 打开右上角的“开发者模式”。
4. 点击“加载已解压的扩展程序”。
5. 选择解压后的 `unknow-X` 文件夹。
6. 打开扩展的“详细信息”，进入“扩展程序选项”。
7. 填写自定义昵称和自定义 ID，点击“保存设置”。
8. 在“自定义头像”处上传 PNG、JPEG、WebP 或 GIF 图片（建议小于 2 MB）。

第一次安装后，需要重新打开或刷新当前 X 标签页，让浏览器注入扩展脚本。之后 X 内部页面更新不需要手动刷新。

## 设置示例

- 自定义昵称：`工作账号`
- 自定义 ID：`@company`

左下角会显示这两个自定义值，而不会显示真实账号信息。将其中一个输入框留空，可以单独隐藏昵称或 ID。设置页右上角的按钮可以在中文和 English 之间切换界面。

## 更新

1. 下载新版本并解压到新的文件夹。
2. 打开扩展管理页面。
3. 找到 `unknow-X`，点击“重新加载”。
4. 如有必要，在 X 标签页执行一次刷新。

## 卸载

在 `chrome://extensions` 或 `edge://extensions` 中找到 `unknow-X`，点击“移除”。卸载后，X 页面会恢复显示原来的账号文字。

## 隐私说明

扩展只在 `x.com` 和 `twitter.com` 页面运行。自定义头像、昵称和 ID 仅保存在浏览器扩展存储中，不会发送到第三方服务器。隐藏界面文字不等于退出登录；打开账号菜单、个人资料或发帖时，X 仍可能显示真实账号信息。

## 故障排查

- 左下角仍显示真实文字：确认扩展已启用，并在扩展管理页点击“重新加载”，然后刷新 X 标签页。
- 设置没有变化：回到扩展选项页点击“保存设置”，再检查 X 是否位于 `x.com` 或 `twitter.com`。
- 账号切换不可用：不要禁用或删除左下角按钮；本扩展只替换文字，不会拦截点击事件。

