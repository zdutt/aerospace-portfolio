# make-ai-bundle.ps1
# Create a clean ZIP of your Next.js project for ChatGPT (excludes node_modules/.next).
param(
  [string]$OutDir = ".\_ai_out",
  [string]$ZipName = "ai_bundle.zip"
)

$ErrorActionPreference = "Stop"

# WHAT TO INCLUDE (edit to taste)
$include = @(
  "src",
  "public",
  "package.json",
  "tsconfig.json",
  "next.config.js",
  "tailwind.config.js",
  "postcss.config.js",
  ".eslintrc.json",
  ".prettierrc",
  "README.md",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock"
)

# 0) Prep output work dir
Remove-Item $OutDir -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

# 1) Copy included paths (but never node_modules/.next/.git)
$excludeDirs = @("node_modules", ".next", ".git")
foreach ($p in $include) {
  if (-not (Test-Path $p)) { continue }
  $dest = Join-Path $OutDir $p
  if (Test-Path $p -PathType Container) {
    Copy-Item $p -Destination $dest -Recurse -Force -Exclude $excludeDirs
    # Remove excluded directories if they were nested
    foreach ($ex in $excludeDirs) {
      Get-ChildItem -Path $dest -Recurse -Directory -Filter $ex -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
    }
  } else {
    New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
    Copy-Item $p -Destination $dest -Force
  }
}

# 2) Generate FILEMAP.md (simple tree of files under src/ and public/)
$mapFile = Join-Path $OutDir "FILEMAP.md"
$lines = @("# File map", "")
foreach ($d in @("src","public")) {
  $root = Join-Path $OutDir $d
  if (Test-Path $root) {
    $lines += "## $d"
    $files = Get-ChildItem $root -Recurse -File | Sort-Object FullName
    foreach ($f in $files) {
      $rel = $f.FullName.Substring($OutDir.Length + 1)
      $sizeKB = [math]::Round($f.Length / 1KB, 1)
      $lines += "- $rel ($sizeKB KB)"
    }
    $lines += ""
  }
}
$lines | Set-Content -Encoding utf8 $mapFile

# 3) Generate SHA256 manifest for all files in the bundle
$manifest = Join-Path $OutDir "AI_MANIFEST_SHA256.txt"
(Get-ChildItem $OutDir -Recurse -File | ForEach-Object {
  $h = Get-FileHash -Algorithm SHA256 -Path $_.FullName
  "{0}  {1}" -f $h.Hash, ($_.FullName.Substring($OutDir.Length + 1))
}) | Set-Content -Encoding utf8 $manifest

# 4) Zip the working dir into ai_bundle.zip at the project root
Remove-Item $ZipName -Force -ErrorAction SilentlyContinue
Compress-Archive -Path "$OutDir\*" -DestinationPath $ZipName -CompressionLevel Optimal

Write-Host "Created $ZipName" -ForegroundColor Green
