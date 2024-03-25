const container = document.getElementById("chat-container");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const socket = io()
socket.emit('user-con-msg', (name))

function addMessage(name, message) {
    let myMsgEle = document.createElement("p");
    myMsgEle.classList.add('right-msg')
    myMsgEle.innerHTML = `${name}: ${message}`
    container.appendChild(myMsgEle);
}

function addGotMessage(name, message){
    let myMsgEle = document.createElement("p");
    myMsgEle.classList.add('left-msg')
    myMsgEle.innerHTML = `${name}: ${message}`
    container.appendChild(myMsgEle);
}

function sendMessage(){
    let message = messageInput.value
    const msgObj = {name, message}
    addMessage(msgObj.name, msgObj.message);
    messageInput.value = ''
    socket.emit('user-send-msg', msgObj)
}

socket.on('new-user-con-msg-show', (name)=>{
    let userAlertEle = document.createElement('p')
    userAlertEle.classList.add('user-alert')
    userAlertEle.innerHTML = `User Joined ${name}`
    container.appendChild(userAlertEle)
})

socket.on('got-user-msg', (serverMsgObj)=>{
    addGotMessage(serverMsgObj.name, serverMsgObj.message)
})

sendBtn.addEventListener("click", ()=>{
    sendMessage()
})

messageInput.addEventListener("keydown", (e)=>{
    if (e.key === 'Enter'){
        sendMessage()
    }
})