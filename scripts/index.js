// //document.addEventListener("DOMContentLoaded", function (event) {
// define(function (require) {
//   require('../data/products');
//   console.log('prodct');
// });

// var products= require('myobject')

//console.log('products',products);

let data = {
  products: [
    {
      title: "Androidtilte",
      image: " ",
      price: " 250",
      tag: ["android", "phone", "mobile", "smartphone"]
    },
    {
      title: "Androidtilte",
      image: " ",
      price: " 250",
      tag: ["android", "phone", "mobile", "smartphone"]
    },
    {
      title: "Iphonetitle",
      image: " ",
      price: " 50",
      tag: ["iphone", "phone", "mobile", "smartphone"]
    },
    {
      title: "Iphonetitle",
      image: " ",
      price: " 50",
      tag: ["iphone", "phone", "mobile", "smartphone"]
    }
  ]
};
let products = JSON.parse(JSON.stringify(data));

window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;

if (!("webkitSpeechRecognition" in window)) {
  alert("Unable to use the Speech Recognition API");
}

const recognition = new SpeechRecognition();
const icon = document.querySelector("i.fa.fa-microphone");
let paragraph = document.createElement("p");
let container = document.querySelector(".text-box");
container.appendChild(paragraph);
recognition.lang = "en-US";
icon.addEventListener("click", () => {
  dictate();
});

const dictate = () => {
  // let result = getResult(products["products"], "android mobile");
  // console.log("result", result);

  recognition.start();

  recognition.onresult = event => {

    if (typeof event.results === "undefined" ) {
      //Something is wrong…
      recognition.stop();
      let result = document.getElementById("search-result");
      result.innerText = "something went wrong, please try again";
      return;
    }
    if (event.results[0].isFinal) {
      const speechToText = event.results[0][0].transcript;

      paragraph.textContent = speechToText;
      let result = getResult(products["products"], speechToText);
       console.log("result", result);
      console.log("isfinal");
    }
  };

  recognition.onnomatch = event => {
    let result = document.getElementById("search-result");
    result.innerText = "no matching results found";
    console.log("no matching results found");
    return;
  };

  recognition.onerror = event => {
    let result = document.getElementById("search-result");
    result.innerText = event.error;
    console.log(event.error);
    return;
  };
};

function getResult(products, textKey) {
  var results = [];
  for (var index = 0; index < products.length; index++) {
    // if (!(products[index].tag.indexOf(textKey.toLowerCase()) == -1)) {
    //   results.push(products[index]);
    // }
     if (contains(products[index].tag,textKey.toLowerCase()) == 1) {
       results.push(products[index]);
     }
  }
  return results;
}


function contains(target, pattern) {
  var valuePresence = 0;
  var patternArray = pattern.split(" ");
  for (var index=0; index < patternArray.length; index++){
      if(target.includes(patternArray[index])){
          valuePresence++;
      }
  }
  return valuePresence === patternArray.length;
}

