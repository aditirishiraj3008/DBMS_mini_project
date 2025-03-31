function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find(item => item.name === name);

    if (!product) {
        cart.push({ name, price, quantity: 1 }); 
    } else {
        product.quantity++;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Loaded");

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const button = product.querySelector(".add-to-cart");
        const productName = product.getAttribute("data-name");
        const productPrice = parseFloat(product.getAttribute("data-price"));

        button.addEventListener("click", () => {
            addToCart(productName, productPrice, productImage);

            // Replace button with quantity controls
            const cartControls = document.createElement("div");
            cartControls.classList.add("cart-controls");

            const minusBtn = document.createElement("button");
            minusBtn.textContent = "−";
            minusBtn.classList.add("cart-minus");

            const quantity = document.createElement("span");
            quantity.textContent = "1"; // Initial quantity
            quantity.classList.add("cart-quantity");

            const plusBtn = document.createElement("button");
            plusBtn.textContent = "+";
            plusBtn.classList.add("cart-plus");

            cartControls.appendChild(minusBtn);
            cartControls.appendChild(quantity);
            cartControls.appendChild(plusBtn);

            product.replaceChild(cartControls, button);

            // Handle + and - buttons
            let count = 1;

            plusBtn.addEventListener("click", () => {
                count++;
                quantity.textContent = count;
                addToCart(productName, productPrice);
            });

            minusBtn.addEventListener("click", () => {
                count--;
                if (count === 0) {
                    product.replaceChild(button, cartControls); // Restore "Add to Cart" button
                } else {
                    quantity.textContent = count;
                    let cart = JSON.parse(localStorage.getItem("cart")) || [];
                    let product = cart.find(item => item.name === productName);
                    if (product) {
                        product.quantity--;
                        if (product.quantity === 0) {
                            cart = cart.filter(item => item.name !== productName); // Remove item from cart
                        }
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }
                }
            });
        });
    });
});
