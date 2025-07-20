// Function to append values to the display
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// Function to clear the display
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Function to calculate and display the result
function calculateResult() {
    const display = document.getElementById('display');
    try {
        // Use Function constructor to safely evaluate the expression
        display.value = new Function('return ' + display.value)();
    } catch (error) {
        display.value = 'Error';
    }
}

// Function to store value in memory
let memory = 0;

function memoryStore() {
    memory = parseFloat(document.getElementById('display').value) || 0;
}

// Function to recall value from memory
function memoryRecall() {
    document.getElementById('display').value = memory;
}

// Function to clear memory
function memoryClear() {
    memory = 0;
}

// Function to add value to memory
function memoryAdd() {
    memory += parseFloat(document.getElementById('display').value) || 0;
}

// Function to subtract value from memory
function memorySubtract() {
    memory -= parseFloat(document.getElementById('display').value) || 0;
}

// Function to change button color based on selected color
function changeButtonColor(event) {
    const color = event.target.value;
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.style.backgroundColor = color;
    });
}
