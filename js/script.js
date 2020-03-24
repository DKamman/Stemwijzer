function startStemWijzer () {
    console.log(subjects);
    var start = document.getElementById('start');
    start.remove();

    var content = document.getElementById('content');
    var title = document.createElement('H1');
    var titleText = document.createTextNode('Test');

    var statement = document.createElement('P');
    var statementText = document.createTextNode('Statement Test');
    
    title.appendChild(titleText);
    content.appendChild(title);

    statement.appendChild(statementText)
    content.appendChild(statement);
}