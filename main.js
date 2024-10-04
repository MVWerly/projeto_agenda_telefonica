const form = document.getElementById('form-contact');
const tableBody = document.querySelector('tbody');
const contactName = document.getElementById('name');
const contactNumber = document.getElementById('phone-number');
const contact =  {
    contactName: [],
    contactNumber:[],
    id: [],
};

// function
function saveContactName(tableTR){
    const tableTD = document.createElement('td');
    
    tableTD.innerHTML = contactName.value;
    tableTR.appendChild(tableTD); 
    tableBody.appendChild(tableTR);

    contact.contactName.push(contactName.value);
};

function saveContactNumber(tableTR){
    const tableTD = document.createElement('td');
    
    tableTD.innerHTML = contactNumber.value;
    tableTR.appendChild(tableTD); 
    tableBody.appendChild(tableTR);

    contact.contactNumber.push(contactNumber.value);
};

function createBtns(tableTR){
    const tableTD = document.createElement('td');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const id = createId();
    contact.id.push(id);

    deleteBtn.classList.add('delete');
    deleteBtn.id = id;

    editBtn.classList.add('edit');
    editBtn.id = id;

    deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
    editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';

    tableTD.appendChild(deleteBtn);
    tableTD.appendChild(editBtn);
    tableTR.appendChild(tableTD);
    tableBody.appendChild(tableTR);
};

function createId(){
    const id = parseInt(Math.random() * 1000);

    return id;
};

function sweepArray(e){
    const elementIndex = contact.id.findIndex(checkId);

    function checkId(element) {
        return element === parseInt(e.target.id);
    };

    return elementIndex;
};

// event
form.addEventListener('submit', function(e){
    e.preventDefault();

    if(contact.contactName.includes(contactName.value)&(contact.contactNumber.includes(contactNumber.value))){
        alert(`O contato - ${contactName.value} com o tel: ${contactNumber.value} já está incluso na agenda.`)
    }else{
    
    const tableTR = document.createElement('tr');

    saveContactName(tableTR);
    saveContactNumber(tableTR);
    createBtns(tableTR);

    contactName.value = '';
    contactNumber.value = '';
    contactName.focus();
    };
});

document.addEventListener('click', function(e){
    const targetE = e.target;
    const parentE = targetE.closest('tr');

    if(targetE.classList.contains('delete')){
        const idIndex = sweepArray(e);

        contact.contactName.splice(idIndex, 1);
        contact.contactNumber.splice(idIndex, 1);
        contact.id.splice(idIndex, 1);
        
        parentE.remove();
    };

    if(targetE.classList.contains('edit')){
        const idIndex = sweepArray(e);

        contactName.value = contact.contactName[idIndex];
        contactNumber.value = contact.contactNumber[idIndex];

        contact.contactName.splice(idIndex, 1);
        contact.contactNumber.splice(idIndex, 1);
        contact.id.splice(idIndex, 1);

        parentE.remove();
    };
});




