var zipQuizUploadBtn;
var zipQuizInput;

const quizList = [
  {
    category: "C++",
    question: `
      <div>
        次のC++コードの空欄（<b>①</b>〜<b>③</b>）を埋めて、標準出力に「Hello, World!」と表示されるようにしてください。
        <pre style="background:#f8f8f8;padding:1em;border-radius:8px;">
#include &lt;<b>①</b>&gt;

int <b>②</b>() {
    std::cout &lt;&lt; <b>③</b> &lt;&lt; std::endl;
    return 0;
}
        </pre>
      </div>
    `,
    blanks: 3,
    choices: [
      'A. main',
      'B. "Hello, World!"',
      'C. stdio.h',
      'D. iostream',
      'E. start',
      'F. cout'
    ],
    answer: [3, 0, 1], // ①: D. iostream, ②: A. main, ③: B. "Hello, World!"
    explanation: `
      <ul>
        <li>① <b>iostream</b>（D）が必要です。</li>
        <li>② <b>main</b>（A）がC++のエントリポイントです。</li>
        <li>③ <b>"Hello, World!"</b>（B）が出力内容です。</li>
      </ul>
    `
  },
  {
    category: "HTML",
    question: "HTMLの略はどれですか？",
    blanks: 1,
    choices: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    answer: [0],
    explanation: "HTMLは「Hyper Text Markup Language」の略です。Webページを作成するためのマークアップ言語です。"
  }
  // 他の問題も同様に追加
];

// カテゴリ一覧を自動生成
const categories = Array.from(new Set(quizList.map(q => q.category)));

// 初期状態は全カテゴリ選択
let selectedCategories = [...categories];

// ステータス管理用の変数をグローバルで宣言
let totalAnswered = 0;
let totalCorrect = 0;
let currentStreak = 0;
let maxStreak = 0;

let isJudgeShowing = false;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const statusBar = document.getElementById('statusBar');
const judgeOverlay = document.getElementById('judgeOverlay');

// 配列シャッフル関数（Fisher-Yates法）
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 出題範囲（カテゴリでフィルタ）
function getQuizRange() {
  return quizList
    .map((q, i) => selectedCategories.includes(q.category) ? i : null)
    .filter(i => i !== null);
}


// 設定画面のHTMLを生成（カテゴリ単位）
function createSettingsHTML(page = 1) {
  if (page === 1) {
    // 1ページ目：カテゴリ設定
    let html = `<h2>出題カテゴリ設定</h2>
      <form id="categoryForm">
        <div style="margin-bottom:1em;">出題するカテゴリにチェックを入れてください。</div>
        <div style="margin-bottom:1em;">
          <button type="button" id="selectAllBtn" style="margin-bottom:0.5em;">すべて選択</button>
          <button type="button" id="deselectAllBtn" style="margin-bottom:0.5em;">すべて解除</button>
        </div>
        <div style="max-height:300px;overflow:auto;">`;
    categories.forEach((cat, i) => {
      html += `<label style="display:block;margin-bottom:0.5em;">
        <input type="checkbox" name="category" value="${cat}" checked>
        ${cat}
      </label>`;
    });
    html += `</div>
        <div style="display:flex;justify-content:space-between;margin-top:2em;">
          <button type="button" id="toCsvPageBtn" style="background:#6ea8fe;color:#fff;border:none;border-radius:8px;padding:0.7rem 1.2rem;font-size:1rem;cursor:pointer;">次へ（ZIPインポート）</button>
          <button type="submit" id="saveCategoryBtn" style="margin-top:0;">保存して戻る</button>
        </div>
      </form>`;
    return html;
  } else {
    // 2ページ目：ZIPインポート
    return `
      <h2>ZIPで問題をインポート</h2>
      <div style="font-size:0.95em;margin-bottom:0.5em;">
        <b><a href="create_zip.html">create_zip.html</a></b>で作成したZIPファイル（quiz.csv＋画像）を選択してください。<br>
        画像付き問題もインポートできます。
      </div>
      <input type="file" id="zipImportInput" accept=".zip" style="margin-bottom:1em;">
      <div style="display:flex;justify-content:space-between;margin-top:1.5em;">
        <button type="button" id="toCategoryPageBtn" style="background:#6ea8fe;color:#fff;border:none;border-radius:8px;padding:0.7rem 1.2rem;font-size:1rem;cursor:pointer;">前へ（カテゴリ設定）</button>
        <button type="button" id="importZipBtn" style="margin-left:auto;">ZIPから問題を追加</button>
      </div>
      <div id="zipImportMsg" style="margin-top:0.5em;color:#e23c3c;font-size:0.95em;"></div>
      <button type="button" id="closeSettingsBtn" style="margin-top:2em;background:#6ea8fe;color:#fff;border:none;border-radius:8px;padding:0.7rem 1.2rem;font-size:1rem;cursor:pointer;display:block;margin-left:auto;margin-right:auto;">閉じる</button>
    `;
  }
}


// 設定画面の表示・非表示
const settingsOverlay = document.createElement('div');
settingsOverlay.id = 'settingsOverlay';
settingsOverlay.style.display = 'none';
settingsOverlay.innerHTML = `
  <div class="settings-content"></div>
`;
document.body.appendChild(settingsOverlay);

// CSVパース関数
function parseQuizCsv(csvText) {
  const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(l => l);
  const quizzes = [];
  for (const line of lines) {
    // カンマ区切りで分割（解説や問題文にカンマが含まれる場合は要注意）
    // "..."で囲まれている場合のカンマは分割しないようにする
    const cells = [];
    let cell = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
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

    if (cells.length < 6) continue; // 必須項目不足

    const category = cells[0].trim();
    const question = cells[1].trim();
    const imageCell = cells[2].trim();
    // 選択肢は4番目から、解答配列の直前まで
    let answerIdx = cells.findIndex((c, i) => i > 2 && c.trim().startsWith('['));
    if (answerIdx === -1) continue;
    // 空欄の選択肢を除外
    const choices = cells.slice(3, answerIdx).map(c => c.trim()).filter(c => c !== "");
    let answer;
    try {
      answer = JSON.parse(cells[answerIdx]);
    } catch {
      answer = [];
    }
    const explanation = cells.slice(answerIdx + 1).join(',').trim();

    quizzes.push({
      category,
      question,
      image: imageCell,
      blanks: Array.isArray(answer) ? answer.length : 1,
      choices,
      answer,
      explanation
    });
  }
  return quizzes;
}

// CSV保存・読込
function saveQuizListToLocalStorage() {
  localStorage.setItem('quizList', JSON.stringify(quizList));
}
function loadQuizListFromLocalStorage() {
  const data = localStorage.getItem('quizList');
  if (data) {
    try {
      const arr = JSON.parse(data);
      if (Array.isArray(arr)) {
        quizList.length = 0;
        arr.forEach(q => quizList.push(q));
      }
    } catch {}
  }
}


function showSettings(page = 1) {
  document.querySelector('.main-content').style.display = 'none';
  settingsOverlay.style.display = 'flex';
  settingsOverlay.querySelector('.settings-content').innerHTML = createSettingsHTML(page);

  // スクロール可能に
  settingsOverlay.querySelector('.settings-content').style.maxHeight = '80vh';
  settingsOverlay.querySelector('.settings-content').style.overflowY = 'auto';

  if (page === 1) {
    // チェックボックスの状態を反映
    const form = document.getElementById('categoryForm');
    categories.forEach((cat, i) => {
      form.elements['category'][i].checked = selectedCategories.includes(cat);
    });

    // すべて選択ボタン
    const selectAllBtn = document.getElementById('selectAllBtn');
    selectAllBtn.onclick = () => {
      Array.from(form.elements['category']).forEach(cb => cb.checked = true);
    };

    // すべて解除ボタン
    const deselectAllBtn = document.getElementById('deselectAllBtn');
    deselectAllBtn.onclick = () => {
      Array.from(form.elements['category']).forEach(cb => cb.checked = false);
    };

    // 保存ボタン
    form.onsubmit = (e) => {
      e.preventDefault();
      const checked = Array.from(form.elements['category'])
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      if (checked.length === 0) {
        alert('最低1カテゴリは選択してください。');
        return;
      }
      selectedCategories = checked;
      saveCategoriesAndQuizList();
      settingsOverlay.style.display = 'none';
      document.querySelector('.main-content').style.display = '';
      showQuiz();
    };

    // 次へ（CSVインポート）ボタン
    const toCsvPageBtn = document.getElementById('toCsvPageBtn');
    toCsvPageBtn.onclick = () => showSettings(2);

  } else if (page === 2) {
    // ZIPインポート機能
    const zipInput = document.getElementById('zipImportInput');
    const importZipBtn = document.getElementById('importZipBtn');
    const zipImportMsg = document.getElementById('zipImportMsg');
    let selectedZipFile = null;

    zipInput.addEventListener('change', (e) => {
      selectedZipFile = e.target.files[0];
      zipImportMsg.textContent = '';
    });

        // 要素を挿入した直後にイベントリスナーを設定
    zipQuizUploadBtn = document.getElementById('zipQuizUploadBtn');
    zipQuizInput = document.getElementById('zipQuizInput');
    if (zipQuizUploadBtn && zipQuizInput) {
      zipQuizUploadBtn.onclick = () => {
        console.log("おっと、ZIPファイルを選択してください。");
        zipQuizInput.click();
      };
    }

    importZipBtn.onclick = async () => {
      if (!selectedZipFile) {
        zipImportMsg.textContent = "ZIPファイルを選択してください。";
        zipImportMsg.style.color = "#e23c3c";
        return;
      }
      zipImportMsg.textContent = "ZIP読込中...";
      zipImportMsg.style.color = "#4682e6";
      try {
        const zip = await JSZip.loadAsync(selectedZipFile);

        // quiz.csv読込
        const csvFile = zip.file('quiz.csv');
        if (!csvFile) {
          zipImportMsg.textContent = "quiz.csvがZIP内に見つかりません。";
          zipImportMsg.style.color = "#e23c3c";
          return;
        }
        const csvText = await csvFile.async('string');
        const quizzes = parseQuizCsv(csvText);
        if (!quizzes.length) {
          zipImportMsg.textContent = "quiz.csvの内容が不正です。";
          zipImportMsg.style.color = "#e23c3c";
          return;
        }

        // 画像ファイルをBlob URL化して、選択肢や問題文・解説に反映
        const imageBlobs = {};
        await Promise.all(
          Object.keys(zip.files)
            .filter(name => name.startsWith('img/') && !zip.files[name].dir)
            .map(async name => {
              const blob = await zip.file(name).async('blob');
              imageBlobs[name.replace('img/', '')] = URL.createObjectURL(blob);
            })
        );

        quizzes.forEach(q => {
          if (q.image) {
            let imgName = q.image.trim().replace(/^img\//, '');
            console.log('quiz.image:', q.image, 'imgName:', imgName, 'imageBlobs:', Object.keys(imageBlobs));
            if (imageBlobs[imgName]) {
              q.image = imageBlobs[imgName];
              console.log('置換成功:', q.image);
            } else {
              console.log('画像が見つかりません:', imgName);
              q.image = '';
            }
          }
        });

        // 画像パスをBlob URLに置換
        quizzes.forEach(q => {
          // 問題画像（image）が img/付き・無し両方に対応
          if (q.image) {
            let imgName = q.image.trim().replace(/^img\//, '');
            // デバッグ用
            // console.log('quiz.image:', q.image, 'imgName:', imgName, 'imageBlobs:', Object.keys(imageBlobs));
            if (imageBlobs[imgName]) {
              q.image = imageBlobs[imgName];
            } else {
              // 画像が見つからない場合は空にする
              q.image = '';
            }
          }
          // 問題文・選択肢・解説も同様に置換
          if (typeof q.question === 'string') {
            q.question = q.question.replace(/<img\s+src="img\/([^"]+)"/g, (m, fname) => {
              fname = fname.trim();
              if (imageBlobs[fname]) {
                return `<img src="${imageBlobs[fname]}"`;
              }
              return m;
            });
          }
          if (Array.isArray(q.choices)) {
            q.choices = q.choices.map(choice =>
              typeof choice === 'string'
                ? choice.replace(/<img\s+src="img\/([^"]+)"/g, (m, fname) => {
                    fname = fname.trim();
                    if (imageBlobs[fname]) {
                      return `<img src="${imageBlobs[fname]}"`;
                    }
                    return m;
                  })
                : choice
            );
          }
          if (typeof q.explanation === 'string') {
            q.explanation = q.explanation.replace(/<img\s+src="img\/([^"]+)"/g, (m, fname) => {
              fname = fname.trim();
              if (imageBlobs[fname]) {
                return `<img src="${imageBlobs[fname]}"`;
              }
              return m;
            });
          }
        });

        // quizListに追加
        quizzes.forEach(q => quizList.push(q));
        saveQuizListToLocalStorage();
        zipImportMsg.style.color = "#23b04b";
        zipImportMsg.textContent = `${quizzes.length}件の問題を追加しました。設定を保存して戻ると反映されます。`;
        // カテゴリも再生成
        while (categories.length) categories.pop();
        Array.from(new Set(quizList.map(q => q.category))).forEach(cat => categories.push(cat));
      } catch (err) {
        zipImportMsg.textContent = "ZIPの読み込みに失敗しました。";
        zipImportMsg.style.color = "#e23c3c";
        console.error(err);
      }
  }

    // 前へ（カテゴリ設定）ボタン
    const toCategoryPageBtn = document.getElementById('toCategoryPageBtn');
    toCategoryPageBtn.onclick = () => showSettings(1);

    // 閉じるボタン
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    closeSettingsBtn.onclick = () => {
      settingsOverlay.style.display = 'none';
      document.querySelector('.main-content').style.display = '';
      settingsOverlay.style.display = 'none';
      document.querySelector('.main-content').style.display = '';
      showQuiz();
    };
  }
}


// ページ初期化時にlocalStorageから読込
loadQuizListFromLocalStorage();

// 保存時にもlocalStorageへ保存
function saveCategoriesAndQuizList() {
  saveQuizListToLocalStorage();
  // ここに他の設定保存処理があれば追加
}

// 設定ボタン追加
const settingsBtn = document.createElement('button');
settingsBtn.id = 'settingsBtn';
settingsBtn.title = '設定';
settingsBtn.style.position = 'fixed';
settingsBtn.style.top = '10px';
settingsBtn.style.right = '10px';
settingsBtn.style.zIndex = 2000;
settingsBtn.style.background = 'none';
settingsBtn.style.border = 'none';
settingsBtn.style.padding = '0.3em';
settingsBtn.style.cursor = 'pointer';
settingsBtn.style.display = 'flex';
settingsBtn.style.alignItems = 'center';
settingsBtn.style.justifyContent = 'center';

// SVG画像をボタン内に表示
const settingsIcon = document.createElement('img');
settingsIcon.src = './img/setting_icon.svg';
settingsIcon.alt = '設定';
settingsIcon.style.width = '32px';
settingsIcon.style.height = '32px';
settingsBtn.appendChild(settingsIcon);

document.body.appendChild(settingsBtn);
settingsBtn.onclick = () => showSettings(1);

// 設定画面用CSS
const style = document.createElement('style');
style.textContent = `
#settingsOverlay {
  position: fixed;
  inset: 0;
  background: rgba(30,40,60,0.93);
  z-index: 3000;
  display: none;
  justify-content: center;
  align-items: flex-start;
  padding-top: 5vh;
}
.settings-content {
  background: #fff;
  border-radius: 12px;
  max-width: 95vw;
  width: 400px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  color: #222;
  max-height: 80vh;
  overflow-y: auto;
}
#settingsOverlay h2 {
  margin-top: 0;
  font-size: 1.3rem;
  color: #4682e6;
}
#saveCategoryBtn, #selectAllBtn {
  background: #6ea8fe;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 0.5em;
}
#saveCategoryBtn:hover, #selectAllBtn:hover {
  background: #4682e6;
}
#deselectAllBtn {
  background: #f5c6cb;
  color: #c82333;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 0.5em;
}
#deselectAllBtn:hover {
  background: #f194a6;
}
`;
document.head.appendChild(style);





// --- 問題出題 ---
let currentQuizIndex = null;
let currentChoices = [];
let correctIndexes = [];
let userAnswers = [];
let isAnswered = false; // 判定後の選択肢無効化用

function showQuiz() {
  isAnswered = false;
  const quizRange = getQuizRange();
  if (quizRange.length === 0) {
    questionEl.textContent = "出題できる問題がありません。設定からカテゴリを選択してください。";
    choicesEl.innerHTML = '';
    resultEl.style.display = 'none';
    nextBtn.style.display = 'none';
    return;
  }
  currentQuizIndex = quizRange[Math.floor(Math.random() * quizRange.length)];
  const quiz = quizList[currentQuizIndex];

  // 問題画像があれば先頭に表示
  let questionHtml = quiz.question;
  if (quiz.image) {
    let imgSrc = quiz.image;
    if (imgSrc.startsWith('blob:')) {
      // Blob URLならimgタグで表示
      imgSrc = `<img src="${imgSrc}" alt="" style="max-width:200px;max-height:120px;display:block;margin-bottom:1em;">`;
      questionHtml = imgSrc + questionHtml;
    }
    // ファイル名やimg/xxx.pngの場合は何もしない（警告も出さない）
  }
  questionEl.innerHTML = questionHtml;

  const choicesWithIndex = quiz.choices.map((choice, idx) => ({choice, idx}));
  shuffle(choicesWithIndex);
  currentChoices = choicesWithIndex.map(obj => obj.choice);
  correctIndexes = quiz.answer.map(ansIdx =>
    choicesWithIndex.findIndex(obj => obj.idx === ansIdx)
  );

  const blanks = quiz.blanks || 1;
  userAnswers = Array(blanks).fill(null);

  const blanksArea = document.getElementById('blanksArea');
  const answerBtnArea = document.getElementById('answerBtnArea');
  blanksArea.innerHTML = '';
  answerBtnArea.innerHTML = '';
  choicesEl.innerHTML = '';

  let answerBtn = null;
  const judgeMarks = [];
  for (let i = 0; i < blanks; i++) {
    const blankDiv = document.createElement('div');
    blankDiv.className = 'blank-select';
    blankDiv.style.marginBottom = '1em';
    blankDiv.innerHTML = `<span style="font-weight:bold;">空欄${i + 1}：</span>`;
    // 個別判定用マーク
    const judgeMark = document.createElement('span');
    judgeMark.className = 'judge-mark';
    judgeMark.style.marginLeft = '0.7em';
    blankDiv.appendChild(judgeMark);
    judgeMarks.push(judgeMark);

    currentChoices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.type = 'button';
      btn.innerHTML = choice;
      btn.onclick = () => {
        if (isJudgeShowing || isAnswered) return;
        userAnswers[i] = idx;
        Array.from(blankDiv.querySelectorAll('.choice-btn')).forEach((b, j) => {
          b.classList.toggle('selected', j === idx);
        });
        // 判定はここでは行わない（解答ボタンでまとめて判定）
        // ただし、すでに判定済みならボタン無効化
        if (isAnswered) btn.disabled = true;
        // 解答ボタン有効化
        if (answerBtn) {
          answerBtn.disabled = !userAnswers.every(ans => ans !== null);
        }
        // 単一空欄は即判定
        if (blanks === 1) {
          isAnswered = true;
          checkMultiBlankAnswer(judgeMarks);
        }
      };
      blankDiv.appendChild(btn);
    });
    blanksArea.appendChild(blankDiv);
  }

  // 複数空欄の場合のみ「解答」ボタンをanswerBtnAreaに表示
  if (blanks > 1) {
    answerBtn = document.createElement('button');
    answerBtn.id = 'answerBtn';
    answerBtn.type = 'button';
    answerBtn.textContent = '解答';
    answerBtn.disabled = true;
    answerBtn.onclick = () => {
      if (isJudgeShowing || isAnswered) return;
      if (!userAnswers.every(ans => ans !== null)) return;
      isAnswered = true;
      checkMultiBlankAnswer(judgeMarks);
    };
    answerBtnArea.appendChild(answerBtn);
  }

  resultEl.style.display = 'none';
  nextBtn.style.display = 'none';
}

// 判定処理（複数空欄対応・個別マーク付き・正答ハイライト）
function checkMultiBlankAnswer(judgeMarks) {
  if (isJudgeShowing) return;
  const quiz = quizList[currentQuizIndex];
  // 各空欄ごとに判定
  let allCorrect = true;
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === correctIndexes[i]) {
      judgeMarks[i].textContent = '◎';
      judgeMarks[i].style.color = '#23b04b';
    } else {
      judgeMarks[i].textContent = '✕';
      judgeMarks[i].style.color = '#e23c3c';
      allCorrect = false;
    }
  }

  // 正答ハイライト
  document.querySelectorAll('.blank-select').forEach((blankDiv, i) => {
    Array.from(blankDiv.querySelectorAll('.choice-btn')).forEach((btn, j) => {
      btn.classList.remove('correct-answer');
      if (j === correctIndexes[i]) {
        btn.classList.add('correct-answer');
      }
    });
  });

  resultEl.style.display = 'block';
  if (allCorrect) {
    resultEl.innerHTML = "正解！<br>" + quiz.explanation;
    resultEl.className = 'result correct';
  } else {
    resultEl.innerHTML = "不正解。<br>" + quiz.explanation;
    resultEl.className = 'result incorrect';
  }

  // 全体アニメーション（全問正解なら正解アニメーション、それ以外は不正解アニメーション）
  showJudgeOverlay(allCorrect);

  totalAnswered++;
  if (allCorrect) {
    totalCorrect++;
    currentStreak++;
    if (currentStreak > maxStreak) maxStreak = currentStreak;
  } else {
    currentStreak = 0;
  }
  updateStatusBar();

  nextBtn.style.display = 'block';
  // すべての選択肢ボタンを無効化
  Array.from(document.querySelectorAll('.choice-btn')).forEach(b => b.disabled = true);
  // 解答ボタンも無効化
  const answerBtn = document.getElementById('answerBtn');
  if (answerBtn) answerBtn.disabled = true;
}

// CSS追加（正答ハイライト用）
const correctStyle = document.createElement('style');
correctStyle.textContent = `
.choice-btn.correct-answer {
  background: #d6f5d6 !important;
  border: 2px solid #23b04b !important;
}
`;
document.head.appendChild(correctStyle);

// 画面全体に正解・不正解を表示する関数
function showJudgeOverlay(isCorrect) {
  isJudgeShowing = true;
  judgeOverlay.innerHTML = isCorrect
    ? '<span class="icon">◎</span>正解！'
    : '<span class="icon">✕</span>不正解';
  judgeOverlay.className = isCorrect ? 'show correct' : 'show incorrect';
  judgeOverlay.style.display = 'flex';
  setTimeout(() => {
    judgeOverlay.style.display = 'none';
    judgeOverlay.className = '';
    isJudgeShowing = false;
  }, 1700);
}

nextBtn.onclick = () => {
  if (isJudgeShowing) return;
  showQuiz();
};

function updateStatusBar() {
  const rate = totalAnswered === 0 ? 0 : Math.round((totalCorrect / totalAnswered) * 100);
  statusBar.textContent =
    `現在解いた問題数: ${totalAnswered}, 内正解数: ${totalCorrect}, 正解率: ${rate}%, 連続正解数: ${currentStreak}, 最高連続正解数: ${maxStreak}`;
}

updateStatusBar();
showQuiz();