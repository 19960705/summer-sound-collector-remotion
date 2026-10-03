# Summer Sound Collector · Remotion

用 **React + Remotion + SVG** 重建的水彩拼贴动效：风铃、莲叶、星图、鱼群、旋转花瓣、夏日音符，以及黄色黑胶播放器。

**只包含动画本体，不包含 Instagram 页面、头像、文字面板、点赞栏、播放按钮或控件。** 所有视觉元素由组件绘制和逐帧驱动，没有把参考录屏嵌入成片。

关联动效片段：`727b68ee-dc21-4e23-8461-6cdddbf673e3`。

![从实际渲染成片抽取的 12 张关键帧](docs/storyboard.jpg)

## 运行

需要 Node.js 22 LTS 和 npm。首次渲染时 Remotion 会自动下载 Chrome Headless Shell，需要联网；安装完成后渲染使用本地字体和音轨。

```bash
npm ci
npm start
```

在 Remotion Studio 中选择 `SummerSoundCollector`，可拖动时间轴逐帧查看。

如果机器已有兼容的 Chrome / Chrome Headless Shell，可设置 `REMOTION_BROWSER_EXECUTABLE` 为它的可执行文件绝对路径，复用浏览器以跳过下载。未设置时使用 Remotion 默认下载流程。

## 渲染

```bash
# 完整成片：1920 × 1080，30 fps，37.1 秒，H.264 + AAC
npm run render

# 快速预览：960 × 540
npm run render:preview

# 12 个关键帧
npm run stills

# TypeScript 检查和静态打包
npm run typecheck
npm run build

# 完整成片的媒体元数据与全片解码验证；需 ffmpeg / ffprobe
npm run verify
```

视频输出：`out/summer-sound-collector.mp4`。预览渲染与完整渲染使用同一路径；`verify` 要求完整 1080p 版本，预览后请重新运行完整渲染。

无声渲染：

```bash
npm run render -- --props='{"sound":false}'
```

无声版本没有音轨，因此不适用默认 `verify` 的音轨检查。

## 分镜与实现

| 时间 | 画面 | 动作 |
| --- | --- | --- |
| 0–2.85 s | HELLO / collector? / ARE YOU，双风铃 | 轻摆，整组向上移出 |
| 2.85–4.80 s | 莲叶卡片与「蓮」 | 卡片升入、茎叶摇动、上移 |
| 4.80–7.80 s | 蓝紫椭圆星图 | 星星闪动、连线描绘、扩张 |
| 7.80–12.65 s | 青蓝渐变横幅鱼塘 | 多层鱼群、尾鳍与水面细线 |
| 12.65–15.95 s | 垂挂串珠、柳叶和池塘 | 鱼群沿对角线游出 |
| 15.95–18.75 s | 粉色画布、蓝黄花朵 | 花瓣展开旋转、蝴蝶漂移、花瓣擦拭 |
| 18.75–20.95 s | 여름 / なつ / 夏 / SUMMER | 水彩徽章与星形轻浮动 |
| 20.95–24.45 s | 薄荷绿椭圆五线谱 | 珊瑚色音符流动、整体右移 |
| 24.45–28.80 s | 黑胶与黄色几何块 | 放大图形缩小、移动组装 |
| 28.80–31.60 s | 黄色唱片播放器 | 细节显现、唱片旋转、浅色倒影 |
| 31.60–34.65 s | 播放器、莲叶和装饰框 | 画框描边、文字显现 |
| 34.65–37.10 s | 薄荷色水滴图形 | 微小旋转、停留收尾 |

`src/timing.ts` 维护时序；`src/scenes.tsx` 维护分镜；`src/art.tsx` 维护可复用图形和水彩滤镜；`src/Film.tsx` 负责场景选择、字体加载与音轨。

水彩以固定种子的 SVG 噪声、色彩混合和边缘位移实现。每帧只依赖 Remotion 的当前帧，不使用 CSS animation、计时器或非确定性随机数。

## 素材与还原边界

- 参考：用户提供的录屏，画面内署名为 `see.yrup`。原始录屏只用于本地分析，未放进公开仓库。
- 构图、配色、分镜顺序和主要动作依据参考重建。水彩笔触、手写字形、细小装饰和部分复杂转场是代码近似，并非原工程或逐像素复原。
- `public/audio/reference-soundtrack.m4a` 是本次用户提供参考的音轨，保留原时间轴，用于此次复刻。不是新作曲，原视听内容的权利归各自权利人；本仓库不声明拥有其版权或授予第三方再使用权。
- 字体为 Gaegu、Mr De Haviland、Zen Kurenaido，来自 Fontsource；各字体许可证随 npm 包提供。
- 未保存或提交参考视频的签名下载地址、绑定凭证、账号凭证或浏览器登录信息。
- Remotion 的商业使用条件见其官方许可证；本项目未调用云渲染或付费生成服务。

仓库提供源代码、锁文件、本地音轨、检查脚本与关键帧预览。完整渲染文件位于本地 `out/`，默认不加入 Git。
