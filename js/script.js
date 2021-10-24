const senate = document.getElementById('senate');
const url = senate ? 'senate' : 'house';

fetch(`https://api.propublica.org/congress/v1/116/${url}/members.json`, {
        headers: {
            "X-API-Key": "etSVkECEsURjqfK6HreUfrW8Jm3UCdBtTfrLZ5Up"
        }
    })
    .then(page => page.json())
    .then(data => {
        congressMembers = data.results[0].members;
        //drowTableContent(congressMembers)
        iterateMenu();
        filterListStates();
        eachMember();
    })


//Declare variables
let congressMembers = [];
const buttonRead=document.getElementById('buttonRead');
var selectState = document.querySelector("#selectListStates");
var dataTable = document.querySelector('#dataMembers');
var nameValuesNodeList = document.getElementsByName("members");
var nameValuesArrayFrom = Array.from(nameValuesNodeList);
var inputvalueD = nameValuesArrayFrom[0];
var inputvalueR = nameValuesArrayFrom[1];
var inputvalueId = nameValuesArrayFrom[2]



const states = [];

//Push to states
function iterateMenu() {
    const repeatedStates = congressMembers.map((member) => member.state);
    for (let i = 0; i < repeatedStates.length; i++) {
        if (!states.includes(repeatedStates[i])) {
            states.push(repeatedStates[i])
        }
    }
}

//Filter List
function filterListStates() {
    if(dataTable){
        states.sort();
        selectState.innerHTML = `<option value='all' selected> All states </option>`
    
        function printedDropdown(array) {
            array.forEach((state) => {
                selectState.innerHTML += `<option value=${state}>  ${state}  </option>`
            })
        }
        printedDropdown(states);
    }
    
}

//Drow array
function drowTableContent(array) {
    dataTable.innerHTML = "";
    array.forEach((member) => {
        dataTable.innerHTML += `
        <tr>
            <td>${member.first_name} ${(member.middle_name || "")} ${member.last_name}</td>
            <td>${member.party}</td>
            <td>${member.state}</td>
            <td>${member.seniority}</td>
            <td>${member.votes_with_party_pct}</td>
        </tr>`;
    });
}

function eachMember() {
    if(dataTable){
        if(inputvalueD.checked  && inputvalueR.checked  && inputvalueId.checked  && selectState.value =='all' ){
            drowTableContent(congressMembers)
        }else if(selectState.value == 'all' && inputvalueR.checked && !inputvalueId.checked && !inputvalueD.checked){
            drowTableContent(filterData(congressMembers))
        }else if(selectState.value == 'all' && inputvalueD.checked && !inputvalueId.checked && !inputvalueR.checked){
            drowTableContent(filterData(congressMembers))
        }else if(selectState.value == 'all' && inputvalueId.checked && !inputvalueR.checked && !inputvalueD.checked){
            drowTableContent(filterData(congressMembers))
        }else if(selectState.value == 'all' && inputvalueId.checked && inputvalueR.checked && !inputvalueD.checked){
            drowTableContent(filterData(congressMembers))
        }else if(selectState.value == 'all' && inputvalueId.checked && !inputvalueR.checked && inputvalueD.checked){
            drowTableContent(filterData(congressMembers))
        }else if(selectState.value == 'all' && inputvalueD.checked && inputvalueR.checked && !inputvalueId.checked){
            drowTableContent(filterData(congressMembers))
        }else if(selectState.value == 'all' && inputvalueD.checked && !inputvalueR.checked && inputvalueId.checked){
            drowTableContent(filterData(congressMembers))
        }else if(selectState.value == 'all' && inputvalueR.checked && inputvalueD.checked && !inputvalueId.checked){
            drowTableContent(filterData(congressMembers))
        }else if(selectState.value == 'all' && inputvalueR.checked && !inputvalueD.checked && inputvalueId.checked){
            drowTableContent(filterData(congressMembers))
        }else if(selectState.value == 'all' && !inputvalueR.checked && !inputvalueD.checked && !inputvalueId.checked){
            drowTableContent(filterData([]))
        } else if (selectState.value != 'all' || inputvalueD.checked && "D" || inputvalueR.checked && "R" || inputvalueId.checked && "ID") {
            let filterStates = filterState(filterData(congressMembers))
           
            drowTableContent(filterStates)
        } 
    
        function filterData(array) {
            let memberData = array.filter((member) => member.party == "D" && inputvalueD.checked || member.party == "R" && inputvalueR.checked || member.party == "ID" && inputvalueId.checked )
            
            return memberData
        };
    
        function filterState(array) {
            let memberState = array.filter((member) => member.state == selectState.value)
            return memberState
        };
    }
    
}
function changeMoretoLessButton(){
    if(buttonRead ){
        buttonRead.innerText== 'Read more'?buttonRead.innerText='Read less':buttonRead.innerText='Read more'
    }
}