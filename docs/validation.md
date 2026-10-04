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
- `npm run check:transition`：信箱交接前后第 863、864 帧图像完全一致；另检查组装前、中、后 9 张关键帧。
- 配乐为本地新编写的 Letters in October；AAC 立体声，44.1 kHz，素材时长 37.100 秒。
- 成片配乐综合响度 -19.5 LUFS、真峰值 -4.4 dBFS、响度范围 3.1 LU；完整音轨解码通过，无削波。此项为技术测量，不等于试听偏好验收。
- 未增加 npm 依赖；配乐生成使用本机 Swift / AVAudioEngine 和 FFmpeg；分镜总时长保持不变。

成片文件为 `out/autumn-post-office.mp4`。媒体信息和 SHA-256 见 `render-verification.json`。本记录证明本地渲染及技术检查通过，艺术效果以实际成片为准。
