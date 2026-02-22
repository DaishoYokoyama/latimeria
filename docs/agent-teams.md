# Agent Teams

## Overview

Claude Code のサブエージェント（Task tool）を活用したチーム開発プロセス。
4 つの役割を分離し、品質ゲートと振り返りサイクルで継続的に改善する。

## Team Composition

| Role            | Responsibility                                         | Sub-Agent Type    |
| --------------- | ------------------------------------------------------ | ----------------- |
| **Architect**   | コンポーネント設計・Props 定義・レスポンシブ戦略の決定 | `Plan`            |
| **Implementer** | 設計に基づくコード実装                                 | `general-purpose` |
| **Reviewer**    | ガイドライン準拠チェック・アクセシビリティ検証         | `general-purpose` |
| **Builder**     | ビルド検証・出力確認                                   | `Bash`            |

> **Sub-Agent Directive**: All Task tool invocations must specify `model: "opus"`.

## Development Process

各フィーチャー（コンポーネント・ページ単位）は以下のフローで進める。

```
Step 1: Architect (設計)
       │
       ▼ ユーザー承認
Step 2: Implementer (実装)  ← 独立コンポーネントは並列実行可
       │
       ▼
Step 3: Reviewer (レビュー) ← 違反時は Step 2 に差し戻し
       │
       ▼
Step 4: Builder (ビルド検証)
       │
       ▼
Step 5: Commit (Conventional Commits)
       │
       ▼
Step 6: Retrospective (振り返り)
```

### Step 1: Architect (設計)

**入力**: ユーザーからの機能要求
**出力**: 設計ドキュメント（コンポーネント構造・Props・HTML 構造・レスポンシブ方針）

Architect は以下を決定する:

- コンポーネントの分割粒度と命名
- Props インターフェース（TypeScript 型定義）
- セマンティック HTML 構造
- レスポンシブブレークポイント戦略（モバイルファースト）
- 使用するセマンティックカラートークン（Layer 2）

**参照ドキュメント**:

| Document                                  | Purpose                                        |
| ----------------------------------------- | ---------------------------------------------- |
| [Requirements](requirements.md)           | 機能要件・NFR の確認                           |
| [Design Guidelines](design-guidelines.md) | カラートークン・スペーシング・レスポンシブ方針 |
| [Coding Guidelines](coding-guidelines.md) | 命名規則・ディレクトリ構造                     |

**品質ゲート**: ユーザーが設計を承認すること。

### Step 2: Implementer (実装)

**入力**: 承認済み設計
**出力**: 実装されたコンポーネント・ページファイル

Implementer は以下のルールを厳守する:

- Tailwind ユーティリティクラスのみ使用
- `<style>` ブロック・`@apply`・inline `style` 属性の禁止
- セマンティック HTML 要素の使用
- TypeScript `interface` による Props 型定義
- セマンティックトークン（Layer 2）を優先使用

**参照ドキュメント**:

| Document                                  | Purpose                                        |
| ----------------------------------------- | ---------------------------------------------- |
| [Coding Guidelines](coding-guidelines.md) | スタイリングルール・命名規則・アクセシビリティ |
| [Design Guidelines](design-guidelines.md) | カラートークン・スペーシング                   |
| `src/styles/global.css`                   | 利用可能なトークン一覧                         |

**並列化**: 互いに依存しないコンポーネントは複数の Implementer を同時実行できる。

```
Architect 設計完了
       │
       ├── Implementer A: Header
       ├── Implementer B: Footer
       └── Implementer C: HeroSection
       │
       ▼ 全完了後
   Reviewer が一括レビュー
```

**品質ゲート**: 全ファイルが書き終わっていること。

### Step 3: Reviewer (レビュー)

**入力**: 実装済みファイル一式
**出力**: レビュー結果（LGTM or 違反リスト）

Reviewer は以下の観点でチェックする:

#### チェックリスト

- [ ] `<style>` ブロックが存在しない
- [ ] `@apply` が使用されていない
- [ ] inline `style` 属性が存在しない
- [ ] セマンティック HTML 要素を適切に使用している
- [ ] Props が TypeScript `interface` で型定義されている
- [ ] `any` 型が使用されていない
- [ ] モバイルファーストの記述順（ベース → `md:` → `lg:`）
- [ ] セマンティックトークン（Layer 2）を優先使用している
- [ ] `<img>` タグに `alt` 属性がある
- [ ] 見出し階層がスキップされていない
- [ ] コンポーネント名が PascalCase である
- [ ] ページ名が kebab-case である

**参照ドキュメント**:

| Document                                  | Purpose                        |
| ----------------------------------------- | ------------------------------ |
| [CLAUDE.md](../CLAUDE.md)                 | DO / DO NOT ルール             |
| [Coding Guidelines](coding-guidelines.md) | 全コーディングルール           |
| [Design Guidelines](design-guidelines.md) | デザイントークンの正しい使用法 |

**品質ゲート**: 違反ゼロ。違反がある場合は Implementer に差し戻し、修正後に再レビュー。

### Step 4: Builder (ビルド検証)

**入力**: レビュー通過済みコード
**出力**: ビルド成功の確認

Builder は以下を実行する:

```sh
npm run build
```

確認事項:

- ビルドエラーがないこと
- TypeScript の型エラーがないこと
- 警告が想定外に増えていないこと

**品質ゲート**: `npm run build` が成功すること。

### Step 5: Commit

[Git Rules](git-rules.md) に従い Conventional Commits 形式でコミットする。

### Step 6: Retrospective (振り返り)

フィーチャー完了後に振り返りを実施する。詳細は後述の [Retrospective Process](#retrospective-process) を参照。

## Retrospective Process

各フィーチャーの完了時（コミット後）に以下の振り返りを実施する。
このプロセスにより、ガイドラインが「生きたドキュメント」として成長し続ける。

### 振り返りの観点

| Category             | Question                                                                         |
| -------------------- | -------------------------------------------------------------------------------- |
| **ガイドライン違反** | レビューで検出された違反パターンは何か？再発防止のためにルール化すべきか？       |
| **設計判断**         | Architect の判断で修正が必要だったものはあるか？設計パターンとして記録すべきか？ |
| **実装パターン**     | 繰り返し使われた実装パターンがあるか？共通コンポーネント化すべきか？             |
| **プロセス改善**     | チームプロセス自体に改善の余地はあるか？                                         |
| **ドキュメント不足** | 既存ガイドラインに記載がなく判断に迷った点はあるか？                             |

### 振り返りの出力

振り返りの結果は以下のアクションに変換する:

1. **Lessons Learned の更新**: 該当するガイドラインドキュメントの Lessons Learned セクションにルールを追加
2. **ガイドラインの更新**: 既存ルールの修正・補足が必要な場合はドキュメント本体を更新
3. **チェックリストの拡充**: Reviewer のチェックリストに新しい項目を追加
4. **Auto Memory の更新**: `~/.claude/projects/` 配下の MEMORY.md にプロジェクト横断の知見を記録

### 振り返りの対象ドキュメント

| Document                                  | 更新される内容                           |
| ----------------------------------------- | ---------------------------------------- |
| [Coding Guidelines](coding-guidelines.md) | コーディングルール・命名規則             |
| [Design Guidelines](design-guidelines.md) | デザイントークン・レイアウトパターン     |
| [Git Rules](git-rules.md)                 | コミットルール                           |
| [Requirements](requirements.md)           | 要件の明確化・追加                       |
| **This document**                         | チームプロセスの改善・チェックリスト拡充 |

## Orchestrator Role

メインの Claude Code セッション（Orchestrator）は以下の責務を持つ:

- ユーザーとのコミュニケーション
- 各エージェントの起動・結果の統合
- 品質ゲートの判定
- 差し戻し・再実行の判断
- 振り返りの実施とドキュメント更新

Orchestrator 自身はコードを直接書かず、サブエージェントに委譲する。
ただし、軽微な修正（レビュー指摘の1箇所修正など）は直接行ってよい。

## Anti-Patterns

以下のパターンを避けること:

| Anti-Pattern                 | Why                            | Instead                   |
| ---------------------------- | ------------------------------ | ------------------------- |
| 設計なしの実装開始           | 手戻りが多発する               | 必ず Architect から始める |
| レビュースキップ             | ガイドライン違反が本番に残る   | 全実装に Reviewer を通す  |
| 振り返りスキップ             | 同じミスを繰り返す             | 毎フィーチャー後に実施    |
| 1 エージェントに全工程       | コンテキストが肥大化し品質低下 | 役割を分離する            |
| 依存コンポーネントの並列実装 | 整合性が取れない               | 依存関係を先に解決する    |

## Lessons Learned

<!-- Add rules discovered through retrospectives below -->

- 軽微なリファクタリング（クラス名の一括置換等）では Architect エージェントを省略し、プランが Architect の役割を兼ねてよい。ただし変更対象・変更前後の値を明確にプランに記載すること。
- Reviewer / Builder が軽微な場合（チェックリストの確認のみ、ビルドコマンド実行のみ）は lead が直接実施してよい。エージェント起動のオーバーヘッドを避ける。
- Implementer に渡す指示は「ファイルパス + 行番号 + 変更前 → 変更後」の形式が最も正確。曖昧な指示は誤実装の原因になる。
