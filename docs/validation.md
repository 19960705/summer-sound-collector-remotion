# 验证结果

验证日期：2026-10-04（Asia/Taipei）。

- Node.js 22.22.3；npm 10.9.8；Remotion 4.0.532。
- `npm run typecheck`：通过。
- `npm run build`：通过，生成本地静态包。
- `npm start -- --port=3127`：Studio 启动，HTTP 200。
- `npm run stills`：12 个场景的实际浏览器渲染通过，手动对照参考关键帧。
- `npm run render`：完整 1113 帧渲染和编码完成。当前机器通过 `REMOTION_BROWSER_EXECUTABLE` 复用已有 Chrome Headless Shell。
- `npm run verify`：1920 × 1080、30 fps、H.264、8-bit 4:2:0、AAC、全片解码通过。
- 视频帧时长 37.100 秒；MP4 容器时长 37.120 秒，差异来自 AAC 音频封装补齐。
- `docs/storyboard.jpg` 从实际 MP4 抽取，覆盖 12 段画面。
- 发布前已检查待提交文本，不含签名下载地址、绑定凭证或访问令牌。

完整媒体信息与文件 SHA-256 见 `render-verification.json`。这证明本地工程与成片可运行，不代表逐像素一致或用户艺术验收完成。具体还原差异见 README。
