document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch products from the backend
        const response = await fetch("http://127.0.0.1:5000/products");
        
        if (!response.ok) {
            throw new Error("Failed to fetch products!");
        }

        const products = await response.json();

        // Select the container where products will be displayed
        const productContainer = document.querySelector(".product-container");

        // Clear existing content
        productContainer.innerHTML = "";

        // Dynamically create product cards
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="https://via.placeholder.com/150" alt="${product.pName}">
                <h3>${product.pName}</h3>
                <p class="description">${product.description}</p>
                <p class="category">Category: ${product.categoryName}</p>
                <p class="price"><span class="original-price">Rs.${(product.price * 1.2).toFixed(2)}</span> Rs.${product.price.toFixed(2)} <span class="units"> per ${product.unit}</span></p>
                <button class="add-to-cart" data-name="${product.pName}" data-price="${product.price.toFixed(2)}">Add to Cart</button>
            `;

            productContainer.appendChild(productCard);
        });

    } catch (error) {
        console.error("Error loading products:", error);
    }
});
