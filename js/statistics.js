var statistics = {
    democratas: 0,
    republican: 0,
    independents: 0,
    democrats_vote: 0,
    republicans_vote: 0,
    independents_vote: 0,
    best_attendace: 0,
    worst_attendance: 0,
    best_loyalty: 0,
    worst_loyalty: 0
}

function getMembersByParty() {
    /*var arrayMembers = data.results[0].members;*/
    var arrayMembers = appstatistics.estadisticas;
    var democrats = arrayMembers.filter(array => array.party === "D")

    var republicans = arrayMembers.filter(array => array.party === "R")

    var independt = arrayMembers.filter(array => array.party === "ID")

    statistics.democratas = democrats
    statistics.republican = republicans
    statistics.independents = independt
}
console.log(getMembersByParty(statistics.democratas));
console.log(getMembersByParty(statistics.republican));
console.log(getMembersByParty(statistics.independents));

function averageArray(array) {
    let sumatoriaArray = 0;
    for (var i = 0; i < array.length; i++) {
        sumatoriaArray += array[i].votes_with_party_pct
    }
    return sumatoriaArray / array.length
}

function getAverageByParty() {
    statistics.democrats_vote = averageArray(statistics.democratas)
    statistics.republicans_vote = averageArray(statistics.republican)
    statistics.independents_vote = averageArray(statistics.independents)
}

getAverageByParty(statistics.democrats_vote);
getAverageByParty(statistics.republicans_vote);
getAverageByParty(statistics.independents_vote);


function sliceMembers(array, quantity) {
    let element = [];
    for (let i = 0; i < quantity; i++) {
        element.push(array[i])
    }
    return element
}

function getBestListAttendance() {
    var arrayMembers = data.results[0].members;
    let percent = arrayMembers.length * 0.1;
    var arrayOrdenadoAttendance = arrayMembers.sort(function (p1, p2) {
        return p1.missed_votes_pct - p2.missed_votes_pct;
    })

    statistics.best_attendace = sliceMembers(arrayOrdenadoAttendance, percent)
}
getBestListAttendance(statistics.best_attendace)

function getWorstListAttendance() {
    var arrayMembers = data.results[0].members;
    let percent = arrayMembers.length * 0.1;
    var arrayOrdenadoByAttendance = arrayMembers.sort(function (p1, p2) {
        return p2.missed_votes_pct - p1.missed_votes_pct;
    })

    statistics.worst_attendance = sliceMembers(arrayOrdenadoByAttendance, percent)
}
getWorstListAttendance(statistics.worst_attendance)

function getBestListLoyalty() {
    var arrayMembers = data.results[0].members;
    let percent = arrayMembers.length * 0.1;
    var arrayOrdenadoBestLoyalty = arrayMembers.sort(function (p1, p2) {
        return p2.votes_with_party_pct - p1.votes_with_party_pct;
    })

    statistics.best_loyalty = sliceMembers(arrayOrdenadoBestLoyalty, percent)
}
getBestListLoyalty(statistics.best_loyalty)

function getListWorstLoyalty() {
    var arrayMembers = data.results[0].members;
    let percent = arrayMembers.length * 0.1;
    var arrayOrdenadoLoyalty = arrayMembers.sort(function (p1, p2) {
        return p1.votes_with_party_pct - p2.votes_with_party_pct;
    })

    statistics.worst_loyalty = sliceMembers(arrayOrdenadoLoyalty, percent)
}
getListWorstLoyalty(statistics.worst_loyalty)
/*
function htmlTable(){
    document.getElementById("num-of-republicans").innerHTML = statistics.republican.length;
    document.getElementById("num-of-democrats").innerHTML = statistics.democratas.length;
    document.getElementById("num-of-independents").innerHTML = statistics.independents.length;
    document.getElementById("repu-party-voted").innerHTML = statistics.republicans_vote;
    document.getElementById("demo-party-voted").innerHTML = statistics.democrats_vote;
    document.getElementById("inde-party-voted").innerHTML = statistics.independents_vote;
    document.getElementById("total-of-members").innerHTML = statistics.democratas.length + statistics.republican.length + statistics.independents.length;
    document.getElementById("total-percent-members").innerHTML = (statistics.democrats_vote + statistics.republicans_vote + statistics.independents_vote) / 3;
}
htmlTable()*/



function existenciaDeElement(elemento, imprimir) {
    if (document.getElementById(elemento)) {
        return document.getElementById(elemento).innerHTML = imprimir;
    }
}

function bottomTable() {

    var bottomData = "";
    for (var i = 0; i < statistics.worst_attendance.length; i++) {
        bottomData += "<tr>"
        bottomData += "<td>" + statistics.worst_attendance[i].first_name + " " + (statistics.worst_attendance[i].middle_name || "") + " " + statistics.worst_attendance[i].last_name + "</td>"
        bottomData += "<td>" + statistics.worst_attendance[i].missed_votes + "</td>"
        bottomData += "<td>" + statistics.worst_attendance[i].missed_votes_pct + "</td>"
        bottomData += "</tr>"
    }
    return bottomData
}

function topTable() {
    var topData = "";
    for (var i = 0; i < statistics.best_attendace.length; i++) {
        topData += "<tr>"
        topData += "<td>" + statistics.best_attendace[i].first_name + " " + (statistics.best_attendace[i].middle_name || "") + " " + statistics.best_attendace[i].last_name + "</td>"
        topData += "<td>" + statistics.best_attendace[i].missed_votes + "</td>"
        topData += "<td>" + statistics.best_attendace[i].missed_votes_pct + "</td>"
        topData += "</tr>"
    }
    return topData
}
existenciaDeElement("most-engaged", topTable(statistics))




function bottomTableLoyalty() {
    var bottomLoyalty = "";
    for (var i = 0; i < statistics.worst_loyalty.length; i++) {
        bottomLoyalty += "<tr>"
        bottomLoyalty += "<td>" + statistics.worst_loyalty[i].first_name + " " + (statistics.worst_loyalty[i].middle_name || "") + " " + statistics.worst_loyalty[i].last_name + "</td>"
        bottomLoyalty += "<td>" + statistics.worst_loyalty[i].total_votes + "</td>"
        bottomLoyalty += "<td>" + statistics.worst_loyalty[i].votes_with_party_pct + "</td>"
        bottomLoyalty += "</tr>"
    }
    return bottomLoyalty
}
existenciaDeElement("least-loyalty-engaged", bottomTableLoyalty(statistics))



function topTableLoyalty() {
    var topData = "";
    for (var i = 0; i < statistics.best_loyalty.length; i++) {
        topData += "<tr>"
        topData += "<td>" + statistics.best_loyalty[i].first_name + " " + (statistics.best_loyalty[i].middle_name || "") + " " + statistics.best_loyalty[i].last_name + "</td>"
        topData += "<td>" + statistics.best_loyalty[i].total_votes + "</td>"
        topData += "<td>" + statistics.best_loyalty[i].votes_with_party_pct + "</td>"
        topData += "</tr>"
    }
    return topData
}
existenciaDeElement("most-loyalty-engaged", topTableLoyalty(statistics))


/*
function existenciaDeElement(elemento, imprimir) {
    if (document.getElementById(elemento)) {
        return document.getElementById(elemento).innerHTML = imprimir;
    }
}

function listsTable(){
    existenciaDeElement("least-engaged", bottomTable(statistics))
    existenciaDeElement("most-engaged", topTable(statistics))
    existenciaDeElement("least-loyalty-engaged", bottomTableLoyalty(statistics))
    existenciaDeElement("most-loyalty-engaged", topTableLoyalty(statistics))
}
listsTable()
*/