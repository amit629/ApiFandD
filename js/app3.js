let CardContainer=document.querySelector('.appendCon')
let popup=document.querySelector('.popup')
let dataPopup=document.querySelector('.popup > span')

const removeHeart=(id)=>{
    let arrData=JSON.parse(localStorage.getItem('fav'));
    arrData=arrData.filter(item => item!=id);
    localStorage.setItem('fav',JSON.stringify(arrData));

    dataPopup.innerHTML="Removed from Favourites";
    popup.classList.remove('d-none');
    setTimeout(()=>{
        popup.classList.add('d-none');
    },1000);

    renderFav();
}

const renderFav=()=>{
    if(!JSON.parse(localStorage.getItem('fav')))
    {
        localStorage.setItem('fav',JSON.stringify([]))     
    }
    if(JSON.parse(localStorage.getItem('fav')).length!=0)   
    {
        CardContainer.innerHTML="";
        let idData=JSON.parse(localStorage.getItem('fav'));
        idData.forEach((ele)=>{
            fetch(`https://api.tvmaze.com/shows/${ele}`).then((response)=>{
                return response.json()
            }).then((res)=>{
                console.log(res);
                let imageUrl=""
                try{
                    imageUrl=res.image.original;
                }catch(e)
                {   
                    imageUrl=res.image.medium;
                }
                console.log(res);
                const data=`
                    <div class="card FavouritesCard" align="center">
                        <img src="${imageUrl}" class="card-img-top" alt="no img">
                        <div class="card-body">
                            <h5 class="card-title text-white">${res.name}</h5>
                            <h5 class="card-title text-white"><i class="fa-solid fa-heart text-danger hartedAnim" onclick="removeHeart(${res.id})"></i></h5>
                            <a href="./details.html?id=${res.id}" class="btn btn_darker">Details</a>
                        </div>
                    </div>
                `
                CardContainer.innerHTML+=data;
            })
        })
        
    }
    else{
        CardContainer.innerHTML="";
        const eleDiv=`
            <div class="emptyDiv">
                Nothing to Show Here
            </div>
        `
        CardContainer.innerHTML+=eleDiv;
    }
}

renderFav();
