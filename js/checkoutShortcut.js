const firstname = document.querySelector("#firstname_input");
const lastname = document.querySelector("#lastname_input");
const country = document.querySelector("#country_input");
const street = document.querySelector("#street_input");
const city = document.querySelector("#city_input");
const apartement = document.querySelector("#apartment_input");
const postcode = document.querySelector("#postcode_input");
const phone = document.querySelector("#phone_input");
const email = document.querySelector("#email_input");

const orderTotal = document.querySelector('.cart-total');
const orderItems = document.querySelector('.items-total');
const orderContent = document.querySelector('.cart-content-checkout');
const orderTotalPlusShipping = document.querySelector('.total-amount-plus-shipping');

const standardShippingRadio = document.querySelector('#s1');
const nextDayShippingRadio = document.querySelector('#s2');
const standardShippingValue = document.querySelector('.shippingStandard');
const nextDayShippingValue = document.querySelector('.shippingNextDay');


let cartAtCheckout = [];
let shipping = 0;

class CheckoutUI {
    addCartItemReadOnly(item) {
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
        orderContent.appendChild(div);
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
        if (standardShippingRadio.checked) {
            shipping = parseFloat(standardShippingValue.innerText);
        } else {
            shipping = parseFloat(nextDayShippingValue.innerText);
        }
        let temp = parseFloat(tempTotal.toFixed(2)) + shipping;
        orderTotalPlusShipping.innerText = `$${temp}`;
    }

    populateItems(cartAtCheckout) {
        cartAtCheckout.forEach(item => this.addCartItemReadOnly(item));
    }

    setupCheckout() {
        cartAtCheckout = Storage.getCart();
        this.setCartAndDelivery(cartAtCheckout);
        this.populateItems(cartAtCheckout);
        this.populateInput();
        standardShippingRadio.addEventListener('click', () => {
            this.setCartAndDelivery(cartAtCheckout);
        });
        nextDayShippingRadio.addEventListener('click', () => {
            this.setCartAndDelivery(cartAtCheckout);
        });
        document.querySelector('#logo').addEventListener('click', () => {
            location.href = "index.html";
        });
        document.querySelector('.back-to-shopping').addEventListener('click', () => {
            location.href = "index.html#products";

        });
        document.querySelector('#confirm-button').addEventListener('click', () => {
            location.href = "confirmation.html#confirmation-section";
        });
    }

    populateInput() {
        firstname.value = Storage.getInformation('name');
        lastname.value = Storage.getInformation('name');
        country.value = Storage.getInformation('country');
        street.value = Storage.getInformation('area');
        city.value = Storage.getInformation('area2');
        apartement.value = Storage.getInformation('line1');
        postcode.value = Storage.getInformation('postCode');
        email.value = Storage.getInformation('email');
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const checkoutui = new CheckoutUI();
    checkoutui.setupCheckout();

});