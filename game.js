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

/* ===========================
   پایان
=========================== */

const finishMessage =
  document.getElementById("finishMessage");

const finishScore =
  document.getElementById("finishScore");

const finishStudent =
  document.getElementById("finishStudent");

const finishCode =
  document.getElementById("finishCode");

const finishTime =
  document.getElementById("finishTime");

const finishEncouragement =
  document.getElementById("finishEncouragement");

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

const GAME_MINUTES = 40;

let timer = null;

let remainingSeconds =
  GAME_MINUTES * 60;

let currentStudentCode = "";

let wrongAttempts = 0;
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

startGame();

  }
);

/* ===========================
   شروع بازی
=========================== */

function startGame() {
  score = 0; 

  remainingSeconds =
    GAME_MINUTES * 60;

  gameTimer.textContent =
    formatTime(remainingSeconds);

  detectiveCharacter.src =
    "science-boy.png";

 questionPanel.hidden = true;

showQuestion(0);

questionMessage.textContent = "";

showScreen(gameScreen);

markPlayedToday(currentStudentCode);

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
   finishStudent.textContent =
    "دانش‌آموز: " + studentDisplayName.textContent;

finishCode.textContent =
    "کد ملی: " + currentStudentCode;

const finishDate = new Date();

finishTime.textContent =
    "زمان پایان: " +
    finishDate.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit"
    });
   
finishScore.textContent =
    "امتیاز: " + score + " از ۲۰";
  if (score > 17) {
    finishEncouragement.textContent =
        "🌟 فوق‌العاده بود! تو یک کارآگاه علوم واقعی هستی! 🌟";
} else if (score >= 14) {
    finishEncouragement.textContent =
        "👏 آفرین! عملکرد خیلی خوبی داشتی.";
} else if (score >= 10) {
    finishEncouragement.textContent =
        "👍 خوب بود! با کمی تمرین بیشتر، عالی‌تر می‌شوی.";
} else {
    finishEncouragement.textContent =
        "💪 ناامید نشو! دوباره تمرین کن و قوی‌تر برگرد.";
} 
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
function showQuestion(index) );  {
   
    if (index >= questions.length) {
        finishGame();
        return;
    }

    const q = questions[index];

    questionPanel.hidden = false;

    const parts = q.text.split("\n\n");

    questionText.textContent = parts[0];

    const answersContainer =
        document.getElementById("answersContainer");

    answersContainer.innerHTML = "";

    q.answers.forEach((answer, i) => {
        const button = document.createElement("button");

        button.textContent = parts[i + 1];

        button.className = "answer-button";

        button.onclick = () =>
            answerQuestion(i, q.correct, index);

        answersContainer.appendChild(button);
    });
}

function answerQuestion(selectedIndex, correctIndex, index) {
    if (selectedIndex === correctIndex) {
        questionMessage.textContent =
            "آفرین! پاسخ درست است. 🔎";
       if (wrongAttempts === 0) {
    score += 1;
} else {
    score += 0.5;
}

        scienceCorrect.currentTime = 0;
        scienceCorrect.play().catch(function () {});

       let wrongAttempts = 0;
let score = 0;

        setTimeout(function () {
            showQuestion(index + 1);
        }, 1200);

    } else {
        wrongAttempts++;

        if (wrongAttempts === 1) {
            questionMessage.textContent =
                "پاسخ غلط است. یک فرصت دیگر داری! 🔎";

            scienceWrong.currentTime = 0;
            scienceWrong.play().catch(function () {});

        } else {
            questionMessage.textContent =
                "پاسخ صحیح: " +
                questions[index].answers[correctIndex] +
                " 🔎";

            wrongAttempts = 0;

            setTimeout(function () {
                showQuestion(index + 1);
            }, 1800);
        }
    }
}
