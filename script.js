/* ============================================================
   DANH SÁCH QUÁN ĂN — SỬA Ở ĐÂY!
   Đây là tên quán MẪU, hãy đổi "name" và "tag" thành quán thật
   mà bạn muốn rủ đi. Giữ nguyên "emoji" và mảng "match" nếu muốn
   giữ logic gợi ý theo câu trả lời, hoặc chỉnh lại cho hợp quán mới.

   match: các tag mà quán này phù hợp, dùng để so với câu trả lời
   quiz bên dưới (food/vibe/budget) — quán khớp nhiều nhất sẽ được
   gắn nhãn "Gợi ý cho tụi mình".
   ============================================================ */
const RESTAURANTS = [
  { name: "Quán Lẩu ABC", tag: "Lẩu cay ấm bụng", emoji: "🍲", match: ["spicy", "cozy", "budget"] },
  { name: "Nhà Hàng Nhật XYZ", tag: "Sushi & mì Nhật", emoji: "🍣", match: ["light", "cozy", "premium"] },
  { name: "Quán Nướng Phố Cổ", tag: "BBQ nướng than", emoji: "🍖", match: ["bbq", "lively", "budget"] },
  { name: "Hải Sản Biển Xanh", tag: "Hải sản tươi sống", emoji: "🦞", match: ["seafood", "lively", "premium"] },
  { name: "Bistro Ánh Trăng", tag: "Món Âu lãng mạn", emoji: "🍝", match: ["light", "cozy", "premium"] },
  { name: "Quán Ăn Vặt Con Đường", tag: "Đồ ăn vặt vỉa hè", emoji: "🌮", match: ["spicy", "lively", "budget"] },
];

const QUIZ = [
  {
    question: "Tối nay em thèm ăn kiểu gì? 😋",
    key: "food",
    options: [
      { label: "Cay xè, đã miệng", emoji: "🌶️", value: "spicy" },
      { label: "Nướng thơm lừng", emoji: "🍖", value: "bbq" },
      { label: "Hải sản tươi ngon", emoji: "🦐", value: "seafood" },
      { label: "Nhẹ nhàng, thanh đạm", emoji: "🥗", value: "light" },
    ],
  },
  {
    question: "Không khí mình muốn tối nay?",
    key: "vibe",
    options: [
      { label: "Ấm cúng, lãng mạn", emoji: "🕯️", value: "cozy" },
      { label: "Sôi động, náo nhiệt", emoji: "🎶", value: "lively" },
    ],
  },
  {
    question: "Ngân sách tối nay mình chill kiểu nào?",
    key: "budget",
    options: [
      { label: "Bình dân, ấm bụng là được", emoji: "💸", value: "budget" },
      { label: "Sang xịn mịn một chút", emoji: "💎", value: "premium" },
    ],
  },
];

const answers = {};
let quizIndex = 0;

const screens = {
  invite: document.getElementById("screen-invite"),
  quiz: document.getElementById("screen-quiz"),
  restaurants: document.getElementById("screen-restaurants"),
  confirm: document.getElementById("screen-confirm"),
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
    optionsEl.appendChild(btn);
  });
}

/* ---------- Screen 3: Restaurant pick ---------- */
function scoreRestaurant(r) {
  const wanted = [answers.food, answers.vibe, answers.budget];
  return r.match.filter((m) => wanted.includes(m)).length;
}

function renderRestaurants() {
  const scores = RESTAURANTS.map(scoreRestaurant);
  const best = Math.max(...scores);

  const grid = document.getElementById("restaurantGrid");
  grid.innerHTML = "";
  RESTAURANTS.forEach((r, i) => {
    const card = document.createElement("div");
    card.className = "restaurant-card";
    card.innerHTML = `
      ${scores[i] === best && best > 0 ? '<span class="badge-suggest">Gợi ý 💗</span>' : ""}
      <span class="r-emoji">${r.emoji}</span>
      <span class="r-name">${r.name}</span>
      <span class="r-tag">${r.tag}</span>
    `;
    card.addEventListener("click", () => {
      document.getElementById("confirmRestaurant").textContent = r.name;
      showScreen("confirm");
    });
    grid.appendChild(card);
  });
}

/* ---------- Screen 4: Restart ---------- */
document.getElementById("btnRestart").addEventListener("click", () => {
  answers.food = answers.vibe = answers.budget = undefined;
  document.getElementById("btnBusy").style.transform = "";
  document.getElementById("btnLater").style.transform = "";
  showScreen("invite");
});
