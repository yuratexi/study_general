// 画像ファイル管理
const imgFiles = {}; // {ファイル名: File}

document.getElementById('imgUploadBtn').onclick = () => {
  document.getElementById('imgInput').click();
};

document.getElementById('imgInput').addEventListener('change', (e) => {
  for (const file of e.target.files) {
    imgFiles[file.name] = file;
  }
  updateImgList();
  updateImgCellValidation();
});

function updateImgList() {
  const imgList = document.getElementById('imgList');
  imgList.innerHTML = '';
  Object.values(imgFiles).forEach(file => {
    const url = URL.createObjectURL(file);
    const div = document.createElement('div');
    div.className = 'img-thumb';
    div.innerHTML = `<img src="${url}" alt=""><span>${file.name}</span>`;
    imgList.appendChild(div);
  });
}

// Excel風テーブル操作
const table = document.getElementById('quizTable').getElementsByTagName('tbody')[0];

// 行追加
document.getElementById('addRowBtn').onclick = () => {
  const row = table.insertRow();
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    const cell = row.insertCell();
    cell.contentEditable = "true";
    if (i === 2) cell.className = "img-cell";
  }
  updateImgCellValidation();
};

// 選択肢追加
document.getElementById('addChoiceBtn').onclick = () => {
  // ヘッダー追加
  const theadTr = document.querySelector('#quizTable thead tr');
  // 選択肢列のインデックスを取得（問題画像:2, 選択肢0:3, 選択肢1:4, ...）
  let choiceStart = 3;
  let choiceEnd = choiceStart;
  while (theadTr.children[choiceEnd] && theadTr.children[choiceEnd].textContent.startsWith('選択肢')) {
    choiceEnd++;
  }
  // 新しい選択肢番号（0始まりに修正）
  const newChoiceNum = choiceEnd - choiceStart;
  const th = document.createElement('th');
  th.textContent = `選択肢${newChoiceNum}`;
  // 選択肢列の最後（解答配列の直前）に挿入
  theadTr.insertBefore(th, theadTr.children[choiceEnd]);
  // 各行にセル追加
  for (let row of table.rows) {
    const cell = row.insertCell(choiceEnd);
    cell.contentEditable = "true";
  }
};

// 画像セルのバリデーション
function updateImgCellValidation() {
  for (let row of table.rows) {
    const cell = row.cells[2];
    if (!cell) continue;
    const val = cell.textContent.trim();
    if (val && !(val in imgFiles)) {
      cell.classList.add('invalid');
      cell.title = '画像が追加されていません';
    } else {
      cell.classList.remove('invalid');
      cell.title = '';
    }
  }
}

// 画像セル編集時にバリデーション
table.addEventListener('input', (e) => {
  if (e.target.classList.contains('img-cell')) {
    updateImgCellValidation();
  }
});

// ZIP作成
document.getElementById('exportZipBtn').onclick = async () => {
  const zip = new JSZip();
  // CSV生成
  let csv = '';
  const ths = Array.from(document.querySelectorAll('#quizTable thead th')).map(th => th.textContent);
  csv += ths.join(',') + '\n';
  for (let row of table.rows) {
    const cells = Array.from(row.cells).map(cell => {
      // カンマ・改行をエスケープ
      let v = cell.textContent.replace(/"/g, '""');
      if (v.match(/[",\n]/)) v = `"${v}"`;
      return v;
    });
    csv += cells.join(',') + '\n';
  }
  zip.file('quiz.csv', csv);

  // 画像追加
  for (const fileName in imgFiles) {
    zip.file('img/' + fileName, imgFiles[fileName]);
  }

  // ダウンロード
  document.getElementById('exportMsg').textContent = "作成中...";
  const blob = await zip.generateAsync({type: "blob"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quiz.zip';
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.getElementById('exportMsg').textContent = "ダウンロードしました";
  }, 1000);
};

// 既存ZIP読み込み
document.getElementById('zipUploadBtn').onclick = () => {
  document.getElementById('zipInput').click();
};

document.getElementById('zipInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  document.getElementById('exportMsg').textContent = "ZIP読込中...";
  const zip = await JSZip.loadAsync(file);

  // 画像読込
  await Promise.all(
    Object.keys(zip.files)
      .filter(name => name.startsWith('img/') && !zip.files[name].dir) // ディレクトリでないものだけ
      .map(async name => {
        const blob = await zip.file(name).async('blob');
        imgFiles[name.replace('img/', '')] = new File([blob], name.replace('img/', ''));
      })
  );
  updateImgList();

  // CSV読込
  const csvFile = zip.file('quiz.csv');
  if (csvFile) {
    const csvText = await csvFile.async('string');
    loadCsvToTable(csvText);
  }
  document.getElementById('exportMsg').textContent = "ZIP読込完了";
  updateImgCellValidation();
});

// CSVをテーブルに反映
function loadCsvToTable(csvText) {
  // テーブル初期化
  while (table.rows.length > 0) table.deleteRow(0);
  const lines = csvText.split(/\r?\n/).filter(l => l.trim());
  if (lines.length === 0) return;
  // ヘッダー
  const headers = lines[0].split(',');
  const theadTr = document.querySelector('#quizTable thead tr');
  while (theadTr.children.length > headers.length) theadTr.removeChild(theadTr.lastChild);
  while (theadTr.children.length < headers.length) {
    const th = document.createElement('th');
    // 0始まりに修正
    th.textContent = `選択肢${theadTr.children.length - 3}`;
    theadTr.insertBefore(th, theadTr.children[theadTr.children.length - 3]);
  }
  headers.forEach((h, i) => {
    // 既存の「選択肢N」列は0始まりに修正
    if (h.match(/^選択肢\d+$/)) {
      theadTr.children[i].textContent = `選択肢${i - 3}`;
    } else {
      theadTr.children[i].textContent = h;
    }
  });
  // 行
  for (let i = 1; i < lines.length; i++) {
    const row = table.insertRow();
    const cells = [];
    let cell = '';
    let inQuote = false;
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c === '"') {
        inQuote = !inQuote;
      } else if (c === ',' && !inQuote) {
        cells.push(cell);
        cell = '';
      } else {
        cell += c;
      }
    }
    cells.push(cell);
    for (let j = 0; j < headers.length; j++) {
      const td = row.insertCell();
      td.contentEditable = "true";
      if (j === 2) td.className = "img-cell";
      td.textContent = cells[j] || '';
    }
  }
  updateImgCellValidation();
}

// --- 選択肢削除ボタンの実装 ---
const delChoiceBtn = document.getElementById('delChoiceBtn');

delChoiceBtn.onclick = () => {
  const theadTr = document.querySelector('#quizTable thead tr');
  // 選択肢列のインデックスを取得
  let choiceStart = 3;
  let choiceEnd = choiceStart;
  while (theadTr.children[choiceEnd] && theadTr.children[choiceEnd].textContent.startsWith('選択肢')) {
    choiceEnd++;
  }
  const choiceCount = choiceEnd - choiceStart;
  if (choiceCount <= 2) {
    alert('これ以上選択肢を消すことはできません');
    return;
  }
  const delIdx = choiceEnd - 1; // 一番右の選択肢
  // どこかに値が入っているかチェック
  let hasValue = false;
  for (let row of table.rows) {
    if (row.cells[delIdx] && row.cells[delIdx].textContent.trim() !== '') {
      hasValue = true;
      break;
    }
  }
  if (hasValue) {
    if (!confirm('削除する選択肢列に値が入っています。本当に削除しますか？')) return;
  }
  // 削除
  theadTr.removeChild(theadTr.children[delIdx]);
  for (let row of table.rows) {
    row.deleteCell(delIdx);
  }
};

// --- 行削除ボタンの実装 ---
const delRowBtn = document.getElementById('delRowBtn');

delRowBtn.onclick = () => {
  if (table.rows.length <= 1) {
    alert('これ以上行を消すことはできません');
    return;
  }
  const lastRow = table.rows[table.rows.length - 1];
  let hasValue = false;
  for (let cell of lastRow.cells) {
    if (cell.textContent.trim() !== '') {
      hasValue = true;
      break;
    }
  }
  if (hasValue) {
    if (!confirm('削除する行に値が入っています。本当に削除しますか？')) return;
  }
  table.deleteRow(table.rows.length - 1);
  updateImgCellValidation();
};

// --- セル移動（矢印キー・Enter） ---
table.addEventListener('keydown', function(e) {
  if (!e.target.isContentEditable) return;
  const td = e.target;
  const tr = td.parentElement;
  const rowIdx = tr.rowIndex - 1; // tbody内のindex
  const cellIdx = td.cellIndex;
  let nextCell = null;
  if (e.key === 'ArrowRight') {
    if (td.nextElementSibling) nextCell = td.nextElementSibling;
  } else if (e.key === 'ArrowLeft') {
    if (td.previousElementSibling) nextCell = td.previousElementSibling;
  } else if (e.key === 'ArrowUp') {
    if (rowIdx > 0) nextCell = table.rows[rowIdx - 1].cells[cellIdx];
  } else if (e.key === 'ArrowDown') {
    if (rowIdx < table.rows.length - 1) nextCell = table.rows[rowIdx + 1].cells[cellIdx];
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (rowIdx < table.rows.length - 1) {
      nextCell = table.rows[rowIdx + 1].cells[cellIdx];
    } else {
      // 一番下の行なら新しい行を追加
      const newRow = table.insertRow();
      for (let i = 0; i < table.rows[0].cells.length; i++) {
        const cell = newRow.insertCell();
        cell.contentEditable = "true";
        if (i === 2) cell.className = "img-cell";
      }
      updateImgCellValidation();
      nextCell = newRow.cells[cellIdx];
    }
  }
  if (nextCell) {
    nextCell.focus();
    // キャレットを末尾に
    if (document.createRange) {
      const range = document.createRange();
      range.selectNodeContents(nextCell);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
});



function saveToLocal() {
  // テーブル内容
  const ths = Array.from(document.querySelectorAll('#quizTable thead th')).map(th => th.textContent);
  const rows = [];
  for (let row of table.rows) {
    rows.push(Array.from(row.cells).map(cell => cell.textContent));
  }
  // 画像ファイル名リスト
  const images = {};
  for (const [name, file] of Object.entries(imgFiles)) {
    images[name] = file; // Fileは保存できないので後で
  }
  // 画像ファイル名のみ保存
  const imageNames = Object.keys(imgFiles);

  // localStorageへ保存
  localStorage.setItem('quizTableHeaders', JSON.stringify(ths));
  localStorage.setItem('quizTableRows', JSON.stringify(rows));
  localStorage.setItem('quizImageNames', JSON.stringify(imageNames));
}

// テーブル編集時・画像追加時に保存
table.addEventListener('input', saveToLocal);
table.addEventListener('keydown', saveToLocal);
document.getElementById('imgInput').addEventListener('change', saveToLocal);
document.getElementById('addRowBtn').addEventListener('click', saveToLocal);
document.getElementById('delRowBtn').addEventListener('click', saveToLocal);
document.getElementById('addChoiceBtn').addEventListener('click', saveToLocal);
document.getElementById('delChoiceBtn').addEventListener('click', saveToLocal);


window.addEventListener('DOMContentLoaded', async () => {
  // テーブル
  const ths = JSON.parse(localStorage.getItem('quizTableHeaders') || 'null');
  const rows = JSON.parse(localStorage.getItem('quizTableRows') || 'null');
  const imageNames = JSON.parse(localStorage.getItem('quizImageNames') || 'null');
  if (ths && rows) {
    // ヘッダー復元
    const theadTr = document.querySelector('#quizTable thead tr');
    while (theadTr.children.length > ths.length) theadTr.removeChild(theadTr.lastChild);
    while (theadTr.children.length < ths.length) {
      const th = document.createElement('th');
      th.textContent = `選択肢${theadTr.children.length - 3}`;
      theadTr.insertBefore(th, theadTr.children[theadTr.children.length - 3]);
    }
    ths.forEach((h, i) => theadTr.children[i].textContent = h);

    // 行復元
    while (table.rows.length > 0) table.deleteRow(0);
    for (let r of rows) {
      const row = table.insertRow();
      for (let j = 0; j < ths.length; j++) {
        const td = row.insertCell();
        td.contentEditable = "true";
        if (j === 2) td.className = "img-cell";
        td.textContent = r[j] || '';
      }
    }
    updateImgCellValidation();
  }
  // 画像ファイル名リストは復元できるが、File本体はlocalStorageに保存できないため
  // 画像は再アップロードが必要です（ファイル本体をIndexedDBで保存する場合は別途実装が必要）
});