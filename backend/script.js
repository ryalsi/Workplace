// DOM Elements
const taskInput = document.getElementById('task-input');  // Input field for new tasks
const addButton = document.getElementById('add-button');  // Button to add a task
const taskList = document.getElementById('task-list');    // UL element where tasks will be listed
const rewardMessageElement = document.getElementById('rewardMessage'); // Element to display reward message

// Array to store tasks
let tasks = [];

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        // Create a new task object
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        // Add task to the tasks array
        tasks.push(newTask);

        // Clear the input field
        taskInput.value = '';

        // Re-render the task list
        renderTaskList();

        // Check if any task is completed to show a reward
        checkForReward();
    }
}

// Function to render tasks to the task list
function renderTaskList() {
    // Clear the current list
    taskList.innerHTML = '';

    // Loop through each task and create an HTML list item for it
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add(task.completed ? 'completed' : ''); // Mark task as completed if it's done
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
    // Find the task by ID and toggle the completed status
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTaskList();  // Re-render the list to reflect the change
        checkForReward();  // Check if any task is completed for a reward
    }
}

// Function to check if all tasks are completed and show reward
function checkForReward() {
    // Check if all tasks are completed
    const allCompleted = tasks.every(task => task.completed);

    // If all tasks are completed, display a reward message
    if (allCompleted) {
        showRewardMessage();
    } else {
        hideRewardMessage();
    }
}

// Function to show reward message
function showRewardMessage() {
    rewardMessageElement.innerHTML = 'Congratulations! You completed all tasks for the day!';
    rewardMessageElement.style.display = 'block';  // Show the message
}

// Function to hide reward message
function hideRewardMessage() {
    rewardMessageElement.style.display = 'none';  // Hide the reward message
}

// Event listeners
addButton.addEventListener('click', addTask);

// Optionally, allow pressing "Enter" to add a task
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Initial rendering of tasks (in case there are any saved tasks on page load)
renderTaskList();
