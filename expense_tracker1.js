let totalBalance = 0;

const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const balanceDisplay = document.getElementById("total-balance");

function updateBalanceDisplay() {
  balanceDisplay.textContent = totalBalance.toFixed(2);
}

function setInitialBalance() {
  const input = document.getElementById("initial-balance");
  const value = parseFloat(input.value);
  if (!isNaN(value) && value >= 0) {
    totalBalance = value;
    updateBalanceDisplay();
    input.value = "";
  }
}

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = new Date().toLocaleDateString("en-IN");

  if (!description || isNaN(amount) || !category) return;

  totalBalance -= amount;
  updateBalanceDisplay();

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${date}</td>
    <td>${description}</td>
    <td>₹${amount.toFixed(2)}</td>
    <td>${category}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  row.querySelector(".delete-btn").addEventListener("click", () => {
    totalBalance += amount;
    updateBalanceDisplay();
    row.remove();
  });

  expenseList.appendChild(row);
  expenseForm.reset();
});