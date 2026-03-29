let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") return;

    tasks.push({ text: taskText, completed: false });
    input.value = "";

    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {

        // 🔥 FILTER LOGIC
        if (
            (currentFilter === "completed" && !task.completed) ||
            (currentFilter === "pending" && task.completed)
        ) return;

        let li = document.createElement("li");

        let span = document.createElement("span");
        span.innerText = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        span.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            displayTasks();
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";

        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            displayTasks();
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });

    saveTasks();
}

// 🔥 NEW FUNCTION
function filterTasks(type) {
    currentFilter = type;
    displayTasks();
}

// Load tasks
displayTasks();