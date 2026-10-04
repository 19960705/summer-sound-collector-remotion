# 秋日邮局版本验证

验证日期：2026-10-04（Asia/Taipei）。Composition：AutumnPostOffice。

- `npm run typecheck`：通过。
- `npm run build`：通过。
- `npm run stills`：12 个场景的实际浏览器渲染通过；检查文案、色调、信箱文字、邮票、纸飞机和枫叶的显示。
- `npm run render`：1113 帧渲染及音视频编码完成。
- `npm run verify`：1920 × 1080、30 fps、H.264、8-bit 4:2:0、AAC；完整解码通过。
- 视频帧时长 37.100 秒；容器时长 37.120 秒，差异来自 AAC 封装补齐。
- `docs/storyboard.jpg` 从本版实际 MP4 抽取，覆盖 12 段画面。
- 源码检查：风铃、莲叶、星图、鱼群、花朵、夏日徽章、五线谱、唱片及播放器已替换为秋日邮局意象；原薄荷绿、湖蓝、亮黄色主色未出现在当前画面组件中。
- 未增加依赖；保留本地音轨、分镜时长与帧驱动动画方式。

成片文件为 `out/autumn-post-office.mp4`。媒体信息和 SHA-256 见 `render-verification.json`。本记录证明本地渲染及技术检查通过，艺术效果以实际成片为准。
