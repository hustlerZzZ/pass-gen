const password = document.querySelector(".main__heading--box__1-password");
const reGenPassword = document.querySelector(".main__heading--box__1-button");
const passLength = document.querySelector(".box__body--range");
const passLengthText = document.querySelector(".box__head--num");
const minusButton = document.querySelector("#box__body--button-minus");
const plusButton = document.querySelector("#box__body--button-plus");
const CheckBoxes = document.querySelectorAll(".character__checkbox");

let capitalCheckBox = false;
let smallCheckBox = true;
let numberCheckBox = false;
let specialCheckBox = false;

CheckBoxes.forEach((ele) =>
    ele.addEventListener("click", function (e) {
        if (e.target.name === "special") {
            specialCheckBox = e.target.checked;
        } else if (e.target.name === "capital") {
            capitalCheckBox = e.target.checked;
        } else if (e.target.name === "small") {
            smallCheckBox = e.target.checked;
        } else if (e.target.name === "number") {
            numberCheckBox = e.target.checked;
        }
    })
);

let array = [];

const capitalAlphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
const smallAlphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const special = ["@", "!", "&", "*", "#", "$", "%", "^"];

let value = +passLength.value;

function minusHandler() {
    value--;
    passLength.value = value;
    passLengthText.innerHTML = value;
    generatePass();
}

function plusHandler() {
    value++;
    passLength.value = value;
    passLengthText.innerHTML = value;
    generatePass();
}

function randomNumGen(totalEle) {
    return Math.floor(Math.random() * totalEle - 1) + 1;
}

minusButton.addEventListener("click", minusHandler);
plusButton.addEventListener("click", plusHandler);
reGenPassword.addEventListener("click", generatePass);

passLength.addEventListener("click", function (e) {
    const currentValue = +e.target.value;
    value = currentValue;
    passLengthText.innerHTML = currentValue;
    generatePass();
});

function generatePass() {
    if (capitalCheckBox) {
        capitalAlphabet.forEach((ele) => array.push(ele));
    }
    if (smallCheckBox) {
        smallAlphabet.forEach((ele) => array.push(ele));
    }
    if (numberCheckBox) {
        numbers.forEach((ele) => array.push(ele));
    }
    if (specialCheckBox) {
        special.forEach((ele) => array.push(ele));
    }

    const totalEleInArray = array.length;

    let string = "";
    for (let x = 0; x < value; x++) {
        string += array[randomNumGen(totalEleInArray)];
    }
    password.innerHTML = string;
    array = [];
}
