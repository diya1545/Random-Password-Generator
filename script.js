const inputslider = document.getElementById("inputslider");
const value = document.getElementById("slidervalue");
const box = document.getElementById("inputbox");

const lower = document.getElementById("lowercase");
const upper = document.getElementById("uppercase");
const num = document.getElementById("number");
const special = document.getElementById("special");

const indicator = document.getElementById("indicator");
const strengthLabel = document.getElementById("strengthLabel");
const icon = document.getElementById("icon");
const button = document.getElementById("generate");

const lowerletter = "abcdefghijklmnopqrstuvwxyz";
const upperletter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "@*/()#$%!^!,./[]{}<>|;:?";


value.textContent = inputslider.value;

inputslider.addEventListener("input", () => {
    value.textContent = inputslider.value;
    generatePassword();
});

function generatePassword(){
    const length = inputslider.value;
    let character = "";
    let password = "";

    character += lower.checked ? lowerletter : "";
    character += upper.checked ? upperletter : "";
    character += num.checked ? numbers : "";
    character += special.checked ? symbols : "";

    for(let i=0; i<length; i++){
        password += character.charAt(Math.floor(Math.random() * character.length));
    }

    box.value = password;
    updatePassword(password);
}

button.addEventListener("click", () => {
    generatePassword();
})

function updatePassword(password){
    const passwordStrength = getPasswordStrength(password);
    indicator.style.backgroundColor = getIndicatorColor(passwordStrength);
    // indicator.className = "indicator" + passwordStrength;
}

function getPasswordStrength(password){
    if(password.length <= 10){
        return "weak";
    }
    else if(password.length <= 20) {
        return "medium";
    }
    else{
        return "strong";
    }
}

function getIndicatorColor(strength) {
    switch (strength) {
        case "weak":
            return "red";
        case "medium":
            return "orange";
        case "strong":
            return "green";
        default:
            return "white";
    }
}

window.addEventListener('DOMContentLoaded', () => {
    updatePassword();
})

icon.addEventListener("click" , () => {
    if (box.value != "" || box.value.length >= 1){
        navigator.clipboard.writeText(box.value);
        icon.innerHTML = "check";

        setTimeout(() => {
            icon.innerHTML = "content_copy";
        },3000);
    }
})