# 李爽的个人网站

网站：https://lishuang0209.github.io/

当前首页为 Index 版本：全宽布局、Li 标志、黑白 WebGL 粒子波浪、公开项目与公众号文章。支持项目切换、文章筛选、键盘操作和减少动态效果偏好；WebGL 不可用时显示本地静态背景。

## 发布与预览

推送 main 后，由 `.github/workflows/pages.yml` 自动将 `dist/` 发布到 GitHub Pages。

本地预览：`python3 -m http.server 4173 --directory dist`。

## 文件

- `dist/index.html`：首页内容。
- `dist/style.css`：布局、样式和响应式规则。
- `dist/script.js`：项目、文章、导航和版本切换。
- `dist/hero-background.js`：粒子背景与播放生命周期。
- `dist/assets/`：本地 SVG 图形和静态粒子回退。

## 历史版本

- [Graphite](https://lishuang0209.github.io/versions/graphite/)
- [Raycast](https://lishuang0209.github.io/versions/raycast/)

原 Graphite 发布提交：`fee28e71046468fcbfd418ef82cff41dc67edd8c`，保留在 Git 历史中。页脚可切换版本。

## 背景来源

粒子背景改编自 joyco 的 [Skal Ventures Template](https://v0.app/templates/skal-ventures-template-tnZGzubtsTc) 公开着色器，保留周期波形、相机、景深与闪烁参数，移植为无依赖 WebGL，并加入文字遮罩、暂停处理及静态回退。
