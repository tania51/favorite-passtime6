const allCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const result = data.data;
    // console.log(result);

    // get the id where I'll show the categoris name
    const categoryId = document.getElementById('category-id');

    // get all category element using forEach
    result.forEach(category => {
        // console.log(category);

        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <a onclick="productDetails('${category.category_id}')" class="tab">${category.category}</a>
        `;
        categoryId.appendChild(createDiv);
    })


}

// category product details using card
const productDetails = async (categoryId) => {
    // console.log(categoryId);

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const productData = data?.data;
    // console.log(productData);



    // showing products using id
    const productId = document.getElementById('product-id');

    // get products using forEach from API
    productData.forEach(product => {
        // console.log(product);

        // get author data

        const authorData = product?.authors;
        // console.log(authorData);
        authorData.forEach(authorDetails => {
            // console.log(authorDetails);
            const badge = authorDetails?.verified;
            
            // if(badge === true) {
            //     const image = `<img src="./images/verified.png" />`
            // }else {
            //     console.log('');
            // }
            // const varifiedBadge = () => {
            //     if(badge === true) {
            //         return `<img class="object-cover w-full h-48 rounded-lg" src="./images/verified.png" alt="" />`
            //     }else {
            //         return '';
            //     }
            // }
            
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
            <div class="card">
                <figure><img class="object-cover w-full h-48 rounded-lg" src="${product?.thumbnail}" alt="" /></figure>
                <div class="card-body">
                    <h2 class="card-title text-[#171717] font-bold">
                        <img class="w-8 h-8 rounded-full" src="${authorDetails?.profile_picture}" alt="">
                        ${product?.title}
                    </h2>
                    <div>
                        <p class="text-sm text-[#595959]">${authorDetails?.profile_name}
                        <span class="pl-2"></span>
                        </p>
                    </div>
                    <p class="text-sm text-[#595959]">${product?.others?.views} views</p>
                </div>
            </div>
            `;

                productId.appendChild(productDiv);
            })


    })

}




allCategory();