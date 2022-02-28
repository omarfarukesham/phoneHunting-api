//globally id and field value searching code here 
const searchBox = document.getElementById('search-input')
const container = document.getElementById('dynamicInfo')

//search button click and getting value for search with api
const searchMobile = () =>{
    const searchText = searchBox.value 
    
    //search api 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMobileData(data.data.slice(0,20)))
}


// displaymobiledata function calling code here 
const displayMobileData = (mobiles) => {
    //console.log(mobiles)
    mobiles.forEach( mobile => {    
        
        console.log(mobile)
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
                    <div class="card">
                     <img class="w-75" src="${mobile.image}" alt="Phone Image">
                     <div class="card-body">
                       <h5 class="card-title">Mobile Brand -${mobile.brand}</h5>
                       <p class="card-text">Mobile Name -${mobile.phone_name}</p>
                       <button type="button" class="btn btn-warning" onclick="loadProductDetails()">Details</button>
                     </div>
                   </div>
        
        `
        container.appendChild(div)

   });
   
}