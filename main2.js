// selectors;
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

let transactionArr = [{ text: "hello", amount: 12, id: 12 }];

// onClick
let mainTotal = 0;
amountDisplay.innerText = `₹ ${mainTotal}`;

const onClickBtn = (e) => {
  if (inputAmount.value === "" || inputText.value === "") {
    alert("you must input amount or text");
    return;
  }
  if (inputAmount.value <= 0) {
    alert("amount must be greater than 0 or not be negative ");
    return;
  }
  let randomId = new Date().getMilliseconds();
  console.log(e.target.classList);
  if (e.target.classList.contains("earning")) {
    transactionArr.push({
      text: inputText.value,
      amount: parseInt(inputAmount.value),
      id: randomId,
      className: "green",
    });
  } else {
    transactionArr.push({
      text: inputText.value,
      amount: parseInt(inputAmount.value),
      id: randomId,
      className: "red",
    });
  }

  inputText.value = "";
  inputAmount.value = "";
  displayTransaction.innerHTML = "";
  let totalEarning = 0;
  let totalExpense = 0;
  let newData = [];
  transactionArr.map((item) => {
    const { text, amount, id, className } = item;
    if (className == "green") {
      totalEarning += amount;
      earningAmount.textContent = `₹ ${totalEarning}`;
    } else if (className == "red") {
      totalExpense += amount;
      expenseAmount.textContent = `₹ ${totalEarning}`;
    }

    if (mainTotal > 0) {
      mainTotal -= totalEarning;
    } else {
      mainTotal += totalExpense;
    }
    amountDisplay.innerText = totalEarning - totalExpense;
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
    spanFirst.classList.add(className);

    divFirst.setAttribute("id", id);

    editDelete.append(spanFirst, spanSecond, spanThird);
    divFirst.append(heading, editDelete);
    displayTransaction.append(divFirst);

    spanThird.addEventListener("click", (e) => {
      const temp = e.target.parentElement.parentElement.parentElement.id;
      newData = transactionArr.filter((item) => item.id == temp);
      console.log(newData);
      transactionArr = newData;
    });
  });
};

console.log("transactionArr", transactionArr);
earning.addEventListener("click", onClickBtn);
expense.addEventListener("click", onClickBtn);
