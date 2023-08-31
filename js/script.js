const allCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const result = data.data;
    console.log(result);

    // get the id where I'll show the categoris name
    const categoryId = document.getElementById('category-id');

    // get all category element using forEach
    result.forEach(category => {
        console.log(category);

        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <a class="tab">${category.category}</a>
        `;
        categoryId.appendChild(createDiv);
    })

    

}

allCategory();