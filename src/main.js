let shop = document.getElementById("shop");
// console.log(shop);



// let basket = [];
   let basket = JSON.parse(localStorage.getItem("data")) || [] ;

// shopItemsData.price
// Es6 Arrow function
// in return statement we are going to use batics and (It is use to make template literals)
// map function will target the data one by one
// we can use the variable (x) to fetch the data to avoid that use of x we will make it destructure it
let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, desc ,img} = x;
        let search = basket.find((x) =>x.id === id) || [];
        return `        
        <div id=product-id-${id} class="item">
        <img width="220" src="${img}" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${x.price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantiy">${search.item === undefined? 0:search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>
    `
    }).join("")
    )
}

generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    // console.log(selectedItem.id);
    // console.log(id);
    console.log(search);


    if(search === undefined){
       
        basket.push({
        id:selectedItem.id,
        item:1,
    });
    }
    else{
        search.item += 1;
    }

    // console.log(basket);
    update(selectedItem.id);

    localStorage.setItem("data",JSON.stringify(basket));

};
let decrement = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    // console.log(id);
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) return;
    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !==0);
    // console.log(basket);


    localStorage.setItem("data",JSON.stringify(basket));

};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log("the update function is running");
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
    // console.log("calculation function is running")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
    // console.log(basket.map((x) => x.item).reduce((x,y) => x + y, 0));
}
// doing quick calculation to load the cart value on refersh
calculation();
