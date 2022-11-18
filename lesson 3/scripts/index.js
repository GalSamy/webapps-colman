let txt
let txtbox = document.getElementById('txtbox');
function Add(num){
    txt = txtbox.value;
    console.log(txt+num)
    txtbox.value = txt+num
    txt=txt+num
}
function calculate(){
    txtbox.value = eval(txt)
}

function txtdelete(){
    txt = txt.slice(0,txt.length-1);
    txtbox.value = txt;
}