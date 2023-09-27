const productsList = $('#productsList');

$.ajax({
    url: 'https://fakestoreapi.com/products',
    method: 'GET',
    dataType: 'json',
    success: function(data){
       const products = data
       productsData(products)
    },
    error: function(error){
        console.log(error)
    }
})

function productsData(products){
    console.log(products)

    let productCard = '';

    products.forEach((product) => {
        productCard += 
        `
        <div class="card mx-2" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
        <h4 href="#" class="">${product.price}</h4>
        <a href="product.html?id=${product.id}" class="card-title">${product.title}</a>
        </div>
        </div>
        `
    })

    productsList.append(productCard)

}



// product.html
const productDetailsContainer = $('#productDetails');

// Function to get the product ID from the query parameter
function getProductIdFromQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Fetch and display product details
$(document).ready(function () {
    const productId = getProductIdFromQueryParam();
    if (productId) {
        // Fetch product details based on the ID
        $.ajax({
            url: `https://fakestoreapi.com/products/${productId}`,
            method: 'GET',
            dataType: 'json',
            success: function (product) {
                displayProductDetails(product);
            },
            error: function (error) {
                console.log(error);
            },
        });
    } else {
        console.error('Product ID not found in query parameter');
    }
});

// Function to display product details
function displayProductDetails(product) {
    const productDetailCard = `
            <div class="row">
                <div class="col-md-6">
                    <img class="img-fluid" src="${product.image}">
                </div>
                <div class="col-md-6 d-flex  justify-content-center flex-column">
                    <h1>${product.title}</h1>
                    <p>${product.description}</p>
                    <h6>${product.price}</h6>
                    <a href="" class="btn btn-warning btn-block">Buy Now</a>
                    <a href="" class="btn btn-warning btn-block my-2">Add to Cart</a>
                </div>
            </div>

    `;
    productDetailsContainer.html(productDetailCard);
}