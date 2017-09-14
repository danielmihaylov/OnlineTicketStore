let cartService = (()=>{

    function updateUserCart(userCart,cartItem) {
        if (userCart==='undefined') {
            userCart = [];
            userCart.push(cartItem);
            sessionStorage.setItem('cart', JSON.stringify(userCart));
            $('input[name=quantity]').val('');
            messenger.showInfo('Tickets added to cart. Please visit your cart to check out.');
        } else {
            userCart = JSON.parse(userCart);
            let hasEvent=false;
            for (let obj of userCart) {
                if (obj.eventId === cartItem.eventId) {
                    obj.quantity = (Number(obj.quantity) + Number(cartItem.quantity)).toString();
                    hasEvent=true;
                    break;
                }
            }
            if(hasEvent){
                sessionStorage.setItem('cart', JSON.stringify(userCart));
                $('input[name=quantity]').val('');
                messenger.showInfo('Tickets added to cart. Please visit your cart to check out.');
            }else{
                userCart.push(cartItem);
                sessionStorage.setItem('cart', JSON.stringify(userCart));
                $('input[name=quantity]').val('');
                messenger.showInfo('Tickets added to cart. Please visit your cart to check out.');
            }
        }
    }

    function discardItemFromCart(cart,product) {
        let prodId = product._id;

        if(cart.hasOwnProperty(prodId)){
            delete cart[prodId];
        }else{
            return;
        }
        return cart;

    }

    return {
        updateUserCart,
        discardItemFromCart
    }

})();