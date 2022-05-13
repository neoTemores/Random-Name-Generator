let generateButton = document.querySelector('#generateButton');
let nameContainer = document.querySelector('#listOfNamesContainer');
let radioBtn = document.querySelectorAll('.radioBtn');
let resultContainer = document.querySelector('#resultContainer');

let nameToCheck = [' Aaron Warren', ' Anthony Clay', ' Anthony Wright', ' Brandon Shapiro', ' Charles Stevens', ' Christopher Price', ' George Nichols', ' Gibran Reyes', ' Hunter Ritter', ' Jonathon Wazney', ' Joshua McMiller', ' Justin Smith', ' Lee Huckisson', ' Mag Orta', ' Michael Howard', ' Neo Temores', ' Robert Gordon', ' Shatawni Wright', ' Sid Bose', ' Thomas Miller', ' Wayne Odell', ' Yanchao'];

let namesToGenTeams = [];

load();
function load() {
    createTeamSizeEventListeners();
    createGenerateTeamsButton();
    displayListOfNames(nameToCheck)
}

// creates button to generate teams
function createGenerateTeamsButton() {

    let genTeamsBtn = document.createElement('button')
    genTeamsBtn.id = 'genTeamsBtn';
    genTeamsBtn.textContent = 'Generate Teams!';
    generateButton.appendChild(genTeamsBtn);

    genTeamsBtn.addEventListener('click', () => {
        let teamSize = findTeamSize();

        let arrayOfTeams = createTeams(namesToGenTeams, teamSize);
        displayTeams(arrayOfTeams);
    })
}


// displays the teams onto the page. 
function displayTeams(array) {
    resultContainer.innerHTML = ""

    for (let i = 0; i < array.length; i++) {
        let current = array[i];
        console.log(array);
        let teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.textContent = array[i].toString();

        resultContainer.appendChild(teamDiv);

    }

}

// query the radio buttons to find the team size selected. 
function findTeamSize() {
    for (let i = 0; i < radioBtn.length; i++) {
        if (radioBtn[i].checked === true) {
            return +radioBtn[i].value;
        }
    }
}

//listen for the radio button selected and return checked radio button
function createTeamSizeEventListeners() {

    let teamOfTwo = document.querySelector('#teams2')
    teamOfTwo.checked = true;
    teamOfTwo.addEventListener('click', (e) => {

        radioBtn.forEach(e => e.checked = false)
        return e.target.checked = true
    })

    let teamOfThree = document.querySelector('#teams3')
    teamOfThree.addEventListener('click', (e) => {

        radioBtn.forEach(e => e.checked = false)
        return e.target.checked = true
    })

    let teamOfFour = document.querySelector('#teams4')
    teamOfFour.addEventListener('click', (e) => {

        radioBtn.forEach(e => e.checked = false)
        return e.target.checked = true
    })

    let teamOfFive = document.querySelector('#teams5')
    teamOfFive.addEventListener('click', (e) => {

        radioBtn.forEach(e => e.checked = false)
        return e.target.checked = true
    })
}

//! will create check box DOM elements of student names and append to home page
function displayListOfNames(arr) {

    for (let i = 0; i < nameToCheck.length; i++) {
        let nameBoxDiv = document.createElement('div');
        nameBoxDiv.className = 'nameBox'

        let input = document.createElement('input');
        input.type = 'checkbox';
        input.id = nameToCheck[i];
        input.class = 'checkbox'
        input.checked = true
        nameBoxDiv.appendChild(input);

        namesToGenTeams.push(nameToCheck[i]);

        input.addEventListener('change', (e) => {
            addOrRemoveNames(e)
        })

        let nameLabel = document.createElement('label');
        nameLabel.textContent = nameToCheck[i];
        nameBoxDiv.appendChild(nameLabel);

        nameContainer.appendChild(nameBoxDiv);
    }
}

//! mutates array of names to generate teams based on check box
function addOrRemoveNames(e) {
    if (e.target.checked) {
        // console.log(e.target.id, e.target.checked)
        namesToGenTeams.push(e.target.id);
        namesToGenTeams.sort();
        // console.log(namesToGenTeams);
    }
    if (e.target.checked === false) {
        // console.log(e.target.id, e.target.checked)
        let index = namesToGenTeams.indexOf(e.target.id)
        namesToGenTeams.splice(index, 1)
        // console.log(namesToGenTeams);
    }

}

//! shuffles names
function shuffleNames(arr) {
    let cloneArr = [...arr]

    let currentIndex = arr.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cloneArr[currentIndex], cloneArr[randomIndex]] = [cloneArr[randomIndex], cloneArr[currentIndex]];
    }
    return cloneArr;
}

//! create teams based on size
function createTeams(array, teamSize) {
    //let arr = array; uncomment this line & comment out line below to test w/o shuffling
    let arr = shuffleNames(array);
    let pairs = [];
    let tempArr = [];

    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];

        tempArr.push(current);

        if (tempArr.length === teamSize) {
            pairs.push(tempArr);
            tempArr = [];
        }
    }

    if (tempArr.length === 0) { return pairs }

    if (tempArr.length <= pairs.length) {
        for (let i = 0; i < tempArr.length; i++) {
            pairs[i].push(tempArr[i])
        }
        return pairs;
    }

    if (tempArr.length > pairs.length) {
        pairs.push(tempArr)
        return pairs
    }
}

