var answers = [];
var index = 0;
var results = false;
var sortedParties = [];

// Defines a large party, by the number of seats
const seats = 15;

var title = document.getElementById('title');
var statement = document.getElementById('statement');
var buttons = document.getElementById('buttonBlock');

var agree = document.getElementById('agree');
var disagree = document.getElementById('disagree');
var neutral = document.getElementById('neutral');

var start = document.getElementById('start');
var list = document.getElementById('list');
var result = document.getElementById('result');

function startStemWijzer () {
    console.log(subjects);
    console.log(parties);
    start.remove();
    list.style.display = 'block';
    displayStatement(0);
}

/**
 * Returns a title and statement of the subjects array equal to given index
 * 
 * @param {number} index given from indexCheck()
 * @return {object} statement from subjects array
 */
function displayStatement(index) {
    title.innerHTML = (index+1).toString() + '. ' + subjects[index].title;
    statement.innerHTML = subjects[index].statement;
    answerCheck();
    // debuggAnswers();
}

function agreeQuestion() {
    answers[index] = 'pro';
    checkEnd();
    indexCheck();
    displayStatement(index);
    // debugg();
}

function disagreeQuestion() {
    answers[index] = 'contra';
    checkEnd();
    indexCheck();
    displayStatement(index);
}

function neutralQuestion() {
    answers[index] = 'none';
    checkEnd();
    indexCheck();
    displayStatement(index);
}

function skipQuestion() {
    answers[index] = '';
    checkEnd();
    indexCheck();
    displayStatement(index);
}

function previousQuestion() {
    if (results === true) {
        index = (subjects.length-1);
        buttons.style.display = 'block';
        title.style.display = 'block';
        statement.style.display = 'block';
        result.style.display = 'none';
    }
    if (results === false && index > 0) {
        index--;        
    }
    displayStatement(index);
    results = false;
}

function answerCheck() {
    switch(answers[index]) {
        case 'pro':
            agree.classList.add('selectedButton');
            disagree.classList.add('unselectedButton');
            neutral.classList.add('unselectedButton');

            agree.classList.remove('unselectedButton');
            disagree.classList.remove('selectedButton');
            neutral.classList.remove('selectedButton');
            break;

        case 'contra':
            disagree.classList.add('selectedButton');
            agree.classList.add('unselectedButton');
            neutral.classList.add('unselectedButton');

            agree.classList.remove('selectedButton');
            disagree.classList.remove('unselectedButton');
            neutral.classList.remove('selectedButton');
            break;

        case 'none':
            neutral.classList.add('selectedButton');
            agree.classList.add('unselectedButton');
            disagree.classList.add('unselectedButton');

            agree.classList.remove('selectedButton');
            disagree.classList.remove('selectedButton');
            neutral.classList.remove('unselectedButton');
            break;
            
        default:
            agree.classList.add('unselectedButton');
            disagree.classList.add('unselectedButton');
            neutral.classList.add('unselectedButton');

            agree.classList.remove('selectedButton');
            disagree.classList.remove('selectedButton');
            neutral.classList.remove('selectedButton');
            break;     
    }
}

function indexCheck() {
    if (index < (subjects.length-1)) {
        index++;
    }
}

function checkEnd() {
    if (index == (subjects.length-1) && answers.length == subjects.length) {
        console.log('This is the end');
        results = true;
        displayResults();
    }
}

function displayResults() {
    buttons.style.display = 'none';
    title.style.display = 'none';
    statement.style.display = 'none';
    result.style.display = 'block';
    answerMatch();
    buildResults();
}

function secularOnly() {
    while (resultsRow.firstChild) {
        resultsRow.removeChild(resultsRow.lastChild);
    }
    sortedParties = [];

    parties.forEach(party => {
        if (party.secular == true) {
        sortedParties.push(party);
        }
    })

    sortedParties.sort(compare);

    console.log(sortedParties);

    showSecularButton = document.getElementById('showSecularButton');
    showSecularButton.style.display = 'none';
    showBigPartiesButton = document.getElementById('showBigPartiesButton');
    showBigPartiesButton.style.display = 'block';
    showAllButton = document.getElementById('showAllButton');
    showAllButton.style.display = 'block';
    buildResults();
}

function bigPartiesOnly() {
    while (resultsRow.firstChild) {
        resultsRow.removeChild(resultsRow.lastChild);
    }
    sortedParties = [];

    parties.forEach(party => {
        if (party.size >= seats) {
        sortedParties.push(party);
        }
    })

    sortedParties.sort(compare);

    console.log(sortedParties);

    showSecularButton = document.getElementById('showSecularButton');
    showSecularButton.style.display = 'block';
    showBigPartiesButton = document.getElementById('showBigPartiesButton');
    showBigPartiesButton.style.display = 'none';
    showAllButton = document.getElementById('showAllButton');
    showAllButton.style.display = 'block';
    buildResults();
}

function allParties() {
    answerMatch();
    buildResults();
}

// Sort parties on votes
/**
 * 
 * @param {number} a 
 * @param {number} b 
 */
function compare(a, b) {
    const aVotes = a.votes;
    const bVotes = b.votes;

    let comparison = 0;
    if (aVotes < bVotes) {
        comparison = 1;
    } else if (aVotes > bVotes) {
        comparison = -1;
    }
    return comparison;
}

/**
 * Returns array of numbers
 * 
 * @return {array} of parties with corresponding votes
 */
function answerMatch() {
    
    sortedParties = [];

    // resets buttons
    showSecularButton.style.display = 'block';
    showBigPartiesButton.style.display = 'block';
    showAllButton.style.display = 'none';

    // add and clear votes (number of answer matches) for parties
    parties.forEach((party) => {
        party.votes = 0;
    })

    // Iterate through answers
    answers.forEach((answer, indexAnswer) => {

        // Iterate through coresponding parties
        subjects[indexAnswer].parties.forEach((party, indexParty) => {
            const currentParty = parties.find(parties => parties.name === party.name);
            // console.log(currentParty);

            // if my answer for current query is equal to the party its answer then
            // find corresponding party in parties en increment its score
            if (party.position === answer) {
                currentParty.votes++      
            }
        });
        
    });

    // Sort parties on votes
    sortedParties = parties.slice().sort(compare);
    
    // console logs all assigned vote points and adds them to the DOM    
    sortedParties.forEach((party) => {
        console.log(party.name + ' ' + party.votes);
    })
}

function buildResults() {
    while (resultsRow.firstChild) {
        resultsRow.removeChild(resultsRow.lastChild);
    }
    
    sortedParties.forEach((party) => {

        var resultsRow = document.getElementById('resultsRow');

        var div = document.createElement('div');
        div.setAttribute('class', 'col-md-3');

        var resultTitle = document.createElement('div');
        resultTitle.setAttribute('class', 'title')
        resultTitle.setAttribute('id', 'resultTitle')

        var resultVotes = document.createElement('div')
        resultVotes.setAttribute('class', 'votes')
        resultVotes.setAttribute('id', 'resultVotes')

        resultsRow.appendChild(div);
        div.appendChild(resultTitle);
        div.appendChild(resultVotes);
        resultTitle.innerHTML = party.name;
        resultVotes.innerHTML = 'Overeenkomende antwoorden: ' + party.votes;
    })
}

//debugging
function debuggAnswers() {
    console.log(answers);
}

function debugg() {
    console.log('awnsers: ' + answers.length);
    console.log('index: ' + index);
}