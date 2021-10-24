var statisticsHouse = {
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
    var arrayMembersHouse = dataHouse.results[0].members;

    var democrats = arrayMembersHouse.filter(array => array.party === "D")

    var republicans = arrayMembersHouse.filter(array => array.party === "R")

    var independt = arrayMembersHouse.filter(array => array.party === "I")

    statisticsHouse.democratas = democrats
    statisticsHouse.republican = republicans
    statisticsHouse.independents = independt
}
getMembersByParty(statisticsHouse.democratas);
getMembersByParty(statisticsHouse.republican);
getMembersByParty(statisticsHouse.independents);


for (let i = 0; i < statisticsHouse.republican.length; i++) {
    if (statisticsHouse.republican[i].votes_with_party_pct == undefined) {
        statisticsHouse.republican[i].votes_with_party_pct = 0
    }
}


function averageArray(array) {
    let sumatoriaArray = 0;
    for (var i = 0; i < array.length; i++) {
        sumatoriaArray += array[i].votes_with_party_pct
    }
    return sumatoriaArray / array.length
}

function getAverageByParty() {
    statisticsHouse.democrats_vote = averageArray(statisticsHouse.democratas)
    statisticsHouse.republicans_vote = averageArray(statisticsHouse.republican)
    statisticsHouse.independents_vote = averageArray(statisticsHouse.independents)
}

getAverageByParty(statisticsHouse.democrats_vote);
getAverageByParty(statisticsHouse.republicans_vote);
getAverageByParty(statisticsHouse.independents_vote);

function sliceMembers(array, quantity) {
    let element = [];
    for (let i = 0; i < quantity; i++) {
        element.push(array[i])
    }
    return element
}

function getBestListAttendance() {

    var arrayMembersHouse = dataHouse.results[0].members;
    let percent = arrayMembersHouse.length * 0.1;
    var arrayOrdenadoAttendance = arrayMembersHouse.sort(function (p1, p2) {
        return p1.missed_votes_pct - p2.missed_votes_pct;
    })

    statisticsHouse.best_attendace = sliceMembers(arrayOrdenadoAttendance, percent)
}
getBestListAttendance(statisticsHouse.best_attendace)


function getWorstListAttendance() {
    var arrayMembersHouse = dataHouse.results[0].members;
    let percent = arrayMembersHouse.length * 0.1;
    var arrayOrdenadoByAttendance = arrayMembersHouse.sort(function (p1, p2) {
        return p2.missed_votes_pct - p1.missed_votes_pct;
    })

    statisticsHouse.worst_attendance = sliceMembers(arrayOrdenadoByAttendance, percent)
}
getWorstListAttendance(statisticsHouse.worst_attendance)

function getBestListLoyalty() {
    var arrayMembersHouse = dataHouse.results[0].members;
    let percent = arrayMembersHouse.length * 0.1;
    var arrayOrdenadoBestLoyalty = arrayMembersHouse.sort(function (p1, p2) {
        return p2.votes_with_party_pct - p1.votes_with_party_pct;
    })
    statisticsHouse.best_loyalty = sliceMembers(arrayOrdenadoBestLoyalty, percent)
}
getBestListLoyalty(statisticsHouse.best_loyalty)


function getListWorstLoyalty() {
    var arrayMembersHouse = dataHouse.results[0].members;
    let percent = arrayMembersHouse.length * 0.1;
    var arrayOrdenadoLoyalty = arrayMembersHouse.sort(function (p1, p2) {
        return p1.votes_with_party_pct - p2.votes_with_party_pct;
    })

    statisticsHouse.worst_loyalty = sliceMembers(arrayOrdenadoLoyalty, percent)
}
getListWorstLoyalty(statisticsHouse.worst_loyalty)

function htmlTable() {
    document.getElementById("num-of-republicans-house").innerHTML = statisticsHouse.republican.length;
    document.getElementById("num-of-democrats-house").innerHTML = statisticsHouse.democratas.length;
    document.getElementById("num-of-independents-house").innerHTML = statisticsHouse.independents.length;
    document.getElementById("repu-party-house-voted").innerHTML = statisticsHouse.republicans_vote;
    document.getElementById("demo-party-house-voted").innerHTML = statisticsHouse.democrats_vote;
    document.getElementById("inde-party-house-voted").innerHTML = statisticsHouse.independents_vote;
    document.getElementById("total-of-members-house").innerHTML = statisticsHouse.democratas.length + statisticsHouse.republican.length + statisticsHouse.independents.length;
    document.getElementById("total-percent-members-house").innerHTML = (statisticsHouse.democrats_vote + statisticsHouse.republican.length + statisticsHouse.independents_vote) / 3;
}
htmlTable()

function bottomTableHouse() {

    var bottomDataHouse = "";
    for (var i = 0; i < statisticsHouse.worst_attendance.length; i++) {
        bottomDataHouse += "<tr>"
        bottomDataHouse += "<td>" + statisticsHouse.worst_attendance[i].first_name + " " + (statisticsHouse.worst_attendance[i].middle_name || "") + " " + statisticsHouse.worst_attendance[i].last_name + "</td>"
        bottomDataHouse += "<td>" + statisticsHouse.worst_attendance[i].missed_votes + "</td>"
        bottomDataHouse += "<td>" + statisticsHouse.worst_attendance[i].missed_votes_pct + "</td>"
        bottomDataHouse += "</tr>"
    }
    return bottomDataHouse
}
bottomTableHouse()

function topTableHouse() {
    var topDataHouse = "";
    for (var i = 0; i < statisticsHouse.best_attendace.length; i++) {
        topDataHouse += "<tr>"
        topDataHouse += "<td>" + statisticsHouse.best_attendace[i].first_name + " " + (statisticsHouse.best_attendace[i].middle_name || "") + " " + statisticsHouse.best_attendace[i].last_name + "</td>"
        topDataHouse += "<td>" + statisticsHouse.best_attendace[i].missed_votes + "</td>"
        topDataHouse += "<td>" + statisticsHouse.best_attendace[i].missed_votes_pct + "</td>"
        topDataHouse += "</tr>"
    }
    return topDataHouse
}


function bottomTableLoyaltyHouse() {
    var bottomLoyaltyHouse = "";
    for (var i = 0; i < statisticsHouse.worst_loyalty.length; i++) {
        bottomLoyaltyHouse += "<tr>"
        bottomLoyaltyHouse += "<td>" + statisticsHouse.worst_loyalty[i].first_name + " " + (statisticsHouse.worst_loyalty[i].middle_name || "") + " " + statisticsHouse.worst_loyalty[i].last_name + "</td>"
        bottomLoyaltyHouse += "<td>" + statisticsHouse.worst_loyalty[i].total_votes + "</td>"
        bottomLoyaltyHouse += "<td>" + statisticsHouse.worst_loyalty[i].votes_with_party_pct + "</td>"
        bottomLoyaltyHouse += "</tr>"
    }
    return bottomLoyaltyHouse
}

function topTableLoyaltyHouse() {
    var topDataHouse = "";
    for (var i = 0; i < statisticsHouse.best_loyalty.length; i++) {
        topDataHouse += "<tr>"
        topDataHouse += "<td>" + statisticsHouse.best_loyalty[i].first_name + " " + (statisticsHouse.best_loyalty[i].middle_name || "") + " " + statisticsHouse.best_loyalty[i].last_name + "</td>"
        topDataHouse += "<td>" + statisticsHouse.best_loyalty[i].total_votes + "</td>"
        topDataHouse += "<td>" + statisticsHouse.best_loyalty[i].votes_with_party_pct + "</td>"
        topDataHouse += "</tr>"
    }
    return topDataHouse
}

function existenciaDeElement(elemento, imprimir) {
    if (document.getElementById(elemento)) {
        return document.getElementById(elemento).innerHTML = imprimir;
    }
}

function existenceTable() {
    existenciaDeElement("least-engaged-house", bottomTableHouse(statisticsHouse));
    existenciaDeElement("most-engaged-house", topTableHouse(statisticsHouse));
    existenciaDeElement("house-least-loyalty-engaged", bottomTableLoyaltyHouse(statisticsHouse));
    existenciaDeElement("house-most-loyalty-engaged", topTableLoyaltyHouse(statisticsHouse));
    
}
existenceTable()