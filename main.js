// selectors
const amountDisplay = document.querySelector(".amountDisplay");

// transactions section
const displayTransaction = document.querySelector(".displayTransaction");

// input
const inputText = document.querySelector("#inputText");
const inputAmount = document.querySelector("#inputAmount");

// btn
const earning = document.querySelector(".earning");
const expense = document.querySelector(".expense");

// btn innerAmount
const earningAmount = document.querySelector(".earningAmount");
const expenseAmount = document.querySelector(".expenseAmount");

// variables

// main amount display Change

let mainTotal = 0;
amountDisplay.innerText = `₹ ${mainTotal}`;
let totalEarning = 0;
let totalExpense = 0;

let isEditing = 0;
let transactionId;
isEditing = false;

// for appending transactions

const addTransaction = (text, amount, isEarning) => {
  // change color based on amount is negative or positive

  if (mainTotal < 0) {
    amountDisplay.classList.add("red");
    amountDisplay.classList.remove("green");
  } else {
    amountDisplay.classList.add("green");
    amountDisplay.classList.remove("red");
  }
  let randomId = new Date().getUTCMilliseconds();
  const divFirst = document.createElement("div");
  const heading = document.createElement("h2");
  const editDelete = document.createElement("div");
  const spanFirst = document.createElement("span");
  const spanSecond = document.createElement("span");
  const spanThird = document.createElement("span");

  heading.innerText = text;
  spanFirst.innerText = `₹ ${amount}`;
  spanSecond.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  spanThird.innerHTML = '<i class="fa-solid fa-trash"></i>';

  //   adding class
  divFirst.classList.add("transaction");
  editDelete.classList.add("displayTransaction");
  spanSecond.classList.add("edit");
  spanThird.classList.add("delete");
  // for changing text color
  if (isEarning) {
    spanFirst.classList.add("green");
  } else {
    spanFirst.classList.add("red");
  }

  // adding id
  divFirst.setAttribute("id", randomId);

  editDelete.append(spanFirst, spanSecond, spanThird);
  divFirst.append(heading, editDelete);
  displayTransaction.append(divFirst);

  // delete btn function

  spanThird.addEventListener("click", (e) => {
    if (isEarning) {
      mainTotal -= amount;
      amountDisplay.innerText = `₹ ${mainTotal}`;
      totalEarning -= amount;
      earningAmount.innerText = totalEarning;
    } else {
      mainTotal += amount;
      amountDisplay.innerText = `₹ ${mainTotal}`;
      totalExpense -= amount;
      expenseAmount.innerText = totalExpense;
    }
    e.target.parentElement.parentElement.parentElement.remove();
  });

  // edit btn function
  spanSecond.addEventListener("click", (e) => {
    console.log();
    let newAmount = 0;
    let newText = "";
    isEditing = true;
    inputText.value = text;
    inputAmount.value = amount;
    let oldAmount = e.target.parentElement.parentElement.firstChild;
    let oldText = e.target.parentElement.parentElement.parentElement.firstChild;
    earning.addEventListener("click", (e) => {
      if (isEditing) {
        newAmount = parseInt(inputAmount.value);
        newText = inputText.value;
        console.log("newText", newText);
        oldAmount.textContent = parseInt(newAmount);
        oldText.textContent = newText;
        inputText.value = "";
        inputAmount.value = "";
      }
      isEditing = false;
    });
  });
};

// earning btn

const onEarning = (e) => {
  if (inputText.value == "" || inputAmount.value == "") {
    return;
  }

  if (parseInt(inputAmount.value) <= 0) {
    alert("earning must be greater than 0");
    return;
  }

  if (!isEditing) {
    //   change to amount in button to the earning amount
    totalEarning = totalEarning + parseInt(inputAmount.value);
    earningAmount.innerText = totalEarning;

    //   change the main amount
    mainTotal += parseInt(inputAmount.value);
    amountDisplay.innerText = `₹ ${mainTotal}`;

    isEarning = true;
    // call the function
    addTransaction(inputText.value, parseInt(inputAmount.value), isEarning);
    inputText.value = "";
    inputAmount.value = "";
  }
};

earning.addEventListener("click", onEarning);

// expense btn
const onExpense = (e) => {
  if (inputText.value == "" || inputAmount.value == "") {
    return;
  }
  if (parseInt(inputAmount.value) <= 0) {
    alert("expense must be greater than 0");
    return;
  }
  if (!isEditing) {
    //   change to amount in button to the expense amount
    totalExpense = totalExpense + parseInt(inputAmount.value);
    expenseAmount.innerText = totalExpense;

    //   change the main amount
    mainTotal -= parseInt(inputAmount.value);
    amountDisplay.innerText = `₹ ${mainTotal}`;

    // call the function
    addTransaction(inputText.value, parseInt(inputAmount.value));

    inputText.value = "";
    inputAmount.value = "";
  }
};

expense.addEventListener("click", onExpense);
