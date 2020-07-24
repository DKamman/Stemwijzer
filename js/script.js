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
var importantButton = document.getElementById('importantButton');
var importantCheckbox = document.getElementById('importantCheckbox');


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
    console.log(answers[index]);
    title.innerHTML = (index+1).toString() + '. ' + subjects[index].title;
    statement.innerHTML = subjects[index].statement;    
    if (answers[index] != undefined) {
        if (answers[index].important == true) {
            importantCheckbox.checked = true;
        } else {
            importantCheckbox.checked = false;
        }
        answerCheck();
    } else {
        agree.classList.add('unselectedButton');
        disagree.classList.add('unselectedButton');
        neutral.classList.add('unselectedButton');

        agree.classList.remove('selectedButton');
        disagree.classList.remove('selectedButton');
        neutral.classList.remove('selectedButton');
    }
    debuggAnswers();
}

function importantCheck() {
    if (importantCheckbox.checked == true) {
        answers[index].important = true;
        console.log(answers[index].important);
    }
}

function agreeQuestion() {
    answers[index] = 
    {
        opinion: 'pro',
        important: false
    };
    importantCheck();
    checkEnd();
    indexCheck();
    displayStatement(index);
    debugg();
}

function disagreeQuestion() {
    answers[index] = 
    {
        opinion: 'contra',
        important: false
    };
    checkEnd();
    indexCheck();
    displayStatement(index);
}

function neutralQuestion() {
    answers[index] = 
    {
        opinion: 'none',
        important: false
    };
    checkEnd();
    indexCheck();
    displayStatement(index);
}

function skipQuestion() {
    answers[index] = 
    {
        opinion: '',
        important: false
    };
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
        importantButton.style.display = 'block';
        result.style.display = 'none';
    }
    if (results === false && index > 0) {
        index--;        
    }
    displayStatement(index);
    results = false;
}

function answerCheck() {
    switch(answers[index].opinion) {
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
    importantButton.style.display = 'none';
    result.style.display = 'block';
    secular.checked = false;
    bigParties.checked = false;
    answerMatch();
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

function filter() {
    while (resultsRow.firstChild) {
        resultsRow.removeChild(resultsRow.lastChild);
    }

    sortedParties = [];

    console.log(secular.checked);
    console.log(bigParties.checked);

    console.log(sortedParties);

    parties.forEach(party => {
        if (secular.checked == true && bigParties.checked == true && party.secular == true && party.size >= seats) {
            sortedParties.push(party);
        }else if (secular.checked == true && bigParties.checked == false && party.secular == true) {
            sortedParties.push(party);
        }else if (secular.checked == false && bigParties.checked == true && party.secular == false && party.size >= seats) {
            sortedParties.push(party);
        }else if (secular.checked == false && bigParties.checked == true && party.secular == true && party.size >= seats) {
            sortedParties.push(party);
        }
    })

// Alternate version of above forEach loop
    // parties.forEach(party => {
    //     if (secular.checked == true && bigParties.checked == true) {
    //         if (party.secular == true && party.size >= seats) {
    //             sortedParties.push(party);
    //         }
    //     } else if (secular.checked == true && bigParties.checked == false) {
    //         if (party.secular == true) {
    //             sortedParties.push(party);
    //         }
    //     } else if (secular.checked == false && bigParties.checked == true) {
    //         if (party.size >= seats) {
    //             sortedParties.push(party);
    //         }
    //     }
    // })


    if (sortedParties.length == 0) {
        allParties();
    } else {
        sortedParties.sort(compare);
        buildResults();
    }

    console.log(sortedParties);
}

/**
 * Returns array of numbers
 * 
 * @return {array} of parties with corresponding votes
 */
function answerMatch() {
    
    sortedParties = [];

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
            if (party.position === answer.opinion) {
                currentParty.votes++;
                if (answer.important == true) {
                    currentParty.votes++;
                }    
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