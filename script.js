/* ============================================================
   DANH SÁCH QUÁN ĂN TỐI — SỬA Ở ĐÂY!
   match: giá trị "value" của câu hỏi "food" trong QUIZ mà quán
   này thuộc về (italian / japanese / steak / chinese). Quán đầu
   tiên trong nhóm khớp sẽ được gợi ý nổi bật, các quán còn lại
   nằm trong "Xem quán khác".
   ============================================================ */
const RESTAURANTS = [
  { name: "Aoyama", tag: "Món Nhật", emoji: "🍱", photo: "images/aoyama.jpg", mapUrl: "https://maps.app.goo.gl/27LFEgkcViTgkBrt6?g_st=ac", match: ["japanese"] },
  { name: "Sanuki Udon", tag: "Món Nhật", emoji: "🍜", photo: "images/sanuki-udon.jpg", mapUrl: "https://maps.app.goo.gl/WkeGfd3rigvsm3v6A?g_st=ac", match: ["japanese"] },
  { name: "Hokkaido Sushi", tag: "Sushi", emoji: "🍣", photo: "images/hokkaido-sushi.jpg", mapUrl: "https://maps.app.goo.gl/SweTPB3cbrWK1SZ89?g_st=ac", match: ["japanese"] },
  { name: "Captain Phook", tag: "Beef Steak", emoji: "🥩", photo: "images/captain-phook.jpg", mapUrl: "https://maps.app.goo.gl/AonKQuPWFscAKs6m6", match: ["steak"] },
  { name: "Union Pizza", tag: "Pizza", emoji: "🍕", photo: "images/union-pizza.jpg", mapUrl: "https://maps.app.goo.gl/w9jcFynbPHdtBzc6A?g_st=ac", match: ["italian"] },
  { name: "Pizza 4Ps", tag: "Pizza", emoji: "🍕", photo: "images/pizza-4ps.jpg", mapUrl: "https://maps.app.goo.gl/Veyzi7L6waNG2eDM9?g_st=ac", match: ["italian"] },
  { name: "Pasta Club", tag: "Pasta", emoji: "🍝", photo: "images/pasta-club.jpg", mapUrl: "https://maps.app.goo.gl/UBMW1BapXhh95zLq7?g_st=ac", match: ["italian"] },
  { name: "Mặn Mòi", tag: "Món Trung", emoji: "🥟", photo: "images/man-moi.jpg", mapUrl: "https://maps.app.goo.gl/P7hWfWH1o6crBjbf6?g_st=ac", match: ["chinese"] },
  { name: "Ivy Fortune", tag: "Món Trung", emoji: "🏮", photo: "images/fortune-ivy.jpg", mapUrl: "https://maps.app.goo.gl/EaKFm2ZyAvexy9YE6?g_st=ac", match: ["chinese"] },
  { name: "Mùa Sake", tag: "Món Trung", emoji: "🍶", photo: "images/mua-sake.jpg", mapUrl: "https://maps.app.goo.gl/rfktF7CNVHxDqbw36?g_st=ac", match: ["chinese"] },
  { name: "Mạch", tag: "Món Trung", emoji: "🥢", photo: "images/mach.jpg", mapUrl: "https://maps.app.goo.gl/wYe7GsGCvjcY7uSB9?g_st=ac", match: ["chinese"] },
];

/* ============================================================
   DANH SÁCH ĐỊA ĐIỂM ROUND 2 — SỬA Ở ĐÂY!
   match: giá trị "value" của câu hỏi "round2" (beer / wine).
   ============================================================ */
const ROUND2_PLACES = [
  { name: "7 Bridges", tag: "Quán bia", emoji: "🍻", photo: "images/7-bridges.jpg", mapUrl: "https://maps.app.goo.gl/qiuHmnANptnfaafK7?g_st=ac", match: ["beer"] },
  { name: "Lost", tag: "Bar rượu", emoji: "🍷", photo: "images/lost.jpg", mapUrl: "https://maps.app.goo.gl/5BU6qxRRpeF6pLQG7?g_st=ac", match: ["wine"] },
  { name: "Lost and Found", tag: "Bar rượu", emoji: "🍸", photo: "images/lost-and-found.png", mapUrl: "https://maps.app.goo.gl/n5rWq1EX9hu3Ki2y7?g_st=ac", match: ["wine"] },
];

const QUIZ = [
  {
    question: "Tối nay mình ăn gì nhỉ?🧐",
    key: "food",
    options: [
      { label: "pizza, mì ý hem", emoji: "🍝", value: "italian" },
      { label: "sushi đồ nhật", emoji: "🍣", value: "japanese" },
      { label: "hay là beefsteak", emoji: "🥩", value: "steak" },
      { label: "hay đồ trung đi", emoji: "🥟", value: "chinese" },
    ],
  },
  {
    question: "Hôm nay tâm trạng em thế nàooo",
    key: "vibe",
    options: [
      { label: "Em muốn riêng tư thui", emoji: "🕯️", value: "cozy" },
      { label: "Dui lên quẩy lênnnnn", emoji: "🎶", value: "lively" },
    ],
  },
  {
    question: "Ăn xong mình đi chơi tiếp nha?",
    key: "round2",
    options: [
      { label: "đi uống bia nữa chứ", emoji: "🍻", value: "beer" },
      { label: "đi uống rụ đi", emoji: "🍷", value: "wine" },
      { label: "đi về thui", emoji: "👋", value: "premium", dodge: true },
    ],
  },
];

const answers = {};
let quizIndex = 0;
let chosenRestaurant = null;

const screens = {
  invite: document.getElementById("screen-invite"),
  quiz: document.getElementById("screen-quiz"),
  restaurants: document.getElementById("screen-restaurants"),
  confirm: document.getElementById("screen-confirm"),
  round2: document.getElementById("screen-round2"),
  final: document.getElementById("screen-final"),
};

function showScreen(name) {
  Object.values(screens).forEach((el) => el.classList.add("hidden"));
  screens[name].classList.remove("hidden");
}

/* ---------- Floating hearts background ---------- */
function spawnHearts() {
  const bg = document.getElementById("heartsBg");
  const emojis = ["💕", "💖", "💗", "✨"];
  for (let i = 0; i < 18; i++) {
    const span = document.createElement("span");
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + "%";
    span.style.fontSize = 14 + Math.random() * 18 + "px";
    const duration = 8 + Math.random() * 10;
    span.style.animationDuration = duration + "s";
    span.style.animationDelay = -Math.random() * duration + "s";
    bg.appendChild(span);
  }
}
spawnHearts();

/* ---------- Screen 1: Invitation ---------- */
document.getElementById("btnYes").addEventListener("click", () => {
  quizIndex = 0;
  renderQuizStep();
  showScreen("quiz");
});

// Các lựa chọn "từ chối" né chuột/tap, không bao giờ bấm trúng được.
function dodge(el) {
  const container = el.parentElement.getBoundingClientRect();
  const maxX = container.width - el.offsetWidth;
  const maxY = container.height - el.offsetHeight;
  const x = Math.random() * maxX - maxX / 2;
  const y = Math.random() * maxY - maxY / 2;
  el.style.transform = `translate(${x}px, ${y}px)`;
}

["btnBusy", "btnLater"].forEach((id) => {
  const btn = document.getElementById(id);
  btn.addEventListener("mouseenter", () => dodge(btn));
  btn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dodge(btn);
  }, { passive: false });
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    dodge(btn);
  });
});

/* ---------- Screen 2: Quiz ---------- */
// Option "sai" trong quiz rung lắc báo sai, khác với hiệu ứng né chuột ở màn mời.
function shake(el) {
  el.classList.remove("shake");
  void el.offsetWidth; // restart animation nếu bấm liên tục
  el.classList.add("shake");
}

function renderQuizStep() {
  const step = QUIZ[quizIndex];
  document.getElementById("quizStep").textContent = quizIndex + 1;
  document.getElementById("quizTotal").textContent = QUIZ.length;
  document.getElementById("quizQuestion").textContent = step.question;

  const optionsEl = document.getElementById("quizOptions");
  optionsEl.innerHTML = "";
  step.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<span class="option-emoji">${opt.emoji}</span><span>${opt.label}</span>`;
    if (opt.dodge) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        shake(btn);
      });
    } else {
      btn.addEventListener("click", () => {
        answers[step.key] = opt.value;
        quizIndex++;
        if (quizIndex < QUIZ.length) {
          renderQuizStep();
        } else {
          renderRestaurants();
          showScreen("restaurants");
        }
      });
    }
    optionsEl.appendChild(btn);
  });
}

/* ---------- Màn "gợi ý 1 chỗ + xem thêm" dùng chung cho quán ăn & round 2 ---------- */
function renderPickScreen({ items, wantedValue, featuredElId, showMoreBtnId, gridElId, onSelect }) {
  const bestIndex = items.findIndex((it) => it.match.includes(wantedValue));
  const featured = items[bestIndex >= 0 ? bestIndex : 0];

  const featuredEl = document.getElementById(featuredElId);
  featuredEl.innerHTML = `
    <span class="badge-suggest">Gợi ý cho tụi mình 💗</span>
    <img class="f-photo" src="${featured.photo}" alt="${featured.name}">
    <span class="f-name">${featured.emoji} ${featured.name}</span>
    <span class="f-tag">${featured.tag}</span>
    <span class="f-cta">Chọn chỗ này 💕</span>
  `;
  featuredEl.onclick = () => onSelect(featured);

  const showMoreBtn = document.getElementById(showMoreBtnId);
  const grid = document.getElementById(gridElId);
  grid.classList.add("hidden");
  showMoreBtn.classList.remove("hidden");
  showMoreBtn.onclick = () => {
    grid.classList.remove("hidden");
    showMoreBtn.classList.add("hidden");
  };

  grid.innerHTML = "";
  items.forEach((it) => {
    if (it === featured) return;
    const card = document.createElement("div");
    card.className = "restaurant-card";
    card.innerHTML = `
      <img class="r-photo" src="${it.photo}" alt="${it.name}" loading="lazy">
      <span class="r-name">${it.emoji} ${it.name}</span>
      <span class="r-tag">${it.tag}</span>
    `;
    card.addEventListener("click", () => onSelect(it));
    grid.appendChild(card);
  });
}

/* ---------- Screen 3: Chọn quán ăn ---------- */
function renderRestaurants() {
  renderPickScreen({
    items: RESTAURANTS,
    wantedValue: answers.food,
    featuredElId: "featuredRestaurant",
    showMoreBtnId: "btnShowMore",
    gridElId: "restaurantGrid",
    onSelect: selectRestaurant,
  });
}

function selectRestaurant(r) {
  chosenRestaurant = r;
  document.getElementById("confirmPhoto").src = r.photo;
  document.getElementById("confirmPhoto").alt = r.name;
  document.getElementById("confirmRestaurant").textContent = `${r.emoji} ${r.name}`;
  document.getElementById("confirmTag").textContent = r.tag;
  document.getElementById("confirmHero").href = r.mapUrl;
  showScreen("confirm");
}

/* ---------- Screen 5: Chọn chỗ round 2 ---------- */
document.getElementById("btnGoRound2").addEventListener("click", () => {
  renderRound2();
  showScreen("round2");
});

function renderRound2() {
  renderPickScreen({
    items: ROUND2_PLACES,
    wantedValue: answers.round2,
    featuredElId: "featuredRound2",
    showMoreBtnId: "btnShowMoreRound2",
    gridElId: "round2Grid",
    onSelect: selectRound2,
  });
}

function selectRound2(place) {
  document.getElementById("finalRestaurant").textContent = chosenRestaurant.name;
  document.getElementById("finalRound2").textContent = place.name;
  showScreen("final");
}

/* ---------- Screen 6: Restart ---------- */
document.getElementById("btnRestart").addEventListener("click", () => {
  answers.food = answers.vibe = answers.round2 = undefined;
  chosenRestaurant = null;
  document.getElementById("btnBusy").style.transform = "";
  document.getElementById("btnLater").style.transform = "";
  showScreen("invite");
});
