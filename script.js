const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
//const items = ['Ramiz Dayi','Kenan Birkan','Ezel Bayraktar','Sekiz'];
let items;

eventListener();

function eventListener(){
    form.addEventListener('submit',addNewItem);
    taskList.addEventListener('click',deleteAnItem);
    btnDeleteAll.addEventListener('click',deleteAllItem);
}

loadItems();
function loadItems(){
items.forEach(function(item){
    creatItem(item);
});
}

// get items from Local Storage
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to Local Storage
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

// delete item from LS
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);   
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}

function creatItem(text){
  // creat li element
  const li = document.createElement('li');
  li.className='list-group-item list-group-item-secondary';
  li.appendChild(document.createTextNode(text));

  // creat a element
  const a = document.createElement('a');
  a.classList = 'delete-item float-right';
  a.setAttribute('href','#');
  a.innerHTML= '<i class="fas fa-times"></i>';

  
  li.appendChild(a);

  taskList.appendChild(li);
}


function addNewItem(e){

    if(input.value===''){
        alert('Lutfen formu bos birakmayiniz.');
        e.preventDefault();
    }
    else{
    creatItem(input.value);
    // save to LS
    setItemToLS(input.value);
    input.value='';
    e.preventDefault(); // when will be submit it is not refresh page
}
}

function deleteAnItem(e){
    if(e.target.className==='fas fa-times'){
        if(confirm('Silmek istediginize emin misiniz ? ')){
             e.target.parentElement.parentElement.remove();

             // delete item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteAllItem(e){
    if(confirm('Hepsini silmek istediginize emin misiniz?')){
        taskList.innerHTML='';
        /*
        taskList.childNodes.forEach(function(item) {
            if(item.className==='list-group-item list-group-item-secondary'){
             item.remove();
             e.preventDefault();
            }        
            
    });
    */
    localStorage.clear();
}
e.preventDefault();
}