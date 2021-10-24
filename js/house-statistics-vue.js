fetch('https://api.propublica.org/congress/v1/113/house/members.json', {
        headers: {
            "X-API-Key": "etSVkECEsURjqfK6HreUfrW8Jm3UCdBtTfrLZ5Up"
        }
    })
    .then(pagina => pagina.json())
    .then(objeto => {
        let newObject = objeto.results[0].members;
        app.presentes = newObject
        console.log(app.presentes),
        getMembersByParty(),
        withoutUndefined (),
        getAverageByParty(),
        getBestListAttendance(),
        getWorstListAttendance(),
        getBestListLoyalty(),
        getListWorstLoyalty(),
        listsTable()
    })


var app = new Vue({
    el: '#app',
    data: {
        presentes: [],
        statisticsHouse: {
            democratas: [],
            republican: [],
            independents: [],
            democrats_vote: 0,
            republicans_vote: 0,
            independents_vote: 0,
            best_attendance: 0,
            worst_attendance: 0,
            best_loyalty: 0,
            worst_loyalty: 0
        }
    }
})



function getMembersByParty() {
    var arrayMembersHouse = app.presentes;
    
    var democrats = arrayMembersHouse.filter(array => array.party === "D")
    app.statisticsHouse.democratas = democrats;
    var republicans = arrayMembersHouse.filter(array => array.party === "R")
    app.statisticsHouse.republican = republicans;
    var independt = arrayMembersHouse.filter(array => array.party === "I")
    app.statisticsHouse.independents = independt;
}


function withoutUndefined (){
    for (let i = 0; i < app.statisticsHouse.republican.length; i++) {
        if (app.statisticsHouse.republican[i].votes_with_party_pct == undefined) {
            return app.statisticsHouse.republican[i].votes_with_party_pct = 0
        }
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
    app.statisticsHouse.democrats_vote = averageArray(app.statisticsHouse.democratas)
    app.statisticsHouse.republicans_vote = averageArray(app.statisticsHouse.republican)
    app.statisticsHouse.independents_vote = averageArray(app.statisticsHouse.independents)
}




function sliceMembers(array, quantity) {
    let element = [];
    for (let i = 0; i < quantity; i++) {
        element.push(array[i])
    }
    return element
}

function getBestListAttendance() {

    var arrayMembersHouse = app.presentes;
    let percent = arrayMembersHouse.length * 0.1;
    var arrayOrdenadoAttendance = arrayMembersHouse.sort(function (p1, p2) {
        return p1.missed_votes_pct - p2.missed_votes_pct;
    })

    app.statisticsHouse.best_attendance = sliceMembers(arrayOrdenadoAttendance, percent)
}
/*getBestListAttendance(statisticsHouse.best_attendance)*/


function getWorstListAttendance() {
    var arrayMembersHouse = app.presentes;
    let percent = arrayMembersHouse.length * 0.1;
    var arrayOrdenadoByAttendance = arrayMembersHouse.sort(function (p1, p2) {
        return p2.missed_votes_pct - p1.missed_votes_pct;
    })

    app.statisticsHouse.worst_attendance = sliceMembers(arrayOrdenadoByAttendance, percent)
}
/*getWorstListAttendance(statisticsHouse.worst_attendance)*/

function getBestListLoyalty() {
    var arrayMembersHouse = app.presentes;
    let percent = arrayMembersHouse.length * 0.1;
    var arrayOrdenadoBestLoyalty = arrayMembersHouse.sort(function (p1, p2) {
        return p2.votes_with_party_pct - p1.votes_with_party_pct;
    })
    app.statisticsHouse.best_loyalty = sliceMembers(arrayOrdenadoBestLoyalty, percent)
}
/*getBestListLoyalty(statisticsHouse.best_loyalty)*/


function getListWorstLoyalty() {
    var arrayMembersHouse = app.presentes;
    let percent = arrayMembersHouse.length * 0.1;
    var arrayOrdenadoLoyalty = arrayMembersHouse.sort(function (p1, p2) {
        return p1.votes_with_party_pct - p2.votes_with_party_pct;
    })

    app.statisticsHouse.worst_loyalty = sliceMembers(arrayOrdenadoLoyalty, percent)
}
/*getListWorstLoyalty(statisticsHouse.worst_loyalty)*/

function existenciaDeElement(elemento, imprimir) {
    if (document.getElementById(elemento)) {
        return imprimir;
    }
}

function listsTable() {
    existenciaDeElement("least-engaged-house", appstatistics.statistics.worst_attendance);
    existenciaDeElement("most-engaged-house", appstatistics.statistics.best_attendace);
    existenciaDeElement("house-least-loyalty-engaged", appstatistics.statistics.worst_loyalty);
    existenciaDeElement("house-most-loyalty-engaged", appstatistics.statistics.best_loyalty)
}



/*
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
*/