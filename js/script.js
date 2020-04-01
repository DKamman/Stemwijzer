var anwsers = [];
var index = 0;

function startStemWijzer () {
    console.log(subjects);
    console.log(parties);

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
    indexCheck();
    displayStatement(index);

    console.log('awnsers: ' + anwsers.length);
    console.log('index: ' + index);

    checkEnd();
}

function disagreeQuestion() {
    anwsers[index] = 'Oneens';
    indexCheck();
    displayStatement(index);

    checkEnd();
}

function neutralQuestion() {
    anwsers[index] = 'Neutraal';
    indexCheck();
    displayStatement(index);

    checkEnd();
}

function skipQuestion() {
    anwsers[index] = '';
    indexCheck();
    displayStatement(index);

    checkEnd();
}

function previousQuestion() {
    if (index > 0) {
        index--;        
    }
    // anwserCheck();
    displayStatement(index);
}

// function anwserCheck() {
//     if (anwsers[index] = 'Eens') {
//         var agree = document.getElementById('agree');
//         agree.style.backgroundColor = '#018aa9';
//     } else { 
//         agree.style.backgroundColor = 'black';

//     }
// }

function indexCheck() {
    if (index < 29) {
        index++;
    }
}

function checkEnd() {
    if (index == '29') {
        if (anwsers.length == 30) {
            console.log('This Is The End');
        }
    }
}



