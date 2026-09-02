/**
 * SheetAZ - Code Deobfuscator & Decoder Pro Engine v4.5
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Elements
  const codeSource = document.getElementById('codeSource');
  const codeResult = document.getElementById('codeResult');
  const btnProcess = document.getElementById('btnProcess');
  const btnProcessText = document.getElementById('btnProcessText');
  const btnFormatInput = document.getElementById('btnFormatInput');
  const btnSample = document.getElementById('btnSample');
  const btnClearAll = document.getElementById('btnClearAll');
  const btnCopyOutput = document.getElementById('btnCopyOutput');
  const btnDownloadOutput = document.getElementById('btnDownloadOutput');
  const fileInput = document.getElementById('fileInput');
  const btnPasteInput = document.getElementById('btnPasteInput');
  const inputStats = document.getElementById('inputStats');
  const outputStats = document.getElementById('outputStats');
  const toolOptionsContainer = document.getElementById('toolOptionsContainer');
  const modeTabs = document.querySelectorAll('.mode-tab');
  const loadingOverlay = document.getElementById('loadingOverlay');

  let currentMode = 'deobfuscate';
  let subOption = 'clean_semantic';

  // Option templates per mode
  const optionsMap = {
    deobfuscate: [
      { id: 'clean_semantic', label: '✨ Làm sạch chuẩn & Sửa lỗi <script> (v4.5 Pro)', active: true },
      { id: 'clean_escapes_only', label: '🧹 Xóa lỗi \\x22, \\x0a, < script >' },
      { id: 'auto_deobfuscate', label: 'Tự động Deobfuscate cơ bản' },
      { id: 'unpack_eval', label: 'Unpack Packer / eval(p,a,c,k)' },
      { id: 'decode_hex_unicode', label: 'Decode Hex \\x & Unicode \\u' },
      { id: 'beautify_only', label: 'Làm đẹp Code (Beautify)' }
    ],
    obfuscate: [
      { id: 'obf_standard', label: 'Mã hóa Tiêu chuẩn (Standard)', active: true },
      { id: 'obf_high', label: 'Mã hóa Nâng cao (High Protection)' },
      { id: 'obf_minify', label: 'Nén gọn mã (Minify Only)' }
    ],
    convert: [
      { id: 'base64_decode', label: 'Base64 Decode (UTF-8)', active: true },
      { id: 'base64_encode', label: 'Base64 Encode (UTF-8)' },
      { id: 'hex_decode', label: 'Hex Decode (UTF-8)' },
      { id: 'hex_encode', label: 'Hex Encode (UTF-8)' },
      { id: 'url_decode', label: 'URL Decode' },
      { id: 'url_encode', label: 'URL Encode' },
      { id: 'unicode_decode', label: 'Java/JS Unicode Decode' },
      { id: 'unicode_encode', label: 'Java/JS Unicode Encode' }
    ]
  };

  // Render Sub Options
  function renderOptions() {
    if (!toolOptionsContainer) return;
    toolOptionsContainer.innerHTML = '';
    const opts = optionsMap[currentMode] || [];
    opts.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isActive = opt.id === subOption;
      btn.className = 'opt-chip px-3 py-1 rounded-lg border text-xs font-medium transition ' +
        (isActive
          ? 'active bg-teal-500/10 border-teal-500/50 text-teal-300'
          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200');
      btn.textContent = opt.label;
      btn.onclick = () => {
        subOption = opt.id;
        renderOptions();
      };
      toolOptionsContainer.appendChild(btn);
    });

    if (btnProcessText) {
      if (currentMode === 'deobfuscate') {
        btnProcessText.textContent = subOption === 'clean_semantic' ? 'Làm Sạch Triệt Để Code' : 'Thực thi Dịch & Giải Mã';
      } else if (currentMode === 'obfuscate') {
        btnProcessText.textContent = 'Thực thi Mã Hóa Code';
      } else {
        btnProcessText.textContent = 'Thực thi Chuyển Đổi';
      }
    }
  }

  // Switch Mode
  modeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      modeTabs.forEach((t) => {
        t.classList.remove('active', 'text-teal-400', 'bg-slate-800', 'shadow');
        t.classList.add('text-slate-400');
      });
      tab.classList.add('active', 'text-teal-400', 'bg-slate-800', 'shadow');
      tab.classList.remove('text-slate-400');
      currentMode = tab.dataset.mode;
      subOption = optionsMap[currentMode][0].id;
      renderOptions();
    });
  });

  renderOptions();

  // Update statistics
  function updateStats() {
    const inVal = codeSource ? codeSource.value || '' : '';
    const inLines = inVal ? inVal.split('\n').length : 0;
    if (inputStats) {
      inputStats.textContent = inVal.length.toLocaleString() + ' ký tự | ' + inLines + ' dòng';
    }

    const outVal = codeResult ? codeResult.value || '' : '';
    const outLines = outVal ? outVal.split('\n').length : 0;
    if (outputStats) {
      outputStats.textContent = outVal.length.toLocaleString() + ' ký tự | ' + outLines + ' dòng';
    }
  }

  if (codeSource) {
    codeSource.addEventListener('input', updateStats);
  }

  // Toast Helper
  function showToast(message, isSuccess = true) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.className =
      'fixed bottom-6 right-6 z-50 transform opacity-100 transition-all duration-300 bg-slate-900 border ' +
      (isSuccess ? 'border-teal-500/50 text-teal-300' : 'border-rose-500/50 text-rose-300') +
      ' px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-medium translate-y-0';

    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3000);
  }

  // Post-Process: Fix any HTML tag spacing inserted by JS Beautifier
  function fixAllHtmlTags(str) {
    if (!str) return str;
    let res = str;
    res = res.replace(/<\s*script\s*>/gi, '<script>');
    res = res.replace(/<\s*script\s+([^>]+)>/gi, (m, attrs) => '<script ' + attrs.trim() + '>');
    res = res.replace(/<\s*\/\s*script\s*>/gi, '</script>');
    res = res.replace(/<\s*style\s*>/gi, '<style>');
    res = res.replace(/<\s*style\s+([^>]+)>/gi, (m, attrs) => '<style ' + attrs.trim() + '>');
    res = res.replace(/<\s*\/\s*style\s*>/gi, '</style>');
    res = res.replace(/<\s*(\/)?\s*(div|span|button|input|textarea|select|option|p|h[1-6]|table|tr|td|th|ul|li|i|b|strong|em|form|head|body|html)\s*>/gi, '<$1$2>');
    res = res.replace(/<\s*(\/)?\s*(div|span|button|input|textarea|select|option|p|h[1-6]|table|tr|td|th|ul|li|i|b|strong|em|form|head|body|html)\s+([^>]+)>/gi, (m, slash, tag, attrs) => {
      return '<' + (slash || '') + tag + ' ' + attrs.trim() + '>';
    });
    return res;
  }

  // Beautifier helper
  function formatCode(code) {
    let res = code;
    if (window.js_beautify) {
      try {
        res = window.js_beautify(res, {
          indent_size: 2,
          space_in_empty_paren: true,
          preserve_newlines: true,
          max_preserve_newlines: 2,
          wrap_line_length: 120
        });
      } catch (e) {
        console.warn('Beautify fallback:', e);
      }
    }
    return fixAllHtmlTags(res);
  }

  // --- Deobfuscation Core Pipeline ---

  // 1. Unpack Dean Edwards P.A.C.K.E.R
  function unpackPacker(code) {
    if (!/eval\s*\(\s*function\s*\(\s*p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,\s*[dr]/i.test(code)) {
      return null;
    }
    try {
      const match = code.match(/}\s*\('(.*?)'\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*'(.*?)'\.split\('\|'\)/s);
      if (match) {
        let p = match[1];
        const a = parseInt(match[2], 10);
        let c = parseInt(match[3], 10);
        const k = match[4].split('|');

        const eFunc = (val) => {
          return (val < a ? '' : eFunc(parseInt(val / a, 10))) +
            ((val = val % a) > 35 ? String.fromCharCode(val + 29) : val.toString(36));
        };

        while (c--) {
          if (k[c]) {
            const key = eFunc(c);
            p = p.replace(new RegExp('\\b' + key + '\\b', 'g'), k[c]);
          }
        }
        return p;
      }
    } catch (e) {
      console.warn('Packer unpack error:', e);
    }
    return null;
  }

  // 2. Decode Escapes & Clean Formatting Glitches (< script >, \x22, \x0a, \<div)
  function decodeEscapeSequences(code) {
    let res = code;

    res = fixAllHtmlTags(res);
    res = res.replace(/<\s*['"]([a-zA-Z0-9\-_]+)['"]\s*,\s*function\s*\(\s*>?/g, "'$1', function(");
    res = res.replace(/\\<(\/?[a-zA-Z0-9\-]+)/g, '<$1');
    res = res.replace(/\\>(\/?[a-zA-Z0-9\-]+)?/g, '>$1');

    res = res.replace(/\\x22/g, '"');
    res = res.replace(/\\x27/g, "\\'");
    res = res.replace(/\\x20/g, ' ');
    res = res.replace(/\\x2f/gi, '/');
    res = res.replace(/\\x3c/gi, '<');
    res = res.replace(/\\x3e/gi, '>');
    res = res.replace(/\\x0a/gi, '\\n');
    res = res.replace(/\\x0d/gi, '\\r');
    res = res.replace(/\\x09/gi, '\\t');

    res = res.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
      const codePoint = parseInt(hex, 16);
      const char = String.fromCharCode(codePoint);
      return codePoint >= 32 && codePoint <= 126 && char !== '"' && char !== "'" && char !== '\\'
        ? char
        : match;
    });

    res = res.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
      const codePoint = parseInt(hex, 16);
      const char = String.fromCharCode(codePoint);
      return codePoint >= 32 && codePoint <= 126 && char !== '"' && char !== "'" && char !== '\\'
        ? char
        : match;
    });

    return res;
  }

  // 3. Fold Arithmetic Expressions (Hex & Decimal, multiline)
  function foldArithmeticExpressions(code) {
    let res = code;

    res = res.replace(/return\s*!\s*\[\]/g, 'return false');
    res = res.replace(/return\s*!!\s*\[\]/g, 'return true');
    res = res.replace(/(?:^|[^a-zA-Z0-9_$])!\s*\[\]/g, ' false');
    res = res.replace(/(?:^|[^a-zA-Z0-9_$])!!\s*\[\]/g, ' true');

    res = res.replace(/([\+\-\*\/])\s*\n\s*/g, '$1 ');
    res = res.replace(/(?:^|[,\[\(:\s=])-\s*\n\s*(0x[0-9a-fA-F]+|\d+)/g, '-$1');
    res = res.replace(/([\+\-\*\/])\s*-\s*-\s*/g, '$1 +');
    res = res.replace(/([\+\-\*\/])\s*-\s*(\d+|0x[0-9a-fA-F]+)/g, '$1 -$2');
    res = res.replace(/([\+\-\*\/])\s*\+\s*(\d+|0x[0-9a-fA-F]+)/g, '$1 $2');
    res = res.replace(/(?:^|[,\[\(:\s=])-\s+(\d+|0x[0-9a-fA-F]+)/g, '-$1');

    let prev = '';
    let iter = 0;
    const mathRegex = /(?:(?<=[\[\(,\s=:\+\-\*\/])|^)((?:-?(?:0x[0-9a-fA-F]+|\d+)\s*[\+\-\*\/]\s*)+-?(?:0x[0-9a-fA-F]+|\d+))(?=[\]\),\s;:]|$)/g;
    while (prev !== res && iter < 30) {
      prev = res;
      res = res.replace(mathRegex, (match, expr) => {
        try {
          const val = Function('"use strict"; return (' + expr + ')')();
          return typeof val === 'number' && !isNaN(val) ? val.toString() : match;
        } catch (e) {
          return match;
        }
      });
      iter++;
    }

    res = res.replace(/\b0x([0-9a-fA-F]+)\b/g, (m, hex) => {
      const val = parseInt(hex, 16);
      return isNaN(val) ? m : val.toString();
    });

    return res;
  }

  // 4. Simplify Member Expressions & Literals
  function simplifyMemberExpressions(code) {
    let res = code;
    res = res.replace(/\[\s*['"]([a-zA-Z_$][a-zA-Z0-9_$]*)['"]\s*\]/g, '.$1');
    return res;
  }

  // 5. Dynamic Sandbox String Array Resolver
  function resolveStringArrays(code) {
    let res = code;
    try {
      const arrayMatch = res.match(/function\s+([_0-9a-zA-Z]+)\s*\(\)\s*\{[\s\S]*?(?:const|var|let)\s+([_0-9a-zA-Z]+)\s*=\s*(\[[^\]]+\])[\s\S]*?return\s+[_0-9a-zA-Z]+;?\s*\}/);
      if (arrayMatch) {
        const arrayFnName = arrayMatch[1];
        const rotatorMatch = res.match(new RegExp('\\(function\\s*\\([\\s\\S]*?\\}\\s*\\(' + arrayFnName + ',\\s*([\\d\\sx+\\-*\/]+)\\)\\);?'));
        const accessorMatch = res.match(new RegExp('function\\s+([_0-9a-zA-Z]+)\\s*\\([\\w$,\\s]+\\)\\s*\\{[\\s\\S]*?' + arrayFnName + '[\\s\\S]*?\\}'));

        if (rotatorMatch && accessorMatch) {
          const accessorName = accessorMatch[1];
          const sandboxScript = `${arrayMatch[0]}; ${rotatorMatch[0]}; ${accessorMatch[0]}; return ${accessorName};`;
          const decodeFn = new Function(sandboxScript)();

          const aliases = [accessorName];
          const aliasMatches = res.matchAll(new RegExp('(?:const|var|let)\\s+([_0-9a-zA-Z]+)\\s*=\\s*' + accessorName, 'g'));
          for (const am of aliasMatches) {
            aliases.push(am[1]);
          }

          aliases.forEach(al => {
            const callRegex = new RegExp('\\b' + al + '\\s*\\(\\s*(\\d+|0x[0-9a-fA-F]+)\\s*\\)', 'g');
            res = res.replace(callRegex, (m, arg) => {
              try {
                const num = parseInt(arg, arg.startsWith('0x') ? 16 : 10);
                const val = decodeFn(num);
                return typeof val === 'string' ? JSON.stringify(val) : m;
              } catch (e) {
                return m;
              }
            });
          });

          res = res.replace(arrayMatch[0], '');
          res = res.replace(rotatorMatch[0], '');
          res = res.replace(accessorMatch[0], '');
        }
      }
    } catch (e) {
      console.warn('Sandbox array decode:', e);
    }
    return res;
  }

  // 6. Semantic Variable Renaming & Full Cleanup Pro
  function cleanAndRenameSemantic(code) {
    let res = code;

    const unpacked = unpackPacker(res);
    if (unpacked) res = unpacked;

    res = decodeEscapeSequences(res);
    res = foldArithmeticExpressions(res);
    res = resolveStringArrays(res);
    res = simplifyMemberExpressions(res);

    res = res.replace(/\(function\s*\([_0-9a-zA-Z,\s]+\)\s*\{\s*(?:const|var|let)[\s\S]*?while\s*\((?:true|false)\)[\s\S]*?\}\s*\}\s*\([_0-9a-zA-Z,\s\d+\-*\/]+\)\);?/g, '');
    res = res.replace(/(?:const|var|let)\s+(?:getString|getText|_0x[a-f0-9]+|varItem_[a-f0-9]+)\s*=\s*(?:decodeString|_0x[a-f0-9]+|varItem_[a-f0-9]+)(?:,\s*(?:getString|getText|_0x[a-f0-9]+|varItem_[a-f0-9]+)\s*=\s*(?:decodeString|_0x[a-f0-9]+|varItem_[a-f0-9]+))*;\s*/g, '');

    res = res.replace(/new\s+Promise\(\s*\(\s*(?:varItem_|_0x)[a-f0-9]{4,8}\s*,\s*(?:varItem_|_0x)[a-f0-9]{4,8}\s*\)/g, 'new Promise((resolve, reject)');
    res = res.replace(/\.withSuccessHandler\(\s*(?:varItem_|_0x)[a-f0-9]{4,8}\s*\)/g, '.withSuccessHandler(resolve)');
    res = res.replace(/\.withFailureHandler\(\s*(?:varItem_|_0x)[a-f0-9]{4,8}\s*\)/g, '.withFailureHandler(reject)');
    res = res.replace(/catch\s*\(\s*(?:varItem_|_0x)[a-f0-9]{4,8}\s*\)/g, 'catch (err)');
    res = res.replace(/\bfunction\s*\(\s*(?:varItem_|_0x)[a-f0-9]{4,8}\s*\)/g, 'function(event)');
    res = res.replace(/\b(?:varItem_|_0x)[a-f0-9]{4,8}\s*=>/g, 'row =>');
    res = res.replace(/\b(?:varItem_|_0x)[a-f0-9]{4,8}\s*\.map\(\s*row\s*=>/g, 'items.map(row =>');

    const nameDict = {};
    let count = 1;
    res = res.replace(/\b(?:_0x|varItem_)[a-f0-9]{4,8}\b/g, (match) => {
      if (!nameDict[match]) {
        nameDict[match] = 'item_' + (count++);
      }
      return nameDict[match];
    });

    return formatCode(res);
  }

  // Full Deobfuscation Pipeline
  function runDeobfuscation(code, isSemantic = false) {
    if (isSemantic) {
      return cleanAndRenameSemantic(code);
    }
    let result = code;
    const unpacked = unpackPacker(result);
    if (unpacked) result = unpacked;
    result = decodeEscapeSequences(result);
    result = foldArithmeticExpressions(result);
    result = resolveStringArrays(result);
    result = simplifyMemberExpressions(result);
    return formatCode(result);
  }

  // --- Obfuscation Core (With HTML Tag & Unicode Safety) ---
  function runObfuscationCore(jsCode, type) {
    if (window.JavaScriptObfuscator) {
      // Pre-escape non-ASCII unicode to prevent atob Latin1 error in internal Obfuscator
      const safeJsCode = jsCode.replace(/[^\x00-\x7F]/g, (char) => {
        return '\\u' + ('0000' + char.charCodeAt(0).toString(16)).slice(-4);
      });

      const options = {
        compact: type === 'obf_minify',
        controlFlowFlattening: type === 'obf_high',
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: type === 'obf_high',
        deadCodeInjectionThreshold: 0.4,
        identifierNamesGenerator: 'hexadecimal',
        numbersToExpressions: type === 'obf_high',
        simplify: true,
        splitStrings: type === 'obf_high',
        stringArray: type !== 'obf_minify',
        stringArrayEncoding: type === 'obf_high' ? ['base64', 'rc4'] : ['base64'],
        stringArrayThreshold: 0.8,
        unicodeEscapeSequence: true
      };
      const obfResult = window.JavaScriptObfuscator.obfuscate(safeJsCode, options);
      return obfResult.getObfuscatedCode();
    }
    throw new Error('Không tải được thư viện JavaScript-Obfuscator');
  }

  function runObfuscation(code, type) {
    const raw = code.trim();
    const hasScriptTags = /<\s*script(?:\s+[^>]*)?>[\s\S]*?<\s*\/\s*script\s*>/gi.test(raw);
    const startsWithScript = /^<\s*script(?:\s+[^>]*)?>/gi.test(raw);

    if (hasScriptTags) {
      return raw.replace(/(<\s*script(?:\s+[^>]*)?>)([\s\S]*?)(<\s*\/\s*script\s*>)/gi, (m, openTag, js, closeTag) => {
        if (!js.trim()) return m;
        const obf = runObfuscationCore(js, type);
        const cleanOpen = openTag.replace(/\s+/g, ' ');
        return `${cleanOpen}\n${obf}\n</script>`;
      });
    } else if (startsWithScript) {
      const cleanJS = raw.replace(/^<\s*script(?:\s+[^>]*)?>/gi, '').replace(/<\s*\/\s*script\s*>$/gi, '');
      const obf = runObfuscationCore(cleanJS, type);
      return `<script>\n${obf}\n</script>`;
    } else {
      return runObfuscationCore(raw, type);
    }
  }

  // --- UTF-8 Safe Converters (Base64, Hex, Unicode) ---
  function utf8ToBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) {
      bin += String.fromCharCode(bytes[i]);
    }
    return btoa(bin);
  }

  function base64ToUtf8(b64) {
    const clean = b64.replace(/\s+/g, '');
    if (!clean) return '';
    if (!/^[A-Za-z0-9+/=]+$/.test(clean)) {
      throw new Error('Dữ liệu không phải chuỗi Base64 hợp lệ (chứa ký tự lạ ngoài bảng mã Base64).');
    }
    try {
      const bin = atob(clean);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) {
        bytes[i] = bin.charCodeAt(i);
      }
      return new TextDecoder().decode(bytes);
    } catch (e) {
      throw new Error('Không thể giải mã Base64: ' + e.message);
    }
  }

  function utf8ToHex(str) {
    const bytes = new TextEncoder().encode(str);
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
      hex += '\\x' + bytes[i].toString(16).padStart(2, '0');
    }
    return hex;
  }

  function hexToUtf8(hexStr) {
    const clean = hexStr.replace(/\\x|0x|\s+|[,;]/gi, '');
    if (!clean) return '';
    if (!/^[0-9a-fA-F]+$/.test(clean)) {
      throw new Error('Dữ liệu chứa ký tự không thuộc bảng mã Hex (0-9, a-f).');
    }
    if (clean.length % 2 !== 0) {
      throw new Error('Độ dài chuỗi Hex không hợp lệ (phải là số chẵn).');
    }
    const bytes = new Uint8Array(clean.length / 2);
    for (let i = 0; i < clean.length; i += 2) {
      bytes[i / 2] = parseInt(clean.substr(i, 2), 16);
    }
    return new TextDecoder().decode(bytes);
  }

  function encodeToUnicodeEscapes(str) {
    let uCode = '';
    for (let i = 0; i < str.length; i++) {
      const codePoint = str.charCodeAt(i);
      if (codePoint > 127) {
        uCode += '\\u' + codePoint.toString(16).padStart(4, '0');
      } else {
        uCode += str[i];
      }
    }
    return uCode;
  }

  function decodeUnicodeEscapes(str) {
    return str.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
      return String.fromCharCode(parseInt(grp, 16));
    });
  }

  function runConversion(text, type) {
    switch (type) {
      case 'base64_decode':
        return base64ToUtf8(text);
      case 'base64_encode':
        return utf8ToBase64(text);
      case 'hex_decode':
        return hexToUtf8(text);
      case 'hex_encode':
        return utf8ToHex(text);
      case 'url_decode':
        return decodeURIComponent(text);
      case 'url_encode':
        return encodeURIComponent(text);
      case 'unicode_decode':
        return decodeUnicodeEscapes(text);
      case 'unicode_encode':
        return encodeToUnicodeEscapes(text);
      default:
        return text;
    }
  }

  // --- Process Action Handler ---
  function processAction() {
    if (!codeSource) return;
    const input = codeSource.value;
    if (!input || !input.trim()) {
      showToast('Vui lòng nhập hoặc dán code vào ô nguồn!', false);
      return;
    }

    if (loadingOverlay) loadingOverlay.classList.remove('hidden');

    setTimeout(() => {
      try {
        let output = '';
        if (currentMode === 'deobfuscate') {
          if (subOption === 'clean_semantic') {
            output = cleanAndRenameSemantic(input);
          } else if (subOption === 'clean_escapes_only') {
            output = formatCode(decodeEscapeSequences(input));
          } else if (subOption === 'unpack_eval') {
            const up = unpackPacker(input);
            output = up ? formatCode(up) : 'Không tìm thấy hàm eval packer nào trong đoạn code.';
          } else if (subOption === 'decode_hex_unicode') {
            output = decodeEscapeSequences(input);
          } else if (subOption === 'beautify_only') {
            output = formatCode(input);
          } else {
            output = runDeobfuscation(input, false);
          }
        } else if (currentMode === 'obfuscate') {
          output = runObfuscation(input, subOption);
        } else if (currentMode === 'convert') {
          output = runConversion(input, subOption);
        }

        if (codeResult) codeResult.value = output;
        updateStats();
        showToast('Xử lý và làm sạch code thành công!');
      } catch (err) {
        showToast('Lỗi xử lý: ' + err.message, false);
        if (codeResult) codeResult.value = '// Lỗi trong quá trình xử lý:\n' + err.message;
      } finally {
        if (loadingOverlay) loadingOverlay.classList.add('hidden');
      }
    }, 150);
  }

  if (btnProcess) {
    btnProcess.addEventListener('click', processAction);
  }

  // Beautify Input
  if (btnFormatInput) {
    btnFormatInput.addEventListener('click', () => {
      if (codeSource && codeSource.value.trim()) {
        codeSource.value = formatCode(decodeEscapeSequences(codeSource.value));
        updateStats();
        showToast('Đã làm đẹp mã nguồn đầu vào!');
      }
    });
  }

  // Sample Generator
  if (btnSample) {
    btnSample.addEventListener('click', () => {
      if (currentMode === 'deobfuscate') {
        codeSource.value =
          "<script>\n" +
          "async function initApp() {\n" +
          "  try {\n" +
          "    document.getElementById('loading-overlay').style.display = 'none';\n" +
          "    const result = await new Promise((resolve, reject) => {\n" +
          "      google.script.run.withSuccessHandler(resolve).withFailureHandler(reject).checkSession();\n" +
          "    });\n" +
          "  } catch (err) {\n" +
          "    console.error(err);\n" +
          "  }\n" +
          "}\n" +
          "</script>";
      } else if (currentMode === 'obfuscate') {
        codeSource.value =
          "<script>\n" +
          "function calculateTotal(items, taxRate) {\n" +
          "  let subtotal = 0;\n" +
          "  for (let i = 0; i < items.length; i++) {\n" +
          "    subtotal += items[i].price * items[i].quantity;\n" +
          "  }\n" +
          "  const tax = subtotal * taxRate;\n" +
          "  return { subtotal, tax, total: subtotal + tax };\n" +
          "}\n" +
          "console.log(calculateTotal([{ price: 100, quantity: 2 }], 0.1));\n" +
          "</script>";
      } else {
        codeSource.value = 'Xin chào tiếng Việt có dấu: Chào mừng bạn đến với hệ thống Tool SheetAZ!';
      }
      updateStats();
      showToast('Đã tải mẫu thử nghiệm!');
    });
  }

  // Clear all
  if (btnClearAll) {
    btnClearAll.addEventListener('click', () => {
      if (codeSource) codeSource.value = '';
      if (codeResult) codeResult.value = '';
      updateStats();
      showToast('Đã dọn sạch trình soạn thảo!');
    });
  }

  // Copy Result
  if (btnCopyOutput) {
    btnCopyOutput.addEventListener('click', async () => {
      if (!codeResult || !codeResult.value) {
        showToast('Chưa có kết quả để sao chép!', false);
        return;
      }
      try {
        await navigator.clipboard.writeText(codeResult.value);
        showToast('Đã sao chép kết quả vào Clipboard!');
      } catch {
        codeResult.select();
        document.execCommand('copy');
        showToast('Đã sao chép kết quả!');
      }
    });
  }

  // Paste into Input
  if (btnPasteInput) {
    btnPasteInput.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (codeSource) {
          codeSource.value = text;
          updateStats();
          showToast('Đã dán dữ liệu thành công!');
        }
      } catch {
        showToast('Vui lòng dùng phím Ctrl+V để dán.', false);
      }
    });
  }

  // Download Output
  if (btnDownloadOutput) {
    btnDownloadOutput.addEventListener('click', () => {
      if (!codeResult || !codeResult.value) {
        showToast('Chưa có kết quả để tải xuống!', false);
        return;
      }
      const blob = new Blob([codeResult.value], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sheetaz_clean_' + Date.now() + '.js';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Đang tải file về máy...');
    });
  }

  // File Upload
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (codeSource) {
            codeSource.value = event.target.result;
            updateStats();
            showToast('Đã tải lên file: ' + file.name);
          }
        };
        reader.readAsText(file);
      }
    });
  }
});