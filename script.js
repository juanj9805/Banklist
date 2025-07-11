'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// // HTML Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Functions
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `        
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}
    </div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const eurToUsd = 1.1;
const interes = 1.2;
const meur = movements.map(n => Math.floor(n * eurToUsd));
/////////////////////////////////////////////////
// LECTURES

const calcPrintBalance = function (acc) {
  const balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  acc.balance = balance;
  labelBalance.textContent = `${balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(move => move >= 0)
    .reduce((acc, move) => acc + move);
  labelSumIn.textContent = incomes;

  const outcomes = acc.movements
    .filter(move => move < 0)
    .reduce((acc, move) => acc + move);
  labelSumOut.textContent = Math.abs(outcomes);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(move => (move * acc.interestRate) / 100)
    .reduce((acc, move) => acc + move, 0);
  labelSumInterest.textContent = Math.floor(interest);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const deposits = movements.filter(move => move > 0);
const withdrawal = movements.filter(move => move < 0);

const maxi = movements.reduce(
  (acc, cur) => (acc > cur ? acc : cur),
  movements[0]
);

const updateUi = function (currentAccount) {
  // Display movements
  displayMovements(currentAccount.movements);

  // Display balance
  calcPrintBalance(currentAccount);

  // Display summary
  calcDisplaySummary(currentAccount);
};

const ok = movements
  .filter(mov => mov > 0)
  .map(mov => Math.round(mov * eurToUsd))
  .reduce((acc, mov) => acc + mov, 0);

// Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
  }

  containerApp.classList.add('log');

  updateUi(currentAccount);

  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
});

// console.log(accounts);
console.log(accounts);

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  console.log(amount, receiverAccount);
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount &&
    receiverAccount.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
  }
  updateUi(currentAccount);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    updateUi(currentAccount);
  }

  inputLoanAmount.value = '0';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  console.log(accounts);

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);
    containerApp.classList.remove('log');
  }

  inputCloseUsername.value = inputClosePin.value = '';
  console.log(accounts);
  // btnClose.ariaDisabled();
  // accounts.findIndex(amountDelete);
});
// console.log(accounts);
