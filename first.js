const loadCategories= async()=>{
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
  const data = await res.json();
 const categories = data.data;
 
 const tabContainer = document.getElementById('tab-container')

 
 categories.forEach((category) => {
     // console.log(category);
     const div = document.createElement('div')
     div.innerHTML=`
     <a  onclick="loadVideos('${category.category_id}')"  class="btn hover:bg-[#FF1F3D] hover:text-white ">${category.category}</a>
     `;
     
     tabContainer.appendChild( div)
 });   

};

const loadVideos=async(categoryId)=>{
 
 
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
  const data = await res.json();
  const cardContainer = document.getElementById('card-container')

  cardContainer.textContent=""
let error =document.getElementById('drawing-section')

  if(data.data.length == 0 ){
   
    error.classList.remove('hidden')
  }
  else{ 
   error.classList.add('hidden')
 }
 
  data.data?.forEach((video)=>{

    //  console.log(video);
     let videosDiv = document.createElement('div')
     videosDiv.innerHTML= `
     <div class="card w-64 bg-base-100 relative  shadow-xl">
     <figure><img class="w-64  md:w-80 lg:w-full     h-48"
         src=${video?.thumbnail}
       /></figure>
       <p class="absolute right-2 top-40 bg-black text-white"  > ${video.others.posted_date?secondsToHoursMinutes(video.others.posted_date): ''}</p>
     <div class="card-body flex ">
         <div class="flex flex-row gap-1">
             <div>
                 <div>
                     <div class="avatar ">
                       <div class="w-14 rounded-full">
                         <img
                           src=${video.authors[0]?.profile_picture}
                         />
                       </div>
                     </div>
                   </div>
             </div>
           <h2 class="card-title">
             ${video.title}
             
           </h2>

         </div>
          <div >
            <div class="flex flex-row  ">
                 <h6> ${video.authors[0]?.profile_name}</h6>
                ${video.authors[0]?.verified ==true?"<img src='fi_10629607.svg'/>" : '' }
                
             </div>
             <p>${video.others.views} </p>
           </div>  
        </div>
   </div>
     `

    
cardContainer.appendChild(videosDiv);


  });
  
 
}


function secondsToHoursMinutes(seconds) {
var hours = Math.floor(seconds / (60 * 60));
seconds -= hours * (60 * 60)
var minutes = Math.floor(seconds / (60));
seconds -= minutes * (60);
return (hours + 'h'+ minutes + 'm ago') 
}
const sortByView=async()=>{
  const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000')
  const data = await res.json();
  let allData=data.data
  allData.sort((a,b)=>{
    const viewsA = parseInt(a.others.views);
    const viewsB = parseInt(b.others.views)
    return viewsB - viewsA
   

  })
  // console.log(allData)
  const cardContainer = document.getElementById('card-container')
  cardContainer.innerHTML = ''
  allData.forEach((video)=>{
   console.log(video)
   let videosDiv = document.createElement('div')
     videosDiv.innerHTML= `
     <div class="card w-64 bg-base-100 relative  shadow-xl">
     <figure><img class="w-64  md:w-80 lg:w-full     h-48"
         src=${video?.thumbnail}
         alt="Shoes"
       /></figure>
       <p class="absolute right-2 top-40 bg-black text-white"  > ${video.others.posted_date?secondsToHoursMinutes(video.others.posted_date): ''}</p>
     <div class="card-body flex ">
         <div class="flex flex-row gap-1">
             <div>
                 <div>
                     <div class="avatar ">
                       <div class="w-14 rounded-full">
                         <img
                           src=${video.authors[0]?.profile_picture}
                         />
                       </div>
                     </div>
                   </div>
             </div>
           <h2 class="card-title">
             ${video.title}
             
           </h2>

         </div>
          <div >
            <div class="flex flex-row  ">
                 <h6> ${video.authors[0]?.profile_name}</h6>
                ${video.authors[0]?.verified ==true?"<img src='fi_10629607.svg'/>" : '' }
                
             </div>
             <p>${video.others.views} </p>
           </div>  
        </div>
   </div>
     `

    
cardContainer.appendChild(videosDiv);


  });
  
  }
  




loadCategories()
loadVideos('1000')