const senateTitle= document.getElementById("senate")

var congress= (senateTitle)?"senate":"house";
fetch(`https://api.propublica.org/congress/v1/113/${congress}/members.json`, {
        headers: {
            "X-API-Key": "etSVkECEsURjqfK6HreUfrW8Jm3UCdBtTfrLZ5Up"
        }
    })
    .then(page => page.json())
    .then(object => {
        appstatistics.estadisticas = object.results[0].members;
        getMembersByParty(),
            getAverageByParty(),
            getWorstListAttendance(),
            getBestListAttendance(),
            getListWorstLoyalty(),
            getBestListLoyalty(),
            listsTable()
    })

var appstatistics = new Vue({
    el: '#appstatistics',
    data: {
        estadisticas: [],
        statistics: {
            democratas: [],
            republican: [],
            independents: [],
            democrats_vote: 0,
            republicans_vote: 0,
            independents_vote: 0,
            best_attendace: [],
            worst_attendance: [],
            best_loyalty: [],
            worst_loyalty: []
        }
    }
})

function getMembersByParty() {
    var arrayMembers = appstatistics.estadisticas;
    var democrats = arrayMembers.filter(array => array.party === "D");
    appstatistics.statistics.democratas = democrats;
    var republicans = arrayMembers.filter(array => array.party === "R");
    appstatistics.statistics.republican = republicans;
    var independt = arrayMembers.filter(array => array.party === "ID");
    appstatistics.statistics.independents = independt;
}



function averageArray(array) {
    let sumatoriaArray = 0;
    for (var i = 0; i < array.length; i++) {
        sumatoriaArray += array[i].votes_with_party_pct
    }
    return sumatoriaArray / array.length
}

function getAverageByParty() {
    appstatistics.statistics.democrats_vote = averageArray(appstatistics.statistics.democratas)
    appstatistics.statistics.republicans_vote = averageArray(appstatistics.statistics.republican)
    appstatistics.statistics.independents_vote = averageArray(appstatistics.statistics.independents)
}


function sliceMembers(array, quantity) {
    let element = [];
    for (let i = 0; i < quantity; i++) {
        element.push(array[i])
    }
    return element
}

function getBestListAttendance() {
    var arrayMembers = appstatistics.estadisticas;
    let percent = arrayMembers.length * 0.1;
    var arrayOrdenadoAttendance = arrayMembers.sort(function (p1, p2) {
        return p1.missed_votes_pct - p2.missed_votes_pct;
    })

    appstatistics.statistics.best_attendace = sliceMembers(arrayOrdenadoAttendance, percent)
}
/*getBestListAttendance(statistics.best_attendace)*/

function getWorstListAttendance() {
    var arrayMembers = appstatistics.estadisticas;
    let percent = arrayMembers.length * 0.1;
    var arrayOrdenadoByAttendance = arrayMembers.sort(function (p1, p2) {
        return p2.missed_votes_pct - p1.missed_votes_pct;
    })

    appstatistics.statistics.worst_attendance = sliceMembers(arrayOrdenadoByAttendance, percent)
}
/*getWorstListAttendance(statistics.worst_attendance)*/

function getBestListLoyalty() {
    var arrayMembers = appstatistics.estadisticas;
    let percent = arrayMembers.length * 0.1;
    var arrayOrdenadoBestLoyalty = arrayMembers.sort(function (p1, p2) {
        return p2.votes_with_party_pct - p1.votes_with_party_pct;
    })

    appstatistics.statistics.best_loyalty = sliceMembers(arrayOrdenadoBestLoyalty, percent)
}
/*getBestListLoyalty(statistics.best_loyalty)*/

function getListWorstLoyalty() {
    var arrayMembers = appstatistics.estadisticas;
    let percent = arrayMembers.length * 0.1;
    var arrayOrdenadoLoyalty = arrayMembers.sort(function (p1, p2) {
        return p1.votes_with_party_pct - p2.votes_with_party_pct;
    })

    appstatistics.statistics.worst_loyalty = sliceMembers(arrayOrdenadoLoyalty, percent)
}
/*getListWorstLoyalty(statistics.worst_loyalty)*/

function existenciaDeElement(elemento, imprimir) {
    if (document.getElementById(elemento)) {
        return imprimir;
    }
}

function listsTable() {
    existenciaDeElement("least-engaged", appstatistics.statistics.worst_attendance);
    existenciaDeElement("most-engaged", appstatistics.statistics.best_attendace);
    existenciaDeElement("least-loyalty-engaged", appstatistics.statistics.worst_loyalty);
    existenciaDeElement("most-loyalty-engaged", appstatistics.statistics.best_loyalty)
}



/*

function existenciaDeElement(elemento, imprimir) {
    if (document.getElementById(elemento)) {
        return  imprimir;
    }


function listsTable(){
    existenciaDeElement("least-engaged", getWorstListAttendance())
    existenciaDeElement("most-engaged", getBestListAttendance())
    existenciaDeElement("least-loyalty-engaged", bottomTableLoyalty(statistics))
    existenciaDeElement("most-loyalty-engaged", topTableLoyalty(statistics))
}
listsTable()
*/