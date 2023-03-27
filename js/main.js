const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

if(SpeechRecognition){
  console.log("Your browser supports speech recognition");
  
  var synth = window.speechSynthesis;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;  
recognition.lang = 'en-GB';

  // listening on mic button events
  const micButton = document.querySelector('#micButton');
  const micImage = micButton.querySelector("img");
  const suggestionContainer = document.querySelector('#suggestion');
  suggestionContainer.style.display = 'none';

  micButton.addEventListener("click", micButtonClick);
  function micButtonClick(){
    if(micImage.src.includes("play")){
      // start speech recognition on button click
      
      recognition.start();
    }else{
      // stop speech recognition
     
      recognition.stop();
    }
  }

  // events on start of speech-recognition
  recognition.addEventListener("start", startSpeechRecognition);
  function startSpeechRecognition(){
    micImage.src = "images/user-talking.gif";    
  suggestionContainer.style.display = 'block';
    console.log('speech active');
  }

   // events on start of speech-recognition
   recognition.addEventListener("end", endSpeechRecognition);
   function endSpeechRecognition(){

    suggestionContainer.style.display = 'none';
    micImage.src = "images/play.gif";
     console.log('speech disconnected');
   }

   // events of result from speech
  recognition.addEventListener("result", resultOfSpeechRecognition);
  function resultOfSpeechRecognition(event){
    var lengthOfSequence = event.resultIndex;

    // gets transcript of last statement
    const transcript = event.results[lengthOfSequence][0].transcript;
    console.log(transcript);
   speakOut(transcript); 
  }

  
/// speaks out from system
function speakOut(word){
  var speechUtterance = new SpeechSynthesisUtterance(word);
  speechUtterance.onstart = function (event) {
    console.log('SpeechSynthesisUtterance.onstart');
    micImage.src = "images/system-talking.gif";    // system is talking
  }
  speechUtterance.onend = function (event) {
    micImage.src = "images/user-talking.gif";    
    console.log('SpeechSynthesisUtterance.onend'); // system finished talking
  }
  speechUtterance.onerror = function (event) {
    console.error('SpeechSynthesisUtterance.onerror');
    micImage.src = "images/user-talking.gif";
  }
  synth.speak(speechUtterance);
  //utterThis.onend = afterSpeechCallback;
}

}


// draggable
const list_items = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');

for (let i = 0; i < list_items.length; i++) {
  const item = list_items[i];

    // on start of dragging item, remove item from list 
    item.addEventListener('dragstart', function() {
      draggedItem = item;
      setTimeout(function() {
        item.style.display = 'none';
      }, 0);
    });
    // on end of dragging card item
    item.addEventListener('dragend', function() {
      setTimeout(function() {
        draggedItem.style.display = 'block';
        draggedItem = null;
      }, 0);
    });
  

  for (let j = 0; j < lists.length; j++) {
    const list = lists[j];
    // dragged over the list container
    list.addEventListener('dragover', function(e) {
      e.preventDefault();
    });

    // dragged into the list container
    list.addEventListener('dragenter', function(e) {
      e.preventDefault();
      //this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    });

    // drag away from list container
    list.addEventListener('dragleave', function(e) {
     // this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    // drop in container, append item to the list container
    list.addEventListener('drop', function(e) {
      this.append(draggedItem);
     // this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });
  }
}

// automatic movement after 5 seconds
setTimeout(function() {
  const secondList = document.querySelectorAll('.list')[2]; // 0,1,2 -> rows of list
  const itemB = document.querySelector('#b');
  
  secondList.appendChild(itemB);
}, 5000);