const $countriesEl = document.querySelector('#countries')

async function getCountries(){
    await fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json() )
    .then(data => createCard(data))
    .catch(err => alert(`[ERRO]: something is wrong, ${err}`))
}

async function filterByRegion(region) {
    await fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then(response => response.json())
    .then(data => createCard(data))
    .catch(err => alert(`[ERRO]: ${err}something is wrong`))
}

async function searchByName(name) {
    await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then(response => response.json())
    .then(data => createCard(data))
    .catch(err => alert(`[ERRO]: something is wrong`))
}

getCountries()

function createCard(data) {
    $countriesEl.innerHTML = ''
    data.forEach((country) => {

        let { name, population, region, capital, flags } = country

        $countriesEl.innerHTML += `
        <div class='card-container' data-val='${name.common}'>
            <div class="coutry-flag">
                <img src=${flags.png}>
            </div>
            <div class="country-info">
                <h1 class='coutry-name'>${name.common}</h1>
                <p class='status'>Population: <span>${population.toLocaleString('en-US')}</span></p>
                <p class='status'>Region: <span>${region}</span></p>
                <p class='status'>Capital: <span>${capital}</span></p>
            </div>
        </div>`;
    });

    let countries = document.querySelectorAll(".card-container");
    return getId(countries);
}

function getId(array) {
    array.forEach((item) => {
        item.addEventListener("click", () => {
            let countryName = item.getAttribute('data-val').toLocaleLowerCase();
            MoreInfo(countryName, 'country-Info.html')
        })
    });
}

function MoreInfo(id, destination) {
    sessionStorage.setItem("id", id)
    window.location = destination
}

function handleKeypress({key, target}) {
    if (key === 'Enter') {
        searchByName(target.value.toLocaleLowerCase().trim());
    }
}

const $searchCountry = document.querySelector('.search-country')
const $regionList = document.querySelector('.region-list');
const $html = document.querySelector('html');
const $btnMode = document.querySelector('#btn-mode');

$searchCountry.addEventListener('keypress', handleKeypress)
document.querySelector('.btn-filter').addEventListener('click', ()=>{
    const arrow = document.querySelector('.arrow')
    arrow.style.transform.rotate = '180deg'
    arrow.classList.toggle('active')
    $regionList.classList.toggle('active')
})

$btnMode.addEventListener('click', () => {
    $html.classList.toggle('dark-mode')
})

document.querySelectorAll('.region').forEach(e=> e.addEventListener('click', () => {
    const getRegion = e.getAttribute('data-val')
    filterByRegion(getRegion)
}))

document.querySelector('.lupa').addEventListener('click', () => {
    searchByName($searchCountry.value.toLocaleLowerCase().trim());
})