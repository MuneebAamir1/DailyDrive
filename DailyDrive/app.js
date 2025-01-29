document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const taskTime = document.getElementById("taskTime");
  const taskCategory = document.getElementById("taskCategory");
  const tasksList = document.getElementById("tasks");
  const addTaskButton = document.getElementById("addTaskButton");

  const quotes = [
    "The journey of a thousand miles begins with a single step.",
    "Believe you can and you're halfway there.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Start where you are. Use what you have. Do what you can.",
    "Dream big and dare to fail.",
    "Act as if what you do makes a difference. It does.",
    "Hard work beats talent when talent doesn’t work hard.",
    "Opportunities don’t happen. You create them.",
    "Failure is not the opposite of success; it’s part of success.",
    "Don’t limit your challenges; challenge your limits.",
    "Great things never come from comfort zones.",
    "Your limitation—it’s only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Work hard in silence, let your success make the noise.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "It always seems impossible until it’s done.",
    "You don’t have to be great to start, but you have to start to be great.",
    "Success doesn’t just find you. You have to go out and get it.",
  ];

  addTaskButton.addEventListener("click", addTask);

  function addTask() {
    const text = taskInput.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;
    const category = taskCategory.value;

    if (!text || !date || !time) {
      alert("Please fill in all fields!");
      return;
    }

    const task = {
      text,
      date,
      time,
      category,
      quote: getRandomQuote(),
    };

    addTaskToDOM(task);

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
  }

  function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.className = "task-card";

    li.innerHTML = `
      <div>
        <strong>${task.text}</strong>
        <br>
        <small>${task.date} ${task.time}</small>
        <br>
        <small>Category: ${task.category}</small>
        <br>
        <span class="quote">${task.quote}</span>
      </div>
      <textarea class="sticky-note-box" placeholder="Add sticky note here..."></textarea>
      <div class="task-buttons">
        <button onclick="markAsDone(this)">✔️</button>
        <button class="delete-btn" onclick="deleteTask(this)">❌</button>
      </div>
    `;

    tasksList.appendChild(li);

    // Schedule notification for this task
    scheduleNotification(task);
  }

  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  function scheduleNotification(task) {
    const taskTime = new Date(`${task.date}T${task.time}`);
    const now = new Date();
    const timeUntilNotification = taskTime - now;

    if (timeUntilNotification > 0) {
      setTimeout(() => {
        // Show notification
        const notification = new Notification("Task Reminder", {
          body: `${task.text}\n"${task.quote}"`,
          icon: "https://via.placeholder.com/128", // Optional icon
        });

        // Play custom sound if audio element exists
        const audio = document.getElementById("notificationSound");
        if (audio) audio.play();
      }, timeUntilNotification);
    }
  }

  window.markAsDone = function (button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle("done");
  };

  window.deleteTask = function (button) {
    const li = button.parentElement.parentElement;
    li.remove();
  };

  // Request notification permission
  if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        alert("Please enable notifications for task reminders!");
      }
    });
  }
});
