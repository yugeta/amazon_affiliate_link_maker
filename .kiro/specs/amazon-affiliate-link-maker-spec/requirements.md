# Requirements Document

## Introduction

Amazon Affiliate Link Maker (AALM) は、Amazonアソシエイトプログラムのアフェリエイトリンクと画像を生成するChrome拡張機能です。2023年12月31日にAmazonの従来のアフェリエイトイメージタグが表示停止となるため、その代替として独自デザインのアフェリエイトバナーを生成する機能を提供します。

## Glossary

- **AALM_Extension**: Amazon Affiliate Link Makerのブラウザ拡張機能
- **Amazon_Product_Page**: Amazonの商品詳細ページ
- **Affiliate_Link**: アソシエイトIDを含むAmazonの商品リンク
- **Associate_ID**: Amazonアソシエイトプログラムで発行されるユーザー固有の識別子
- **Product_Data**: 商品名、価格、画像URL、カテゴリなどの商品情報
- **HTML_Template**: アフェリエイトバナーを生成するためのHTMLテンプレート
- **Storage_Service**: Chrome拡張機能のストレージAPI
- **Preview_Area**: 生成されたバナーを表示するプレビュー領域
- **Source_Textarea**: 生成されたHTMLコードを表示するテキストエリア

## Requirements

### Requirement 1: Amazon商品URLからの情報取得

**User Story:** As a ブログ運営者, I want Amazon商品URLから商品情報を自動取得したい, so that 手動でデータを入力する手間を省ける

#### Acceptance Criteria

1. WHEN ユーザーがAmazon商品URLを入力し作成ボタンをクリックした時, THE AALM_Extension SHALL Amazon_Product_Pageから商品情報を取得する
2. THE AALM_Extension SHALL 商品画像URL、商品名、価格、カテゴリ、販売元情報を抽出する
3. IF 商品情報の取得に失敗した場合, THEN THE AALM_Extension SHALL エラーメッセージを表示する
4. THE AALM_Extension SHALL 取得した商品情報をJSON形式で保持する

### Requirement 2: アフェリエイトリンクの生成

**User Story:** As a アフェリエイター, I want アソシエイトIDを含むリンクを生成したい, so that アフェリエイト収益を得られる

#### Acceptance Criteria

1. WHEN ユーザーがAssociate_IDを設定している時, THE AALM_Extension SHALL 商品URLにAssociate_IDパラメータを付加したAffiliate_Linkを生成する
2. THE AALM_Extension SHALL 生成したAffiliate_LinkをHTML_Templateに埋め込む
3. IF Associate_IDが未設定の場合, THEN THE AALM_Extension SHALL Associate_ID入力を促すメッセージを表示する

### Requirement 3: カスタマイズ可能なバナー生成

**User Story:** As a ブログ運営者, I want バナーのデザインをカスタマイズしたい, so that 自分のサイトのデザインに合わせられる

#### Acceptance Criteria

1. THE AALM_Extension SHALL 画像サイズ（64px、120px、200px、250px、300px、500px）を選択可能にする
2. THE AALM_Extension SHALL フォントサイズ（10px、12px、14px、16px、18px）を選択可能にする
3. THE AALM_Extension SHALL HTML_Templateを編集可能にする
4. THE AALM_Extension SHALL テンプレート内で以下のパラメータを置換可能にする: {{img_size}}, {{img_src}}, {{font_size}}, {{affiliate_url}}, {{category}}, {{unit}}, {{price}}, {{seller_name}}, {{seller_url}}, {{thumbs}}
5. WHEN ユーザーがテンプレートをカスタマイズした時, THE AALM_Extension SHALL カスタマイズ内容をStorage_Serviceに保存する

### Requirement 4: プレビュー機能

**User Story:** As a ブログ運営者, I want 生成されたバナーをプレビューしたい, so that 実際の表示を確認してから使用できる

#### Acceptance Criteria

1. WHEN アフェリエイトリンクが生成された時, THE AALM_Extension SHALL Preview_Areaに生成されたバナーを表示する
2. THE AALM_Extension SHALL プレビューを実際のHTML/CSSでレンダリングする
3. WHEN ユーザーが設定を変更した時, THE AALM_Extension SHALL プレビューをリアルタイムで更新する

### Requirement 5: HTMLコードの出力とコピー

**User Story:** As a ブログ運営者, I want 生成されたHTMLコードを簡単にコピーしたい, so that 自分のブログに素早く貼り付けられる

#### Acceptance Criteria

1. WHEN アフェリエイトリンクが生成された時, THE AALM_Extension SHALL 完全なHTMLコードをSource_Textareaに表示する
2. WHEN ユーザーがSource_Textareaをクリックした時, THE AALM_Extension SHALL HTMLコードをクリップボードに自動コピーする
3. WHEN ユーザーが「style tag除外」チェックボックスをチェックした時, THE AALM_Extension SHALL styleタグを除外したHTMLコードを生成する
4. WHEN クリップボードへのコピーが完了した時, THE AALM_Extension SHALL コピー完了を示す視覚的フィードバックを表示する

### Requirement 6: 設定の永続化

**User Story:** As a ユーザー, I want 設定を保存したい, so that 毎回入力する手間を省ける

#### Acceptance Criteria

1. THE AALM_Extension SHALL Associate_ID、画像サイズ、フォントサイズ、HTML_TemplateをStorage_Serviceに保存する
2. WHEN 拡張機能を起動した時, THE AALM_Extension SHALL Storage_Serviceから保存された設定を読み込む
3. THE AALM_Extension SHALL 設定変更時に自動的にStorage_Serviceに保存する

### Requirement 7: オプション設定画面

**User Story:** As a ユーザー, I want 専用の設定画面で設定を管理したい, so that 設定を整理して管理できる

#### Acceptance Criteria

1. THE AALM_Extension SHALL Chrome拡張機能のオプションページを提供する
2. THE AALM_Extension SHALL オプションページでAssociate_ID、画像サイズ、フォントサイズを設定可能にする
3. WHEN オプションページで設定を変更した時, THE AALM_Extension SHALL 変更をStorage_Serviceに保存する
4. THE AALM_Extension SHALL オプションページにAmazonアソシエイトプログラムへのリンクを表示する

### Requirement 8: テンプレートのリセット機能

**User Story:** As a ユーザー, I want カスタマイズしたテンプレートをデフォルトに戻したい, so that 失敗した変更を簡単に元に戻せる

#### Acceptance Criteria

1. THE AALM_Extension SHALL テンプレートリセットボタンを提供する
2. WHEN ユーザーがリセットボタンをクリックした時, THE AALM_Extension SHALL HTML_Templateをデフォルト値に戻す
3. WHEN テンプレートがリセットされた時, THE AALM_Extension SHALL Storage_Serviceの保存内容も更新する

### Requirement 9: エラーハンドリング

**User Story:** As a ユーザー, I want エラーが発生した時に原因を知りたい, so that 問題を解決できる

#### Acceptance Criteria

1. IF 無効なAmazon URLが入力された場合, THEN THE AALM_Extension SHALL 「商品URLを確認してください」というエラーメッセージを表示する
2. IF 商品画像が取得できない場合, THEN THE AALM_Extension SHALL 代替画像またはエラー表示を提供する
3. IF ネットワークエラーが発生した場合, THEN THE AALM_Extension SHALL 「ネットワーク接続を確認してください」というエラーメッセージを表示する
4. THE AALM_Extension SHALL エラーメッセージをユーザーに分かりやすい日本語で表示する

### Requirement 10: Chrome拡張機能の権限管理

**User Story:** As a ユーザー, I want 拡張機能が必要最小限の権限のみを要求することを確認したい, so that セキュリティとプライバシーを保護できる

#### Acceptance Criteria

1. THE AALM_Extension SHALL tabs権限を使用してアクティブタブのURL情報を取得する
2. THE AALM_Extension SHALL storage権限を使用してユーザー設定を保存する
3. THE AALM_Extension SHALL Manifest V3の仕様に準拠する
4. THE AALM_Extension SHALL Content Security Policyに準拠したスクリプト実行を行う
