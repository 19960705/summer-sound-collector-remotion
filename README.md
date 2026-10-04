# 秋日邮局 · The Autumn Post Office

一支用 **Remotion + React + SVG** 制作的水彩拼贴短片：信封、纸飞机、枫叶、邮票、手写信、火漆封印与酒红信箱。暖纸白、陶土橙、酒红和墨褐贯穿全片。

只包含动画本体，没有 Instagram 界面。所有图形由组件绘制，动画由帧号驱动。成片为 **1920 × 1080 / 30 fps / 37.1 秒**，带本地音轨。

关联动效片段：`727b68ee-dc21-4e23-8461-6cdddbf673e3`。

![从实际成片抽取的 12 张关键帧](docs/storyboard.jpg)

## 运行与渲染

需要 Node.js 22 LTS 和 npm。

```bash
npm ci
npm start
```

在 Remotion Studio 中选择 `AutumnPostOffice`。另开终端在同一目录运行：

```bash
npm run render        # 完整 1080p MP4
npm run stills        # 12 张关键帧
npm run typecheck     # TypeScript 检查
npm run build         # 静态打包
npm run verify        # 媒体信息与完整解码检查，需 ffmpeg / ffprobe
npm run check:transition # 检查信箱场景交接前后两帧一致
```

输出视频：`out/autumn-post-office.mp4`。关键帧：`out/autumn-stills/`。验证报告：`out/autumn-verification.json`。

首次渲染会下载 Chrome Headless Shell，需要联网；之后使用本地素材与字体。如果已有兼容浏览器，可将 `REMOTION_BROWSER_EXECUTABLE` 设为其可执行文件绝对路径，跳过下载。

`npm run render:preview` 输出 960 × 540 快速预览，与完整渲染使用同一路径。运行验证前须重新导出完整 1080p 版本。

无声渲染：`npm run render -- --props='{"sound":false}'`。无声版本不适用默认验证脚本中的 AAC 音轨检查。

## 画面与时序

| 时间 | 意象与动作 |
| --- | --- |
| 0–2.85 s | 叠放信封、火漆与 a letter. 手写字，轻摆后上移 |
| 2.85–4.80 s | 枫叶标本卡与「秋」字，卡片升降 |
| 4.80–7.80 s | 邮路地图，信封站点与虚线路径渐显 |
| 7.80–12.65 s | 陶土至酒红色带，多层纸飞机横向飞行 |
| 12.65–15.95 s | 邮票、秋树与落叶，纸飞机斜向穿过 |
| 15.95–18.75 s | 酒红画布上的大枫叶舒展旋转，叶片擦拭 |
| 18.75–20.95 s | DEAR / AUTUMN / POST / TO YOU / OCTOBER 邮票浮动 |
| 20.95–24.45 s | 手写明信片，地址栏逐行描绘 |
| 24.45–28.80 s | 同一组拱顶与箱体连续缩放、减速贴合，细节渐显 |
| 28.80–31.60 s | 酒红信箱、信封与枫叶主画面 |
| 31.60–34.65 s | 秋日邮局片名，信箱、邮票与秋树，邮政边框描边 |
| 34.65–37.10 s | 信封与枫叶火漆，UNTIL THE NEXT LETTER 收尾 |

## 维护

- `src/art.tsx`：统一色板、水彩滤镜、信封、枫叶、纸飞机、邮票、树枝、火漆和信箱。
- `src/scenes.tsx`：12 个分镜的构图与逐帧动作。
- `src/timing.ts`：每个分镜的时间范围、帧率与时长。
- `src/Film.tsx`：字体加载、场景切换和音轨。
- `src/Root.tsx`：Remotion composition 的注册参数。

不使用 CSS animation、定时器或非确定性随机数；固定噪声种子保证同一帧可重复渲染。未增加新依赖。

## 素材说明

水彩质感由 SVG 噪声、混色和边缘位移生成。画面采用秋日邮局设计；分镜时序和水彩拼贴表现参考用户提供的录屏。原录屏只用于本地分析，未提交到仓库。

当前配乐是为本片新编写的纯音乐 **Letters in October**：72 BPM、C 大调、3/4 拍，钢琴、马林巴木琴、拨奏弦乐和轻弦乐。活跃音轨为 `public/audio/letters-in-october.m4a`；音乐编排与乐谱见 `docs/music-arrangement.yaml` 和 `music/letters-in-october.score.json`。

配乐可通过 `npm run music` 重建（需要 macOS、Python 3、Swift 和 FFmpeg，使用系统自带乐器库；不消耗生成额度）。其他系统可直接使用仓库内的成品音轨渲染视频。旋律与编排代码是本项目新写，乐器采样来自 macOS 系统库；仓库不分发系统音色库。原参考音轨文件仅作素材留存，不参与当前渲染，其权利归原权利人。

字体 Gaegu、Mr De Haviland、Zen Kurenaido 来自 Fontsource，许可证随 npm 包提供。

仓库没有签名视频地址、绑定凭证或账号凭证。未使用云渲染或付费生成服务。Remotion 商业使用遵守其官方许可证。

验证说明见 `docs/validation.md`，媒体元数据和 SHA-256 见 `docs/render-verification.json`。
