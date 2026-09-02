# SheetAZ - Tool Dịch Mã Hóa & Deobfuscator Code Pro

Công cụ giải mã, làm sạch mã nguồn (Deobfuscator), khử rối (Unpack Packer), chuyển đổi định dạng (Base64, Hex, Unicode Escape \uXXXX, URL) và bảo vệ mã nguồn (Obfuscator) cho JavaScript, Google Apps Script và Java.

## Tính năng chính
- **Dịch & Làm sạch Code (Deobfuscate & Clean Pro)**:
  - Tự động rút gọn toàn bộ biểu thức số học rườm rà (`31 * 67 + -9403 * 1 + 7326` -> `0`).
  - Tự động đổi tên các biến `_0x...` thành tên biến gợi nhớ (`getString`, `stringList`, `row`, `item`...).
  - Tự động xóa lỗi thẻ HTML bị cách chữ (`< script >` -> `<script>`) và unescape HTML tags (`\<div` -> `<div>`).
  - Khử mã Hex (`\x22` -> `"`, `\x0a` -> `\n`, `\x20` -> khoảng trắng).
  - Unpack `eval(function(p,a,c,k,e,d)...)` (Dean Edwards Packer).
- **Mã hóa Code (Obfuscator)**: Standard, High Protection, Minify.
- **Chuyển đổi đa năng (Convert)**: Base64, Hex, URL, Java/JS Unicode Escape `\uXXXX`.

## Triển khai trên Web Server / DirectAdmin
- **Frontend**: HTML5, TailwindCSS, Lucide Icons, JS-Beautify.
- **Backend**: Node.js Express Server (hỗ trợ CloudLinux Passenger / LiteSpeed).

## Tên miền hoạt động
- **Production**: [https://tool.sheetaz.com](https://tool.sheetaz.com)