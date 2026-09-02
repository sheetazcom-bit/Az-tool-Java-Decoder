# Script tu dong Commit & Push len GitHub
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "   SheetAZ - Auto Sync & Push to GitHub       " -ForegroundColor Yellow
Write-Host "==============================================" -ForegroundColor Cyan

$msg = Read-Host "Nhap ghi chu commit (Enter de dung mac dinh: 'update code')"
if ([string]::IsNullOrWhiteSpace($msg)) {
    $msg = "update: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
}

git add .
git commit -m "$msg"
git push origin main

Write-Host "`n[THANH CONG] Ma nguon da duoc dong bo len GitHub!" -ForegroundColor Green
Write-Host "Link Repo: https://github.com/sheetazcom-bit/Az-tool-Java-Decoder.git" -ForegroundColor Cyan