


const loadAllCategory = async() => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await response.json()

    const getCategorie_Container = document.getElementById("categorie_container")
    data.data.forEach((category) => {
        const div = document.createElement("div")
        div.innerHTML = `
        <a onclick="loadAllCategory_information('${category.category_id}')" class="tab md:text-3xl"> 
        ${category.category}
        </a>
        `
        getCategorie_Container.appendChild(div)
    });
    // console.log(data.data);
}

const loadAllCategory_information = async (categoryId) =>{
    // console.log(categoryId);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json()
    const getContent_container = document.getElementById("AllCategory_information-container")
    getContent_container.innerHTML = ""
    data.data?.forEach((datas)=> {
        console.log(datas);
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="card md:w-96 bg-base-100 md:shadow-xl">
        <figure><img class="w-[312px] h-[200px]" src=${datas?.thumbnail}
        /></figure>
        <a class="tab text-2xl bg-slate-700 text-[white] -mt-9">${datas?.others?.posted_date}</a>
        <div class="card-body flex text-center">
          <img class="rounded-full w-[40px] h-[40px]" src=
                ${datas?.authors[0]?.profile_picture}   
          />
          <p class=" text-2xl"> ${datas?.title}</p>
          <p class=" text-xl">${datas?.authors[0]?.profile_name}</p>
          <h3 class="text-2xl text-center">${datas?.others?.views? datas?.others?.views:"no views"}</h3>
        </div>
      </div>
        `
        getContent_container.appendChild(div)
    })
// console.log(data.data);
}

loadAllCategory()
loadAllCategory_information("1000")