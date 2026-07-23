#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT_DIR/src"
DST_DIR="$ROOT_DIR/extensions/contents"

if [[ ! -d "$SRC_DIR" ]]; then
  echo "src directory not found: $SRC_DIR" >&2
  exit 1
fi

if [[ ! -d "$DST_DIR" ]]; then
  echo "extensions/contents directory not found: $DST_DIR" >&2
  exit 1
fi

# Keep this as a conservative shared-file list.
# Extension-specific files (main/event/create/element/amazon) are intentionally excluded.
SYNC_FILES=(
  "asset/sample.html"

  "css/control.css"
  "css/footer.css"
  "css/header.css"
  "css/main.css"
  "css/style.css"
  "css/style.min.css"

  "img/amazon.svg"
  "img/analytics-3680198_1280.png"
  "img/banner.png"
  "img/banner.xcf"
  "img/banner2.xcf"
  "img/link-circle.svg"

  "js/asset.js"
  "js/code.js"
  "js/convert.js"
  "js/google_form.js"
  "js/preview.js"
  "js/template.js"
  "js/thumbnail.js"
  "js/url.js"

  "js/loading/README.md"
  "js/loading/loading.css"
  "js/loading/loading.js"
  "js/loading/urlinfo.js"
)

copied=0
skipped=0

for rel in "${SYNC_FILES[@]}"; do
  src="$SRC_DIR/$rel"
  dst="$DST_DIR/$rel"

  if [[ ! -f "$src" ]]; then
    echo "[skip] not found: $rel"
    skipped=$((skipped + 1))
    continue
  fi

  mkdir -p "$(dirname "$dst")"
  cp "$src" "$dst"
  echo "[copy] $rel"
  copied=$((copied + 1))
done

echo
echo "Done. copied=$copied skipped=$skipped"
