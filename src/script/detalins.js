
const id = sessionStorage.getItem("id")

async function getCountryDetails() {

    const response = await fetch(`https://restcountries.com/v3.1/name/${id}?fullText=true`);
    const data = await response.json();

    createPageCountry(data)
}
getCountryDetails()

function createPageCountry(data){

    const country = document.querySelector('.country');
    country.innerHTML = ''

    data.forEach(e => {
        let { flags,  name, population, region, subregion, capital, tld, currencies, languages, borders } = e

        const objNameNative = Object.values(name)[2] 
        
        country.innerHTML += `
            <div class="country-img">
                <img src=${flags.svg} alt="">
            </div>

            <div class="country-info-pg">
                <h1 class="country-info-name">${name.common}</h1>

                <div class="country-info-details">
                    <div class="country-info-details-col_1">
                        <p>Native Name:<span> ${Object.values(objNameNative)[0].common}</span></p> 
                        <p>Population: <span>${population}</span> </p>
                        <p>Region: <span>${region}</span></p> 
                        <p>Sub Region: <span>${subregion}</span></p> 
                        <p>Capital: <span>${capital}</span></p>
                    </div>
                    
                    <div class="country-info-details-col_2">
                        <p>Top Level Domain: <span>${tld}</span></p>
                        <p>Currencies: <span>${Object.values(currencies)[0].name}</span></p>
                        <p>Languages: <span>${Object.values(languages)[0]}</span></p>
                    </div>
                </div>

                <div class="border-countries">
                    <p>border Countries:</p>
                    <ul class="border-countries-tags">
                       ${borders.map(a => `
                        <li class="border-countries-tags-item" data-val='${a}'>${a}</li>
                       `
                       ).join('')}
                    </ul>
                </div>
            </div>
        `

    document.querySelectorAll('.border-countries-tags-item').forEach(tags => {
        tags.addEventListener('click', () => {
            const tagsCountry = tags.getAttribute('data-val')
            getTags(tagsCountry)
        })
    })
    });
}

async function getTags(tagsCountry){

    const response = await fetch(`https://restcountries.com/v3.1/alpha/${tagsCountry}`);
    const data = await response.json();

    createPageCountry(data)
}

document.querySelector('.back').addEventListener('click', () => {
window.location = 'index.html'
})

const $html = document.querySelector('html')
const $btnMode = document.querySelector('#btn-mode')

$btnMode.addEventListener('click', () => {
    $html.classList.toggle('dark-mode')
})
