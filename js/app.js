const loadPhones=(searchText)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
   .then(res=>res.json())
   .then(data=>displayPhones(data.data))
}

const displayPhones=phones=>{
    // console.log(phones);
  const phoneContainer=document.getElementById('phone-container')
  // clear the past text content
  phoneContainer.textContent=''
  // display 20 phones only
  phones=phones.slice(0,10)


  // display no phones found
  const noPhone=document.getElementById('no-found-message')
  if(phones.length===0){
    noPhone.classList.remove('d-none')
  }
  else{
    noPhone.classList.add('d-none')
  }
  // display all phones

  phones.forEach(phone=>{
const phoneDiv=document.createElement('div')
phoneDiv.classList.add('col')
phoneDiv.innerHTML=`

<div class="card p-2 m-2 border border-primary rounded" style="width: 18rem " >
  <img class="card-img-top" src="${phone.image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${phone.phone_name}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
`
phoneContainer.appendChild(phoneDiv)

  })
  // stop spinner or loader
toggleSpinner(false)
}

// handle search button click
document.getElementById('btn-search').addEventListener('click',function(){
  // start Loader:
toggleSpinner(true)
   const searchField=document.getElementById('search-field ')
   const searchText=searchField.value;
   loadPhones(searchText)

})
const toggleSpinner=isLoading=>{
  const loaderSection=document.getElementById('loader')
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }else{
    loaderSection.classList.add('d-none')
  }


}


// loadPhones()