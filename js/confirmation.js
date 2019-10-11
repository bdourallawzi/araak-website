const confirmationContent = document.querySelector('.cart-content-confirmation');
const orderTotal = document.querySelector('.cart-total');
const orderItems = document.querySelector('.items-total');
const orderTotalPlusShipping = document.querySelector('.total-amount-plus-shipping');

const c_line1 = document.getElementById('LINE1_S');
const c_area = document.getElementById('LINE2_S');
const c_area2 = document.getElementById('CITY_S');
const c_country = document.getElementById('COUNTRY_S');
const c_postCode = document.getElementById('POSTCODE_S');

const c_line1_b = document.getElementById('LINE1_B');
const c_area_b = document.getElementById('LINE2_B');
const c_area2_b = document.getElementById('CITY_B');
const c_country_b = document.getElementById('COUNTRY_B');
const c_postCode_b = document.getElementById('POSTCODE_B');

const c_name = document.getElementById('NAME');
const c_price = document.querySelector('.total-amount-plus-shipping');
const c_shipping_price = document.querySelector('.shipping-selected');
const c_email = document.getElementById('EMAIL');
const c_id = document.getElementById('NUM');
const c_time = document.getElementById('DATE');


let cartAtCheckout = [];

class ConfirmationUI {

    setupUI() {
        cartAtCheckout = Storage.getCart();
        this.getDataValues();
        this.setCartAndDelivery(cartAtCheckout);
        this.populateItems(cartAtCheckout);
        document.querySelector('.back-to-shopping').addEventListener('click', () => {
            location.href = "index.html#products";
        });
        document.getElementById('logo').addEventListener('click', () => {
            location.href = "index.html";
        });
    }

    addCartItem(item) {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
        <img src=${item.image} alt="product" />
        <div>
            <h4>${item.title}</h4>
            <h5>$${item.price}</h5>
        </div>
        <div>
            <p class="item-amount">${item.amount}</p>
        </div>
        `;
        confirmationContent.appendChild(div);
    }

    setCartAndDelivery(cartAtCheckout) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cartAtCheckout.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });

        orderTotal.innerText = parseFloat(tempTotal.toFixed(2));
        orderItems.innerText = itemsTotal;
        // retrieve shipping amount from paypal when passed in 
        let getPrice = Storage.getInformation('price');
        let shipping = getPrice - parseFloat(tempTotal.toFixed(2));

        c_shipping_price.innerText = shipping;
        if (shipping === 2.00) {
            c_shipping_price.innerText = "Stanadrd Delivery (2-3 Days) - $2";
        } else {
            c_shipping_price.innerText = "Next Day Delivery - $5";
        }
        orderTotalPlusShipping.innerText = `$${getPrice}`;
    }

    populateItems(cartAtCheckout) {
        cartAtCheckout.forEach(item => this.addCartItem(item));
    }

    getDataValues() {
        c_line1.innerText = Storage.getInformation('line1');
        c_area.innerText = Storage.getInformation('area');
        c_area2.innerText = Storage.getInformation('area2');
        c_country.innerText = Storage.getInformation('country');
        c_postCode.innerText = Storage.getInformation('postCode');

        c_line1_b.innerText = Storage.getInformation('line1');
        c_area_b.innerText = Storage.getInformation('area');
        c_area2_b.innerText = Storage.getInformation('area2');
        c_country_b.innerText = Storage.getInformation('country');
        c_postCode_b.innerText = Storage.getInformation('postCode');

        c_name.innerText = Storage.getInformation('name');
        c_price.innerText = Storage.getInformation('price');
        c_email.innerText = Storage.getInformation('email');
        c_id.innerText = Storage.getInformation('id');
        c_time.innerText = Storage.getInformation('time').substring(0, 10);

    }

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new ConfirmationUI();
    ui.setupUI(cartAtCheckout);
});