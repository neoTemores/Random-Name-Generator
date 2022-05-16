let generateButton = document.querySelector('#generateButton');
let nameContainer = document.querySelector('#listOfNamesContainer');
let radioBtn = document.querySelectorAll('.radioBtn');
let resultContainer = document.querySelector('#resultContainer');

//nameToCheck used to display names with checkboxes
let nameToCheck = [' Aaron Warren', ' Anthony Clay', ' Anthony Wright', ' Brandon Shapiro', ' Charles Stevens', ' Christopher Price', ' George Nichols', ' Gibran Reyes', ' Hunter Ritter', ' Jonathon Wazney', ' Joshua McMiller', ' Justin Smith', ' Lee Huckisson', ' Mag Orta', ' Michael Howard', ' Neo Temores', ' Robert Gordon', ' Shatawni Wright', ' Sid Bose', ' Thomas Miller', ' Wayne Odell', ' Yanchao'];

//namesToGenTeams used to add/remove names based on checkboxes
let namesToGenTeams = [];

load();
function load() {
    queryRadBtnsToListenFor();
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
        let teamDiv = document.createElement('div');
        teamDiv.classList.add('team');

        teamDiv.textContent = current.toString();

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

//set default btn to team of 2
//query all radio buttons
//sends radio btn query element to "createEventListener" function
function queryRadBtnsToListenFor() {
    let teamOfTwo = document.querySelector('#teams2')
    teamOfTwo.checked = true;
    createEventListener(teamOfTwo)

    let teamOfThree = document.querySelector('#teams3')
    createEventListener(teamOfThree)

    let teamOfFour = document.querySelector('#teams4')
    createEventListener(teamOfFour);

    let teamOfFive = document.querySelector('#teams5')
    createEventListener(teamOfFive);
}

//takes in radio element and creates event listener
function createEventListener(element) {
    element.addEventListener('click', (e) => {

        radioBtn.forEach(e => e.checked = false)
        return e.target.checked = true
    })
}

// will create check box DOM elements of all student names and append to home page
function displayListOfNames(arr) {

    for (let i = 0; i < nameToCheck.length; i++) {
        let nameBoxDiv = document.createElement('div');
        nameBoxDiv.className = 'nameBox'

        let input = document.createElement('input');
        input.type = 'checkbox';
        input.id = nameToCheck[i];
        input.classList.add('checkbox');
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

// mutates namesToGenTeams arr to generate teams based on checked names
// will remove or add names from namesToGenTeams array
function addOrRemoveNames(e) {
    if (e.target.checked) {
        namesToGenTeams.push(e.target.id);
        namesToGenTeams.sort();
    }
    if (e.target.checked === false) {
        let index = namesToGenTeams.indexOf(e.target.id)
        namesToGenTeams.splice(index, 1)
    }

}

//use random index to shuffles names
//clones original namesToCheck arr to not change checkbox display
function shuffleNames(arr) {
    let cloneArr = [...arr]

    let currentIndex = cloneArr.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cloneArr[currentIndex], cloneArr[randomIndex]] = [cloneArr[randomIndex], cloneArr[currentIndex]];
    }
    return cloneArr;
}

// create teams based on namesToGenTeams arr and teamSize function
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
    //if no students are left over (even teams) return the pairs arr
    if (tempArr.length === 0) { return pairs }

    //if tempArr still contains names, push left over names to other teams!
    if (tempArr.length <= pairs.length) {

        for (let i = 0; i < tempArr.length; i++) {
            pairs[pairs.length - (1 + i)].push(tempArr[i])
        }
        return pairs;
    }
    // if tempArr leftover names exceeds number of paired groups
    // create a last team with left over students
    if (tempArr.length > pairs.length) {
        pairs.push(tempArr)
        return pairs
    }
}