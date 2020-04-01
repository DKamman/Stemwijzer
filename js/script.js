var answers = [];
var index = 0;

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
    debuggAnswers();
    var title = document.getElementById('title');
    var statement = document.getElementById('statement');
    title.innerHTML = (index+1).toString() + '. ' + subjects[index].title;
    statement.innerHTML = subjects[index].statement;

    answerCheck();
}

function displayResults() {
    // list.style.display = 'block';
    var title = document.getElementById('title');
    var statement = document.getElementById('statement');
    title.innerHTML = 'Uw mening komt het best overeen met:';
    statement.innerHTML = 'test';
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
    if (index > 0) {
        index--;        
    }
    displayStatement(index);
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
        displayResults();
    }
}

function debugg() {
    console.log('awnsers: ' + answers.length);
    console.log('index: ' + index);
}

function debuggAnswers() {
    console.log(answers);
}


