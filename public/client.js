

const socket =io()
const textarea=document.querySelector('#textarea')
const messageArea=document.querySelector(".message_area")
var name;
do{
    name=prompt("Enter your name")
}while(!name);


textarea.addEventListener("keyup",(e)=>{
    if(e.key==="Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        message:message.trim(),
        user:name,
    }

    //append mssg 
    appendMessage(msg,"outgoing")
    textarea.value=''
    scroll()

    //send to server
    socket.emit("message",msg)
}


function appendMessage(msg,type){
    let maindiv=document.createElement('div')
    let className=type;
    maindiv.classList.add(className,"message")

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    maindiv.innerHTML=markup;
    messageArea.appendChild(maindiv)

}

//recciveve mssg

socket.on("message",(msg)=>{
    appendMessage(msg,"incoming")
    scroll()
})


function scroll(){
    messageArea.scrollTop=messageArea.scrollHeight
}