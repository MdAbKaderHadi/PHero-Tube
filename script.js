const getAllCategories = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await response.json();
    const sendArrayToSetTabs = data.data;
    setTabs(sendArrayToSetTabs);
}

const getIndividualCategory = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    loadCards(data.data);
    document.getElementById("sort-button").addEventListener("click", function () {
        const mainData = data.data;
        mainData.sort((a, b) => {
            return b?.others?.views.slice(0, -1) - a?.others?.views.slice(0, -1)
        })
        loadCards(mainData)
    })
}

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 100 100">
<circle cx="50" cy="50" r="45" fill="#0074d9" />
<circle cx="50" cy="50" r="45" fill="none" stroke="#fff" stroke-width="4" />
<path d="M35 50l10 10 20-20" fill="none" stroke="#fff" stroke-width="6" />
</svg>`;


const setTabs = (data) => {
    const tabsContainer = document.getElementById("tabs");
    data.forEach((category) => {
        const a = document.createElement("a");
        a.classList.add("tab", "tab-lifted", "text-lg", "font-semibold");
        a.addEventListener('click', () => {
            getIndividualCategory(category.category_id);
            document.querySelector('.tab-active')?.classList.remove('tab-active');
            a.classList.add('tab-active');
        });
        a.innerText = `${category.category}`;
        tabsContainer.appendChild(a);
    });
    const firstTab = document.querySelector(".tab");
    firstTab.classList.add("tab-active")
}



const loadCards = (cards) => {
    const getCardsContainer = document.getElementById("cards-container");
    const cardsSection = document.getElementById("cards-section");
    cardsSection.innerHTML = "";
    getCardsContainer.textContent = "";
    if (cards.length !== 0) {
        cards.forEach((card) => {
            const div = document.createElement("div");
            div.classList.add("mb-6");
            div.innerHTML = `
            <img class="rounded-lg mb-5 w-[425.75px] h-[250px]" src=${card.thumbnail} alt="">
                <div class="flex">
                    <img class="rounded-full w-[40px] h-[40px] mr-3" src=${card?.authors[0]?.profile_picture} alt="">
                        <div>
                    <p class="text-base font-bold mb-[10px]">${card?.title}</p>
                    <p class="text-sm font-normal text-[#171717B2] mb-[10px] flex items-center">${card?.authors[0]?.profile_name}<span class="ml-1">${card?.authors[0]?.verified ? icon : ""}</span></p>
                    <p class="text-sm font-normal text-[#171717B2] mb-[10px]">${card?.others?.views.slice(0, -1)}<span>K Views</span></p>                   
                </div>
            </div>
        `
            getCardsContainer.appendChild(div);
        })
    }
    else {
        cardsSection.innerHTML = `
            <img class="mt-20" src="./Images/Icon.png" alt="">
            <p class="text-3xl font-semibold mt-10">Oops!! Sorry, There is no content here</p>
        `;
    }

}



getAllCategories();
getIndividualCategory("1000")