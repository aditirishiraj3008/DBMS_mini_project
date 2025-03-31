// document.addEventListener("DOMContentLoaded", () => {
//     console.log("Website Loaded");

//     const searchInput = document.getElementById("search-bar");
//     const sortSelect = document.getElementById("sort-options");
//     const categorySelect = document.getElementById("category-filter");
//     const container = document.querySelector(".product-container");

//     let products = Array.from(document.querySelectorAll(".product-card"));

//     // Search Functionality
//     searchInput.addEventListener("input", () => {
//         const searchText = searchInput.value.toLowerCase();
//         products.forEach(product => {
//             const productName = product.querySelector("h3").textContent.toLowerCase();
//             product.style.display = productName.includes(searchText) ? "block" : "none";
//         });
//     });

//     // Sorting Functionality
//     sortSelect.addEventListener("change", () => {
//         let sortedProducts = [...products];

//         if (sortSelect.value === "price-low") {
//             sortedProducts.sort((a, b) => getPrice(a) - getPrice(b));
//         } else if (sortSelect.value === "price-high") {
//             sortedProducts.sort((a, b) => getPrice(b) - getPrice(a));
//         } else if (sortSelect.value === "discount") {
//             sortedProducts.sort((a, b) => getDiscount(b) - getDiscount(a));
//         }

//         // Re-add sorted products
//         sortedProducts.forEach(product => container.appendChild(product));
//     });

//     // Category Filter Functionality
//     categorySelect.addEventListener("change", () => {
//         const selectedCategory = categorySelect.value.toLowerCase();
//         products.forEach(product => {
//             const productCategory = product.querySelector(".category").textContent.toLowerCase().replace("category: ", "").trim();
//             product.style.display = selectedCategory === "all" || productCategory.includes(selectedCategory) ? "block" : "none";
//         });
//     });

//     // Helper Function to Extract Final Price
//     function getPrice(product) {
//         let priceText = product.querySelector(".price").textContent;
//         let price = priceText.match(/\$\d+(\.\d+)?/g);
//         return price ? parseFloat(price[1].replace("$", "")) : 0; // Extract final price
//     }

//     // Helper Function to Extract Discount
//     function getDiscount(product) {
//         let discountText = product.querySelector(".discount").textContent;
//         let discount = discountText.match(/\d+/g);
//         return discount ? parseInt(discount[0]) : 0;
//     }
// });

function addToCart(name, price) {
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

        button.addEventListener("click", () => {
            // Replace button with quantity
            const cartControls = document.createElement("div");
            cartControls.classList.add("cart-controls");

            const minusBtn = document.createElement("button");
            minusBtn.textContent = "−";
            minusBtn.classList.add("cart-minus");

            const quantity = document.createElement("span");
            quantity.textContent = "1"; // Initial quan
            quantity.classList.add("cart-quantity");

            const plusBtn = document.createElement("button");
            plusBtn.textContent = "+";
            plusBtn.classList.add("cart-plus");

            cartControls.appendChild(minusBtn);
            cartControls.appendChild(quantity);
            cartControls.appendChild(plusBtn);

            product.replaceChild(cartControls, button);

            //for + and - buttons
            let count = 1;

            plusBtn.addEventListener("click", () => {
                count++;
                quantity.textContent = count;
            });

            minusBtn.addEventListener("click", () => {
                count--;
                if (count === 0) {
                    product.replaceChild(button, cartControls); // Restore "Add to Cart"
                } else {
                    quantity.textContent = count;
                }
            });
        });
    });
});
