//define variables
let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');

let mode = 'create';
let tmp ;

//get total
 
function getTotal(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML= result; 
        total.style.background= '#040';
    }  else{
        total.innerHTML= ''; 
        total.style.background= '#a00d02';
    }

}


//save localStorage
let dataPro =[];
if (localStorage.product != null){
    dataPro= JSON.parse(localStorage.product);
} else {
    dataPro=[];
}


//create product

submit.onclick = function(){
    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value ,
        ads : ads.value ,
        discount : discount.value ,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    }
    
//count
    if(mode === 'create'){
        if(newPro.count > 1 ){
            for(let i = 0 ;i < newPro.count;i++ ){
                dataPro.push(newPro);
            }
        }else {
            dataPro.push(newPro);
        }
    }else {
        //edit array
        dataPro[tmp] = newPro;
        mode= 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';
    }
       





    
    localStorage.setItem('product', JSON.stringify(dataPro));
    //when we click on the create button we clear data in the form and show it in the buttom
    clearData();
    showData();
    }




// clear inputs
    function clearData(){
        title.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discount.value='';
        total.innerHTML='';
        count.value='';
        category.value='';
    
    }


//read

    function showData(){
        getTotal();
        let table ='';
        for(let i = 0 ; i < dataPro.length ; i++){
            table += `
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
        </tr>
            
            `
            
               }
//clean data
        document.getElementById('tbody').innerHTML = table;
        let btnDel = document.getElementById('deleteAll');

        if(dataPro.length > 0) {
            btnDel.innerHTML = `
            <button onclick="deleteAll()"> delete All (${dataPro.length}) </button>
            `
        }else {
            btnDel.innerHTML ='';
        }

    }
    showData();

//delete : delete an element from array
function deleteData(i) {
  dataPro.splice(i,1);
  localStorage.product = JSON.stringify(dataPro);// data will be delete but you will not see the effect ghir ki dir refech
  showData();

}
function deleteAll(){
    localStorage.clear;
    dataPro.splice(0);
    showData();
}

   

//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i]. taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display ='none'
    category.value = dataPro[i].category;    
    submit.innerHTML= 'Update';
    mode= 'update';
    tmp = i ;
    scroll({
        top:0,
        behavior: "smooth",
    })
}


//search
   //by title
   let searchMode= 'title';
   function getSearchMode (id){
    let search = document.getElementById('search');
    if (id =='searchTitle'){
        searchMode = 'title';
        search.placeholder = 'search by title';
    }else {
        searchMode = 'category';
        search.placeholder = 'search by category';
    }
    search.focus();
    search.value ='';
    showData();

   }

function searchData(value){
    let table ='';
    if ( searchMode == 'title'){
        for(let i = 0 ; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
            </tr>
                
                `;

            }

        }


    }else {
        for(let i = 0 ; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
            </tr>
                
                `;

            }

        }
    }
    document.getElementById('tbody').innerHTML = table;

}
// up button
let btnUP = document.getElementById('btnUP');
window.onscroll = function(){
    if(window.scrollY >=500 ){
        btnUP.style.display = 'block';

    }else {
        btnUP.style.display = 'none';
    }

};
btnUP.onclick = function(){
    window.scrollTo({

        left : 0,
        top :0,
        behavior : "smooth",
    });
};





