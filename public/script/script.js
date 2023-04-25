console.log("heyyy")
let socket = io();
let messages = document.querySelector('section ul');
let inputText = document.querySelector('input#message');
let inputName = document.querySelector('input#name');
let send = document.querySelector('button#send');
let typingState = document.querySelector('p');

var Send = document.querySelector("div button");
var Message = document.querySelector("section ul li");

// get data from input fields
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
  let data = { name: inputName.value, message: inputText.value }
  // With emit create component
  socket.emit('chat', data);

  console.log(inputName.value, inputText.value);
  inputText.value = '';
})

// Eventlistener on keypress event in input text
inputText.addEventListener('keypress', () => {
  socket.emit('typing', inputName.value)
})

// Create message with the data and scroll down
socket.on('chat', (data) => {
  console.log(data);
  addChat(data)
  typingState.innerHTML= "";
})

// Create "is typing" from data with input name and set timeout
socket.on('typing', (inputName) => {
  console.log(inputName);
  typingState.innerHTML= ( inputName + " is aan het typen...")
  setTimeout(() => {
    typingState.innerHTML= "";
  }, 3000);
})

socket.on('history', (history) => {
  history.forEach((data) => {
    addChat(data)
  })
})

function addChat(data) {
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: data.name + ': ' + data.message }))
  messages.scrollTop = messages.scrollHeight
}


// eventlisteners
Send.addEventListener(
    "click",
    function () {
      Message.classList.add("send");
    },
    false
  );