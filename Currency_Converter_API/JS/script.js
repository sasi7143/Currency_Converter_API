// let BASE_URL = `https://v6.exchangerate-api.com/v6/43ba2136638c39c553314284/latest/`;

const dropList = document.querySelectorAll(".drop-list select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
//const msg = document.querySelector(".msg");


for (const select of dropList) {    
    for (currency_code in country_code){
    // console.log(code, country_code[code]);    
    let newOption = document.createElement("option");
    newOption.innerText = currency_code;
    newOption.value = currency_code;

    if(select.name === "from" && currency_code === "USD"){
        newOption.selected = "selected";
    } else if (select.name === "to" && currency_code === "INR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
}
  select.addEventListener("change", (evt) => {
    updateFlags(evt.target);
  })
}

const updateFlags = (element) => {
    let currency_code = element.value;
    // console.log(currency_code);
    let countyCode = country_code[currency_code];
    let newsrc = `https://flagsapi.com/${countyCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newsrc;
};

// temporary currency code FROM to TO change the passing the drop-list
const exchangeIcon = document.querySelector(".drop-list .icon");
    exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempCode;
    updateFlags(fromCurr);
    updateFlags(toCurr);
    getExchangeRate();
});

function getExchangeRate() {
    let amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    let amtvalue = amount.value;
     console.log(amtvalue);
    if (amtvalue === "" || amtvalue < 1) {
        amtvalue = 1;
        amount.value = "1";
    }
    //console.log(fromCurr.value, toCurr.value);
    // const URL = `${BASE_URL}/${fromCurr.value}`;
    //exchangeRateTxt.innerText = `Getting Exchange Rate....`;
    let URL = `https://v6.exchangerate-api.com/v6/43ba2136638c39c553314284/latest/${fromCurr.value}`;
    // fetch api response and returning it with parsing into js obj and in another then method receiving that obj  
    fetch(URL).then(response => response.json()).then(result => {
        let exchangerate = result.conversion_rates[toCurr.value]
        let totalExchangeRate = (amtvalue * exchangerate).toFixed(2);
         //console.log(totalExchangeRate);
        // const exchangeRateTxt = document.querySelector(".exchange-rate");
        exchangeRateTxt.innerText = `${amtvalue} ${fromCurr.value}  = ${totalExchangeRate} ${toCurr.value}`;
        //console.log(exchangeRateTxt);
    }).catch(() => {
        exchangeRateTxt.innerText = "something went wrong";
    })
}


btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    getExchangeRate();
});

window.addEventListener("load", () => {
    getExchangeRate();
});