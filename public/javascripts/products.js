const proContainer = document.getElementById('pro_container')


//// filtered data displaying function  ///////////


const filteredDataDisplay = (data) => {
    proContainer.innerHTML = ''
    proContainer.innerHTML = `<div class="row isotope-grid" id="productList" ></div>`
    const productList  = document.getElementById('productList')

data.forEach((product) => {
    productList.innerHTML += 
    `<div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" >
    <!-- Block2 -->
    <div class="block2">
        <div class="block2-pic hov-img0">
            <img src="/uploads/${product.imageUrl[0]}" alt="IMG-PRODUCT">

            <a href="/productview?id=${product._id}"
                class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
                Quick View
            </a>
        </div>

        <div class="block2-txt flex-w flex-t p-t-14">
            <div class="block2-txt-child1 flex-col-l ">
                <a href="/productview?id=${product._id}"
                    class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                    ${product.name}
                </a>

                <input type="hidden" id="name${product._id}}" value="${product.name}">
                <input type="hidden" id="id" value="${product._id}">

                <span class="stext-105 cl3">
                    $ ${product.price}
                </span>
            </div>
            <div class="block2-txt-child2 flex-r p-t-3">
                    </span>
                        <img onclick="addToWishlist('${product._id}')" id="icon-2"
                            class=" dis-block trans-04 " src="images/icons/icon-heart-01.png"
                            alt="ICON">
                    </span>
            </div>

        </div>
    </div>
</div>`
})
}



//// category wise filter  //////////

let catId = false

const categoryFilter = async (id) => {

     catId = document.getElementById('cat_id'+id).value
     console.log(catId, 'am cat idddd');

    const response = await fetch(`/category_fil?id=${id}`, {
        headers: { 'Content-Type': "application/json" }
    })

    const data = await response.json()
    console.log(data);
     
    if ( data.length > 0) {
        filteredDataDisplay(data)
      } else{
          proContainer.innerHTML = `<h2 class="m-5">No product available</h2>`
        }
}


/// Add to wishlist ////////////



const addToWishlist = async (id) => {

    const proName = document.getElementById('name' + id).value
    document.getElementById('click' + id).innerHTML =
        `<img class=" dis-block trans-04" src="images/icons/icon-heart-02.png" alt="ICON">`

    let response = await fetch(`/add_to_wishlist?id=${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
    })

    let data = await response.json()
    console.log(data)
    if (data) {
        alertify.set('notifier', 'position', 'bottom-center');
        alertify.success(`${proName} Added to wishlist`)
    }
}


/// remove from wishlist  ////////////


const removeFromWishlist = async (id) => {
    const proName = document.getElementById('name' + id).value

    document.getElementById('click' + id).innerHTML =
        `<img class=" dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">`

    let response = await fetch(`/remove_from_wishlist?id=${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
    })

    let data = await response.json()
    console.log(data)
    if (data) {
        alertify.set('notifier', 'position', 'bottom-center');
        alertify.success(`${proName} Removed from wishlist`)
    }
}


/// Product search ////////////


const searchProducts = async () => {
const query = document.getElementsByName('search-product')[0].value
console.log('I am from search', query);

const response = await fetch(`/products_filter`, {
    method:'POST',
headers: {
  'Content-Type': 'application/json'
},
body:JSON.stringify({
    search : query,
    catId: catId
})
});

const data = await response.json();
console.log(data.length, data)



if ( data.length > 0) {
  filteredDataDisplay(data)
} else{
    proContainer.innerHTML = `<h2 class="m-5">No product available</h2>`
  }
}




const sortProduct_az = async (sort) => {

    const response = await fetch (`/sort_product_az`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            sort: sort,
            catId: catId
        })
    }) 
    const data = await response.json()
    if ( data.length > 0) {
        filteredDataDisplay(data)
      } else{
          proContainer.innerHTML = `<h2 class="m-5">No product available</h2>`
        }
}



const sortProductByPrice = async ( sort ) => {
    console.log('am from sort product');
    const response = await fetch (`/sort_product_price`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            sort : sort,
            catId: catId
        })
    }) 
    const data = await response.json()
    if ( data.length > 0) {
        filteredDataDisplay(data)
      } else{
          proContainer.innerHTML = `<h2 class="m-5">No product available</h2>`
    }
}

