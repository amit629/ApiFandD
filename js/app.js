const searchTarget=document.querySelector('.InputCon > input')
let layou=document.querySelector('.otpt');
let outputCon=document.querySelector('.ApiOutput')
let popup=document.querySelector('.popup')
let dataPopup=document.querySelector('.popup > span')


const FavouritesCheck=(id)=>{
    if(!JSON.parse(localStorage.getItem('fav')))
    {
        localStorage.setItem('fav',JSON.stringify([]));
    }
    let data=JSON.parse(localStorage.getItem('fav'))
    console.log(data)

    if(data.includes(id))
    {
        data=data.filter(item=> item != id);
        dataPopup.innerHTML="Removed from Favourites";
    }
    else{
        data.push(id);
        dataPopup.innerHTML="Added to Favourites";
    }

    localStorage.setItem('fav',JSON.stringify(data));
    popup.classList.remove('d-none')
    setTimeout(()=>{
        popup.classList.add('d-none')
    },1000)
    DataRendrer();
}

const checkInFav=(id)=>{
    if(!JSON.parse(localStorage.getItem('fav'))){
        localStorage.setItem('fav',JSON.stringify([]))
    }
    let dataArr=JSON.parse(localStorage.getItem('fav'));
    return dataArr.includes(id);
}

const DataRendrer=()=>{
    const searchParam=searchTarget.value;
    if(searchParam=="")
    {
        outputCon.innerHTML="";
    }
    fetch(`https://api.tvmaze.com/search/shows?q=${searchParam}`).then((res)=>{
        return res.json();
    }).then((dataBuff)=>{
        // console.log(dataBuff);
        outputCon.innerHTML="";
        dataBuff.forEach((ele)=>{
            console.log(ele);
            let imageSrc="";
            let alt="no image";
            try{
                imageSrc=ele.show.image.original;
            }
            catch(e)
            {
                try{
                    imageSrc=ele.show.image.medium;
                }
                catch(e)
                {
                    imageSrc="";
                }
            }
            let data="";
            const data1=`
                <div class="container-fluid sp-height">
                    <div class="row">
                        <div class="col-2"><img class="imgSp text-white" src="${imageSrc}" alt="${alt}"></div>
                        <div class="col-10 d-flex flex-column justify-content-around align-item-center">
                            <h5 class="text-white">${ele.show.name}</h5>
                            <button><a class="detailsTab" href="./views/details.html?id=${ele.show.id}">Details&#128170</a></button>
                            <button class="favTab btn btn-danger d-flex align-items-center justify-content-center" onclick="FavouritesCheck(${ele.show.id})"><span>Add to My Favourites &#10084</span></button>
                        </div>
                    </div>
                </div>
            `
            const data2=`
                <div class="container-fluid sp-height">
                    <div class="row">
                        <div class="col-2"><img class="imgSp text-white" src="${imageSrc}" alt="${alt}"></div>
                        <div class="col-10 d-flex flex-column justify-content-around align-item-center">
                            <h5 class="text-white">${ele.show.name}</h5>
                            <button><a class="detailsTab" href="./views/details.html?id=${ele.show.id}">Details&#128170</a></button>
                            <button class="favTab btn btn-danger d-flex align-items-center justify-content-center" value="1" style="padding-bottom:12px;" onclick="FavouritesCheck(${ele.show.id})"><span style="font-size:20px;">Remove from My Favourites <span class=" fw-bold " style="font-size:25px !important;color:rgb(255, 0, 0) !important;">&#120;</span></span></button>
                        </div>
                    </div>
                </div>
            `

            if(checkInFav(ele.show.id))
            {
                data=data2;
            }
            else{
                data=data1;
            }
            
            if(imageSrc)
            {
                outputCon.innerHTML+=data;
            }
        })
    })
}
searchTarget.addEventListener('input',DataRendrer)




