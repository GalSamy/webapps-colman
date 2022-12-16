let cardAmount;
let cardsIds=[]
let flippedMap = new Map;
let cards =[]
var cardContainer = document.getElementsByClassName("card-container")
let clickedPair=-1
let lastCard
$(document).ready(() =>{
    console.log("document ready")
})

function change(){
    const slider = $("#cardsAmountRange")
   cardAmount = slider.val()
    $("#amount").val(cardAmount)
}
function gameInit(){
    $("#main-form").css("cssText", "display : none !important")
    $("#Title").append(`You Have ${(cardAmount / 2)} Seconds To Look At The Cards!`)


    for(let i=0.5;i<=cardAmount/2;i+=0.5)
    {
        cardsIds.push(Math.ceil(i))
    }
    console.log(cardsIds)
    // cardsIds.forEach(element => {
    //     createCard(element)
    // });
    let row = document.createElement('div')
    row.className= 'row'
    cardContainer[0].appendChild(row)
    createCards()
    let i = 0;

    const timeout = setTimeout(() =>{
        clearInterval(interval)
        for (const card in cardsIds){
            flipCard(card)
        }
        $("#Title").text("Time : 0")
        let time = 0;
        const stoper = setInterval(() =>{
            $("#Title").text(`Time : ${time}`)
            time++
        },1000)

    }, (cards.length / 2 + 1) * 1000)

    const interval = setInterval(function (){


            $("#Title").text(`You Have ${(cards.length / 2) - i} Seconds To Look At The Cards!`)
            i++;
        }, 1000)

}
function createCards(){
    let i=0
    cardsIds.forEach(pair => {
        cards.push(createCard(pair,i))
        flippedMap.set(i, false);
        i++
    });
    console.log(cards)
    let row = document.createElement('div')
    shuffle()
    row.className = 'row'
    cards.forEach(card => {
        row.appendChild(card)
    });
    cardContainer[0].appendChild(row)
    
}
function shuffle(){
    let currentIndex = cards.length,  randomIndex;

  // While there remain elements to shuffle.
    while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [cards[currentIndex], cards[randomIndex]] = [
      cards[randomIndex], cards[currentIndex]];
    }
}
function clicked(card){
  //  flipCard(card.id) not sure what to do here;
    console.log("clickedPair: "+clickedPair)
    console.log("clickedPair: "+clickedPair)
    if(clickedPair == -1)
    {
        card.style.backgroundColor = randomColor()
        lastCard=card
        clickedPair=card.getAttribute("data-pair")

    }
    else if(card.getAttribute("id")==lastCard.getAttribute("id")){
        card.style.backgroundColor="transparent"
        clickedPair =-1

    }
    else if(card.getAttribute("data-pair") == clickedPair)
    {
        card.style.backgroundColor=lastCard.style.backgroundColor
        clickedPair = -1
    }
    else{
        lastCard.style.backgroundColor = "transparent"
        clickedPair=-1
    //    flipCard(card.id)
    } 
    
}
function randomColor()
{
    return '#'+Math.floor(Math.random()*16777215).toString(16);
} 
function createCard(pair,id){

    let card = document.createElement('div')
    card.className =  'card col-2'
    card.setAttribute('id',id)
    card.setAttribute("onclick","clicked(this)")
    card.setAttribute('data-pair',pair)
    card.style.margin="1rem"
    card.style.height="10rem"
    
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.id = `cardBody-${id}`

    let title = document.createElement('h5');
    title.innerText = pair;
    title.className = 'card-title';
    title.id = `cardTitle-${id}`
    cardBody.appendChild(title)
    card.appendChild(cardBody)

    return card
    // let cardBody = document.createElement('div');
    // cardBody.className = 'card-body';

    // let title = document.createElement('h5');
    // title.innerText = task.title;
    // title.className = 'card-title';

    // let color = document.createElement('div');
    // color.innerText = task.color;
    // color.className = 'card-color';

    // cardBody.appendChild(title);
    // cardBody.appendChild(color);
    // card.appendChild(cardBody);
    // cardContainer.appendChild(card);
}
function flipCard(card) { // flipped is false by default
    console.log(card)
    if(flippedMap.get(card)){ // flipped => hidden
        $(`#cardTitle-${card}`).css("cssText", "display : flex !important")
        $(`#cardBody-${card}`).css("cssText", "display : flex !important")
        flippedMap.set(card, false);
    }else{ // hide
        $(`#cardTitle-${card}`).css("cssText","display : none !important")
        $(`#cardBody-${card}`).css("cssText","display : none !important")
        flippedMap.set(card,true);
        console.log(`flipped ${card}`)
    }
} //
