// Selects
const generatePasswordButton = document.querySelector("#generate-password");
const generatePasswordElement = document.querySelector("#generated-password");

const openCloseGeneratorButton = document.querySelector("#open-generate-password");
const generatePasswordContainer = document.querySelector("#generate-options");
const lenghtInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

// Functions
const random = (max) => {
    let number = Math.floor(Math.random() * max);
    return number
}

const getLetterLowerCase = () => {
    return String.fromCharCode(random(26) + 97);
}

const getLetterUpperCase = () => {
    return String.fromCharCode(random(26) + 65);
}

const getNumber = () => {
    return Math.floor(Math.random() * 10)
}

const getSymbol = () => {
    const symbols = "()[]{},.;:/?!@#$%&*-_=+";
    return symbols[random(symbols.length)]
}


const generatorPassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {

    let password = "";

    // segunda versão
    const passwordLength = +lenghtInput.value;
    const generators = [];

    lettersInput.checked ? generators.push(getLetterLowerCase, getLetterUpperCase) : null;
    
    numbersInput.checked ? generators.push(getNumber) : null;
    
    symbolsInput.checked ? generators.push(getSymbol) : null;
    
    if (generators.length === 0) return;

    
    for (let i = 0; i < passwordLength; i++) {
            const randomValue = generators[random(generators.length)]();
            password += randomValue;
    };

    generatePasswordElement.style.display = "block"
    generatePasswordElement.querySelector("#generated-password h4").innerText = password;
    
}


// Events
generatePasswordButton.addEventListener('click', () => {
    generatorPassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol);
})

openCloseGeneratorButton.addEventListener('click', () => {
    generatePasswordContainer.classList.toggle('hide');
})

copyPasswordButton.addEventListener('click', (e) => {
    e.preventDefault;
    const password = generatePasswordElement.querySelector('h4').innerText;
    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Senha copiada com sucesso!";
    })

    setTimeout(() => {
        copyPasswordButton.innerText = "Copiar";
    }, 1000)
})
