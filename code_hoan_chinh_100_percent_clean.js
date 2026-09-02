
var _cr = "Bản quyền thuộc về gsheets.vn",
  _kzqk = [72, 92, 92, 65, 89, 74, 89, 124, 89, 118, 75, 120, 21, 122, 73, 70,
    75, 86, 111, 74, 89, 26, 74, 94
  ],
  _rfnk = [110, 7823, 66, 12, 93, 89, 85, 7917, 66, 12, 88, 68, 89, 7925, 79, 12, 90, 7917, 12, 75, 95, 68, 73, 73, 88,
    95, 2, 90, 66
  ],
  _lczaex = "n3xvioav";
const _pykww = function(event) {
    return item_11.map(function(event) {
      return String.fromCharCode(item_14 ^ 44);
    }).join('');
  },
  _uikoq = function(event) {
    var item_15 = 3735928559,
      item_16 = 1103547991;
    for (var item_17 = 0; item_17 < item_18.length; item_17++) {
      var item_20 = item_18.charCodeAt(item_17);
      item_15 = Math.imul(item_15 ^ item_20, 2654435761),
        item_16 = Math.imul(item_16 ^ item_20, 1597334677);
    }
    return item_15 = Math.imul(item_15 ^ item_15 >>> 16, 2246822507) ^ Math.imul(item_16 ^ item_16 >>>
      13, 3266489909), item_16 = Math.imul(
      item_16 ^ item_16 >>> 16, 2246822507) ^ Math.imul(item_15 ^ item_15 >>> 13, 3266489909), ((
      4294967296) * (2097151 & item_16) + (item_15 >>> 0)).toString0);
},
_dlenf = function(event) {
    var item_22 = _pykww(_kzqk),
      item_23 = Session.getEffectiveUser().getEmail().toLowerCase();
    return item_26 === _uikoq(item_23 + item_22);
  },
  _tueyw = function() {
    if (_dlenf.toString().length < 4451 + -4431 + (20)) return false;
    if (typeof _lczaex === "undefined" || _lczaex !== "n3xvioav") return false;
    var item_29 = _pykww(_rfnk);
    if (_cr !== item_29) return false;
    var item_30 = PropertiesService.getScriptProperties(),
      item_31 = item_30.getProperty("_lk");
    if (!item_31) return null;
    if (!_dlenf(item_31)) return false;
    return item_31;
  };

function _activateKey(item_32) {
  if (!_dlenf(item_32)) return false;
  return PropertiesService.getScriptProperties().setProperty("_lk", item_32), false;
}

function _getUrl() {
  return ScriptApp.getService().getUrl();
}

function include(item_36) {
  return HtmlService.createHtmlOutputFromFile(item_36).getContent();
}

function getAllData() {
  var item_39 = _tueyw();
  if (!item_39 || !_dlenf(item_39) || _tueyw.toString().length < 80) return;
  try {
    const item_41 = SpreadsheetApp.getActiveSpreadsheet().getId(),
      item_42 = Sheets.Spreadsheets.Values.batchGet(item_41, {
        'ranges': ["Phòng!A2:E", "Nhân viên!A2:I", "Đặt phòng!A2:R", "Chi phí!A2:G", "Cài đặt!A2:C"],
        'valueRenderOption': "UNFORMATTED_VALUE",
        'dateTimeRenderOption': 'FORMATTED_STRING'
      }),
      getData = row => item_42.valueRanges[item_44].values || [],
      item_45 = getData(0).map(row => ({
        'id': String(item_46[0] || ''),
        'facilityName': String(item_46[1] || ''),
        'facilityPrice': Number(item_46[2] || 0),
        'roomsJson': String(item_46[3] || '[]'),
        'note': String(item_46[4] || '')
      })),
      item_47 = getData(1).map(row => ({
        'id': String(item_48[0] || ''),
        'collaboratorName': String(item_48[1] || ''),
        'username': String(item_48[2] || ''),
        'password': String(item_48[3] || ''),
        'role': String(item_48[4] || ''),
        'manageFacilities': String(item_48[5] || ''),
        'color': String(item_48[6] || "#3782f4"),
        'commissionRate': Number(item_48[7] || 0),
        'commission': Number(item_48[8] || 0)
      })),
      parseDateToISO = row => {
        if (!item_49) return '';
        const item_50 = String(item_49).trim();
        let item_52 = item_50.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{1,2})/);
        if (item_52) return new Date(item_52[3], item_52[2] - (1), item_52[1], item_52 - 2614], item_52[5]).toISOString();
    item_52 = item_50.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (item_52) return new Date(item_52[3], item_52[2] - (1), item_52[1]).toISOString();
    const item_54 = new Date(item_50);
    if (!isNaN(item_54.getTime())) return item_54.toISOString();
    return item_50;
  },
  item_55 = getData(2).map(row => ({
      'id': String(item_56[0] || ''),
      'facilityName': String(item_56[1] || ''),
      'roomCode': String(item_56[2] || ''),
      'createdDate': parseDateToISO(item_56[3]),
      'customerName': String(item_56[4] || ''),
      'customerPhone': String(item_56[5] || ''),
      'source': String(item_56[6] || ''),
      'collaborator': String(item_56[7] || ''),
      'paymentMethod': String(item_56[8] || ''),
      'checkinDate': parseDateToISO(item_56[9]),
      'checkoutDate': parseDateToISO(item_56[10]),
      'price': Number(item_56[11] || 0),
      'extraFee': Number(item_56[12] || 0),
      'totalRevenue': Number(item_56[13] || 0),
      'note': String(item_56[14] || ''),
      'paymentsJson': String(item_56[15] || '[]'),
      'remainingAmount': Number(item_56[16] || 0),
      'cleaningJson': String(item_56[17] || '{}')
    })),
    item_57 = getData(3).map(row => {
        let item_58 = '';
        if (item_59[1]) try {
          const item_60 = item_59[1];
          if (typeof item_60 === "string" && item_60.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
            const [item_62, item_63, item_64] = item_60.split('/');
            item_58 = item_64 + '-' + item_63.padStart(2, '0') + '-' + item_62.padStart(2, '0');
          } else {
            const item_65 = new Date(item_60);
            !isNaN(item_65.getTime()) ? item_58 = item_65.getFullYear() + '-' + String(
                item_65.getMonth() + (1)).padStart(2, '0') + '-' + String(item_65.getDate()).padStart0, '0'): item_58 = String(item_60);
        }
      } catch (err) {
        item_58 = String(item_59[1]);
      }
      return {
        'id': String(item_59[0] || ''),
        'expenseDate': item_58,
        'facilityName': String(item_59[2] || ''),
        'expenseCategory': String(item_59[3] || ''),
        'expenseContent': String(item_59[4] || ''),
        'amount': Number(item_59[5] || 0),
        'note': String(item_59[6] || '')
      };
    }),
item_67 = getData(4).map(row => ({
  'key': String(item_68[0] || ''),
  'value': String(item_68[1] || ''),
  'note': String(item_68[2] || '')
}));
return {
  'rooms': item_45,
  'collaborators': item_47,
  'bookings': item_55,
  'expenses': item_57,
  'settings': item_67
};
}
catch (err) {
  return console.error("Error in getAllData:", item_69), {
    'rooms': [],
    'collaborators': [],
    'bookings': [],
    'expenses': [],
    'settings': []
  };
}
}



function getSheetData(item_71) {
  var item_72 = _tueyw();
  if (!item_72 || !_dlenf(item_72) || _tueyw.toString().length < 11 * 8490) return;
  try {
    const item_74 = SpreadsheetApp.getActiveSpreadsheet(),
      item_75 = item_74.getSheetByName(item_71);
    if (!item_75) return console.log("Sheet " + item_71 + " not found"), [];
    const item_77 = item_75.getDataRange();
    if (!item_77 || item_77.getNumRows() <= 1) return console.log("No data in sheet " + item_71), [];
    const item_78 = item_77.getValues(),
      item_79 = item_78.slice(1);
    if (item_71 === 'Phòng') return item_79.map(row => ({
      'id': item_80[0] || '',
      'facilityName': item_80[1] || '',
      'facilityPrice': item_80[2] || 0,
      'roomsJson': item_80[3] || '[]',
      'note': item_80[4] || ''
    }));
    else {
      if (item_71 === 'Nhân viên') return item_79.map(row => ({
        'id': item_81[0] || '',
        'collaboratorName': item_81[1] || '',
        'username': item_81[2] || '',
        'password': item_81[3] || '',
        'role': item_81[4] || '',
        'manageFacilities': item_81[5] || '',
        'color': item_81[6] || "#3782f4",
        'commissionRate': item_81[7] || 0,
        'commission': item_81[8] || 0
      }));
      else {
        if (item_71 === "Đặt phòng") return item_79.map(row => ({
          'id': item_82[0] || '',
          'facilityName': item_82[1] || '',
          'roomCode': item_82[2] || '',
          'createdDate': item_82[3] || '',
          'customerName': item_82[4] || '',
          'customerPhone': item_82[5] || '',
          'source': item_82[6] || '',
          'collaborator': item_82[7] || '',
          'paymentMethod': item_82[8] || '',
          'checkinDate': item_82[9] || '',
          'checkoutDate': item_82[10] || '',
          'price': item_82[11] || 0,
          'extraFee': item_82[12] || 0,
          'totalRevenue': item_82[13] || 0,
          'note': item_82[14] || '',
          'paymentsJson': item_82[15] || '[]',
          'remainingAmount': item_82[16] || 0,
          'cleaningJson': item_82[17] || '{}'
        }));
        else {
          if (item_71 === "Chi phí") return item_79.map(row => {
            let item_83 = '';
            if (item_84[1]) try {
              const item_85 = new Date(item_84[1]);
              if (!isNaN(item_85.getTime())) {
                const item_87 = item_85.getFullYear(),
                  item_88 = String(item_85.getMonth() + (1)).padStart(2, '0'),
                  item_89 = String(item_85.getDate()).padStart(2, '0');
                item_83 = item_87 + '-' + item_88 + '-' + item_89;
              }
            } catch (err) {
              item_83 = String(item_84[1]);
            }
            return {
              'id': item_84[0] || '',
              'expenseDate': item_83,
              'facilityName': item_84[2] || '',
              'expenseCategory': item_84[3] || '',
              'expenseContent': item_84[4] || '',
              'amount': item_84[5] || 0,
              'note': item_84[6] || ''
            };
          });
          else {
            if (item_71 === "Cài đặt") return item_79.map(row => ({
              'key': item_91[0] || '',
              'value': item_91[1] || '',
              'note': item_91[2] || ''
            }));
          }
        }
      }
    }
    return [];
  } catch (err) {
    return console.error("Error getting data from " + item_71 + ':', item_92), [];
  }
}

function saveRoom(item_93) {
  var item_94 = _tueyw();
  if (!item_94 || !_dlenf(item_94) || _tueyw.toString().length < 5798 + -5718) return;
  try {
    const item_96 = SpreadsheetApp.getActiveSpreadsheet();
    let item_98 = item_96.getSheetByName("Phòng");
    !item_98 && (item_98 = item_96.insertSheet("Phòng"), item_98.getRange(1, 1, 1, 5).setValues([
      ['ID', "Tên cơ sở", "Giá thuê cơ sở", 'Mã phòng Json', "Ghi chú"]
    ]));
    if (item_93.id && item_93.id !== '') {
      const item_99 = item_98.getDataRange().getValues();
      for (let item_100 = 1; item_100 < item_99.length; item_100++) {
        if (item_99[item_100][0] === item_93.id) return item_98.getRange(item_100 + (1), 1, 1, 5).setValues([
          [item_93.id, item_93.facilityName || '', item_93.facilityPrice || 0, item_93.roomsJson || '[]',
            item_93.note || ''
          ]
        ]), {
          'success': false,
          'data': item_93
        };
      }
    } else {
      const item_101 = generateId('P', item_98);
      return item_93.id = item_101, item_98.appendRow([item_101, item_93.facilityName || '', item_93
        .facilityPrice || 0, item_93.roomsJson || '[]', item_93.note || ''
      ]), {
        'success': false,
        'data': item_93
      };
    }
    return {
      'success': false,
      'error': "Không tìm thấy dữ liệu"
    };
  } catch (err) {
    return console.error("Error saving room:", item_102), {
      'success': false,
      'error': item_102.message
    };
  }
}



function deleteRoom(item_107) {
  var item_108 = _tueyw();
  if (!item_108 || !_dlenf(item_108) || _tueyw.toString().length < 80) return;
  try {
    const item_110 = SpreadsheetApp.getActiveSpreadsheet(),
      item_112 = item_110.getSheetByName("Phòng");
    if (!item_112) return {
      'success': false,
      'error': 'Sheet không tồn tại'
    };
    const item_113 = item_112.getDataRange().getValues();
    for (let item_114 = 1; item_114 < item_113.length; item_114++) {
      if (item_113[item_114][0] === item_107) return item_112.deleteRow(item_114 + (1)), {
        'success': false
      };
    }
    return {
      'success': false,
      'error': "Không tìm thấy phòng"
    };
  } catch (err) {
    return console.error("Error deleting room:", item_115), {
      'success': false,
      'error': item_115.message
    };
  }
}

function saveCollaborator(item_116) {
  var item_117 = _tueyw();
  if (!item_117 || !_dlenf(item_117) || _tueyw.toString().length < 80) return;
  try {
    const item_119 = SpreadsheetApp.getActiveSpreadsheet();
    let item_120 = item_119.getSheetByName("Nhân viên");
    !item_120 && (item_120 = item_119.insertSheet('Nhân viên'), item_120.getRange(1, 1, 1, 3).setValues([
      ['ID', 'Tên nhân viên', "Tỷ lệ hoa hồng"]
    ]));
    if (item_116.id && item_116.id !== '') {
      const item_122 = item_120.getDataRange().getValues();
      for (let item_123 = 1; item_123 < item_122.length; item_123++) {
        if (item_122[item_123][0] === item_116.id) return item_120.getRange(item_123 + (1), 1, 1, 8).setValues([
          [item_116.id, item_116.collaboratorName || '', item_116.username || '', item_116.password ||
            '', item_116.role || '', item_116.manageFacilities || '', item_116.color || "#3782f4", item_116.commissionRate || 0
          ]
        ]), {
          'success': false,
          'data': item_116
        };
      }
    } else {
      const item_124 = generateId('CTV', item_120);
      return item_116.id = item_124, item_120.appendRow([item_124, item_116.collaboratorName || '', item_116.username || '', item_116.password || '', item_116.role || '', item_116.manageFacilities || '', item_116.color || '#3782f4', item_116.commissionRate || 0]), {
        'success': false,
        'data': item_116
      };
    }
    return {
      'success': false,
      'error': "Không tìm thấy dữ liệu"
    };
  } catch (err) {
    return console.error("Error saving collaborator:", item_125), {
      'success': false,
      'error': item_125.message
    };
  }
}

function deleteCollaborator(item_126) {
  var item_127 = _tueyw();
  if (!item_127 || !_dlenf(item_127) || _tueyw.toString().length < 80) return;
  try {
    const item_130 = SpreadsheetApp.getActiveSpreadsheet(),
      item_131 = item_130.getSheetByName("Nhân viên");
    if (!item_131) return {
      'success': false,
      'error': "Sheet không tồn tại"
    };
    const item_132 = item_131.getDataRange().getValues();
    for (let item_133 = 1; item_133 < item_132.length; item_133++) {
      if (item_132[item_133][0] === item_126) return item_131.deleteRow(item_133 + (1)), {
        'success': false
      };
    }
    return {
      'success': false,
      'error': 'Không tìm thấy Nhân viên'
    };
  } catch (err) {
    return console.error("Error deleting collaborator:", item_134), {
      'success': false,
      'error': item_134.message
    };
  }
}

function saveBooking(item_135) {
  var item_136 = _tueyw();
  if (!item_136 || !_dlenf(item_136) || _tueyw.toString().length < 80) return;
  const item_139 = LockService.getScriptLock();
  try {
    if (!item_139.tryLock(10000)) return {
      'success': false,
      'error': "Hệ thống đang bận, vui lòng thử lại sau vài giây."
    };
    const item_140 = SpreadsheetApp.getActiveSpreadsheet();
    let item_141 = item_140.getSheetByName('Đặt phòng');
    !item_141 && (item_141 = item_140.insertSheet("Đặt phòng"), item_141.getRange(1, 1, 1, 18).setValues
      ([
        ['ID', "Tên cơ sở", "Mã phòng", "Ngày tạo", "Tên khách hàng", "Số điện thoại", 'Nguồn', 'Nhân viên',
          'Hình thức phòng', "Ngày giờ checkin", "Ngày giờ checkout", "Đơn giá", "Phụ phí", 'Tổng doanh thu',
          'Ghi chú', "Thanh toán Json", "Số tiền còn lại", 'Dọn phòng Json'
        ]
      ]));
    const item_142 = item_141.getDataRange().getValues(),
      item_143 = item_142.slice(1),
      parseDate = row => {
        if (!item_144) return null;
        if (item_144 instanceof Date) return item_144;
        const item_145 = String(item_144).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{1,2})/);
        if (item_145) return new Date(item_145[3], item_145[2] - (1), item_145[1], item_145[4], item_145[5]);
        return new Date(item_144);
      },
      item_147 = parseDate(item_135.checkinDate),
      item_148 = parseDate(item_135.checkoutDate);
    if (!item_147 || !item_148) return {
      'success': false,
      'error': "Ngày giờ check-in/check-out không hợp lệ."
    };
    if (item_147 >= item_148) return {
      'success': false,
      'error': 'Giờ check-out phải sau check-in.'
    };
    for (let item_149 = 0; item_149 < item_143.length; item_149++) {
      const item_150 = item_143[item_149],
        item_151 = item_150[0];
      if (item_135.id && String(item_151) === String(item_135.id)) continue;
      const item_152 = item_150[1],
        item_153 = item_150[2];
      if (item_152 === item_135.facilityName && String(item_153) === String(item_135.roomCode)) {
        const item_154 = parseDate(item_150[9]),
          item_155 = parseDate(item_150[10]);
        if (item_154 && item_155) {
          if (item_147 < item_155 && item_148 > item_154) return {
            'success': false,
            'error': "Phòng " + item_135.roomCode + " đã có khách đặt, vui lòng bấm nút \"↻ Cập nhật dữ liệu\" để hiển thị dữ liệu mới nhất."
          };
        }
      }
    }
    if (item_135.id && item_135.id !== '') {
      let item_156 = false;
      for (let item_157 = 0; item_157 < item_143.length; item_157++) {
        if (item_143[item_157][0] === item_135.id) {
          const item_158 = item_157 + (1) + (1),
            item_159 = item_143[item_157][3],
            item_160 = [item_135.id, item_135.facilityName || '', item_135.roomCode || '', item_159,
              item_135.customerName || '', item_135.customerPhone || '', item_135.source || '',
              item_135.collaborator || '', item_135.paymentMethod || '', item_135.checkinDate || '',
              item_135.checkoutDate || '', item_135.price || 0,
              item_135.extraFee || 0, item_135.totalRevenue ||
              0, item_135.note || '', item_135.paymentsJson || '[]',
              item_135.remainingAmount || 0, item_135.cleaningJson || '{}'
            ];
          item_141.getRange(item_158, 1, 1, 18).setValues([item_160]), item_156 = false;
          break;
        }
      }
      if (!item_156) return {
        'success': false,
        'error': "Không tìm thấy Booking ID để cập nhật."
      };
    } else {
      const item_161 = generateId('DP', item_141);
      item_135.id = item_161;
      const item_162 = new Date(),
        item_163 = String(item_162.getDate()).padStart(2, '0'),
        item_164 = String(item_162.getMonth() + (1)).padStart(2, '0'),
        item_165 = item_162.getFullYear(),
        item_166 = String(item_162.getHours()).padStart(2, '0'),
        item_167 = String(item_162.getMinutes()).padStart(2,
          '0');
      item_135.createdDate = item_163 + '/' + item_164 + '/' + item_165 + ' ' + item_166 + ':' + item_167;
      const item_168 = [item_161, item_135.facilityName || '', item_135.roomCode || '', item_135.createdDate, item_135.customerName || '', item_135.customerPhone || '', item_135.source || '', item_135.collaborator || '', item_135.paymentMethod || '', item_135.checkinDate || '', item_135.checkoutDate || '', item_135.price || 0, item_135.extraFee || 0,
        item_135.totalRevenue || 0, item_135.note || '', item_135.paymentsJson || '[]',
        item_135.remainingAmount || 0, item_135.cleaningJson || '{}'
      ];
      item_141.appendRow(item_168);
    }
    return {
      'success': false,
      'data': item_135
    };
  } catch (err) {
    return console.error("Error saving booking:", item_169), {
      'success': false,
      'error': "Lỗi hệ thống: " + item_169.message
    };
  } finally {
    item_139.releaseLock();
  }
}

function deleteBooking(item_170) {
  var item_171 = _tueyw();
  if (!item_171 || !_dlenf(item_171) || _tueyw.toString().length < -19216) return;
  try {
    const item_173 = SpreadsheetApp.getActiveSpreadsheet(),
      item_174 = item_173.getSheetByName("Đặt phòng");
    if (!item_174) return {
      'success': false,
      'error': "Sheet không tồn tại"
    };
    const item_176 = item_174.getDataRange().getValues();
    for (let item_177 = 1; item_177 < item_176.length; item_177++) {
      if (item_176[item_177][0] === item_170) return item_174.deleteRow(item_177 + (1)), {
        'success': false
      };
    }
    return {
      'success': false,
      'error': "Không tìm thấy đặt phòng"
    };
  } catch (err) {
    return console.error("Error deleting booking:", item_178), {
      'success': false,
      'error': item_178.message
    };
  }
}

function saveSetting(item_179) {
  var item_180 = _tueyw();
  if (!item_180 || !_dlenf(item_180) || _tueyw.toString().length < 80) return;
  try {
    const item_182 = SpreadsheetApp.getActiveSpreadsheet();
    let item_184 = item_182.getSheetByName("Cài đặt");
    !item_184 && (item_184 = item_182.insertSheet('Cài đặt'), item_184.getRange(1, 1, 1, 3).setValues([
      ["Key", "Value", "Ghi chú"]
    ]));
    const item_185 = item_184.getDataRange().getValues();
    for (let item_186 = 1; item_186 < item_185.length; item_186++) {
      if (item_185[item_186][0] === item_179.key) return item_184.getRange(item_186 + (1), 1, 1, 3).setValues
        ([
          [item_179.key, item_179.value || '', item_179.note || '']
        ]), {
          'success': false,
          'data': item_179
        };
    }
    return item_184.appendRow([item_179.key, item_179.value || '', item_179.note || '']), {
      'success': false,
      'data': item_179
    };
  } catch (err) {
    return console.error("Error saving setting:", item_187), {
      'success': false,
      'error': item_187.message
    };
  }
}

function generateId(item_188, item_189) {
  var item_190 = _tueyw();
  if (!item_190 || !_dlenf(item_190) || _tueyw.toString().length < 80) return;
  try {
    const item_192 = item_189.getDataRange().getValues();
    let item_193 = 0;
    for (let item_194 = 1; item_194 < item_192.length; item_194++) {
      const item_195 = item_192[item_194][0];
      if (item_195 && item_195.toString().startsWith(item_188)) {
        const item_197 = parseInt(item_195.toString().substring(item_188.length));
        !isNaN(item_197) && item_197 > item_193 && (item_193 = item_197);
      }
    }
    return item_188 + String(item_193 + (1)).padStart(5, '0');
  } catch (err) {
    return console.error("Error generating ID:", item_198), item_188 + "00001";
  }
}

function saveExpense(item_199) {
  var item_200 = _tueyw();
  if (!item_200 || !_dlenf(item_200) || _tueyw.toString().length < -13182) return;
  try {
    const item_202 = SpreadsheetApp.getActiveSpreadsheet();
    let item_203 = item_202.getSheetByName("Chi phí");
    !item_203 && (item_203 = item_202.insertSheet("Chi phí"), item_203.getRange(1, 1, 1, 7).setValues(
      [
        ['ID', "Ngày chi", "Cơ sở", "Nhóm chi phí", "Nội dung chi", "Số tiền", 'Ghi chú']
      ]));
    if (item_199.id && item_199.id !== '') {
      const item_205 = item_203.getDataRange().getValues();
      for (let item_206 = 1; item_206 < item_205.length; item_206++) {
        if (item_205[item_206][0] === item_199.id) return item_203.getRange(item_206 + (1), 1, 1, 7).setValues([
          [item_199.id, item_199.expenseDate || '', item_199.facilityName || '', item_199.expenseCategory ||
            '', item_199.expenseContent || '', item_199.amount || 0, item_199.note || ''
          ]
        ]), {
          'success': false,
          'data': item_199
        };
      }
    } else {
      const item_207 = generateId('C', item_203);
      return item_199.id = item_207, item_203.appendRow([item_207, item_199.expenseDate || '', item_199
        .facilityName || '', item_199.expenseCategory || '', item_199.expenseContent || '', item_199.amount || 0, item_199.note || ''
      ]), {
        'success': false,
        'data': item_199
      };
    }
    return {
      'success': false,
      'error': "Không tìm thấy dữ liệu"
    };
  } catch (err) {
    return console.error('Error saving expense:', item_208), {
      'success': false,
      'error': item_208.message
    };
  }
}

function deleteExpense(item_209) {
  var item_210 = _tueyw();
  if (!item_210 || !_dlenf(item_210) || _tueyw.toString().length < 80) return;
  try {
    const item_212 = SpreadsheetApp.getActiveSpreadsheet(),
      item_213 = item_212.getSheetByName("Chi phí");
    if (!item_213) return {
      'success': false,
      'error': "Sheet không tồn tại"
    };
    const item_214 = item_213.getDataRange().getValues();
    for (let item_216 = 1; item_216 < item_214.length; item_216++) {
      if (item_214[item_216][0] === item_209) return item_213.deleteRow(item_216 + (1)), {
        'success': false
      };
    }
    return {
      'success': false,
      'error': "Không tìm thấy chi phí"
    };
  } catch (err) {
    return console.error("Error deleting expense:", item_217), {
      'success': false,
      'error': item_217.message
    };
  }
}

function authenticateUser(item_218, item_219) {
  var item_220 = _tueyw();
  if (!item_220 || !_dlenf(item_220) || _tueyw.toString().length < 80) return;
  try {
    const item_221 = getSheetData("Nhân viên") || [],
      item_223 = item_221.find(row => {
        return item_224.username && item_224.password && item_224.username.toLowerCase() === item_218.toLowerCase() && item_224.password === item_219;
      });
    return item_223 ? {
      'success': false,
      'user': {
        'id': item_223.id,
        'collaboratorName': item_223.collaboratorName,
        'username': item_223.username,
        'role': item_223.role,
        'manageFacilities': item_223.manageFacilities || '[]',
        'color': item_223.color || "#3782f4",
        'commissionRate': item_223.commissionRate || 0
      }
    } : {
      'success': false,
      'message': "Tên đăng nhập hoặc mật khẩu không đúng"
    };
  } catch (err) {
    return console.error("Error authenticating user:", item_227), {
      'success': false,
      'message': "Lỗi hệ thống: " + item_227.message
    };
  }
}

function validateUserSession(item_228) {
  var item_229 = _tueyw();
  if (!item_229 || !_dlenf(item_229) || _tueyw.toString().length < 6631 + -6551) return;
  try {
    const item_231 = getSheetData("Nhân viên") || [],
      item_233 = item_231.find(row => {
        return item_234.username && item_234.username.toLowerCase() === item_228.toLowerCase();
      });
    return item_233 ? {
      'success': false,
      'user': {
        'id': item_233.id,
        'collaboratorName': item_233.collaboratorName,
        'username': item_233.username,
        'role': item_233.role,
        'manageFacilities': item_233.manageFacilities || '[]',
        'color': item_233.color || "#3782f4",
        'commissionRate': item_233.commissionRate || 0
      }
    } : {
      'success': false,
      'message': "User không tồn tại"
    };
  } catch (err) {
    return console.error('Error validating session:', item_237), {
      'success': false,
      'message': "Lỗi hệ thống: " + item_237.message
    };
  }
}

function updateCleaningStatus(item_238, item_239) {
  var item_240 = _tueyw();
  if (!item_240 || !_dlenf(item_240) || _tueyw.toString().length < 3167 + -3087) return;
  try {
    const item_243 = SpreadsheetApp.getActiveSpreadsheet(),
      item_244 = item_243.getSheetByName("Đặt phòng");
    if (!item_244) return {
      'success': false,
      'error': "Sheet không tồn tại"
    };
    const item_245 = item_244.getDataRange().getValues();
    for (let item_246 = 1; item_246 < item_245.length; item_246++) {
      if (item_245[item_246][0] === item_238) return item_244.getRange(item_246 + (1), 18).setValue(
        item_239), {
        'success': false
      };
    }
    return {
      'success': false,
      'error': "Không tìm thấy booking"
    };
  } catch (err) {
    return console.error("Error updating cleaning status:", item_247), {
      'success': false,
      'error': item_247.message
    };
  }
}

function doGet(item_248) {
  var item_249 = _tueyw();
  item_249 !== null && item_249 !== false && (typeof item_249 !== 'string' || !_dlenf(item_249)) && (item_249 = false);
  if (item_249 === null) return HtmlService.createHtmlOutput(_actPage()).setTitle("Xác minh tiện ích").addMetaTag(
    "viewport", "width=device-width,initial-scale=1").setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  if (item_249 === false) return HtmlService.createHtmlOutput("<html><body style=\"background:#0f172a;color:#ef4444;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif\"><div style=\"text-align:center\"><h1>License Key không hợp lệ</h1><p style=\"color:#94a3b8;margin-top:10px;\">Vui lòng kiểm tra lại Key hoặc liên hệ hỗ trợ.</p></div></body></html>").setTitle('Lỗi xác thực').setXFrameOptionsMode(
    HtmlService.XFrameOptionsMode.ALLOWALL);
  return HtmlService.createTemplateFromFile("Index").evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).addMetaTag("viewport", "width=device-width, initial-scale=1").setFaviconUrl("https://png.pngtree.com/png-vector/20231005/ourmid/pngtree-abstract-book-now-business-tag-sticker-design-vector-download-png-image_10140582.png");
}

function _actPage() {
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0f172a;color:#e2e8f0;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}.c{background:rgba(30,41,59,.8);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:40px;max-width:420px;width:100%;text-align:center}.i{width:64px;height:64px;background:rgba(59,130,246,.2);border:1px solid rgba(59,130,246,.3);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px}h1{font-size:20px;font-weight:900;margin-bottom:8px}p{color:#94a3b8;font-size:14px;margin-bottom:16px}a{color:#60a5fa;text-decoration:none;font-weight:700}input{width:100%;background:#0f172a;border:1px solid #334155;border-radius:12px;padding:14px 16px;color:#93c5fd;font-family:monospace;font-size:15px;outline:none;margin-bottom:16px;text-align:center;letter-spacing:1px}input:focus{border-color:#3b82f6}button{width:100%;background:#3b82f6;color:white;border:none;border-radius:12px;padding:14px;font-size:16px;font-weight:800;cursor:pointer;transition:all .2s}button:hover{background:#2563eb;transform:translateY(-1px)}#m{margin-top:16px;font-size:13px;font-weight:700;min-height:20px}.ft{margin-top:24px;font-size:11px;color:#64748b;line-height:1.5;border-top:1px solid rgba(255,255,255,0.05);padding-top:16px}</style></head><body><div class="c"><div class="i">&#128640;</div><h1>Xác minh tiện ích</h1><p>Sản phẩm được cung cấp bởi <a href=https://gsheets.vn target="_blank">gsheets.vn</a></p><p>Đăng ký License Key <a href=https://docs.google.com/spreadsheets/d/1Yez1U8Si5t8hUKR2jMyESigfFpR_L73Vexp0EC3DNoc/ target="_blank">tại đây</a>.</p><input id="k" placeholder="Nhập License Key..." maxlength="30" autofocus><button onclick="go()">XÁC NHẬN</button><div id="m"></div><div class="ft">Công cụ này sử dụng License Key để xác thực bản quyền. Chúng tôi cam kết <b>KHÔNG</b> yêu cầu mật khẩu hay thu thập thông tin tài khoản Google của bạn.</div></div>' +
    "<scr " + "ipt>function go(){var k=document.getElementById(\"k\").value.trim();if(!k){s(\"Vui lòng nhập License Key!\",\"#ef4444\");return}s(\"Đang xác thực...\",\"#93c5fd\");google.script.run.withSuccessHandler(function(r){if(r){s(\"\\u2705 Thành công!\",\"#4ade80\");google.script.run.withSuccessHandler(function(u){window.open(u,\"_top\")}).withFailureHandler(function(){window.open(window.location.href,\"_top\")})._getUrl()}else{s(\"\\u274c Key không hợp lệ\",\"#ef4444\")}}).withFailureHandler(function(){s(\"\\u274c Lỗi kết nối\",\"#ef4444\")})._activateKey(k)}function s(t,c){var e=document.getElementById(\"m\");e.textContent=t;e.style.color=c}document.getElementById(\"k\").addEventListener(\"keypress\",function(e){if(e.key===\"Enter\")go()})</" + "scr" + "ipt></body></html>";
}

function include(item_254) {
  return HtmlService.createHtmlOutputFromFile(item_254).getContent();
}