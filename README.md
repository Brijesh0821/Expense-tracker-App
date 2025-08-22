<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Smart Expense Tracker</title>
  <link rel="stylesheet" href="expense-tracker1.css" />
</head>
<body>
  <div class="container">
    <h1>📊 Smart Expense Tracker</h1>

    <div class="balance-section">
      <h3>Total Balance</h3>
      <h2>₹<span id="total-balance">0.00</span></h2>
    </div>

    <h3>Set Initial Balance</h3>
    <div class="form-control">
      <input type="number" id="initial-balance" placeholder="e.g. 1000" />
      <button onclick="setInitialBalance()" class="btn">Set Balance</button>
    </div>

    <h3>Add Expense</h3>
    <form id="expense-form">
      <div class="form-control">
        <label for="description">Expense Description</label>
        <input type="text" id="description" placeholder="e.g. Pizza, Uber ride" required />
      </div>

      <div class="form-control">
        <label for="amount">Amount (₹)</label>
        <input type="number" id="amount" placeholder="e.g. 250" required />
      </div>

      <div class="form-control">
        <label for="category">Category</label>
        <select id="category" required>
          <option value="">--Select--</option>
          <option value="Food">🍕 Food</option>
          <option value="Travel">🚌 Travel</option>
          <option value="Grocery">🛒 Grocery</option>
          <option value="Entertainment">🎬 Entertainment</option>
          <option value="Other">📦 Other</option>
        </select>
      </div>

      <button type="submit" class="btn">Add Expense</button>
    </form>

    <h3>Expense History</h3>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="expense-list">
          <!-- Expenses will be added here -->
        </tbody>
      </table>
    </div>
  </div>

  <script src="expense_tracker1.js"></script>
</body>
</html>

//CSS Part : 

/* Reset and base styles */
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
  background: #e0f7fa;
}

/* Main container */
.container {
  max-width: 700px;
  margin: 40px auto;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
}

/* Header */
h1 {
  text-align: center;
  color: #00796b;
  margin-bottom: 20px;
}

/* Balance section */
.balance-section {
  text-align: center;
  margin-bottom: 30px;
}

.balance-section h3 {
  margin: 0;
  font-size: 18px;
  color: #555;
}

.balance-section h2 {
  font-size: 32px;
  color: #004d40;
  margin-top: 10px;
}

/* Section headings */
h3 {
  margin-top: 30px;
  margin-bottom: 10px;
  color: #00796b;
}

/* Form controls */
.form-control {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #333;
}

input, select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
}

/* Buttons */
.btn {
  width: 100%;
  padding: 12px;
  background-color: #00796b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 8px;
}

.btn:hover {
  background-color: #004d40;
}

/* Table container */
.table-container {
  overflow-x: auto;
  margin-top: 20px;
}

/* Table styles */
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

th {
  background-color: #00796b;
  color: white;
}

td {
  background-color: #f9f9f9;
}

/* Delete button */
.delete-btn {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.delete-btn:hover {
  background-color: #b71c1c;
}

/* Responsive tweaks */
@media screen and (max-width: 600px) {
  .container {
    padding: 20px;
  }

  table {
    font-size: 14px;
  }

  .btn {
    font-size: 14px;
  }
}

//JS Part: 

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





