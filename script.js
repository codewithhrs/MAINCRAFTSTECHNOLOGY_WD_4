let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ADD TASK
function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") {
        alert("Task cannot be empty!");
        return;
    }

    tasks.push({ text: text, completed: false });
    saveTasks();
    input.value = "";
    displayTasks();
}

// SAVE TO LOCALSTORAGE
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// DISPLAY TASKS
function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let search = document.getElementById("searchInput").value.toLowerCase();
    let filter = document.getElementById("filterSelect").value;

    tasks.forEach((task, index) => {

        if (!task.text.toLowerCase().includes(search)) return;
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        let li = document.createElement("li");

        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-buttons">
                <button class="complete" onclick="toggleComplete(${index})">✓</button>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">X</button>
            </div>
        `;

        list.appendChild(li);
    });
}

// TOGGLE COMPLETE
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

// DELETE TASK
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// EDIT TASK
function editTask(index) {
    let newText = prompt("Edit task:", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        displayTasks();
    }
}

// EVENT LISTENERS
document.getElementById("searchInput").addEventListener("input", displayTasks);
document.getElementById("filterSelect").addEventListener("change", displayTasks);

// INITIAL LOAD
displayTasks();
