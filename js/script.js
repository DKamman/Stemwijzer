var anwsers = [];
var index = 0;

function startStemWijzer () {
    console.log(subjects);

    var start = document.getElementById('start');
    start.remove();

    var list = document.getElementById('list');
    list.style.display = 'block';

    displayStatement(0);
}

function displayStatement(index) {
    var title = document.getElementById('title');
    var statement = document.getElementById('statement');
    title.innerHTML = (index+1).toString() + '. ' + subjects[index].title;
    statement.innerHTML = subjects[index].statement;
}

function agreeQuestion() {
    anwsers[index] = 'Eens';
    displayStatement(index);

    console.log(index);

    indexCheck();
    checkEnd();
}

function disagreeQuestion() {
    anwsers[index] = 'Oneens';
    displayStatement(index);

    console.log(index);

    indexCheck();
    checkEnd();
}

function neutralQuestion() {
    anwsers[index] = 'Neutraal';
    displayStatement(index);

    console.log(index);

    indexCheck();
    checkEnd();
}

function skipQuestion() {
    anwsers[index] = '';

    displayStatement(index);

    console.log(anwsers);

    indexCheck();
    checkEnd();

}

function previousQuestion() {
    if (index > 0) {
        index--;        
    }

    displayStatement(index);

    console.log(index);
}

function indexCheck() {
    if (index < 29) {
        index++;
    }
}


function checkEnd() {
    if (index == '29') {
        console.log('This Is The End');

    }
}



