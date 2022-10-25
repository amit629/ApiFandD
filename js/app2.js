const urlParams = new URLSearchParams(window.location.search);
const dataId=urlParams.get('id');
console.log(dataId);
let detailSub=document.querySelector('.detailsSub');
let popup=document.querySelector('.popup')
let dataPopup=document.querySelector('.popup > span')


const checkFav=(id)=>{
    let arrData=JSON.parse(localStorage.getItem('fav'));
    return arrData.includes(id);
}

const renderFav=()=>{
    fetch(`https://api.tvmaze.com/shows/${dataId}`).then((response)=>{
        return response.json()
    }).then((res)=>{
        console.log(res);
        let imgUrl="";
        try{
            imgUrl=res.image.original;
        }
        catch(e)
        {
            imgUrl=res.image.medium;
        }
        let data="";
        let data1=`
            <img src="${imgUrl}" alt="no image">
            <h1>${res.name}</h1>
            <i class="fa-solid fa-heart text-danger hartedAnim" onclick="heartPlace(${dataId})" ></i>
        `
        let data2=`
            <img src="${imgUrl}" alt="no image">
            <h1>${res.name}</h1>
            <i class="fa-regular fa-heart text-danger hartedAnim" onclick="heartPlace(${dataId})" ></i>
        `
        if(checkFav(res.id))
        {
            data=data1;
        }
        else{
            data=data2;
        }

        detailSub.innerHTML=data;
    })
}

const heartPlace=(id)=>{
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

    renderFav();
}
renderFav();