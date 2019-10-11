paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: orderTotalPlusShipping.innerText
                },
                shipping_address: {
                    line1: apartement.value,
                    line2: street.value,
                    city: city.value,
                    country_code: "GB",
                    postal_code: postcode,
                    phone: phone.value,
                    recipient_name: firstname.value + lastname.value
                }
            }],
            redirect_url: {
                return_url: "",
                cancel_url: ""
            }
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
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