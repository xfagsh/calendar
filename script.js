const date = new Date();

function renderCalendar() {
  const date = new Date();
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today day"><span>${i}</span></div>`;
    } else {
      days += `<div class="day"><span>${i}</span></div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
}

function dragAndDrop() {

    const card = document.querySelector(".card__task");
    const cells = document.querySelectorAll(".days .day");

    const dragStart = function () {
      setTimeout(() => {
        this.classList.add("hide");
      }, 0);
    };

    const dragEnd = function () {
      this.classList.remove("hide");
    };

    const dragOver = function (evt) {
      evt.preventDefault();
      this.classList.add("hovered");
    };

    const dragEnter = function (evt) {
      evt.preventDefault();
    };

    const dragLeave = function () {
      this.classList.remove("hovered");
    };


    const dragDrop = function () {
      // создать дубликат блока card -> const cardDublicat
      

      this.append(card);
      this.classList.remove("hovered");
      // Вставить дубликать в контейнер .card__task__container
      const cardDublicat = this.cloneNode(true);
      const cardTaskContainer = document.querySelector('.card__task__container');
      cardTaskContainer.appendChild(cardDublicat);
    };

    cells.forEach((cell) => {
      cell.addEventListener("dragover", dragOver);
      cell.addEventListener("dragenter", dragEnter);
      cell.addEventListener("dragleave", dragLeave);
      cell.addEventListener("drop", dragDrop);
    });

    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
}

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

dragAndDrop();


// пишите изменения