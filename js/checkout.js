const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const country = document.querySelector("#country");
const street = document.querySelector("#street");
const city = document.querySelector("#city");
const apartement = document.querySelector("#apartment");
const postcode = document.querySelector("#postcode");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");

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
        orderTotalPlusShipping.innerText = temp;
        console.log(orderTotal.innerText);
        console.log(shipping)
    }

    populateItems(cartAtCheckout) {
        cartAtCheckout.forEach(item => this.addCartItem(item));
    }

    setupCheckout() {
        cartAtCheckout = Storage.getCart();
        this.setCartAndDelivery(cartAtCheckout);
        this.populateItems(cartAtCheckout);
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
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const checkoutui = new CheckoutUI();
    checkoutui.setupCheckout();
});

paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: orderTotalPlusShipping.innerText
                }
                // ,
                // shipping: {
                //     address: {
                //         "address_line_1": apartement.value,
                //         //admin_area_1: street.value,
                //         //admine_area_2: city.value,
                //         "country_code": "GB",
                //         //postal_code: postcode,
                //         //phone: phone.value,
                //     }
                // }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
            console.log(details);
            Storage.saveInformation(details);
            //location.href = "confirmation.html#confirmation-section";

            // Call your server to save the transaction
            // return fetch('/paypal-transaction-complete', {
            //     method: 'post',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         orderID: data.orderID
            //     })
            // });
        });
    },
    onCancel: function(data) {
        // Show a cancel page, or return to cart
    }
}).render('#paypal-button-container-paynow');