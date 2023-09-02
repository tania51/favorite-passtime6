const loadsortByView = async categoryId => {



    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const dataId = await data.data;
    categoryId = 0;
    const sortClicked = document.getElementById('sort-btn');
    sortClicked.addEventListener('click', async function() {
        
        sortByView2(dataId);
        
    })


}


const viewHandler = views => {
    return parseFloat(views.replace('k', '')) * 1000;
    
}




const sortByView2 = (productData) => {
    console.log(productData)


    const productId = document.getElementById('product-id');
    
    productId.innerHTML = '';

    
    const noProduct = document.getElementById('no-content');

    const viewSortMost = productData.sort((mostView, lessView) => {
        const ash = viewHandler(mostView.others.views);
        const aura = viewHandler(lessView.others.views);
        return aura - ash;
    })

    viewSortMost.forEach((product) => {
        

        // console.log(product.others.views)
        const postDate = product?.others?.posted_date;
       
        

        const postDateInt = parseInt(postDate);

            const secToHr = postDateInt / 3600;
            const finalHr = Math.floor(secToHr);
            // console.log(finalHr);

            // sec to min

            const reminder = postDateInt % 3600;
            const min = reminder / 60;
            const finalMin = Math.floor(min);
        

        const date2 = `${finalHr} hrs ${finalMin}`;
        const date = `<span class="absolute bg-[#171717] text-white px-3 py-1 rounded-lg bottom-2 right-2">${date2}</span>`
        
        const result = (postDate != '') ? date : '';
        // console.log(result);

        
        const authorData = product?.authors[0];
        // console.log(authorData);
        const thumbnail = authorData.profile_picture;
        const title = authorData.profile_name;
        const verified = authorData.verified;
        const viewsNum = authorData.views;

        // console.log(thumbnail);

        // const authorData = product?.authors;
        // authorData.forEach(authorDetails => {


            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
            <div class="card">
                <figure class="relative"><img class="object-cover w-full h-48 rounded-lg" src="${product?.thumbnail}" alt="" />${result}</figure>
                <div class="card-body">
                    <h2 class="card-title text-[#171717] font-bold">
                        <img class="w-8 h-8 rounded-full" src="${thumbnail}" alt="">
                        ${title}
                    </h2>
                    <div>
                        <p class="text-sm text-[#595959]">${viewsNum}
                        <span class="pl-2"></span>
                        </p>
                    </div>
                    <p class="text-sm text-[#595959]">${product?.others?.views} views</p>
                </div>
            </div>
            `;

            productId.appendChild(productDiv);
        // })


    })
}