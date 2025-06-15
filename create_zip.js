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
  const theadTr = document.querySelector('#quizTable thead tr');
  let choiceStart = 3;
  let choiceEnd = choiceStart;
  while (theadTr.children[choiceEnd] && theadTr.children[choiceEnd].textContent.startsWith('選択肢')) {
    choiceEnd++;
  }
  const newChoiceNum = choiceEnd - choiceStart;
  const th = document.createElement('th');
  th.textContent = `選択肢${newChoiceNum}`;
  theadTr.insertBefore(th, theadTr.children[choiceEnd]);
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
  document.getElementById('zipInput').value = '';
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
      .filter(name => name.startsWith('img/') && !zip.files[name].dir)
      .map(async name => {
        const blob = await zip.file(name).async('blob');
        imgFiles[name.replace('img/', '')] = new File([blob], name.replace('img/', ''));
      })
  );
  updateImgList();

  // CSV読込（必ずappendCsvToTableのみ！）
  const csvFile = zip.file('quiz.csv');
  if (csvFile) {
    const csvText = await csvFile.async('string');
    appendCsvToTable(csvText);
  }
  document.getElementById('exportMsg').textContent = "ZIP読込完了";
  updateImgCellValidation();
});


const csvUploadBtn = document.getElementById('csvUploadBtn');

// 既存csvを読み込むボタンの機能追加
function csv_import(){
  console.log('CSV読み込みボタンがクリックされました');
  // ファイル選択ダイアログを表示
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv,text/csv';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      appendCsvToTable(text);
      alert('CSVを読み込みました');
    } catch (err) {
      alert('CSVの読み込みに失敗しました');
    }
  };
  input.click();
};

// CSV1行を安全に分割
function parseCsvLine(line) {
  const cells = [];
  let cell = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuote && line[i + 1] === '"') {
        cell += '"';
        i++;
      } else {
        inQuote = !inQuote;
      }
    } else if (c === ',' && !inQuote) {
      cells.push(cell);
      cell = '';
    } else {
      cell += c;
    }
  }
  cells.push(cell);
  return cells;
}

// テーブル末尾にCSVデータを追加（選択肢列数を自動調整）
function appendCsvToTable(csvText) {
  const rows = csvText.split(/\r?\n/).filter(line => line.trim());
  if (rows.length < 2) return;
  const tbody = document.querySelector('#quizTable tbody');
  const theadTr = document.querySelector('#quizTable thead tr');

  // 追加するCSVの選択肢列数を取得
  const csvHeaders = parseCsvLine(rows[0]);
  let csvChoiceStart = 3;
  let csvChoiceEnd = csvChoiceStart;
  while (csvHeaders[csvChoiceEnd] && csvHeaders[csvChoiceEnd].startsWith('選択肢')) {
    csvChoiceEnd++;
  }
  const csvChoiceCount = csvChoiceEnd - csvChoiceStart;

  // 現在のテーブルの選択肢列数を取得
  let tableChoiceStart = 3;
  let tableChoiceEnd = tableChoiceStart;
  while (theadTr.children[tableChoiceEnd] && theadTr.children[tableChoiceEnd].textContent.startsWith('選択肢')) {
    tableChoiceEnd++;
  }
  let tableChoiceCount = tableChoiceEnd - tableChoiceStart;

  // 必要なら選択肢列を追加
  if (csvChoiceCount > tableChoiceCount) {
    for (let i = tableChoiceCount; i < csvChoiceCount; i++) {
      const th = document.createElement('th');
      th.textContent = `選択肢${i}`;
      theadTr.insertBefore(th, theadTr.children[tableChoiceEnd]);
      for (let row of tbody.rows) {
        const cell = row.insertCell(tableChoiceEnd);
        cell.contentEditable = "true";
      }
      tableChoiceEnd++;
    }
    tableChoiceCount = csvChoiceCount;
  } else if (tableChoiceCount > csvChoiceCount) {
    // 追加するCSVの行にも空の選択肢セルを追加するため、headerLenを調整
    csvHeaders.length += (tableChoiceCount - csvChoiceCount);
  }

  // 列数を最大に合わせる
  const headerLen = Math.max(csvHeaders.length, theadTr.children.length);

  // データ行追加
  for (let i = 1; i < rows.length; i++) {
    const cells = parseCsvLine(rows[i]);
    if (cells.length === 0 || cells.every(c => c === '')) continue;
    // 選択肢列が足りない場合は空セルで埋める
    cells.length = headerLen;
    const tr = document.createElement('tr');
    for (let j = 0; j < headerLen; j++) {
      const td = document.createElement('td');
      td.contentEditable = "true";
      if (j === 2) td.className = "img-cell";
      td.textContent = cells[j] || '';
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
}

// --- 選択肢削除ボタンの実装 ---
const delChoiceBtn = document.getElementById('delChoiceBtn');

delChoiceBtn.onclick = () => {
  const theadTr = document.querySelector('#quizTable thead tr');
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
  const delIdx = choiceEnd - 1;
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
  const rowIdx = tr.rowIndex - 1;
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




window.addEventListener('beforeunload', function(e) {
  e.preventDefault();
  e.returnValue = 'このページを離れると、現在のデータは失われます。本当に移動しますか？';
});