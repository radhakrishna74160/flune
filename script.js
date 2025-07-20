// Initialize global variables
const texts = {
    easy: ["The quick brown fox jumps over the lazy dog."],
    medium: ["A journey of a thousand miles begins with a single step.", "To be or not to be, that is the question."],
    hard: ["All the world's a stage, and all the men and women merely players.", "The only thing we have to fear is fear itself."]
};

let timer;
let startTime;
let typingArea = document.getElementById('typing-area');
let timerDisplay = document.getElementById('timer');
let wpmDisplay = document.getElementById('wpm');
let accuracyDisplay = document.getElementById('accuracy');
let feedbackDisplay = document.getElementById('feedback');
let history = [];

// Event listeners
document.getElementById('start-btn').addEventListener('click', () => {
    const mode = document.getElementById('game-mode').value;
    const timeLimit = parseInt(document.getElementById('time-limit').value, 10) || 60;

    if (mode === 'challenge') {
        window.location.href = 'challenge.html';  // Redirect to challenge mode page
    } else {
        startTest(timeLimit);
    }
});

document.getElementById('reset-btn').addEventListener('click', resetTest);
document.getElementById('difficulty').addEventListener('change', (event) => {
    document.getElementById('text-display').textContent = getRandomText(event.target.value);
});

document.getElementById('dark-mode').addEventListener('change', (event) => {
    document.body.classList.toggle('dark-mode', event.target.checked);
});

document.getElementById('time-limit').addEventListener('change', (event) => {
    if (!typingArea.disabled) {
        resetTest();
    }
});

document.getElementById('result-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const userId = document.getElementById('user-id').value;
    const finalWpm = wpmDisplay.textContent;
    const finalAccuracy = accuracyDisplay.textContent;

    console.log(`User: ${userId}, WPM: ${finalWpm}, Accuracy: ${finalAccuracy}%`);
    alert(`Results submitted! WPM: ${finalWpm}, Accuracy: ${finalAccuracy}%`);
});

// Functions
function getRandomText(difficulty) {
    const textsArray = texts[difficulty];
    return textsArray[Math.floor(Math.random() * textsArray.length)];
}

function startTest(timeLimit) {
    startTime = new Date();
    typingArea.disabled = false;
    typingArea.focus();
    timerDisplay.textContent = formatTime(timeLimit);
    let secondsRemaining = timeLimit;

    timer = setInterval(() => {
        secondsRemaining--;
        timerDisplay.textContent = formatTime(secondsRemaining);

        if (secondsRemaining <= 0) {
            clearInterval(timer);
            typingArea.disabled = true;
            calculateResults();
        }
    }, 1000);

    typingArea.addEventListener('input', calculateMetrics);
}

function resetTest() {
    clearInterval(timer);
    typingArea.value = '';
    typingArea.disabled = true;
    timerDisplay.textContent = '1:00';
    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '0';
    feedbackDisplay.textContent = '';
    document.getElementById('text-display').textContent = getRandomText(document.getElementById('difficulty').value);
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function calculateMetrics() {
    const elapsedTime = (new Date() - startTime) / 60000; // Time in minutes
    const typedText = typingArea.value.trim();
    const wordsTyped = typedText.split(/\s+/).length;
    const wpm = Math.round(wordsTyped / elapsedTime);

    // Accuracy calculation
    const originalText = document.getElementById('text-display').textContent.trim();
    const originalWords = originalText.split(/\s+/);
    const typedWords = typedText.split(/\s+/);

    let correctCount = 0;
    let totalWords = originalWords.length;

    // Compare words
    for (let i = 0; i < Math.min(originalWords.length, typedWords.length); i++) {
        if (originalWords[i] === typedWords[i]) {
            correctCount++;
        }
    }

    const accuracy = Math.round((correctCount / totalWords) * 100);

    // Update displays
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
}

function calculateResults() {
    const elapsedTime = (new Date() - startTime) / 60000; // Time in minutes
    const typedText = typingArea.value.trim();
    const wordsTyped = typedText.split(/\s+/).length;
    const wpm = Math.round(wordsTyped / elapsedTime);

    const originalText = document.getElementById('text-display').textContent.trim();
    const originalWords = originalText.split(/\s+/);
    const typedWords = typedText.split(/\s+/);

    let correctCount = 0;
    let totalWords = originalWords.length;

    // Compare words
    for (let i = 0; i < Math.min(originalWords.length, typedWords.length); i++) {
        if (originalWords[i] === typedWords[i]) {
            correctCount++;
        }
    }

    const accuracy = Math.round((correctCount / totalWords) * 100);

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
    feedbackDisplay.textContent = accuracy >= 80 ? 'Great job!' : 'Keep practicing!';
    history.push({ wpm, accuracy, text: typedText });

    updateHistory();
}

function updateHistory() {
    const historyDiv = document.getElementById('history');
    const ul = document.createElement('ul');
    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `Test ${index + 1} - WPM: ${entry.wpm}, Accuracy: ${entry.accuracy}%`;
        ul.appendChild(li);
    });
    historyDiv.innerHTML = ''; // Clear previous history
    historyDiv.appendChild(ul);
}

// Set initial text
document.getElementById('text-display').textContent = getRandomText('easy');
