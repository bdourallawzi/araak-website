//local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    static getCart() {
        return localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];
    }

    static saveInformation(details) {
        localStorage.setItem('line1', details.purchase_units[0].shipping.address.address_line_1);
        localStorage.setItem('area', details.purchase_units[0].shipping.address.admin_area_1);
        localStorage.setItem('area2', details.purchase_units[0].shipping.address.admin_area_2);
        localStorage.setItem('country', details.purchase_units[0].shipping.address.country_code);
        localStorage.setItem('postCode', details.purchase_units[0].shipping.address.postal_code);
        localStorage.setItem('name', details.purchase_units[0].shipping.name.full_name);
        localStorage.setItem('price', details.purchase_units[0].amount.value);
        localStorage.setItem('email', details.payer.email_address);
        localStorage.setItem('id', details.id);
        localStorage.setItem('time', details.create_time);
    }

    static getInformation(infoKey) {
        return localStorage.getItem(infoKey);
    }



}