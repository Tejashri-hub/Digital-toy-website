var quiz = {
  // (A) PROPERTIES 
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
  {
    q : "Which of the following is/are the example of cave paintings?",
    o : [
      "A. Ajanta Caves",

      "B. Armamalai Cave",

      "C. Badami Cave Temples",

      "D. All of the above"
    ],
    a : 3 // arrays start with 0, so answer is 70 meters
  },
  {
    q : "In which state are Ajanta and Ellora caves located?",
    o : [
      " A. Maharashtra",
      " B.Gujarat",
      " C. Orrisa",
      " D.Rajesthan"
    ],
    a : 0
  },
  {
    q : "Which of the following kings is described as a dvija in the Ajanta Inscriptions?",
    o : [
      " A.Vindhyashakti",
      " B.Pravarasena",
      " C.Rudrasena",
      " D.Prithvisena"
    ],
    a : 1
  },
  {
    q : "Which of the following is depicted by Ajanta paintings?",
    o : [
      " A. Ramayana",
      " B. Mahabharata",
      " C. Jatakas",
      " D. Panchatantra"
    ],
    a : 2
  },
  {
    q : "Who built Raigad fort?",
    o : [
      " A. Hiroji Indulkar",
      " B. Chatrapati Sambhaji Maharaj ",
      " C. Chhatrapati Shivaji Maharaj.",
      " D. Peshwa Bajirao"
    ],
    a : 0
  },
  {
    q : "Which among the following was capital in Emperor of Shivaji?",
    o : [
      " A. Poona",
      " B. Raigad ",
      " C. panhala",
      " D. Kondhana"
    ],
    a : 1
  }
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: function(){
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: function(){
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", quiz.select);
      quiz.hAns.appendChild(label);
    }
  },
  
  // (D) OPTION SELECTED
  select: function(){
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = this.dataset.idx == quiz.data[quiz.now].a;
    if (correct) { 
      quiz.score++; 
      this.classList.add("correct");
      quiz.hQn.innerHTML = `Yeah !! You got it Right.`;
     
    } else {
      this.classList.add("wrong");
      quiz.hQn.innerHTML = `oops ! wrong answer`;
    }
  
    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(function(){
      if (quiz.now < quiz.data.length) { quiz.draw(); } 
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1500);
  }
};
window.addEventListener("load", quiz.init);