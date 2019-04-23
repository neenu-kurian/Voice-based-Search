//document.addEventListener("DOMContentLoaded", function (event) {
    
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    
    if (!('webkitSpeechRecognition' in window)) {
        alert("Unable to use the Speech Recognition API");
    }

    const recognition = new SpeechRecognition();
   // recognition.continuous = true;
    const icon = document.querySelector('i.fa.fa-microphone')
    let paragraph = document.createElement('p');
    let container = document.querySelector('.text-box');
    container.appendChild(paragraph);
   // const sound = document.querySelector('.sound');
    
    icon.addEventListener('click', () => {
        // sound.play();
        dictate();
    });

    const dictate = () => {
        recognition.start();
        recognition.onresult = (event) => {
            if (typeof (event.results) === 'undefined') { //Something is wrong…
                recognition.stop();
                console.log('something went wrong, please try again');
                return;
            }
            //console.log('event results',event.results);
            if (event.results[0].isFinal) {
                const speechToText = event.results[0][0].transcript;

                paragraph.textContent = speechToText;
                console.log('isfinal');
            }
        }

        recognition.onnomatch = (event) => {
            let result = document.getElementById('search-result');
            result.innerText = 'no matching results found';
            console.log('no matching results found');
            recognition.stop();
            return;
         };

        recognition.onerror =  (event) => {
            let result = document.getElementById('search-result');
            result.innerText = 'something went wrong, please try again';
            console.log(event.error);
            recognition.stop();
            return;
        };

        console.log('event results', event.results);
        
    }

