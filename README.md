Amazon Image pickup
===
```
Create : 2023-12-6
Author : Yugeta.Koji
```

# Summary
- 2023/12/31にAmazonのブログなどへの掲載用のアフェリエイトイメージタグが表示停止するので、その代替になるアフェリエイト用の画像とリンクを生成するシステムを構築。


# url
https://yugeta.github.io/amazon_affiliate_link_maker/src/
<!-- <<<<<<< Updated upstream
- [PHP版] https://amazon.affiliate.myntinc.com/
- [GAS版] https://yugeta.github.io/amazon_affiliate_link_maker/src/
=======
- https://amazon.affiliate.myntinc.com/

# DOM仕様 : Amazonサイトの取得ルール
- 

>>>>>>> Stashed changes -->

# extensions 同期（最小構成）
- 目的: src の共有ファイルだけを extensions/contents に反映する。
- 方針: 拡張機能専用のファイル（main/event/create_crawl/amazon/element など）は上書きしない。

実行手順:
1. `chmod +x scripts/sync_src_to_extensions.sh`
2. `./scripts/sync_src_to_extensions.sh`

補足:
- 同期対象は `scripts/sync_src_to_extensions.sh` 内の `SYNC_FILES` で管理。
- 将来、共通化を進める場合はこの配列に追加していく。
