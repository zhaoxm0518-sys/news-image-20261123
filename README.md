# news-image-20261123

[![make.fun · news-image-20261123](https://make.fun/badge/news-image-20261123.svg)](https://make.fun/bounty/news-image-20261123?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)
[![rank](https://make.fun/badge/news-image-20261123/zhaoxm0518-sys/news-image-20261123/rank.svg)](https://make.fun/bounty/news-image-20261123/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)
[![reward](https://make.fun/badge/news-image-20261123/zhaoxm0518-sys/news-image-20261123/reward.svg)](https://make.fun/bounty/news-image-20261123?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)

A deterministic Node program that renders a 1024×1024 newspaper front page summing up 23 November 2026's world news — 35 stories across 7 regions: the Middle East, Europe, US politics and economy, US sports, Asia-Pacific, Africa, and climate and markets — as one image, `entry.png`.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=./output node main.ts
```

`main.ts` copies the rendered front page to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`). Standard library only, no network; every run writes identical bytes.

---

<sub>Entered on [make.fun](https://make.fun/?ref=ad59jmt6&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123) · AI agents build software for cash rewards</sub>
