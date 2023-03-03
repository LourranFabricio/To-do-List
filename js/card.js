export class Card{
    constructor(name, date){
        this.name = name;
        this.date = date;
    }

    createCard(section){
        const div = this.createDiv();
        const inputText = this.createTextInput();
        const inputDate = this.createDataInput();
        const inputID = this.createIdInput();
        const divBtn = this.createDivBtn();
        const editBtn = this.createEditBtn();
        const deleteBtn = this.createDeleteBtn();
        const checkBtn = this.createCheckBtn();
        section = this.append(div,inputText,inputDate,inputID,divBtn,editBtn,deleteBtn,checkBtn,section);
    }
    
    createDiv(){
        let div = document.createElement('div');
        div.classList.add('card');
        return div;
    }

    createTextInput(){
        let input = document.createElement('input');
        input.classList.add('input-card');
        input.disabled = true;
        input.value = this.name;
        return input;
    }

    createDataInput(){
        let input = document.createElement('input');
        input.classList.add('input-date-card');
        input.setAttribute('type', 'date');
        input.disabled = true;
        input.value = this.date;
        return input;
    }
    
    createIdInput(){
        let input = document.createElement('input');
        input.style.display = 'none';
        //input.disabled = true;
        input.value = '0';
        return input;
    }

    createEditBtn(){
        let btn = document.createElement('button');
        btn.classList.add('edit-btn');
        btn.classList.add('card-btn');
        let i = document.createElement('i');
        btn.classList.add('fa-solid');
        btn.classList.add('fa-pen');
        return btn;
    }

    createDeleteBtn(){
        let btn = document.createElement('button');
        btn.classList.add('delete-btn');
        btn.classList.add('card-btn');
        let i = document.createElement('i');
        btn.classList.add('fa-solid');
        btn.classList.add('fa-trash');
        return btn;
        
    }

    createCheckBtn(){
        let btn = document.createElement('button');
        btn.classList.add('check-btn');
        btn.classList.add('card-btn');
        let i = document.createElement('i');
        btn.classList.add('fa-solid');
        btn.classList.add('fa-check');
        return btn;
    }

    createDivBtn(){
        let div = document.createElement('div');
        div.classList.add('div-btn');
        return div;
    }
    append(div,inputText,inputDate,inputID,divBtn,editBtn,deleteBtn,checkBtn,section){
        div.appendChild(inputText);
        div.appendChild(inputDate);
        div.appendChild(inputID);
        divBtn.appendChild(editBtn);
        divBtn.appendChild(deleteBtn);
        divBtn.appendChild(checkBtn);
        div.appendChild(divBtn);
        section.appendChild(div);
        return section;
    }
}
