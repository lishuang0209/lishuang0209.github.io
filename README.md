# 小小的个人网站

一个无需安装依赖的响应式静态个人网站。

## 本地预览

在此目录运行 `python3 -m http.server 4173 --directory dist`，浏览器访问 http://localhost:4173。

## 修改内容

- `dist/index.html`：名字、介绍、日常记录与页面结构。
- `dist/style.css`：颜色、字体、排版与手机适配。
- `dist/script.js`：作品详情、筛选与联系弹窗。

目前名字为“小小”，介绍为初稿文案，三个作品明确标注为示例，联系信息待补充。添加真实联系方式后，可以将联系按钮换成 `mailto:` 链接。首屏照片来自 Unsplash，字体通过 Google Fonts 加载；外部字体不可用时会自动使用系统字体。
