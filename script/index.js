const password = document.querySelector(".main__heading--box__1-password");
const reGenPassword = document.querySelector(".main__heading--box__1-button");
const passStrength = document.querySelector(".main__heading--box__1-strength");
const passLength = document.querySelector(".box__body--range");
const passLengthText = document.querySelector(".box__head--num");
const minusButton = document.querySelector("#box__body--button-minus");
const plusButton = document.querySelector("#box__body--button-plus");
const CheckBoxes = document.querySelectorAll(".character__checkbox");
const copyButton = document.querySelector(".main__heading--box__2-button");
const openSaveModal = document.querySelector(".password__save--1");
const closeSaveModal = document.querySelector(".save__pass--buttons-2");
const currentPassInModal = document.querySelector(
    ".save__pass--password-current"
);
const saveModalInput = document.querySelector("#save");
const modal = document.querySelector(".modal");
const saveButtonInModal = document.querySelector(".save__pass--buttons-1");
const savedCancelButton = document.querySelector(".saved__pass--buttons-2");
const modal_2 = document.querySelector(".modal-2");
const showSavedPass = document.querySelector(".password__save--2");
const clearLocalStorage = document.querySelector(".saved__pass--buttons-3");

let capitalCheckBox = true;
let smallCheckBox = false;
let numberCheckBox = true;
let specialCheckBox = false;
const localStorageData = [];

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

function strengthCheck() {
    if (value >= 15) {
        passStrength.innerHTML = "Excellent";
        passStrength.style.backgroundColor = "Green";
    } else if ((value <= 12) & (value >= 9)) {
        passStrength.innerHTML = "Strong";
        passStrength.style.backgroundColor = "#0070f6";
    } else if (value <= 8) {
        passStrength.innerHTML = "Weak";
        passStrength.style.backgroundColor = "Red";
    }
}

function minusHandler() {
    value--;
    passLength.value = value;
    passLengthText.innerHTML = value;
    generatePass();
    strengthCheck();
}

function plusHandler() {
    value++;
    passLength.value = value;
    passLengthText.innerHTML = value;
    generatePass();
    strengthCheck();
}

function randomNumGen(totalEle) {
    return Math.floor(Math.random() * totalEle - 1) + 1;
}

function copyHandler() {
    const readyPass = password.innerHTML;
    navigator.clipboard.writeText(readyPass);
    alert(`${readyPass} Copied to your clipboard`);
}

function updateModalPass() {
    const readyPass = password.innerHTML;
    currentPassInModal.innerHTML = readyPass;
}

function openCloseModalHandler() {
    modal.classList.toggle("hidden");
    saveModalInput.value = "";
    updateModalPass();
}

function closeSavedModalHandler() {
    modal_2.classList.toggle("hidden");
    getDataFromLocalStorage();
}

function saveButtonInModalHandler() {
    const readyPassName = saveModalInput.value;
    const readyPassword = password.innerHTML;
    const data = {
        passName: readyPassName,
        password: readyPassword,
    };
    saveModalInput.value = "";
    localStorageData.push(data);
    const stringifiedLocalStorage = JSON.stringify(localStorageData);
    localStorage.setItem("password", stringifiedLocalStorage);
    openCloseModalHandler();
}

function clearLocalStorageHandler() {
    if (!localStorage.getItem("password")) {
        closeSavedModalHandler();
    }
    localStorage.clear();
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    closeSavedModalHandler();
}

minusButton.addEventListener("click", minusHandler);
plusButton.addEventListener("click", plusHandler);
reGenPassword.addEventListener("click", generatePass);
copyButton.addEventListener("click", copyHandler);
openSaveModal.addEventListener("click", openCloseModalHandler);
closeSaveModal.addEventListener("click", openCloseModalHandler);
saveButtonInModal.addEventListener("click", saveButtonInModalHandler);
savedCancelButton.addEventListener("click", closeSavedModalHandler);
showSavedPass.addEventListener("click", closeSavedModalHandler);
clearLocalStorage.addEventListener("click", clearLocalStorageHandler);

passLength.addEventListener("click", function (e) {
    const currentValue = +e.target.value;
    value = currentValue;
    passLengthText.innerHTML = currentValue;
    generatePass();
    strengthCheck();
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

function getDataFromLocalStorage() {
    const table = document.querySelector(".table");

    const data = localStorage.getItem("password");
    const finalData = JSON.parse(data);

    const markup = `
        <tbody>
            <tr>
                <td>%PASSNAME%</td>
                <td>%PASSWORD%</td>
            </tr>
        </tbody>
    `;
    if (finalData) {
        finalData.forEach((ele) => {
            const exists = Array.from(table.querySelectorAll("td")).some(
                (td) => td.textContent === ele.passName
            );
            if (!exists) {
                const readyMarkUp = markup.replace("%PASSWORD%", ele.password);
                const final = readyMarkUp.replace("%PASSNAME%", ele.passName);
                table.insertAdjacentHTML("afterbegin", final);
            }
        });
    }
}
