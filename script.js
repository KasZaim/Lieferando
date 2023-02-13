let prices = [];
let shoppingBasket = [];
let amounts = [];

//fügt die das ausgewählte Gericht dem Warenkorb hinzu
function addToBasket(name, price) {
    let index = shoppingBasket.indexOf(name);
    if (index < 0) {
        shoppingBasket.push(name);
        prices.push(price);
        amounts.push(1);
    }
    else {
        amounts[index]++;
    }
    showBasket();
    basketCalcRemove();
}
//Blendet den Rechner vom Warenkorb aus wenn diesen keine gerichte hinzugefügt wurden   
function basketCalcRemove() {
    let basketsum = document.getElementById('basket-sum');
    if (shoppingBasket.length > 0) {
        basketsum.classList.remove('d-none');
    } else {
        basketsum.classList.add('d-none');
    }
}


function showBasket() {
    let basket = document.getElementById('shopping-basket');
    basket.innerHTML = '';
    renderBasketDishes(basket);
    shoppingBasketTotal();
}
//lädt die Gerichte im Warenkorb 
function renderBasketDishes(basket) {
    for (let i = 0; i < prices.length; i++) {
        let price = parseFloat(prices[i]).toFixed(2);
        basket.innerHTML += htmlTemplate(i, price);
    }
}
function htmlTemplate(i, price) {
    return ` 
        <div class="basket">
                <div class="basket-list">
                    <div><b>${amounts[i]}</b></div>
                    <div class="basket-dish"><u>${shoppingBasket[i]}</u></div>
                    <div class="basket-price">${price} €</div>
                </div>
            </div>
            <div class="remove-dish" >
                <div class="plus-minus">
                <img onclick="addOne(${i})" src="img/plus.png">
            </div>
            <div class="plus-minus">
                <img onclick="deleteDish(${i})" src="img/minus-7-24.png">
            </div>
        </div>`;
}


function shoppingBasketTotal() {
    let sum = 0;
    let zwischensumme = document.getElementById('subtotal');
    let total = document.getElementById('total');
    let deliverycosts = 4.95;
    for (let i = 0; i < prices.length; i++) {
        sum += amounts[i] * parseFloat(prices[i]);
    }
    let finalsum = sum + deliverycosts;
    zwischensumme.innerHTML = `${sum.toFixed(2)}€`;
    total.innerHTML = ` <b> ${finalsum.toFixed(2)}€</b>`;

    deliveryCosts(total, sum);
}
function deliveryCosts(total, sum) {
    let shippingcosts = document.getElementById('delivery-costs');
    if (sum > 30.00) {
        shippingcosts.innerHTML = `<b>0.00€</b>`;
        total.innerHTML = `<b>${sum.toFixed(2)}€</b>`;
    } else {
        shippingcosts.innerHTML = `4.95€`;
    }

}

//Popup Warenkorb
function openBasketCalc() {
    let basket = document.getElementById('warenkorb');
    let close = document.getElementById('close-popup');
    basket.classList.add('responsive-basket');
    basket.classList.remove('d-none');
    close.classList.remove('d-none');
    document.getElementById('basket-button').classList.add('d-none');
    document.getElementById('basket-button').innerHTML=`
    <b>Basket</b>(${amounts.length})`;
}

//Popup Warenkorb schließen
function closeBasket() {
    document.getElementById('warenkorb').classList.add('content');
    document.getElementById('warenkorb').classList.remove('responsive-basket');
    document.getElementById('close-popup').classList.add('d-none');
    document.getElementById('basket-button').classList.remove('d-none');
}

let currentImage = "img/love.png";

function redHeart() {
    let image = document.getElementById("heart");
    if (currentImage == "img/love.png") {
        image.src = "img/heart.png";
        currentImage = "img/heart.png";
    } else {
        image.src = "img/love.png";
        currentImage = "img/love.png";
    }
}

function deleteDish(i) {
    amounts[i]--;
    if (amounts[i] <= 0) {
        shoppingBasket.splice(i, 1);
        prices.splice(i, 1);
        amounts.splice(i, 1);
    }
    showBasket();
    if (amounts.length <= 0) {
        emptyBasketPlaceholder();
        basketCalcRemove();
    }
}


function addOne(i) {
    amounts[i]++;
    showBasket();
}

function emptyBasketPlaceholder() {
    let basket = document.getElementById('empty-basket');
    basket.innerHTML = htmlTemplatePlaceholder();
}

function htmlTemplatePlaceholder() {
    return `
    <h2 class="basket-headline"><u>Basket</u></h2>
          
    <div id="shopping-basket">
        <div class="basket-placeholder">
            <img src="img/shopping-basket-32.png">
            <h2> Fill your basket with your favourite dishes</h2>
            <span>Your basket ist empty</span>
        </div>
    </div>`;
}

function closePopup() {
    document.getElementById('popup').classList.add('d-none')
}
function openPopup() {
    document.getElementById('popup').classList.remove('d-none')
}