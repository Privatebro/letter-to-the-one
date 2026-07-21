/* ==========================================================
   LETTER TO THE ONE
   SCRIPT.JS
   PART 1
========================================================== */

// ---------- Screens ----------

const loading = document.getElementById("loading");
const envelopeScreen = document.getElementById("envelope");
const welcome = document.getElementById("welcome");
const verify = document.getElementById("verify");
const question = document.getElementById("question");
const intro = document.getElementById("intro");
const letter = document.getElementById("letter");

// ---------- Elements ----------

const envelope = document.querySelector(".envelope");

const openBtn = document.getElementById("openBtn");

const continueBtn = document.getElementById("continueBtn");

const nameBox = document.getElementById("nameBox");

const verifyTitle = document.getElementById("verifyTitle");

const verifyText = document.getElementById("verifyText");

const progressBar = document.getElementById("progressBar");

const welcomeText = document.getElementById("welcomeText");

const recipientName = document.getElementById("recipientName");

const yesBtn = document.getElementById("yesBtn");

const noBtn = document.getElementById("noBtn");

// ---------- Helper ----------

function showScreen(screen){

    document
    .querySelectorAll(".screen")
    .forEach(s=>s.classList.remove("active"));

    screen.classList.add("active");

}

// ---------- Floating Petals ----------

const petals = document.getElementById("petals");

for(let i=0;i<20;i++){

    const petal=document.createElement("div");

    petal.className="petal";

    petal.style.left=Math.random()*100+"%";

    petal.style.animationDuration=
    (8+Math.random()*8)+"s";

    petal.style.animationDelay=
    Math.random()*5+"s";

    petal.style.opacity=Math.random();

    petals.appendChild(petal);

}

// ---------- Loading ----------

window.addEventListener("load",()=>{

    setTimeout(()=>{

        showScreen(envelopeScreen);

    },2500);

});

// ---------- Open Letter ----------

openBtn.addEventListener("click",()=>{

    envelope.classList.add("opening");

    setTimeout(()=>{

        showScreen(welcome);

    },1200);

});
/* ==========================================================
   SCRIPT.JS
   PART 2
========================================================== */

const validNames = ["sruthi", "sweety"];

continueBtn.addEventListener("click", () => {

    const enteredName = nameBox.value.trim();

    if (enteredName === "") {
        alert("Please enter your name ❤️");
        return;
    }

    showScreen(verify);

    progressBar.style.width = "0%";

    verifyTitle.textContent = "Checking recipient...";
    verifyText.textContent = "Looking for the intended recipient...";

    let progress = 0;

    const timer = setInterval(() => {

        progress += 25;

        progressBar.style.width = progress + "%";

        if (progress === 25) {
            verifyText.textContent = "Decrypting secure letter...";
        }

        if (progress === 50) {
            verifyText.textContent = "Matching handwriting...";
        }

        if (progress === 75) {
            verifyText.textContent = "Almost there...";
        }

        if (progress >= 100) {

            clearInterval(timer);

            const lower = enteredName.toLowerCase();

            if (validNames.includes(lower)) {

                verifyTitle.textContent = "Recipient Verified";
                verifyText.textContent = `Welcome, ${enteredName} ❤️`;

                recipientName.textContent = enteredName;

                setTimeout(() => {

                    showScreen(question);

                }, 1800);

            } else {

                verifyTitle.textContent = "Recipient Not Recognized";

                verifyText.innerHTML = `
                    This letter was written for someone else. ❤️
                    <br><br>
                    Please try another name.
                `;

                setTimeout(() => {

                    showScreen(welcome);

                    nameBox.value = "";
                    nameBox.focus();

                }, 3000);

            }

        }

    }, 500);

});
/* ==========================================================
   SCRIPT.JS
   PART 3
========================================================== */

// ---------- YES Button ----------

yesBtn.addEventListener("click", () => {

    showScreen(intro);

    setTimeout(() => {

        showScreen(letter);

        document.body.style.overflow = "auto";

        revealPages();

    }, 3500);

});

// ---------- NO Button ----------

function moveNoButton() {

    const container = document.querySelector(".buttons");

    const maxX = container.clientWidth - noBtn.offsetWidth;

    const maxY = 120;

    noBtn.style.position = "absolute";

    noBtn.style.left = Math.random() * maxX + "px";

    noBtn.style.top = Math.random() * maxY + "px";

}

noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("click", (e) => {

    e.preventDefault();

    moveNoButton();

});

// ---------- Reveal Letter Pages ----------

const pages = document.querySelectorAll(".letter-page");

function revealPages() {

    const trigger = window.innerHeight * 0.9;

    pages.forEach((page) => {

        const top = page.getBoundingClientRect().top;

        if (top < trigger) {

            page.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealPages);

// ---------- Enter Key ----------

nameBox.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        continueBtn.click();

    }

});
