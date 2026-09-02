const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');

let jsBeautify;
try {
  jsBeautify = require('js-beautify');
} catch (e) {
  console.log('js-beautify fallback');
}

let JavaScriptObfuscator;
try {
  JavaScriptObfuscator = require('javascript-obfuscator');
} catch (e) {
  console.log('javascript-obfuscator fallback');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static assets from the current directory
app.use(express.static(__dirname));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Node.js Backend is running on DirectAdmin',
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  });
});

// API: Deobfuscate & Format
app.post('/api/deobfuscate', (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, error: 'Chưa có code đầu vào' });
    }

    let output = code;

    // Decode \xNN and \uNNNN
    output = output.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
      const codePoint = parseInt(hex, 16);
      const char = String.fromCharCode(codePoint);
      return (codePoint >= 32 && codePoint <= 126 && char !== '"' && char !== "'" && char !== '\\') ? char : match;
    });

    output = output.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
      const codePoint = parseInt(hex, 16);
      const char = String.fromCharCode(codePoint);
      return (codePoint >= 32 && codePoint <= 126 && char !== '"' && char !== "'" && char !== '\\') ? char : match;
    });

    // Beautify
    if (jsBeautify && jsBeautify.js) {
      output = jsBeautify.js(output, { indent_size: 2, space_in_empty_paren: true });
    }

    res.json({ success: true, result: output });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// API: Obfuscate
app.post('/api/obfuscate', (req, res) => {
  try {
    const { code, type } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, error: 'Chưa có code đầu vào' });
    }

    if (JavaScriptObfuscator) {
      const isHigh = type === 'obf_high';
      const isMinify = type === 'obf_minify';
      const result = JavaScriptObfuscator.obfuscate(code, {
        compact: isMinify,
        controlFlowFlattening: isHigh,
        deadCodeInjection: isHigh,
        stringArray: !isMinify,
        stringArrayEncoding: isHigh ? ['base64', 'rc4'] : ['base64']
      });
      return res.json({ success: true, result: result.getObfuscatedCode() });
    }

    res.json({ success: true, result: code });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server / Export
if (typeof(PhusionPassenger) !== 'undefined') {
  app.listen('passenger');
} else {
  app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
  });
}

module.exports = app;