const loadPhones=(searchText,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
   .then(res=>res.json())
   .then(data=>displayPhones(data.data,dataLimit))
}

const displayPhones=(phones,dataLimit)=>{
    // console.log(phones);
  const phonesContainer=document.getElementById('phone-container')
  // clear the past text content
  phonesContainer.textContent=''
  // display 10 phones only
  const showAll=document.getElementById('show-all')
 
  if(dataLimit && phones.length >10){
    phones=phones.slice(0,10)
    showAll.classList.remove('d-none')
  }else{
showAll.classList.add('d-none')
  }


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
    <btn onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Show Details</btn>
  </div>
</div>
`
phonesContainer.appendChild(phoneDiv)

  })
  // stop spinner or loader
toggleSpinner(false)
}

const processSearch=(dataLimit)=>{
  toggleSpinner(true)
   const searchField=document.getElementById('search-field')
   const searchText=searchField.value;
   loadPhones(searchText,dataLimit)
}

// handle search button click
document.getElementById('btn-search').addEventListener('click',function(){
  // start Loader:
  processSearch(10)


})
// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function (e){
  if(e.key=='Enter'){
    processSearch(10)
  }
})

const toggleSpinner=isLoading=>{
  const loaderSection=document.getElementById('loader')
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }else{
    loaderSection.classList.add('d-none')
  }


}

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click',function(){
processSearch()
})

const loadPhoneDetails=async (id)=>{
  const url=` https://openapi.programming-hero.com/api/phone/${id}`
  const res=await fetch(url)
  const data=await res.json()
  console.log(data.data)
}



// loadPhones()