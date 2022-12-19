let cardAmount;
let cardsIds=[]
let flippedMap = new Map;
let cards =[]
var cardContainer = document.getElementsByClassName("card-container")
let clickedPair=-1
let lastCard
let amountCardsClicked=0
let totalTimeSeconds;
$(document).ready(() =>{
    console.log("document ready")
})

function change(){
    const slider = $("#cardsAmountRange")
   cardAmount = slider.val()
    $("#amount").val(cardAmount)
}
function gameInit(){
    let name = $(`#name`).val()
    console.log(name)

    if (cardAmount == null || name === ""){
        alert("please insert name and number of cards")
        return;
    }
    amountCardsClicked = 3
    
    $("#main-form").css("cssText", "display : none !important")
    let p = document.createElement("h1")
    p.textContent = `You Have ${(cardAmount / 2)} Seconds To Look At The Cards!`
    p.id = "pTitle"
    $("#Title").append(p)


    for(let i=0.5;i<=cardAmount/2;i+=0.5)
    {
        cardsIds.push(Math.ceil(i))
    }
    console.log(cardsIds)
    // cardsIds.forEach(element => {
    //     createCard(element)
    // });
    let row = document.createElement('div')
    row.className= 'row xl-4 l-3 m-2 s-2'
    cardContainer[0].appendChild(row)
    createCards()
    let i = 0;
    const interval = setInterval(function (){

        $("#pTitle").text(`You Have ${(cards.length / 2) - i} Seconds To Look At The Cards!`)
        i++;
    }, 1000)

    const timeout = setTimeout(() =>{

        clearInterval(interval)
        for (const card in cardsIds){
            flipCard(card)
        }
        console.log("pTitle : " + $("#pTitle").toString())

        $("#pTitle").text("Time : 0")
        let time = 0;
        const stopper = setInterval(() =>{
            $("#pTitle").text(`Time : ${time}`)
            time++

        },1000)
        const checker = setInterval(() =>{
            if (cardAmount === 0) {
                totalTimeSeconds = time;
                $(`#cards-row`).remove()
                $(`#pTitle`).text(`Good job, ${name}, You completed the game in ${totalTimeSeconds - 2} seconds`)
                let btn = document.createElement("button")
                let btnDiv = document.createElement("div")
                btnDiv.className = "d-flex justify-content-center"
                btn.className = "btn btn-success justify-content-center"
                btn.innerText = "Play Again!"
                btn.id = "endBtn"
                btn.setAttribute("onclick","initAgain(this)")
                document.body.appendChild(btnDiv)
                btnDiv.appendChild(btn)
                clearInterval(stopper)
                console.log("Cleared stopper")
                clearInterval(checker)
            }
        },1000)
        amountCardsClicked = 0
    }, (cards.length / 2 + 1) * 1000)


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
    row.className = 'row xl-5 l-3 m-2 justify-content-center'
    row.id = "cards-row"
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
    amountCardsClicked++
    console.log("amounts of cards: "+amountCardsClicked)
    console.log("clickedPair: "+clickedPair)
    if(amountCardsClicked<=2)
    {
        //in case first card clicked
        if(clickedPair == -1)
        {
            console.log('case 1')
            //card.style.backgroundColor = '#00ff00'
            lastCard=card
            clickedPair=card.getAttribute("data-pair")
            flipCard(card.id)
        }
        //in case the same card clicked twice
        else if(card.id==lastCard.id){
            console.log('case 2')
            flipCard(card.id)
            clickedPair =-1
            amountCardsClicked=0

        }
        //in case the correct card clicked
        else if(card.getAttribute("data-pair") == clickedPair)
        {
            console.log('case 3')
            flipCard(card.id)
            setTimeout(()=>{
            //card.style.backgroundColor=lastCard.style.backgroundColor
            clickedPair = -1
            amountCardsClicked=0
            },500)
            cardAmount -= 2
        }
        else{
            console.log('case 4')
            flipCard(card.id)
            setTimeout(()=>{
            flipCard(lastCard.id)
            flipCard(card.id)
            //lastCard.style.backgroundColor = "transparent"
            clickedPair=-1
            amountCardsClicked=0
        }, 500)
        }
    }
    
}
function randomColor()
{
    return '#'+Math.floor(Math.random()*16777215).toString(16);
} 
function createCard(pair,id){

    let card = document.createElement('div')
    let imgPath= "./assets/"+pair+'.png'
    card.className =  'card col-2'
    card.setAttribute('id',id)
    card.setAttribute("onclick","clicked(this)")
    card.setAttribute('data-pair',pair)
    card.style.margin="1rem"
    card.style.height="10rem"
    card.style.width="18rem"

    let img = document.createElement('img')
    img.src=imgPath
    img.className="card-img-top m-2"
    img.id=`card-img-${id}`
    img.style.width='100%'
    img.width = 200
    img.height = 150
    
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.id = `cardBody-${id}`

    let title = document.createElement('h5');
    title.innerText = pair;
   // title.className = 'card-title';
   // title.id = `cardTitle-${id}`
   // cardBody.appendChild(title)
    card.appendChild(img)
    //card.appendChild(cardBody)
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
    if(flippedMap.get(card)){ // flipped is true => hidden
        $(`#card-img-${card}`).css("cssText", "display : flex !important")
      //  $(`#cardBody-${card}`).css("cssText", "display : flex !important")
        flippedMap.set(card, false);
    }else{ // hide
        $(`#card-img-${card}`).css("cssText","display : none !important")
      //  $(`#cardBody-${card}`).css("cssText","display : none !important")
        flippedMap.set(card,true);
        console.log(`flipped ${card}`)
    }


} //

function initAgain(button){
    location.reload()
}
