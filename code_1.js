let BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const btn=document.querySelector("form button");
let from=document.querySelector(".from select");
let to=document.querySelector(".to select");


const drops=document.querySelectorAll(".dropdown select");
for(let select of drops){
    for(code in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=code;
        newoption.value=code;
        select.append(newoption);
        if(select.name =="from"&& newoption.innerText=="USD"){
            newoption.selected="selected";
        }
        else if(select.name =="to"&& newoption.innerText=="INR"){
            newoption.selected="selected";
        }
    }
 
}
document.querySelectorAll(".dropdown select").forEach(select => {
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
});
const updateFlag = (element) =>{
    let currCode=countryList[element.value];
    let newsrc=`https://flagsapi.com/${currCode}/flat/64.png`;
    let flag=element.parentElement.querySelector("img");
    flag.src=newsrc;
}
btn.addEventListener("click",async (evt) => {
    evt.preventDefault();
    let amount=document.getElementById("input");
    if(amount.value<1){
        amount.value=1;
    }
    let URL=`${BASE_URL}/${from.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data=await response.json();
    let rate=data[from.value.toLowerCase()][to.value.toLowerCase()];
    let rate_print=document.querySelector(".msg");
    let output=Math.round(rate*amount.value);
    rate_print.innerHTML=`1 ${from.value} = ${Math.round(output)} ${to.value}`;
    // console.log(output);
   


})
