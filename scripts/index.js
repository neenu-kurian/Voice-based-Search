let data = {
  products: [
    {
      title: "Samsung Galaxy",
      image: "../voice-search/images/android/android-1.jpg",
      price: "Price: 250$",
      tag: ["android", "phone", "mobile", "smartphone", "samsung"]
    },
    {
      title: "OnePlus 3T",
      image: "../voice-search/images/android/android-2.png ",
      price: "Price: 200$",
      tag: ["android", "phone", "mobile", "smartphone", "OnePlus"]
    },
    {
      title: "Samsung Galaxy",
      image: "../voice-search/images/android/android-1.jpg",
      price: "Price: 250$",
      tag: ["android", "phone", "mobile", "smartphone", "samsung"]
    },
    {
      title: "Samsung Galaxy",
      image: "../voice-search/images/android/android-1.jpg",
      price: "Price: 250$",
      tag: ["android", "phone", "mobile", "smartphone", "samsung"]
    },
    {
      title: "Iphone 6",
      image: "../voice-search/images/iphone/iphone-1.png",
      price: "Price: 200$",
      tag: ["iphone", "phone", "mobile", "smartphone", "apple"]
    },
    {
      title: "Iphone 7",
      image: "../voice-search/images/iphone/iphone-2.png",
      price: "Price: 200$",
      tag: ["iphone", "phone", "mobile", "smartphone", "apple"]
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

//function to display results
showResults = result => {
  document.getElementById("items-count").innerHTML =
    "Available Items:" + result.length;
  
    //mapping through each result and displaying it 
  result.map((eachresult, index) => {
    let wrapper = document.createElement("div");
    wrapper.id = "wrapper" + index;
    wrapper.className = "wrapper";
    document.getElementById("search-result").appendChild(wrapper);
    let title = document.createElement("p");
    title.className = "result-title";
    title.innerHTML = eachresult.title;
    document.getElementById(wrapper.id).appendChild(title);
    let image = document.createElement("img");
    image.className = "result-image";
    image.src = eachresult.image;
    document.getElementById(wrapper.id).appendChild(image);
    let price = document.createElement("p");
    price.className = "result-price";
    price.innerHTML = eachresult.price;
    document.getElementById(wrapper.id).appendChild(price);
  });
};

//function to display all data on page load
showAllItems = () => {
  let allresult = getResult(products["products"], "");
  showResults(allresult);
};

//logic to display all data on page load
document.querySelector("body").addEventListener("load", showAllItems());

icon.addEventListener("click", () => {
  dictate();
});

const dictate = () => {
  recognition.start();

  recognition.onresult = event => {
    clearResults();
    if (typeof event.results === "undefined") {
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
      if (result.length === 0) {
        let result = document.getElementById("search-result");
        document.getElementById("items-count").style.display = "none";
        result.innerText = "No results found";
        return;
      } else {
        showResults(result);
        document.getElementById("items-count").style.display = "block";
      }
    }
  };

  recognition.onerror = event => {
    let result = document.getElementById("search-result");
    result.innerText = event.error;
    console.log(event.error);
    document.getElementById("items-count").style.display = "none";
    return;
  };
};

function getResult(products, textKey) {
  var results = [];
  for (var index = 0; index < products.length; index++) {
    if (contains(products[index].tag, textKey.toLowerCase()) == 1) {
      results.push(products[index]);
    }
    if (textKey === "") {
      results.push(products[index]);
    }
  }
  return results;
}

function contains(target, pattern) {
  var valuePresence = 0;
  var patternArray = pattern.split(" ");
  for (var index = 0; index < patternArray.length; index++) {
    if (target.includes(patternArray[index])) {
      valuePresence++;
    }
  }
  return valuePresence === patternArray.length;
}

clearResults = () => {
  var myNode = document.getElementById("search-result");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
};
