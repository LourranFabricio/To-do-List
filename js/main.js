import { Card } from "./card.js";
//Variables
let counter = 0;
const btn = document.querySelector('#submit-task');
const inputText = document.getElementById('input-task');
const select = document.getElementById('type-task');
const inputDate = document.getElementById('date-task');

const workSection = document.getElementById('work-task');
const studySection = document.getElementById('study-task');
const homeSection = document.getElementById('home-task');
const leisureSection = document.getElementById('leisure-task');
//Variables

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    let text = inputText.value;
    let type = select.options[select.selectedIndex].value;
    let date = inputDate.value;
    verifyInputs(text);
    verifyInputs(type);
    verifyInputs(date);
    if(counter === 3){
        movingTask(type,text,date);
        clearInput();
        counter = 0;
    }
    else counter = 0;

})

let alertCounter = 0;
function verifyInputs(value){
    if(value === "" || value === 'undefined' || value === null){
        if(alertCounter === 0){
            alert('Preencha todos os campos');
            alertCounter = 1;
        }
    }
    else counter++;
}


//This function will clear the value on input
function clearInput(){
    inputText.value = '';
    select.value = '';
    inputDate.value ='';
}

//This function will move the cards for right column
function movingTask(type,text,date){
    if(type == "work"){
        new Card(text,date).createCard(workSection);
        saveTasks('work');
    }
    else if(type == "study"){
        new Card(text,date).createCard(studySection);
        saveTasks('study');
    }
    else if(type == "home"){
        new Card(text,date).createCard(homeSection);
        saveTasks('home');
    }
    else if(type=="leisure"){
        new Card(text,date).createCard(leisureSection);
        saveTasks('leisure');
    }
}

//Event for buttons on the card
document.addEventListener('click', (e)=>{
    let click = e.target;
    deleteCard(click);
    checkCard(click);
    editCard(click);
});

//This function will verify if a butoon had class delete, and will delete the parent
function deleteCard(click){
    if(click.classList.contains('delete-btn')){
        let key = verifyCard(click);
        click = click.parentElement;
        click.parentElement.remove();
        //In this part, we will get the section task
        if(key === "work-task") saveTasks('work');
        else if(key === "study-task") saveTasks('study');
        else if(key === "home-task") saveTasks('home');
        else if(key === "leisure-task") saveTasks('leisure');
    }
}

//This function will get the key for delete task in local storage
function verifyCard(click){
    for(let i=0; i<3;i++){
        click = click.parentElement;
    }
    let key = (click.id);
    return key;
}

//This function will check if a button has clicked
function checkCard(click){
    if(click.classList.contains('check-btn')){
        let key = verifyCard(click);  //Will verify what's section
        //This part will veirfy if inputID value is valid to check or uncheck card
        let inputID = click.parentElement;
        inputID = inputID.parentElement;
        inputID = inputID.children;

        // Will see if was checked
        if(inputID[2].value === '0') cardChecked(click);
        // Will see if was uhecked
        else cardUncheked(click);

        //This part will update the IDinput
        if(key === "work-task") saveTasks('work');
        else if(key === "study-task") saveTasks('study');
        else if(key === "home-task") saveTasks('home');
        else if(key === "leisure-task") saveTasks('leisure');
    }

}

function cardChecked(click){
    let btnList = []; //Array with buttons of card
    click = click.parentElement;
    const child = click.children; //Send a nodeList with buttons of card
    for(let value of child){
        btnList.push(value.classList.add('card-check-btn')); //This part will personalize buttons
    }
    click = click.parentElement; //Get a div card
    click.classList.remove('card');
    click.classList.add('check-card'); //Edit card div

    //This part will change input attributes and values
    let inputList = click.children;
    inputList[0].classList.add('card-check-input'); //Text input of card
    inputList[1].classList.add('card-check-date'); //Date input of card
    inputList[2].value = '1';
}

function cardUncheked(click){
    let btnList = [];
    click = click.parentElement;
    const child = click.children; //Send a nodeList with buutons of card
    for(let value of child){
        btnList.push(value.classList.remove('card-check-btn'));
    }
    click = click.parentElement; //Get a div card
    click.classList.remove('check-card');
    click.classList.add('card');

    //This part will change input attributes and values
    let inputList = click.children; //Get all elements of a card div
    inputList[0].classList.remove('card-check-input'); //Text input of card
    inputList[1].classList.remove('card-check-date'); //Date input of card
    inputList[2].value = '0';
}



//This function will enable the inputs of card
let countEdit = 0;
function editCard(click){
    let key = verifyCard(click);
    let div = click.parentElement;
    div = div.parentElement; //Get the card div tag
    let inputs = div.children;
    let text = inputs[0];
    let date = inputs[1];

    if(click.classList.contains('edit-btn') && countEdit===0){
            text.disabled = false;
            date.disabled = false;
            countEdit = 1;
    }
    else if(click.classList.contains('edit-btn') && countEdit===1){
        text.disabled = true;
        date.disabled = true;
        countEdit = 0;
    }

    if(key === "work-task") saveTasks('work');
    else if(key === "study-task") saveTasks('study');
    else if(key === "home-task") saveTasks('home');
    else if(key === "leisure-task") saveTasks('leisure');

}

//Local storage

//This functyion will verify the key and save the input values in localStorage
function saveTasks(key){
    if(key === 'work'){
        const listWork = workSection.querySelectorAll('input');
        const listInputWork = [];
        for(let i of listWork){
            listInputWork.push(i.value);
        }
        const dataWorkJSON = JSON.stringify(listInputWork);
        localStorage.setItem('dataWork', dataWorkJSON);
    }
    else if(key ==='study'){
        const listStudy = studySection.querySelectorAll('input');
        const listInputStudy = [];
        for(let i of listStudy){
            listInputStudy.push(i.value);
        }
        const dataStudyJSON = JSON.stringify(listInputStudy);
        localStorage.setItem('dataStudy', dataStudyJSON);
    }
    else if(key ==='home'){
        const listHome = homeSection.querySelectorAll('input');
        const listInputHome = [];
        for(let i of listHome){
            listInputHome.push(i.value);
        }
        const dataHomeJSON = JSON.stringify(listInputHome);
        localStorage.setItem('dataHome', dataHomeJSON);
    }
    else if(key ==='leisure'){
        const listLeisure = leisureSection.querySelectorAll('input');
        const listInputLeisure = [];
        for(let i of listLeisure){
            listInputLeisure.push(i.value);
        }
        const dataLeisureJSON = JSON.stringify(listInputLeisure);
        localStorage.setItem('dataLeisure', dataLeisureJSON);
    }
}

function addSavedTasks(){
    //Task work
    const dataWork = localStorage.getItem('dataWork');
    const listTaskWork = JSON.parse(dataWork); //Change a string Json to string
    const arrayWorkText = separateArrayText(listTaskWork);
    const arrayWorkDate = separateArrayDate(listTaskWork);
    const arrayWorkID = separateArrayID(listTaskWork);
    //Task study
    const dataStudy = localStorage.getItem('dataStudy');
    const listTaskStudy = JSON.parse(dataStudy); //Change a string Json to string
    const arrayStudyText = separateArrayText(listTaskStudy);
    const arrayStudyDate = separateArrayDate(listTaskStudy);
    const arrayStudyID = separateArrayID(listTaskStudy);
    //Task Home
    const dataHome = localStorage.getItem('dataHome');
    const listTaskHome = JSON.parse(dataHome); //Change a string Json to string
    const arrayHomeText = separateArrayText(listTaskHome);
    const arrayHomeDate = separateArrayDate(listTaskHome);
    const arrayHomeID = separateArrayID(listTaskHome);
    //Task Leisure
    const dataLeisure = localStorage.getItem('dataLeisure');
    const listTaskLeisure = JSON.parse(dataLeisure); //Change a string Json to string
    const arrayLeisureText = separateArrayText(listTaskLeisure);
    const arrayLeisureDate = separateArrayDate(listTaskLeisure);
    const arrayLeisureID = separateArrayID(listTaskLeisure);

    let j = 2; //Iterable value
    let cards;
    //Will divide by 3 because we have 3 values per card
    for(let i = 0; i < (listTaskWork.length/3); i++){
        new Card(arrayWorkText[i],arrayWorkDate[i]).createCard(workSection);
        cards = workSection.querySelectorAll('div'); 
        let btn2 = (cards[j].children);//Get the btn edit 
        if(arrayWorkID[i] === '1'){ //Verify if a card was checked
            cardChecked(btn2[0]);
        }
        else{
            cardUncheked(btn2[0]);
        }
        j+=2;
    }

    //Iterable value
    let k = 2;
    for(let i = 0; i < (listTaskStudy.length/3); i++){
        new Card(arrayStudyText[i],arrayStudyDate[i]).createCard(studySection);
        cards = studySection.querySelectorAll('div'); 
        let btn2 = (cards[k].children);//Get the btn edit 
        if(arrayStudyID[i] === '1'){ //Verify if a card was checked
            cardChecked(btn2[0]);
        }
        else{
            cardUncheked(btn2[0]);
        }
        k+=2;
    }

    //Iterable value
    let l = 2;
    for(let i = 0; i < (listTaskHome.length/3); i++){
        new Card(arrayHomeText[i],arrayHomeDate[i]).createCard(homeSection);
        cards = homeSection.querySelectorAll('div'); 
        let btn2 = (cards[l].children);//Get the btn edit 
        if(arrayHomeID[i] === '1'){ //Verify if a card was checked
            cardChecked(btn2[0]);
        }
        else{
            cardUncheked(btn2[0]);
        }
        l+=2;
    }

    //Iterable value
    let m = 2;
    for(let i = 0; i < (listTaskLeisure.length/3); i++){
        new Card(arrayLeisureText[i],arrayLeisureDate[i]).createCard(leisureSection);
        cards = leisureSection.querySelectorAll('div'); 
        let btn2 = (cards[m].children);//Get the btn edit 
        if(arrayLeisureID[i] === '1'){ //Verify if a card was checked
            cardChecked(btn2[0]);
        }
        else{
            cardUncheked(btn2[0]);
        }
        m+=2;
    }

}

function separateArrayText(array){
    let arrayText = [];
    if(array.length == 0) return arrayText;
    else{
        for(let i = 0; i < array.length; i++){
            arrayText.push(array[i]);
            i+=2;
        }
    }
    return arrayText;
}

function separateArrayDate(array){
    let arrayDate = [];
    if(array.length == 0) return arrayDate;
    else{
        for(let i = 1; i < array.length; i++){
            arrayDate.push(array[i]);
            i+=2;
        }
    }
    return arrayDate;
}

function separateArrayID(array){
    let arrayID = [];
    if(array.length == 0) return arrayID;
    else {
            for(let i = 2; i < array.length; i++){
                arrayID.push(array[i]);
                i+=2;
        }
    }
    return arrayID;
}

window.addEventListener('load', e=>{
    addSavedTasks();
})