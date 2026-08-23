/* ==========================================
   Science Detective
   کارآگاه علوم - علوم ششم
========================================== */

/* ===========================
   صفحات
=========================== */

const startScreen = document.getElementById("startScreen");
const loginScreen = document.getElementById("loginScreen");
const gameScreen = document.getElementById("gameScreen");
const finishScreen = document.getElementById("finishScreen");

/* ===========================
   ورود
=========================== */

const startMissionBtn =
  document.getElementById("startMissionBtn");

const studentForm =
  document.getElementById("studentForm");

const studentName =
  document.getElementById("studentName");

const nationalCode =
  document.getElementById("nationalCode");

const loginError =
  document.getElementById("loginError");

const studentDisplayName =
  document.getElementById("studentDisplayName");

/* ===========================
   بازی
=========================== */

const gameTimer =
  document.getElementById("gameTimer");

const questionPanel =
  document.getElementById("questionPanel");

const questionText =
  document.getElementById("questionText");

const questionMessage =
  document.getElementById("questionMessage");

const detectiveCharacter =
  document.getElementById("detectiveCharacter");

/* ===========================
   پایان
=========================== */

const finishMessage =
  document.getElementById("finishMessage");

const finishButton =
  document.getElementById("finishButton");

/* ===========================
   صداها
=========================== */

const robotWake =
  new Audio("science-wake.mp3");

const scienceCorrect =
  new Audio("science-correct.mp3");

const scienceWrong =
  new Audio("science-wrong.mp3");

const scienceFall =
  new Audio("science-fall.mp3");

const scienceNext =
  new Audio("science-next.mp3");

const scienceDiscovery =
  new Audio("science-discovery.mp3");

const scienceFinish =
  new Audio("science-finish.mp3");

const scienceFireworks =
  new Audio("science-fireworks.mp3");

/* ===========================
   تنظیمات
=========================== */

const GAME_MINUTES = 20;

let timer = null;

let remainingSeconds =
  GAME_MINUTES * 60;

let currentStudentCode = "";

/* ===========================
   ابزار تغییر صفحه
=========================== */

function showScreen(screen) {

  startScreen.classList.remove("active");
  loginScreen.classList.remove("active");
  gameScreen.classList.remove("active");
  finishScreen.classList.remove("active");

  screen.classList.add("active");
}

/* ===========================
   فرمت زمان
=========================== */

function formatTime(totalSeconds) {

  const minutes =
    Math.floor(totalSeconds / 60);

  const seconds =
    totalSeconds % 60;

  const formattedMinutes =
    minutes < 10
      ? "0" + minutes
      : minutes;

  const formattedSeconds =
    seconds < 10
      ? "0" + seconds
      : seconds;

  return (
    formattedMinutes +
    ":" +
    formattedSeconds
  );
}

/* ===========================
   شروع مأموریت
=========================== */

startMissionBtn.addEventListener(
  "click",
  function () {

    robotWake.currentTime = 0;

    robotWake.play().catch(function () {
      /* مرورگر ممکن است پخش صدا را محدود کند */
    });

    showScreen(loginScreen);

    studentName.focus();

  }
);

/* ===========================
   بررسی کد ملی
=========================== */

function isValidNationalCode(code) {

  return /^[0-9]{10}$/.test(code);

}

/* ===========================
   بررسی بازی امروز
=========================== */

function getTodayKey() {

  const now = new Date();

  const year =
    now.getFullYear();

  const month =
    String(now.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(now.getDate())
      .padStart(2, "0");

  return (
    year +
    "-" +
    month +
    "-" +
    day
  );

}

function getStudentDayKey(code) {

  return (
    "science-played-" +
    code +
    "-" +
    getTodayKey()
  );

}

function alreadyPlayedToday(code) {

  return (
    localStorage.getItem(
      getStudentDayKey(code)
    ) === "true"
  );

}

function markPlayedToday(code) {

  localStorage.setItem(
    getStudentDayKey(code),
    "true"
  );

}

/* ===========================
   ورود دانش‌آموز
=========================== */

studentForm.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();

    loginError.textContent = "";

    const name =
      studentName.value.trim();

    const code =
      nationalCode.value.trim();

    /* نام */

    if (name === "") {

      loginError.textContent =
        "لطفاً نام و نام خانوادگی را وارد کنید.";

      return;

    }

    /* کد ملی */

    if (!isValidNationalCode(code)) {

      loginError.textContent =
        "کد ملی باید دقیقاً ۱۰ رقم باشد.";

      return;

    }

    /* بررسی بازی روزانه */

    if (alreadyPlayedToday(code)) {

      loginError.textContent =
        "این دانش‌آموز امروز یک بار بازی را انجام داده است.";

      return;

    }

    currentStudentCode = code;

    studentDisplayName.textContent =
      name;

    markPlayedToday(code);

    startGame();

  }
);

/* ===========================
   شروع بازی
=========================== */

function startGame() {

  remainingSeconds =
    GAME_MINUTES * 60;

  gameTimer.textContent =
    formatTime(remainingSeconds);

  detectiveCharacter.src =
    "science-boy.png";

  questionPanel.hidden = true;

  questionMessage.textContent = "";

  showScreen(gameScreen);

  startTimer();

}

/* ===========================
   تایمر
=========================== */

function startTimer() {

  clearInterval(timer);

  timer = setInterval(
    function () {

      remainingSeconds--;

      gameTimer.textContent =
        formatTime(remainingSeconds);

      if (remainingSeconds <= 0) {

        clearInterval(timer);

        finishGame();

      }

    },
    1000
  );

}

/* ===========================
   پایان بازی
=========================== */

function finishGame() {

  clearInterval(timer);

  questionPanel.hidden = true;

  scienceFinish.currentTime = 0;

  scienceFinish.play().catch(
    function () {}
  );

  scienceFireworks.currentTime = 0;

  scienceFireworks.play().catch(
    function () {}
  );

  detectiveCharacter.src =
    "science-boy-celebrating.png";

  finishMessage.textContent =
    "مأموریت علمی به پایان رسید!";

  showScreen(finishScreen);

}

/* ===========================
   دکمه پایان
=========================== */

finishButton.addEventListener(
  "click",
  function () {

    location.reload();

  }
);
