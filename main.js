let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let search = document.getElementById("search");
let create = document.getElementById("create");
let searchByTitle = document.getElementById("searchByTitle");
let searchByCategory = document.getElementById("searchByCategory");
let deleteall = document.getElementById("deletall");
let tmp;
let mood = 'create';
//get total








function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = (`  ${result}`);
        if (result < 0) { total.innerHTML = (`error`), total.style.background = "black"; }
        else { total.style.background = "green"; }

    }
    else { total.innerHTML = '', total.style.background = "#009688"; }
}


//create product

let createData = [];

if (localStorage.product != null) { createData = JSON.parse(localStorage.product); }

create.onclick = function () {
    let objcreate = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    };
    if (title.value && price.value && category.value != '' && objcreate.count <= 100) {
        if (mood === 'create') {
            createData.push(objcreate);
            if (objcreate.count > 0) { for (let i = 1; i < objcreate.count; i++) { createData.push(objcreate); } }
        } else if (mood === 'update') {
            createData[tmp] = objcreate;
            count.classList.remove('display');
            create.value = 'create';
        } clearDate();
    }
    if (category.value == '') { category.focus(); }
    if (price.value == '') { price.focus(); }
    if (title.value == '') { title.focus(); }

    localStorage.setItem('product', JSON.stringify(createData));

    readDate();
    getTotal();



};



//clear inputs

function clearDate() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';
}

// read

function readDate() {
    let tabel = '';


    for (let i = 0; i < createData.length; i++) {
        tabel += `
        <tr >
                <td>${i + 1}</td>
                <td>${createData[i].title}</td>
                <td>${createData[i].price}</td>
                <td>${createData[i].taxes}</td>
                <td>${createData[i].ads}</td>
                <td>${createData[i].discount}</td>
                <td style="color: #F44336;">${createData[i].total}</td>
                <td>${createData[i].category}</td>
              
                <td><button onclick="ubdate(${i})" id="update" class=" b4" style="background:green; color:#fff; cursor:pointer;">update</button></td>
                <td><button  onclick="deleteDate ( ${i}  )"  id="delete" class=" b4" style="background:red; color:#fff; cursor:pointer;">delete</button></td>
    
            </tr>
            `;
        deleteall.setAttribute("value", `Delete all (${i + 1})`);
    }
    document.getElementById("tbody").innerHTML = tabel;


    if (createData.length === 0) { deleteall.classList.add("display"); }
    else if (createData.length > 0) { deleteall.classList.remove("display"); }




}

let tdd = document.getElementById("tdd")
readDate();


//delete 
function deleteDate(i) {
    createData.splice(i, 1);
    localStorage.product = JSON.stringify(createData);
    readDate();
}
function clickdelete() {
    localStorage.clear();
    deleteall.classList.add("display");
    createData.splice(0);
    readDate();
}

// update

function ubdate(i) {
    title.value = createData[i].title;
    price.value = createData[i].price;
    taxes.value = createData[i].taxes;
    ads.value = createData[i].ads;
    discount.value = createData[i].discount;
    getTotal();
    count.classList.add('display');
    create.value = 'update';
    create.style.background = 'green';
    category.value = createData[i].category;
    mood = 'update';
    tmp = i;
    scroll({ top: 0, behavior: "smooth", });
}


// search


let searchMood = "searchByTitle";
function getsearch(id) {
    if (id == "searchByTitle") { searchMood = "searchByTitle", search.placeholder = 'SearchByTitle'; }
    else if (id == "searchByCategory") {
        searchMood = "earchByCategory";
        search.placeholder = 'SearchByCategory';
    }
    search.focus();

}
function searchByData(value) {
    let tabel = '';
    if (searchMood == "searchByTitle") {
        for (let i = 0; i < createData.length; i++) {
            if (createData[i].title.includes(value.toLowerCase())) {
                tabel +=
                    `
        <tr >
                <td>${i + 1}</td>
                <td>${createData[i].title}</td>
                <td>${createData[i].price}</td>
                <td>${createData[i].taxes}</td>
                <td>${createData[i].ads}</td>
                <td>${createData[i].discount}</td>
                <td>${createData[i].total}</td>
                <td>${createData[i].category}</td>
              
                <td><button onclick="ubdate(${i})" id="update" class="botom b4">update</button></td>
                <td><button style="background:red" onclick="deleteDate ( ${i}  )"  id="delete" class="botom b4">delete</button></td>
    
            </tr>
            `;
            }
        }
    }


    else {
        for (let i = 0; i < createData.length; i++) {
            if (createData[i].category.toLowerCase().includes(value.toLowerCase())) {
                tabel +=
                    `
    <tr >
            <td>${i + 1}</td>
            <td>${createData[i].title}</td>
            <td>${createData[i].price}</td>
            <td>${createData[i].taxes}</td>
            <td>${createData[i].ads}</td>
            <td>${createData[i].discount}</td>
            <td>${createData[i].total}</td>
            <td>${createData[i].category}</td>
          
            <td><button onclick="ubdate(${i})" id="update" class="botom b4">update</button></td>
            <td><button style="background:red" onclick="deleteDate ( ${i}  )"  id="delete" class="botom b4">delete</button></td>

        </tr> 
        `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = tabel;

}











let arrow = document.getElementById("arrow");
arrow.onclick = function () {
    scroll({ top: 0, behavior: "smooth", });
};

window.onscroll = 
function () {
    if (scrollY >= 600) { arrow.style.display= 'block' }
    else{ arrow.style.display= 'none' }

    
}
















//CLEENDATEE


