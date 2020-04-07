var answers = [];
var index = 0;
var results = false;

var title = document.getElementById('title');
var statement = document.getElementById('statement');

var buttons = document.getElementById('buttonBlock');

var agree = document.getElementById('agree');
var disagree = document.getElementById('disagree');
var neutral = document.getElementById('neutral');

var start = document.getElementById('start');
var list = document.getElementById('list');

function startStemWijzer () {
    console.log(subjects);
    console.log(parties);
    start.remove();
    list.style.display = 'block';
    displayStatement(0);
}

function displayStatement(index) {
    title.innerHTML = (index+1).toString() + '. ' + subjects[index].title;
    statement.innerHTML = subjects[index].statement;

    answerCheck();
    debuggAnswers();
}

function displayResults() {
    buttons.style.display = 'none';
    title.style.display = 'none';
    statement.style.display = 'none';
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
        index = 29;
        buttons.style.display = 'block';
        title.style.display = 'block';
        statement.style.display = 'block';
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
    if (index < 29) {
        index++;
    }
}

function checkEnd() {
    if (index == 29 && answers.length == 30) {
        console.log('This is the end');
        results = true;
        displayResults();
        // answerMatch();
    }
}

function debugg() {
    console.log('awnsers: ' + answers.length);
    console.log('index: ' + index);
}

function debuggAnswers() {
    console.log(answers);
}

function answerMatch() {
    answers.forEach((answer,i) => {
        console.log(i + ' = ' + answer);
    });
}


