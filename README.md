# 小小的个人网站

一个无需安装依赖的响应式静态个人网站。

## 视觉设计

依据 Graphite 设计参考重做：近黑背景 `#0a0a0a`、石墨细边框、白色紧凑标题、10px 卡片圆角、单色按钮，以及黄白蓝发光多边形。首页包含可切换的个人工作台、可筛选作品、关于我、可展开随记与 GitHub 联系入口。

图形使用本地 SVG 与 CSS，字体使用系统字体，不依赖外部照片或字体服务。支持手机布局、键盘操作和减少动态效果偏好。

## 在线展示

- 网站：https://lishuang0209.github.io/
- 源码：https://github.com/lishuang0209/lishuang0209.github.io

通过 GitHub Pages 公开展示。每次推送 `main` 分支中的网页修改后，GitHub Actions 会自动发布 `dist/` 目录。

## 本地预览

在此目录运行 `python3 -m http.server 4173 --directory dist`，浏览器访问 http://localhost:4173。

## 修改内容

- `dist/index.html`：名字、介绍、日常记录与页面结构。
- `dist/style.css`：颜色、字体、排版与手机适配。
- `dist/script.js`：作品详情、筛选、工作台标签切换与导航状态。
- `dist/assets/orbit.svg`：首屏发光多边形。

目前名字为“小小”，介绍为初稿文案，三个作品明确标注为示例。联系入口使用 GitHub 主页 `https://github.com/lishuang0209`。需要邮箱联系时，可以将联系按钮换成真实的 `mailto:` 链接。

## 更新网站

在此目录修改并提交：

```sh
git add dist README.md .github .gitignore
git commit -m "Update personal website"
git push origin main
```

在仓库的 **Actions** 页面查看发布结果。GitHub Pages 配置为 **Settings → Pages → Source → GitHub Actions**。本项目后续使用 GitHub Pages 发布。

## GitHub CLI

已安装官方 `gh` 到 `~/.local/bin/gh`，新终端可直接使用 `gh`。如果当前终端提示找不到命令，运行 `source ~/.zshrc`。

```sh
gh --version
gh auth status
gh repo view lishuang0209/lishuang0209.github.io --web
```
