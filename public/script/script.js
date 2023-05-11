console.log("heyyy")
let socket = io();
let messages = document.querySelector('section ul');
let inputText = document.querySelector('input#message');
// let inputMood = document.querySelector('input[name="mood"]:checked').value;
// let inputName = document.querySelector('input#name');
let send = document.querySelector('button#send');
let typingState = document.querySelector('p');

var Send = document.querySelector("div button");
var Message = document.querySelector("section ul li");


const btn = document.querySelector('#send');        
const radioButtons = document.querySelectorAll('input[name="mood"]');

// btn.addEventListener("click", () => {
//     let selectedMood;
//     for (const radioButton of radioButtons) {
//         if (radioButton.checked) {
//             selectedMood = radioButton.value;
//             break;
//         }
//     }

//     console.log(selectedMood)
//   });

// get data from input fields
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
        selectedMood = radioButton.value;
        break;
    }
}
  let data = {message: inputText.value, mood: selectedMood}
  // With emit create component
  socket.emit('chat', data);

  console.log(inputText.value);
  inputText.value = '';

  console.log(selectedMood)
})

// Eventlistener on keypress event in input text
// inputText.addEventListener('keypress', () => {
//   socket.emit('typing', inputName.value)
// })

// Create message with the data and scroll down
socket.on('chat', (data) => {
  console.log(data);
  addChat(data)
  typingState.innerHTML= "";
})

// Create "is typing" from data with input name and set timeout
// socket.on('typing', (inputName) => {
//   console.log(inputName);
//   typingState.innerHTML= ( inputName + " is aan het typen...")
//   setTimeout(() => {
//     typingState.innerHTML= "";
//   }, 3000);
// })

socket.on('history', (history) => {
  history.forEach((data) => {
    addChat(data)
  })
})

function addChat(data) {
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: data.message, classList: data.mood }))
  let li = document.querySelector("ul li:last-of-type")
  li.appendChild(Object.assign(document.createElement('button')))
  messages.scrollTop = messages.scrollHeight

let messageButton = document.querySelector('ul li:last-of-type button');
let clickCount = 0;
let message = document.querySelector('ul li:last-of-type')

messageButton.addEventListener('click', function() {
  if (clickCount === 0) {
    message.className = ""
    message.classList.add('happy');
  } else if (clickCount === 1) {
    message.className = ""
    message.classList.add('neutral');
  } else if (clickCount === 2) {
    message.className = ""
    message.classList.add('sad');
  } else if (clickCount === 3) {
    message.className = ""
    message.classList.add('happy');
  } else if (clickCount === 4) {
    message.className = ""
    message.classList.add('neutral');
  } else if (clickCount === 5) {
    message.className = ""
    message.classList.add('sad');
  }
  clickCount++;
});
}


// // eventlisteners
// Send.addEventListener(
//     "click",
//     function () {
//       Message.classList.add("send");
//     },
//     false
//   );
