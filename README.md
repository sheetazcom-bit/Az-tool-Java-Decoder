# 🚀 Az-tool-Java-Decoder (SheetAZ Code Tool v4.0 Ultra Pro)

Công cụ trực tuyến toàn diện giúp dịch mã hóa, giải mã deobfuscate JavaScript & Java, decode Base64, Hex, Unicode Escape \uXXXX, Unpack Packer, Beautify và tối ưu hóa code trực tiếp trên trình duyệt hoặc qua REST API.

![Version](https://img.shields.io/badge/version-4.0.0-teal.svg)
![DirectAdmin](https://img.shields.io/badge/DirectAdmin-LiteSpeed%20Node.js-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 🌐 Trang Web Trực Tuyến
- **Trang chủ**: [https://tool.sheetaz.com](https://tool.sheetaz.com)
- **API Health Check**: [https://tool.sheetaz.com/api/health](https://tool.sheetaz.com/api/health)

---

## ✨ Tính Năng Nổi Bật (v4.0 Ultra Pro)

### 1. 🔓 Dịch & Giải Mã (Deobfuscator Pro)
- **Dynamic Sandbox String Array Resolver**: Tự động giải mã và thay thế toàn bộ chuỗi từ điển `_0x...(...)` thành tên hàm / phương thức / nhãn văn bản gốc (như `.getElementById()`, `localStorage.getItem()`, v.v.).
- **Khử toàn bộ phép toán làm rối (Hex & Dec)**: Tự động rút gọn các phép tính phức tạp (như `31 * 67 + -9403 * 1 + 7326` hoặc `0x11 * 0x21d + -0x127d * -0x1`) thành số nguyên chuẩn.
- **Xóa sạch mã rác (Dead Code Stripper)**: Bóc tách và xóa sạch vòng lặp IIFE vô nghĩa `(function(_0x..., _0x...){ while(true)... })(...)`.
- **Chuẩn hóa biến & tham số**: Tự động đổi các biến khó đọc thành tên chuẩn ngữ nghĩa (`resolve`, `reject`, `event`, `row`, `item`, `data`, `err`).
- **Unpack Packer**: Tự động giải nén `eval(function(p,a,c,k,e,d)...)` (Dean Edwards P.A.C.K.E.R).
- **Khử lỗi định dạng & thẻ HTML**: Tự động sửa lỗi khoảng trắng thẻ HTML `< script >` ➔ `<script>`, khử mã Hex `\x22` ➔ `"`, `\x0a` ➔ `\n`, `\x20` ➔ `' '`.

### 2. 🛡️ Mã Hóa Bảo Vệ (Obfuscator)
- Mã hóa JavaScript cấp độ Tiêu chuẩn (Standard) và Nâng cao (High Protection).
- Tối ưu và nén gọn mã nguồn (Minify).

### 3. 🔄 Chuyển Đổi Đa Năng (Convert)
- Base64 Encode / Decode.
- Hex Encode / Decode (`\x61` ➔ `a`).
- URL Encode / Decode.
- Java / JS Unicode Escape `\uXXXX` Encode / Decode (`\u0061` ➔ `a`).

---

## 🛠️ Cấu Trúc Dự Án
```
Az-tool-Java-Decoder/
├── index.html                           # Giao diện Web Tool (TailwindCSS, Dark Mode)
├── main.js                              # Engine Client-side Deobfuscator v4.0
├── style.css                            # Custom CSS giao diện
├── app.js                               # Backend Express Server (LiteSpeed / Passenger)
├── package.json                         # Node.js dependencies
├── .htaccess                            # Cấu hình Web Server & Anti-Cache
├── code_hoan_chinh_100_percent_clean.js # Bản code mẫu đã giải mã 100%
├── push_to_github.ps1                   # Script tự động commit & push lên GitHub 1-click
└── README.md                            # Tài liệu hướng dẫn
```

---

## 📦 Triển Khai & Cập Nhật

### Đẩy mã nguồn lên GitHub (1-Click)
Mở PowerShell tại thư mục dự án và chạy:
```powershell
.\push_to_github.ps1
```

Hoặc qua Git CLI:
```bash
git add .
git commit -m "update code"
git push origin main
```

---

## 📜 Bản Quyền
Phát triển bởi **SheetAZ System** © 2026.
Tối ưu hóa cho DirectAdmin, VPS LiteSpeed & Node.js Hosting.