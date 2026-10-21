
import products from "./data/products.json";

const productsPerPage = 5;
const totalPages = Math.ceil(products.length / productsPerPage);
const productsGrid = document.querySelector("#products-grid");
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");
const pageIndicator = document.querySelector("#page-indicator");

if (!productsGrid || !previousButton || !nextButton || !pageIndicator) {
    throw new Error("Store page is missing required product or pagination elements.");
}

let currentPage = 1;

function renderProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const visibleProducts = products.slice(startIndex, startIndex + productsPerPage);
    const productCards = visibleProducts.map((product) => {
        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("img");
        image.className = "product-image";
        image.src = product.imageUrl;
        image.alt = product.name;

        const details = document.createElement("div");
        details.className = "product-details";

        const category = document.createElement("span");
        category.className = "product-category";
        category.textContent = product.category;

        const name = document.createElement("h2");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = `$${product.price.toFixed(1)} million`;

        const description = document.createElement("p");
        description.className = "product-description";
        description.textContent = product.description;

        details.append(category, name, price, description);
        card.append(image, details);
        return card;
    });

    productsGrid.replaceChildren(...productCards);
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage -= 1;
        renderProducts();
    }
});

nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage += 1;
        renderProducts();
    }
});

renderProducts();
