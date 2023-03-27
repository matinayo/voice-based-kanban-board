const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const createTaskPhrases = ['create', 'insert', 'add', 'implement', 'make', 'generate', 'compose', 'form', 'formulate', 'setup'];
const updateTaskPhrases = ['update', 'set', 'change', 'alter', 'modify', 'edit', 'correct'];
const taskIdList = ['M22', 'T16', 'M19']
const updateStatusPhrases = ['inprogress', 'progress', 'pending', 'completed']

var stage = 0;

if (SpeechRecognition) {
  console.log("Your browser supports speech recognition");

  var synth = window.speechSynthesis;
  const recognition = new SpeechRecognition();
  //recognition.continuous = true;
  recognition.lang = 'en-GB';

  // listening on mic button events
  const micButton = document.querySelector('#micButton');
  const micImage = micButton.querySelector("img");
  const suggestionContainer = document.querySelector('#suggestion');
  suggestionContainer.style.display = 'none';

  micButton.addEventListener("click", micButtonClick);
  function micButtonClick() {
    if (micImage.src.includes("play")) {
      // start speech recognition on button click

      recognition.start();
    } else {
      // stop speech recognition

      recognition.stop();
    }
  }

  // events on start of speech-recognition
  recognition.addEventListener("start", startSpeechRecognition);
  function startSpeechRecognition() {
    micImage.src = "images/user-talking.gif";
    suggestionContainer.style.display = 'block';
    console.log('speech active');
  }

  // events on start of speech-recognition
  recognition.addEventListener("end", endSpeechRecognition);
  function endSpeechRecognition() {

    suggestionContainer.style.display = 'none';
    micImage.src = "images/play.gif";
    console.log('speech disconnected');
  }

  // events on no match of speech-recognition
  recognition.addEventListener("nomatch", noMatchSpeechRecognition);
  function noMatchSpeechRecognition() {

    speakOut("Talk clearly boy!, I didn't recognize that, or have you got some hot buns in your mouth?");
    console.log('no match');
  }

  recognition.addEventListener("error", noerrorSpeechRecognition);
  function noerrorSpeechRecognition() {

    speakOut("Oops! I couldn't recognize that, looks like an error occured");
    console.log('no match');
  }

  // events of result from speech
  recognition.addEventListener("result", resultOfSpeechRecognition);
  function resultOfSpeechRecognition(event) {
    var lengthOfSequence = event.resultIndex;

    // gets transcript of last statement
    const transcript = event.results[lengthOfSequence][0].transcript;
    console.log(transcript);
    console.log(event.results[lengthOfSequence][0].confidence)
    // create
    var createTask = matchesSequence(createTaskPhrases, transcript);
    
    if (createTask) {
      createTaskProcess();
    }else{
      var updateTask = matchesSequence(updateTaskPhrases, transcript);      
      if(updateTask){
        stage = 20;
        // get the id of task to update
        var containsIdTask = matchesSequence(taskIdList, transcript);
       console.log(containsIdTask);
        if(!containsIdTask){
          // ask for ID of task
          console.log('no containsIdTask');
          stage = 21; // does not contain task of ID
          speakOut('Boy! Does your task not have an ID, what is the ID of your task?')

        }else{
          console.log('containsIdTask');
          stage = 22;
          // determine status to be updated to
          var status = matchesSequence(updateStatusPhrases, transcript);
          if(status){
            // contains status to be updated to
            updateTaskProcess(status, containsIdTask);
          }
          
        }
        
      }

    }

  }

  // function checks for matching sequence
  function matchesSequence(sequenceList, inputString) {
   const match = sequenceList.find(seq => inputString.toLowerCase().includes(seq.toLowerCase()));
   
   if(match){

      console.log('Match found!');
      return match;
    } else {
      console.log('No match found.');
      return null;
    }
  }

  // function to create task
  function createTaskProcess() {

  }
  // function to update task
  function updateTaskProcess(columnName, idTitle){
    var columnIndex = 0;
    if(columnName == 'progress' || columnName == 'inprogress'){
      columnIndex = 1;
    }else if(columnName == 'pending'){
      columnIndex = 0;
    }else if(columnName == 'completed'){
      columnIndex = 2;
    }

    console.log(columnIndex);
    console.log(idTitle);
    console.log('---');

    setTimeout(function () {
      const secondList = document.querySelectorAll('.list')[columnIndex]; // 0,1,2 -> rows of list
      
      const itemB = document.querySelector(`#${idTitle}`);
  
      secondList.appendChild(itemB);
    }, 2000);
  }


  /// speaks out from system
  function speakOut(word) {
    var speechUtterance = new SpeechSynthesisUtterance(word);
    speechUtterance.onstart = function (event) {
      console.log('SpeechSynthesisUtterance.onstart');
      micImage.src = "images/system-talking.gif";    // system is talking
    }
    speechUtterance.onend = function (event) {
      micImage.src = "images/play.gif";
      console.log('SpeechSynthesisUtterance.onend'); // system finished talking
    }
    speechUtterance.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror');
      micImage.src = "images/play-talking.gif";
    }
    synth.speak(speechUtterance);
    //utterThis.onend = afterSpeechCallback;
  }


  // draggable
  const list_items = document.querySelectorAll('.list-item');
  const lists = document.querySelectorAll('.list');

  for (let i = 0; i < list_items.length; i++) {
    const item = list_items[i];

    // on start of dragging item, remove item from list 
    item.addEventListener('dragstart', function () {
      draggedItem = item;
      setTimeout(function () {
        item.style.display = 'none';
      }, 0);
    });
    // on end of dragging card item
    item.addEventListener('dragend', function () {
      setTimeout(function () {
        draggedItem.style.display = 'block';
        draggedItem = null;
      }, 0);
    });


    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];
      // dragged over the list container
      list.addEventListener('dragover', function (e) {
        e.preventDefault();
      });

      // dragged into the list container
      list.addEventListener('dragenter', function (e) {
        e.preventDefault();
        //this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
      });

      // drag away from list container
      list.addEventListener('dragleave', function (e) {
        // this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
      });

      // drop in container, append item to the list container
      list.addEventListener('drop', function (e) {
        this.append(draggedItem);
        // this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
      });
    }
  }

  // automatic movement after 5 seconds
  // setTimeout(function () {
  //   const secondList = document.querySelectorAll('.list')[2]; // 0,1,2 -> rows of list
  //   const itemB = document.querySelector('#M22');

  //   secondList.appendChild(itemB);
  // }, 5000);
}

