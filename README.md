# 小小的个人网站

一个无需安装依赖的响应式静态个人网站。

## 在线展示

- 网站：https://lishuang0209.github.io/
- 源码：https://github.com/lishuang0209/lishuang0209.github.io

通过 GitHub Pages 公开展示。每次推送 `main` 分支中的网页修改后，GitHub Actions 会自动发布 `dist/` 目录。

## 本地预览

在此目录运行 `python3 -m http.server 4173 --directory dist`，浏览器访问 http://localhost:4173。

## 修改内容

- `dist/index.html`：名字、介绍、日常记录与页面结构。
- `dist/style.css`：颜色、字体、排版与手机适配。
- `dist/script.js`：作品详情、筛选与联系弹窗。

目前名字为“小小”，介绍为初稿文案，三个作品明确标注为示例，联系信息待补充。添加真实联系方式后，可以将联系按钮换成 `mailto:` 链接。首屏照片来自 Unsplash，字体通过 Google Fonts 加载；外部字体不可用时会自动使用系统字体。

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
