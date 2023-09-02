const allCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    // console.log(data)
    const result = data.data;
    // console.log(result);

    catrgoryItem(result);



}


const catrgoryItem = (result) => {
    // console.log(result);

    

    // get the id where I'll show the categoris name
    const categoryId = document.getElementById('category-id');
    categoryId.innerHTML = '';
    // get all category element using forEach
    result.forEach(category => {
        // console.log(category);
        

        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <a onclick="productDetails('${category.category_id}')" class="tab">${category.category}</a>
        `;
        categoryId.appendChild(createDiv);
        const id = category.category_id
        // console.log(id)
        productDetails(id);
        loadsortByView(id);
    })
   
    
    
}



const productDetails = async (categoryId) => {
    // console.log(categoryId);

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const productData = data?.data;
    
    
    

    allProduct(productData);


    
    

}

const allProduct = (productData) => {
    const productId = document.getElementById('product-id');
    
    productId.innerHTML = '';

    
    const noProduct = document.getElementById('no-content');
    
    if (productData.length == 0) {
        noProduct.classList.remove('hidden');
    }
    else {
        noProduct.classList.add('hidden');
    }



    productData.forEach((product) => {
        
        // console.log(product.title)
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
        const verified = authorData.verified;

        const verifiedImg = `<img class="w-5 h-5" src="./images/verified.png" alt="">`
        const verifiedResult = verified ? verifiedImg : ''
        

            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
            <div class="card">
                <figure class="relative"><img class="object-cover w-full h-48 rounded-lg" src="${product?.thumbnail}" alt="" />${result}</figure>
                <div class="card-body">
                    <div class="flex">
                        <img class="w-8 h-8 rounded-full mr-4 mt-2" src="${thumbnail}" alt="">
                        <div>
                            <h2 class="card-title text-[#171717] font-bold">${product.title}
                            </h2>
                            <div class="flex py-2">
                                <p class="text-sm text-[#595959] flex-none">${authorData.profile_name}
                                </p>
                                <span class="pl-2 flex-1">${verifiedResult}</span>
                            </div>
                            <p class="text-sm text-[#595959]">${product?.others?.views} views</p>
                        </div>
                    </div>
                </div>
            </div>
            `;

            productId.appendChild(productDiv);
        // })


    })
}



allCategory();
productDetails(1000);