/**
 * SheetAZ - Code Deobfuscator & Decoder Pro Engine v3.5
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
      { id: 'clean_semantic', label: '✨ Làm sạch triệt để & Xóa sạch _0x (v3.5 Pro)', active: true },
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
      { id: 'base64_decode', label: 'Base64 Decode', active: true },
      { id: 'base64_encode', label: 'Base64 Encode' },
      { id: 'hex_decode', label: 'Hex Decode' },
      { id: 'hex_encode', label: 'Hex Encode' },
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

  // Beautifier helper
  function formatCode(code) {
    if (window.js_beautify) {
      return window.js_beautify(code, {
        indent_size: 2,
        space_in_empty_paren: true,
        preserve_newlines: true,
        max_preserve_newlines: 2,
        wrap_line_length: 120
      });
    }
    return code;
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

    // A. Fix broken HTML tags with spaces (< script >, < / script >, < style >, < div >, etc.)
    res = res.replace(/<\s*(\/?)\s*([a-zA-Z0-9\-]+)([^>]*)>/g, (m, slash, tag, rest) => {
      let cleanRest = rest ? rest.trim() : '';
      if (cleanRest) {
        cleanRest = ' ' + cleanRest.replace(/\s+/g, ' ');
      }
      return `<${slash || ''}${tag.trim()}${cleanRest}>`;
    });

    // B. Fix syntax glitches like (<'change', function(>)
    res = res.replace(/<\s*['"]([a-zA-Z0-9\-_]+)['"]\s*,\s*function\s*\(\s*>?/g, "'$1', function(");

    // C. Remove backslashes before HTML tags
    res = res.replace(/\\<(\/?[a-zA-Z0-9\-]+)/g, '<$1');
    res = res.replace(/\\>(\/?[a-zA-Z0-9\-]+)?/g, '>$1');

    // D. Decode specific common hex escapes
    res = res.replace(/\\x22/g, '"');
    res = res.replace(/\\x27/g, "\\'");
    res = res.replace(/\\x20/g, ' ');
    res = res.replace(/\\x2f/gi, '/');
    res = res.replace(/\\x3c/gi, '<');
    res = res.replace(/\\x3e/gi, '>');
    res = res.replace(/\\x0a/gi, '\\n');
    res = res.replace(/\\x0d/gi, '\\r');
    res = res.replace(/\\x09/gi, '\\t');

    // E. Decode general printable ASCII hex
    res = res.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
      const codePoint = parseInt(hex, 16);
      const char = String.fromCharCode(codePoint);
      return codePoint >= 32 && codePoint <= 126 && char !== '"' && char !== "'" && char !== '\\'
        ? char
        : match;
    });

    // F. Decode unicode \uNNNN
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

    // A. Fix boolean with spaces
    res = res.replace(/return\s*!\s*\[\]/g, 'return false');
    res = res.replace(/return\s*!!\s*\[\]/g, 'return true');
    res = res.replace(/(?:^|[^a-zA-Z0-9_$])!\s*\[\]/g, ' false');
    res = res.replace(/(?:^|[^a-zA-Z0-9_$])!!\s*\[\]/g, ' true');

    // B. Clean split lines in math expressions
    res = res.replace(/([\+\-\*\/])\s*\n\s*/g, '$1 ');
    res = res.replace(/(?:^|[,\[\(:\s=])-\s*\n\s*(0x[0-9a-fA-F]+|\d+)/g, '-$1');
    res = res.replace(/([\+\-\*\/])\s*-\s*-\s*/g, '$1 +');
    res = res.replace(/([\+\-\*\/])\s*-\s*(\d+|0x[0-9a-fA-F]+)/g, '$1 -$2');
    res = res.replace(/([\+\-\*\/])\s*\+\s*(\d+|0x[0-9a-fA-F]+)/g, '$1 $2');
    res = res.replace(/(?:^|[,\[\(:\s=])-\s+(\d+|0x[0-9a-fA-F]+)/g, '-$1');

    // C. Evaluate math expressions repeatedly
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

    // D. Convert remaining standalone hex literals (e.g. 0x3a3 -> 931)
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

    // A. Unpack if packer
    const unpacked = unpackPacker(res);
    if (unpacked) res = unpacked;

    // B. Decode Escapes & Clean HTML tag spacing
    res = decodeEscapeSequences(res);

    // C. Fold Arithmetic (Hex & Decimal)
    res = foldArithmeticExpressions(res);

    // D. Resolve dynamic string arrays
    res = resolveStringArrays(res);

    // E. Simplify Member Calls: obj['getElementById'] -> obj.getElementById
    res = simplifyMemberExpressions(res);

    // F. Strip useless rotator IIFE boilerplate
    res = res.replace(/\(function\s*\([_0-9a-zA-Z,\s]+\)\s*\{\s*(?:const|var|let)[\s\S]*?while\s*\((?:true|false)\)[\s\S]*?\}\s*\}\s*\([_0-9a-zA-Z,\s\d+\-*\/]+\)\);?/g, '');

    // G. Strip alias declarations (const getString = decodeString;)
    res = res.replace(/(?:const|var|let)\s+(?:getString|getText|_0x[a-f0-9]+|varItem_[a-f0-9]+)\s*=\s*(?:decodeString|_0x[a-f0-9]+|varItem_[a-f0-9]+)(?:,\s*(?:getString|getText|_0x[a-f0-9]+|varItem_[a-f0-9]+)\s*=\s*(?:decodeString|_0x[a-f0-9]+|varItem_[a-f0-9]+))*;\s*/g, '');

    // H. Semantic variable renames
    res = res.replace(/new\s+Promise\(\s*\(\s*(?:varItem_|_0x)[a-f0-9]{4,8}\s*,\s*(?:varItem_|_0x)[a-f0-9]{4,8}\s*\)/g, 'new Promise((resolve, reject)');
    res = res.replace(/\.withSuccessHandler\(\s*(?:varItem_|_0x)[a-f0-9]{4,8}\s*\)/g, '.withSuccessHandler(resolve)');
    res = res.replace(/\.withFailureHandler\(\s*(?:varItem_|_0x)[a-f0-9]{4,8}\s*\)/g, '.withFailureHandler(reject)');
    res = res.replace(/catch\s*\(\s*(?:varItem_|_0x)[a-f0-9]{4,8}\s*\)/g, 'catch (err)');
    res = res.replace(/\bfunction\s*\(\s*(?:varItem_|_0x)[a-f0-9]{4,8}\s*\)/g, 'function(event)');
    res = res.replace(/\b(?:varItem_|_0x)[a-f0-9]{4,8}\s*=>/g, 'row =>');
    res = res.replace(/\b(?:varItem_|_0x)[a-f0-9]{4,8}\s*\.map\(\s*row\s*=>/g, 'items.map(row =>');

    // I. Rename remaining _0x and varItem_ into clean sequential variables
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

  // --- Obfuscation Core ---
  function runObfuscation(code, type) {
    if (window.JavaScriptObfuscator) {
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
        stringArrayThreshold: 0.8
      };
      try {
        const obfResult = window.JavaScriptObfuscator.obfuscate(code, options);
        return obfResult.getObfuscatedCode();
      } catch (err) {
        throw new Error('Lỗi mã hóa JavaScript: ' + err.message);
      }
    }
    throw new Error('Không tải được thư viện JavaScript-Obfuscator');
  }

  // --- Converters ---
  function runConversion(text, type) {
    switch (type) {
      case 'base64_decode':
        return decodeURIComponent(escape(atob(text.trim())));
      case 'base64_encode':
        return btoa(unescape(encodeURIComponent(text)));
      case 'hex_decode': {
        const clean = text.replace(/[^0-9a-fA-F]/g, '');
        let str = '';
        for (let i = 0; i < clean.length; i += 2) {
          str += String.fromCharCode(parseInt(clean.substr(i, 2), 16));
        }
        return str;
      }
      case 'hex_encode': {
        let hex = '';
        for (let i = 0; i < text.length; i++) {
          hex += '\\x' + text.charCodeAt(i).toString(16).padStart(2, '0');
        }
        return hex;
      }
      case 'url_decode':
        return decodeURIComponent(text);
      case 'url_encode':
        return encodeURIComponent(text);
      case 'unicode_decode':
        return text.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
          return String.fromCharCode(parseInt(grp, 16));
        });
      case 'unicode_encode': {
        let uCode = '';
        for (let i = 0; i < text.length; i++) {
          uCode += '\\u' + text.charCodeAt(i).toString(16).padStart(4, '0');
        }
        return uCode;
      }
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
          "function calculateTotal(items, taxRate) {\n" +
          "  let subtotal = 0;\n" +
          "  for (let i = 0; i < items.length; i++) {\n" +
          "    subtotal += items[i].price * items[i].quantity;\n" +
          "  }\n" +
          "  const tax = subtotal * taxRate;\n" +
          "  return { subtotal, tax, total: subtotal + tax };\n" +
          "}\n" +
          "console.log(calculateTotal([{ price: 100, quantity: 2 }], 0.1));";
      } else {
        codeSource.value = 'Xin chào! Chào mừng bạn đến với hệ thống Tool dịch mã hóa SheetAZ.';
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