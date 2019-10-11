paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: cartTotal.innerText
                }
            }]
        });
    },
    onApprove: function(data, actions) {

        // Get the order details
        return actions.order.get().then(function(orderDetails) {
            console.log(orderDetails);
            Storage.saveInformation(orderDetails);
            location.href = "checkoutShortcut.html#confirmation-section";
            // Show a confirmation using the details from orderDetails
            // Then listen for a click on your confirm button
            document.querySelector('#confirm-button')
                .addEventListener('click', function() {

                    // Capture the transaction funds
                    return actions.order.capture().then(function() {
                        // Show a confirmation to the buyer
                        alert('Transaction complete!');
                        location.href = "confirmation.html#confirmation-section";

                    });
                });
        });
    }
}).render('#paypal-button-container-continue');