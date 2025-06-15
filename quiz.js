function getrandom(min, max) {
    var random = Math.floor(Math.random() * (max + 1 - min)) + min;
    return random;
}


const floweyQuotes = [
  "さぁて、オマエのオツムが試される時間だよ☆",
  "おっほーう、クイズのお時間だぁ☆準備はいいよねぇ？",
  "ねぇねぇ、どれだけバカか証明してみてよ！",
  "これは簡単だよ…たぶん、キミには無理だけどねぇ☆",
  "正解したらほめてあげるよ…ウソだけどねぇ！",
  "さぁ～て、どれだけ間違えるか見ものだねぇ☆",
  "この問題、解けたらスゴイよ。いや、解けないか☆",
  "フフフ、キミにしては難しすぎるかな？",
  "え？まだ諦めてないの？じゃあ次ぃ～！",
  "ハイ、脳ミソフル回転してみて？できるならねぇ☆",
  "知ってる？クイズって、バカが炙り出される遊びなんだよ☆",
  "そろそろボロが出る頃だと思ってたんだ～！",
  "ほら、これ答えてみてよ？どうせ間違えるけどさぁ☆",
  "準備はいい？…してなくても始めるけど☆",
  "また出しちゃうよ～ん♪問題ぃ、いっきまぁ～す☆",
  "次の問題が来るよ！逃げちゃダメだよ？いや、逃げてもいいけど☆",
  "クイズが趣味なんて言わないでよ？恥ずかしいから☆",
  "問題、いっくよー！泣く準備はできてる？",
  "さて、オマエの知能指数が明らかになる時だ！",
  "この問題、間違えると…アハハ、楽しいコトが起きるかも☆",
  "はいっ！サービス問題☆正解できなきゃ笑っちゃうよ～？",
  "こたえられるかなぁ？…なんてね、ムリだよねぇ☆",
  "ねぇねぇ、今まで何問正解したっけ？あ、興味ないか☆",
  "まだやるの？根性だけは認めてあげるよ☆",
  "この問題…解けたら奇跡だよ！…あ、奇跡って嫌いだったっけ？",
  "へへへっ…次はちょっとだけムズカシイよ☆ほんのちょっとね☆",
  "ボクの期待、いい意味で裏切ってほしいな～！ムリだろうけど☆",
  "この問題、特別に作ってあげたんだ～！特別にキミのためにねぇ☆",
  "さぁ～て、次の罠にかかってくれるかな？",
  "まだまだ終わらないよ～☆何千問でも出してあげる♪",
  "正解できるかは…キミ次第！…ウソ、全部ボク次第☆",
  "選択肢見て絶望する準備、できてる？",
  "さぁ、脳みそ働かせようねぇ？たまにはさぁ☆",
  "あーあ、もう答えわかっちゃったよ～。でもキミはまだ悩んでるのかぁ☆",
  "“運”に頼る？いいねぇ～、その姿勢、大好き☆",
  "よぉし、じゃあ次のオモチャを与えてあげる♪",
  "クイズってたのしいよねぇ～☆ボクは答え知ってるから特にさぁ☆",
  "もし間違えたら、どうなるか知ってるよねぇ？",
  "この問題、正解したら……すごい！間違えたら……フフフフ☆",
  "オマエの限界、見せてもらおうかぁ☆",
  "さて、次の問題にいこうじゃないか！逃げ道はナシだよぉ☆",
  "答える前にヒント？ないよそんなもん☆",
  "キミの頭、どれくらい豆腐かな～って試す問題だよ☆",
  "間違えたらどうなると思う～？ワクワクするねぇ☆",
  "問題出していい？って聞かないよぉ☆はい出すよぉ～☆",
  "カンで答える？フフフ、愚か者め☆",
  "この問題、昔“誰か”が泣いたやつだよ☆",
  "次の問題ぃ～…楽しみだねぇ☆キミの顔見るのがさぁ☆",
  "記憶力も問われるよぉ～☆ないかもしれないけどさぁ！",
  "今度は運だけじゃムリかもねぇ☆",
  "さあ、そろそろマジになってみようか？",
  "キミ、まだ正気？クイズってそういうモノじゃないよ☆",
  "やめた方がいいと思うな～。でも出すけど☆",
  "ねぇ、“希望”ってまだ持ってる？それ、間違いの元だよぉ☆",
  "次の問題、間違えたら…ボクが笑いすぎて爆発しちゃうかも☆",
  "あ～、もう！早く間違えて！待ちきれないよぉ～☆",
  "フフフ、キミの苦しむ顔が一番のごほうびだよ☆",
  "この問題で運命が変わる…わけないか☆",
  "ねぇ、“難しい”って言った？まだ序の口だよぉ☆",
  "正解しても安心しないでね？もっと酷くなるから☆",
  "次も外したら、何かが起きるよ☆ふふふっ♪",
  "ほらほら、時間ないよ～？焦れ焦れぇ☆",
  "答えがわかる？すごいねぇ、キミにしてはさぁ☆",
  "クイズって言葉、ほんとは“トラウマ”の別名だったりして☆",
  "この問題、昔“あの子”が間違えたんだよぉ☆",
  "フラグ立てちゃったねぇ～！じゃあ問題、いくよぉ☆",
  "がんばってねぇ～♪…無駄だけど☆",
  "問題！…あっ、やっぱやめよっかな？って思った？ムリムリ☆",
  "え？ヒント？…ふふふ、ボクが敵だってわかってる？",
  "次の問題は～…ボクの気まぐれで決めたよ☆",
  "あー、早く間違えてぇ～。間違えてくれなきゃ楽しくないよぉ☆",
  "次の問題は“サービス”だよ！サービス“地獄”って意味だけど☆",
  "あはっ、あっはっはっは！…ごめん、思い出し笑い☆",
  "今なら逃げてもいいよ？いやウソだけど☆",
  "難易度？もちろん“フラウィー級”さ☆",
  "うふふふふ…この問題、大好きなんだよねぇ☆",
  "この問題、答えたらボクとおそろいになれるかも☆ウソだけど☆",
  "おやおや？まだ元気そうだねぇ☆じゃ、ちょっと疲れさせてあげる♪",
  "次も正解できたら…ちょっと見直すかも☆1ミリくらいねぇ",
  "じゃ、次の問題！全力で間違ってねぇ☆",
  "ねぇ、これクイズじゃなくて拷問だって気づいた？え？まだ？☆",
  "次はねぇ～、超★理不尽★問題だよぉ～☆",
  "この問題、ボクが考えたんだ！すごいでしょ？ウザいでしょ？☆",
  "早く答えてよぉ～☆答えるのが怖いんでしょぉ～？",
  "次の問題、当てたら褒めてあげるよ☆（棒読み）",
  "おいおい、まだ生きてるのぉ？じゃ、もっと難しいのいこっかぁ☆",
  "じゃあ～次はちょっとイジワルしよっかなぁ～☆",
  "キミのこと、ちょ～っとだけ見直すかも…間違えなければねぇ☆",
  "この問題、キミの記憶が試されるよ～☆どうせボロボロだけど☆",
  "ねぇ、そろそろ降参したら？まだ間に合うよ？（多分）",
  "このクイズ、ボクの愛がたっぷり詰まってるよ☆毒入りだけど☆",
  "あれ？そんなに震えてるの？フフフフフ☆",
  "さぁさぁ！どんどん行こうよ～☆地獄の底までねぇ☆",
  "この問題、簡単かも～。キミにとってはね？地獄だけど☆",
  "アッハハ！これが最後？だったらよかったのにねぇ☆",
  "さぁ、選んで選んでぇ☆地雷はどれかな～☆",
  "やぁだ、もうぉ～☆キミってほんと…笑える☆",
  "フフッ…期待してないけど、一応聞いてみよっか☆",
  "じゃ、次の問題☆希望？絶望？選ぶのはキミさぁ☆",
  "さぁて…最終問題…なんて思った？甘いよぉ☆ず～っと続くんだから♪"
];

function getRandomFloweyQuote() {
  const index = Math.floor(Math.random() * floweyQuotes.length);
  return floweyQuotes[index];
}

// IndexedDBを使ったクイズデータ保存・読込

const DB_NAME = 'quizDB';
const DB_VERSION = 1;
const QUIZ_STORE = 'quizzes';
const IMAGE_STORE = 'images';

// IndexedDBに保存
async function saveToIndexedDB(quizzes, imageBlobs) {
  return new Promise((resolve, reject) => {
    const openReq = indexedDB.open(DB_NAME, DB_VERSION);
    openReq.onupgradeneeded = function(e) {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(QUIZ_STORE)) {
        db.createObjectStore(QUIZ_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(IMAGE_STORE)) {
        db.createObjectStore(IMAGE_STORE);
      }
    };
    openReq.onsuccess = function(e) {
      const db = e.target.result;
      const tx = db.transaction([QUIZ_STORE, IMAGE_STORE], 'readwrite');
      const quizStore = tx.objectStore(QUIZ_STORE);
      const imgStore = tx.objectStore(IMAGE_STORE);
      quizStore.clear();
      imgStore.clear();
      quizzes.forEach((q, i) => quizStore.put({ ...q, id: i }));
      Object.entries(imageBlobs).forEach(([name, blob]) => {
        if (blob instanceof Blob) {
          imgStore.put(blob, name);
        } else {
          console.warn('保存時: 画像がBlob型ではありません', name, blob);
        }
      });
      tx.oncomplete = () => resolve();
      tx.onerror = (err) => reject(err);
    };
    openReq.onerror = (err) => reject(err);
  });
}

// IndexedDBから読込
async function loadFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const openReq = indexedDB.open(DB_NAME, DB_VERSION);
    openReq.onupgradeneeded = function(e) {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(QUIZ_STORE)) {
        db.createObjectStore(QUIZ_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(IMAGE_STORE)) {
        db.createObjectStore(IMAGE_STORE);
      }
    };
    openReq.onsuccess = function(e) {
      const db = e.target.result;
      const tx = db.transaction([QUIZ_STORE, IMAGE_STORE], 'readonly');
      const quizStore = tx.objectStore(QUIZ_STORE);
      const imgStore = tx.objectStore(IMAGE_STORE);
      const quizzes = [];
      quizStore.openCursor().onsuccess = function(ev) {
        const cursor = ev.target.result;
        if (cursor) {
          quizzes.push(cursor.value);
          cursor.continue();
        } else {
          const imageBlobs = {};
          imgStore.openCursor().onsuccess = function(ev2) {
            const cursor2 = ev2.target.result;
            if (cursor2) {
              const val = cursor2.value;
              if (val instanceof Blob) {
                imageBlobs[cursor2.key] = URL.createObjectURL(val);
              } else {
                console.warn('読込時: 画像がBlob型ではありません', cursor2.key, val);
                imageBlobs[cursor2.key] = '';
              }
              cursor2.continue();
            } else {
              // quizzesのimageをBlob URLに置換
              quizzes.forEach(q => {
                if (q.image && imageBlobs[q.image]) {
                  q.image = imageBlobs[q.image];
                }
              });
              resolve({ quizzes, imageBlobs });
            }
          };
        }
      };
      tx.onerror = (err) => reject(err);
    };
    openReq.onerror = (err) => reject(err);
  });
}


var zipQuizUploadBtn;
var zipQuizInput;

var quizList = [];

// カテゴリ一覧を自動生成
const categories = Array.from(new Set(quizList.map(q => q.category)));

// 初期状態は全カテゴリ選択
let selectedCategories = [...categories];

// ステータス管理用の変数をグローバルで宣言
let totalAnswered = 0;
let totalCorrect = 0;
let currentStreak = 0;
let maxStreak = 0;
let current_miss = 0; // 現在の連続不正解数

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
  if (lines.length === 0) return quizzes;
  // 1行目はヘッダーなのでスキップ
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // カンマ区切り・引用符対応
    const cells = [];
    let cell = '';
    let inQuote = false;
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

    // デバッグ：各行のセル数と内容を確認
     //console.log('cells:', cells);

    // 必須項目数はヘッダーと同じにする
    if (cells.length < 9) continue;

    const category = cells[0].trim();
    const question = cells[1].trim();
    const image = cells[2].trim(); // ←ここ
    // 選択肢は4番目から、解答配列の直前まで
    // 選択肢数はヘッダーから自動判定
    let answerIdx = cells.findIndex((c, idx) => idx > 2 && c.trim().startsWith('['));
    if (answerIdx === -1) continue;
    const choices = cells.slice(3, answerIdx).map(c => c.trim()).filter(c => c !== "");
    let answer;
    try {
      answer = JSON.parse(cells[answerIdx]);
    } catch {
      answer = [];
    }
    const explanation = cells.slice(answerIdx + 1).join(',').trim();

    // デバッグ：image列を必ず出力
     //console.log('parseQuizCsv:', {category, question, image, choices, answer, explanation});

    quizzes.push({
      category,
      question,
      image, // ←ここで必ずセット
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

// ダブルクォーテーション対応のCSVパース関数
function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuote = false;
  let i = 0;
  while (i < csvText.length) {
    const c = csvText[i];
    if (c === '"') {
      if (inQuote && csvText[i + 1] === '"') {
        cell += '"';
        i++;
      } else {
        inQuote = !inQuote;
      }
    } else if (c === ',' && !inQuote) {
      row.push(cell);
      cell = '';
    } else if ((c === '\n' || c === '\r') && !inQuote) {
      if (c === '\r' && csvText[i + 1] === '\n') i++; // CRLF対応
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += c;
    }
    i++;
  }
  // 最後のセル
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}


function showSettings(page = 1) {
  document.querySelector('.main-content').style.display = 'none';
  settingsOverlay.style.display = 'flex';
  settingsOverlay.querySelector('.settings-content').innerHTML = createSettingsHTML(page);

  // スクロール可能に
  settingsOverlay.querySelector('.settings-content').style.maxHeight = '80vh';
  settingsOverlay.querySelector('.settings-content').style.overflowY = 'auto';

    if (page === 1) {
      // localStorageからカテゴリ選択状況を復元
      const saved = localStorage.getItem('selectedCategories');
      if (saved) {
        selectedCategories = JSON.parse(saved);
      } else {
        selectedCategories = [...categories]; // デフォルトは全選択
      }

      settingsOverlay.innerHTML = `
        <div class="settings-content" style="max-height: 80vh; overflow-y: auto;">
          <h2>出題カテゴリ設定</h2>
          <form id="categoryForm">
            <div style="margin-bottom:1em;">出題するカテゴリにチェックを入れてください。</div>
            <div style="margin-bottom:1em;">
              <button type="button" id="selectAllBtn" style="margin-bottom:0.5em;">すべて選択</button>
              <button type="button" id="deselectAllBtn" style="margin-bottom:0.5em;">すべて解除</button>
            </div>
            <div id="categoryCheckboxes" style="max-height:300px;overflow:auto;">
              ${categories.map(cat => `
                <label style="display:block;margin-bottom:0.5em;">
                  <input type="checkbox" name="category" value="${cat}" ${selectedCategories.includes(cat) ? 'checked' : ''}>
                  ${cat}
                </label>
              `).join('')}
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:2em;">
              <button type="button" id="toCsvPageBtn" style="background:#6ea8fe;color:#fff;border:none;border-radius:8px;padding:0.7rem 1.2rem;font-size:1rem;cursor:pointer;">次へ（ZIPインポート）</button>
              <button type="submit" id="saveCategoryBtn" style="margin-top:0;">保存して戻る</button>
            </div>
          </form>
        </div>
      `;
      settingsOverlay.style.display = 'flex';
      document.querySelector('.main-content').style.display = 'none';

      // すべて選択/解除ボタン
      document.getElementById('selectAllBtn').onclick = () => {
        document.querySelectorAll('input[name="category"]').forEach(cb => cb.checked = true);
      };
      document.getElementById('deselectAllBtn').onclick = () => {
        document.querySelectorAll('input[name="category"]').forEach(cb => cb.checked = false);
      };

      // 保存ボタン
      document.getElementById('categoryForm').onsubmit = (e) => {
        e.preventDefault();
        selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
        localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
        settingsOverlay.style.display = 'none';
        document.querySelector('.main-content').style.display = '';
        showQuiz();
        updateStatusBar();
      };

      // 次へボタン
      document.getElementById('toCsvPageBtn').onclick = () => showSettings(2);
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
        // ここでダブルクォーテーション対応のパースを使う
        const rows = parseCsv(csvText).filter(line => line.some(cell => cell.trim() !== ''));
        if (rows.length < 2) {
          zipImportMsg.textContent = "quiz.csvの内容が不正です。";
          zipImportMsg.style.color = "#e23c3c";
          return;
        }
        // 1行目はヘッダー
        const quizzes = [];
        const headers = rows[0];
        for (let i = 1; i < rows.length; i++) {
          const cells = rows[i];
          if (cells.length < 9) continue;
          const category = cells[0].trim();
          const question = cells[1].trim();
          const image = cells[2].trim();
          let answerIdx = cells.findIndex((c, idx) => idx > 2 && c.trim().startsWith('['));
          if (answerIdx === -1) continue;
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
            image,
            blanks: Array.isArray(answer) ? answer.length : 1,
            choices,
            answer,
            explanation
          });
        }

        // 画像ファイルをBlob URL化して、選択肢や問題文・解説に反映
        const imageBlobs = {};
        await Promise.all(
          Object.keys(zip.files)
            .filter(name => name.startsWith('img/') && !zip.files[name].dir)
            .map(async name => {
              const blob = await zip.file(name).async('blob');
              imageBlobs[name.replace(/^img\//, '')] = URL.createObjectURL(blob);
            })
        );

        // quizzesの各問題のimageをBlob URLに置換
        quizzes.forEach(q => {
          if (q.image) {
            let imgName = q.image.trim().replace(/^img\//, '');
            if (imageBlobs[imgName]) {
              q.image = imageBlobs[imgName];
            } else {
              q.image = '';
            }
          }
          // 問題文・選択肢・解説内のimgタグも置換
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

        //データの保存
        await saveToIndexedDB(quizzes, imageBlobs);

        // quizListに追加
        quizList.length = 0;
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
    };

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
      //console.log('quizList before showQuiz:', quizList);
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
  if(document.getElementById('themeToggle').checked){
    document.getElementById('enemy_serif').innerText = getRandomFloweyQuote();
  }
  currentQuizIndex = quizRange[Math.floor(Math.random() * quizRange.length)];
  const quiz = quizList[currentQuizIndex];

  // 問題画像があれば先頭に表示
  let questionHtml = quiz.question;
  //console.log('showQuiz quiz.image:', quiz.image); // デバッグ用
  if (quiz.image && typeof quiz.image === 'string') {
    if (quiz.image.startsWith('blob:')) {
      const imgTag = `<img src="${quiz.image}" alt="" style="max-width:200px;max-height:120px;display:block;margin-bottom:1em;">`;
      questionHtml = imgTag + questionHtml;
      //console.log('imgタグ生成:', imgTag); // デバッグ用
    }
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

    if(document.getElementById('themeToggle').checked){
      currentChoices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.type = 'button';
        btn.innerHTML = `<img src="img/soul.svg" class="heart" alt="♥">` + choice;
        btn.onclick = () => {
          if (isJudgeShowing || isAnswered) return;
          userAnswers[i] = idx;
          Array.from(blankDiv.querySelectorAll('.choice-btn')).forEach((b, j) => {
            b.classList.toggle('selected', j === idx);
          });
          if (isAnswered) btn.disabled = true;
          if (answerBtn) {
            answerBtn.disabled = !userAnswers.every(ans => ans !== null);
          }
          if (blanks === 1) {
            isAnswered = true;
            checkMultiBlankAnswer(judgeMarks);
            // 答え合わせ後は全ての.choice-btnに.answeredを付与
            Array.from(blankDiv.querySelectorAll('.choice-btn')).forEach(b => b.classList.add('answered'));
          }
        };
        blankDiv.appendChild(btn);
      });
    }else{
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
    }
    blanksArea.appendChild(blankDiv);
  }

  // 複数空欄の場合のみ「解答」ボタンをanswerBtnAreaに表示
  if (blanks > 1) {
    answerBtn = document.createElement('button');
    answerBtn.id = 'answerBtn';
    answerBtn.type = 'button';
    if(document.getElementById('themeToggle').checked){
      answerBtn.innerHTML = `<img src="img/fight.webp" alt="FIGHT" style="height:3.5em;vertical-align:middle;">`;
      answerBtn.style.background = 'transparent';
      answerBtn.style.border = 'none';
      answerBtn.style.padding = '0.2em 0.5em';
    } else {
      answerBtn.textContent = '解答';
    }
    answerBtn.disabled = true;
    answerBtn.onclick = () => {
      if (isJudgeShowing || isAnswered) return;
      if (!userAnswers.every(ans => ans !== null)) return;
      isAnswered = true;
      checkMultiBlankAnswer(judgeMarks);
      if(document.getElementById('themeToggle').checked){
        Array.from(document.querySelectorAll('.choice-btn')).forEach(b => b.classList.add('answered'));
      }
      
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
    current_miss = 0;
    currentStreak++;
    if (currentStreak > maxStreak) maxStreak = currentStreak;
  } else {
    currentStreak = 0;
    current_miss++;
  }

  //フラウィーが表示されていたら
  if(document.getElementById('themeToggle').checked){
    let serif = "";

    if (allCorrect) {
      switch (currentStreak) {
        case 2:serif="ほぉ～、調子に乗ってきた？でも、それ…長く続くかなぁ☆";break;
        case 3:serif="フフフ、なかなかやるじゃん。でもね、まだ“本番”じゃないんだよ☆";break;
        case 4:serif="うわぁ～、優等生だぁ～。でもさ、ずっと正解してられると思わないでよ☆";break;
        case 5:serif="……なにそれ。ちょっとムカついてきたかも。フフフ☆";break;
        case 10:serif="おいおいおい、マジかよ！？…ちょっと引くわぁ。でもさ、そういうの…壊すの、楽しいんだよねぇ☆";break;
        case 50:serif="うそでしょ？マジで人間？…君、ちょっと気持ち悪いよぉ☆（褒めてないよ？）";break;
        case 100:serif="ねぇ、ほんとに何者なの…？そんなに正解して…怖いんだけど☆ニセモノじゃないよねぇ？";break;
        case 500:serif="やっっっっっっばいねキミ！！まさかここまで来るとは…あ～あ、ボクの計画が狂っちゃった☆";break;
        case 1000:serif="……ねぇ、もしかして“セーブとロード”使ってる？そうでしょ？ねぇ、ねぇぇぇぇぇ！！！";break;
        case 5000:serif="キミさぁ…もう人間やめてるでしょ？これ、誰への挑戦状なのさぁ？ボク？それとも“あの子”？フフフ☆";break;
        case 10000:serif="……おかしいよ。これは…おかしい。キミは誰？なにが目的？…まさか、また“やり直してる”の？";break;
        case 1000000:serif="キミはさ……もう神様なんじゃない？それとも、それを超えた“何か”……？";break;
        default:serif="へぇ～、やるじゃない！ちょっとは脳ミソ使えるんだねぇ☆";break;
      }
      
    } else {
      switch (current_miss) {
        case 2:serif="おっかしいなぁ～？手加減してあげてるのに、まだ間違えるのぉ？";break;
        case 3:serif="ねぇ、それ本気でやってる？もしかしてクイズって言葉知らないのかな？";break;
        case 4:serif="もうやめたら？見てるこっちが恥ずかしくなってくるよぉ…☆";break;
        case 5:serif="ホントに同じ世界に住んでるの？それともバカの異世界から来たのかな～？";break;
        case 10:serif="アッハハハ！ねぇ、逆に才能あるよ！“間違え続ける”っていう新ジャンルの天才～！";break;
        case 50:serif="50連敗ぃ！？ククク…！伝説になるね、君。『伝説の愚者』ってやつ☆";break;
        case 100:serif="100回も間違えるって…もう才能っていうか呪いじゃない？フフッ、キモチイイ…☆";break;
        case 500:serif="もう笑うしかないね！アハハハハハハハ！！！キミ、何かに操られてない？ねぇ、大丈夫？☆";break;
        case 1000:serif="バグかな？いや、これ演出？それとも地獄？どっちにしろ、キミ…最高だよぉ☆";break;
        case 5000:serif="まだやってるの！？何その執念！？こわ～～～☆いや、ボクちょっと尊敬しちゃうかも！";break;
        case 10000:serif="10,000回…間違えて…それでも止めない？アハハハハ！！これぞ“本物の決意”ってやつかな☆";break;
        case 1000000:serif="……だめだ。ボク、言葉が出ないよ……キミって、ほんとに……すっごいねぇ……";break;
        default:serif="アハハハハ！それで正解したつもり～？バッカだなぁ☆";break;
      }
    }
    document.getElementById('enemy_serif').innerText= serif;
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
  //console.log('quizList before showQuiz:', quizList);
  showQuiz();
};



function getTodayStr() {
  const now = new Date();
  return now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0');
}

function saveQuizLog(stats) {
  let logs = JSON.parse(localStorage.getItem('quizLogs') || '[]');
  const today = getTodayStr();
  // stats.dateも必ずYYYY-MM-DD形式にする
  stats.date = today;
  const idx = logs.findIndex(log => log.date === today);
  if (idx !== -1) {
    logs[idx] = stats; // 上書き
  } else {
    logs.push(stats);
  }
  localStorage.setItem('quizLogs', JSON.stringify(logs));
}

function getQuizLogs() {
  return JSON.parse(localStorage.getItem('quizLogs') || '[]');
}

function clearQuizLogs() {
  localStorage.removeItem('quizLogs');
}

function updateStatusBar() {
  const rate = totalAnswered === 0 ? 0 : Math.round((totalCorrect / totalAnswered) * 100);

  // ログ保存
  if(totalAnswered > 0) {
    const stats = {
      date: getTodayStr(),
      total: totalAnswered,
      correct: totalCorrect,
      rate: totalAnswered === 0 ? 0 : Math.round((totalCorrect / totalAnswered) * 100),
      streak: currentStreak,
      maxStreak: maxStreak
    };
    saveQuizLog(stats);
  }
  statusBar.textContent =
    `現在解いた問題数: ${totalAnswered}, 内正解数: ${totalCorrect}, 正解率: ${rate}%, 連続正解数: ${currentStreak}, 最高連続正解数: ${maxStreak}`;
}


//ページ読み込み時の処理
window.addEventListener('DOMContentLoaded', async () => {
  // IndexedDBからデータを読み込む
  try {
    const { quizzes, imageBlobs } = await loadFromIndexedDB();
    if (quizzes && quizzes.length > 0) {
      // quizListに反映
      quizList.length = 0;
      quizzes.forEach(q => {
        // 画像ファイル名があればBlob URLに置換
        if (q.image && imageBlobs[q.image]) {
          q.image = URL.createObjectURL(imageBlobs[q.image]);
        }
        quizList.push(q);
      });
      // カテゴリ再生成
      while (categories.length) categories.pop();
      Array.from(new Set(quizList.map(q => q.category))).forEach(cat => categories.push(cat));
      selectedCategories = [...categories];
      // 最初の問題を表示
      showQuiz();
      updateStatusBar();
      return;
    }
  } catch (err) {
    console.error('IndexedDBからの読込に失敗:', err);
  }
  const saved = localStorage.getItem('selectedCategories');
  if (saved) {
    selectedCategories = JSON.parse(saved);
  }
  // IndexedDBにデータがなければ初期問題を表示
  showQuiz();
  updateStatusBar();
});


// --- ログ保存・表示機能追加 ---

// ログの保存・取得
function getQuizLogs() {
  return JSON.parse(localStorage.getItem('quizLogs') || '[]');
}
function clearQuizLogs() {
  localStorage.removeItem('quizLogs');
}

// ログ表示ボタン作成
const logBtn = document.createElement('button');
logBtn.id = 'logBtn';
logBtn.title = '学習ログ';
logBtn.style.position = 'fixed';
logBtn.style.top = '10px';
logBtn.style.right = '60px'; // 設定ボタンの左
logBtn.style.zIndex = 2000;
logBtn.style.background = 'none';
logBtn.style.border = 'none';
logBtn.style.padding = '0.3em';
logBtn.style.cursor = 'pointer';
logBtn.style.display = 'flex';
logBtn.style.alignItems = 'center';
logBtn.style.justifyContent = 'center';

const logIcon = document.createElement('img');
logIcon.src = './img/log_icon.svg';
logIcon.alt = '学習ログ';
logIcon.style.width = '32px';
logIcon.style.height = '32px';
logBtn.appendChild(logIcon);

document.body.appendChild(logBtn);

// ログ表示用オーバーレイ
const logOverlay = document.createElement('div');
logOverlay.id = 'logOverlay';
logOverlay.style.position = 'fixed';
logOverlay.style.inset = '0';
logOverlay.style.background = 'rgba(30,40,60,0.93)';
logOverlay.style.zIndex = 3000;
logOverlay.style.display = 'none';
logOverlay.style.justifyContent = 'center';
logOverlay.style.alignItems = 'flex-start';
logOverlay.style.paddingTop = '5vh';
document.body.appendChild(logOverlay);

// ログ表示関数
function showLogOverlay() {
  const logs = getQuizLogs();
  let tableRows = logs.map(log => `
    <tr>
      <td>${log.date}</td>
      <td>${log.total}</td>
      <td>${log.correct}</td>
      <td>${log.rate}%</td>
      <td>${log.streak}</td>
      <td>${log.maxStreak}</td>
    </tr>
  `).join('');
  if (!tableRows) {
    tableRows = `<tr><td colspan="6" style="text-align:center;">ログがありません</td></tr>`;
  }
  logOverlay.innerHTML = `
    <div class="settings-content" style="max-width:700px;width:95vw;">
      <h2>学習ログ</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:1em;">
        <thead>
          <tr>
            <th>アクセス日時</th>
            <th>解いた問題数</th>
            <th>内正解数</th>
            <th>正解率</th>
            <th>連続正解数</th>
            <th>最高連続正解数</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <button id="clearLogBtn" style="background:#f5c6cb;color:#c82333;border:none;border-radius:8px;padding:0.7rem 1.2rem;font-size:1rem;cursor:pointer;margin-right:1em;">ログを削除</button>
      <button id="closeLogBtn" style="background:#6ea8fe;color:#fff;border:none;border-radius:8px;padding:0.7rem 1.2rem;font-size:1rem;cursor:pointer;">閉じる</button>
    </div>
  `;
  logOverlay.style.display = 'flex';

  document.getElementById('closeLogBtn').onclick = () => {
    logOverlay.style.display = 'none';
  };
  document.getElementById('clearLogBtn').onclick = () => {
    if (confirm('本当にログを削除しますか？')) {
      clearQuizLogs();
      showLogOverlay();
    }
  };
}

// ボタンでログ画面表示
logBtn.onclick = showLogOverlay;

updateStatusBar();
//console.log('quizList before showQuiz:', quizList);
showQuiz();