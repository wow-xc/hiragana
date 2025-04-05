const hiraganaData = [
    // 아행
    { character: "あ", answer: ["a", "아"] },
    { character: "い", answer: ["i", "이"] },
    { character: "う", answer: ["u", "우"] },
    { character: "え", answer: ["e", "에"] },
    { character: "お", answer: ["o", "오"] },

    // 카행
    { character: "か", answer: ["ka", "카"] },
    { character: "き", answer: ["ki", "키"] },
    { character: "く", answer: ["ku", "쿠"] },
    { character: "け", answer: ["ke", "케"] },
    { character: "こ", answer: ["ko", "코"] },

    // 사행
    { character: "さ", answer: ["sa", "사"] },
    { character: "し", answer: ["shi", "시"] },
    { character: "す", answer: ["su", "스"] },
    { character: "せ", answer: ["se", "세"] },
    { character: "そ", answer: ["so", "소"] },

    // 타행
    { character: "た", answer: ["ta", "타"] },
    { character: "ち", answer: ["chi", "치"] },
    { character: "つ", answer: ["tsu", "츠"] },
    { character: "て", answer: ["te", "테"] },
    { character: "と", answer: ["to", "토"] },

    // 나행
    { character: "な", answer: ["na", "나"] },
    { character: "に", answer: ["ni", "니"] },
    { character: "ぬ", answer: ["nu", "누"] },
    { character: "ね", answer: ["ne", "네"] },
    { character: "の", answer: ["no", "노"] },

    // 하행
    { character: "は", answer: ["ha", "하"] },
    { character: "ひ", answer: ["hi", "히"] },
    { character: "ふ", answer: ["hu", "후"] }, // 'hu' 대신 'fu'로 표기
    { character: "へ", answer: ["he", "헤"] },
    { character: "ほ", answer: ["ho", "호"] },

    // 마행
    { character: "ま", answer: ["ma", "마"] },
    { character: "み", answer: ["mi", "미"] },
    { character: "む", answer: ["mu", "무"] },
    { character: "め", answer: ["me", "메"] },
    { character: "も", answer: ["mo", "모"] },

    // 야행
    { character:"や" ,answer:["ya","야" ]},
	{character:"ゆ" ,answer:["yu","유" ]},
	{character:"よ" ,answer:["yo","요" ]},

	// 라행 
	{character:"ら" ,answer:["ra","라" ]},
	{character:"り" ,answer:["ri","리" ]},
	{character:"る" ,answer:["ru","루" ]},
	{character:"れ" ,answer:["re","레" ]},
	{character:"ろ" ,answer:["ro","로" ]},

	// 와행 및 기타 
	{character:"わ" ,answer:["wa","와" ]},
	{character:"を" ,answer:["wo","오" ]},
	{character:"ん" ,answer:["n","응"]}
];



let remainingHiragana = [];
let currentQuestion = null; // 현재 문제
let score = 0; // 맞춘 개수
let totalQuestions = hiraganaData.length; // 총 문제 수

const remainingElement = document.getElementById('remaining');
const scoreElement = document.getElementById('score');
const quizContainer = document.getElementById('quiz');
const startButton = document.getElementById('start');
const submitButton = document.getElementById('submit');
const feedbackContainer = document.getElementById('feedback'); // 피드백 메시지 영역
const resultContainer = document.getElementById('result');

// 퀴즈 초기화 함수
function initializeQuiz() {
    remainingHiragana = [...hiraganaData]; // 히라가나 목록 초기화
    score = 0; // 점수 초기화
    updateHeader(); // 헤더 업데이트
}

// 헤더 업데이트 함수 (남은 히라가나와 점수 표시)
function updateHeader() {
    remainingElement.textContent = `남은 히라가나: ${remainingHiragana.length}`;
    scoreElement.textContent = `점수: ${score}/${totalQuestions}`;
}

// 랜덤으로 히라가나 하나를 가져오는 함수
function getRandomHiragana() {
    const randomIndex = Math.floor(Math.random() * remainingHiragana.length);
    return remainingHiragana.splice(randomIndex, 1)[0]; // 중복 방지
}

// 퀴즈 로드 함수
function loadQuiz() {
    if (remainingHiragana.length === 0) {
        showResult(); // 모든 문제가 끝났을 때 결과 표시
        return;
    }

    currentQuestion = getRandomHiragana(); // 랜덤 문제 선택
    quizContainer.innerHTML = `
        <h1>${currentQuestion.character}</h1>
        <input type="text" id="userAnswer" placeholder="답을 입력하세요" autocomplete="off">
        `;
    
    feedbackContainer.textContent = ""; // 이전 피드백 초기화
    submitButton.style.display = 'block'; // 제출 버튼 표시
}

// 정답 확인 함수
function checkAnswer() {
    const userAnswer = document.getElementById('userAnswer').value.trim().toLowerCase();
    
        // 정답 확인 (영어 또는 한국어)
        if (currentQuestion.answer.includes(userAnswer)) {
            score++; // 정답일 경우 점수 증가
            feedbackContainer.textContent = `정답입니다! (${currentQuestion.answer.join(" / ")})`;
            feedbackContainer.className = 'correct'; // 초록색 표시
        } else {
            feedbackContainer.textContent = `오답입니다! 정답은 "${currentQuestion.answer.join(" / ") }" 입니다.`;
            feedbackContainer.className = 'incorrect'; // 빨간색 표시
        }
    
        updateHeader(); // 헤더 업데이트
    }
    

// 결과 표시 함수
function showResult() {
    quizContainer.innerHTML = ''; // 퀴즈 영역 비우기
    submitButton.style.display = 'none'; // 제출 버튼 숨기기
    feedbackContainer.textContent = ""; // 피드백 초기화
    resultContainer.innerHTML = `<h2>테스트 완료! 점수는 ${score}/${totalQuestions}입니다.</h2>`;
}

// 테스트 시작하기 버튼 클릭 이벤트
startButton.addEventListener('click', () => {
    initializeQuiz(); // 퀴즈 초기화
    startButton.style.display = 'none'; // 시작 버튼 숨기기
    loadQuiz(); // 첫 번째 문제 로드
});

// 제출 버튼 클릭 이벤트
submitButton.addEventListener('click', () => {
    checkAnswer();
   setTimeout(loadQuiz, 1500); // 다음 문제로 넘어가기 전 잠시 대기 (1.5초)
});
