let cardAmount;


$(document).ready(() =>{
    console.log("document ready")
})

function change(){
    const slider = $("#cardsAmountRange")
   cardAmount = slider.val()
    console.log(cardAmount)
    $("#amount").val(cardAmount)
}