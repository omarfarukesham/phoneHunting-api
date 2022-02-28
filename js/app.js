//globally id and field value searching code here 
const searchBox = document.getElementById('search-input')
const container = document.getElementById('dynamicInfo')
const getError = document.getElementById('error')
const noResult = document.getElementById('noResult')
const productDetails = document.getElementById('productDetailsInfo')

//search button click and getting value for search with api
const searchMobile = () =>{
    const searchText = searchBox.value 
    if(searchText == '' || isNaN(searchText) == false ){
        getError.innerText = 'Empty & Numbers is not allow, search by Name of Mobile Brand'
        searchBox.value = ''
        container.innerHTML = ''
        productDetails.innerText = ''
        
    }else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayMobileData(data.data.slice(0,20)))
        searchBox.value = ''
        getError.innerText = ''
        productDetails.innerText = ''
    }
}


// displaymobiledata function calling code here 
const displayMobileData = (mobiles) => {

     container.innerHTML = ''
    if(mobiles == ''){
        noResult.innerText = 'Opp! No result has found, please Try again'
    }else{
    mobiles.forEach( mobile => {    
        //console.log(mobile)
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
                    <div class="card">
                     <img class="w-100 h-75" src="${mobile.image}" alt="Phone Image">
                     <div class="card-body">
                       <h5 class="card-title">Brand -${mobile.brand}</h5>
                       <p class="card-text">Name -${mobile.phone_name}</p>
                       <button type="button" class="btn btn-warning" onclick="loadProductDetails('${mobile.slug}')">Details</button>
                     </div>
                   </div>
        
        `
        container.appendChild(div)

   });
   noResult.innerText = ''
}   
}

// products details information showing code here
const loadProductDetails = (productId) => {
    //console.log(productId)
    const url = `https://openapi.programming-hero.com/api/phone/${productId}`
   fetch(url)
   .then(res => res.json())
   .then(data => displayProductDetails(data.data))
    
}

//product display function code here 
const displayProductDetails = (productInfo) => {
    productDetails.innerText = ''
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
            
                <img src="${productInfo.image} " class="card-img-top" alt="product Image">
                <div class="card-body">
                  <h5 class="card-title">Brand-${productInfo.brand}</h5>
                  <p class="card-text"><strong>Memory-</strong>${productInfo.mainFeatures.memory}</p>
                  <p class="card-text"><strong>Size-</strong>${productInfo.mainFeatures.displaySize}</p>
                  <p class="card-text"><strong>Sensors-</strong>${productInfo.mainFeatures.sensors[3]}</p>
                  <p class="card-text"><strong>Storage-</strong>${productInfo.mainFeatures.storage}</p>
                  <p class="card-text"><strong>RelaseDate-</strong>${productInfo.releaseDate ? productInfo.releaseDate:'<span class="text-danger">No result Found?</span>'}</p>
                 
                </div>
    `
    productDetails.appendChild(div)
}