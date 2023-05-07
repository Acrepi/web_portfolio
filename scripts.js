//let rainbowInterval;
let neonIntervals = [];
let itemsData = [
  {
    name: "Hoshi",
    shortname: "Hoshi",
    link: "https://acrepi.github.io/hoshi",
    desc: "Hoshi to strona internetowa pomagająca w porządkowaniu informacji o przedsprzedażach wykonywanych w różnych sklepach internetowych.<br> Pozwala ona na śledzenie oczekiwanych wydatków oraz ilości paczek.<br> Strona wykorzystuje mechanizm ciasteczek oraz localstorage.",
    pictures: ["hoshi_logo.svg","hoshi_screen1.png","hoshi_screen2.png"],
    color: "starOrange1"
  },
  {
    name: "Tski",
    shortname: "Tski",
    link: "",
    desc: "Tski jest stroną do postowania, przeglądania, sortowania i filtrowania rysunków. Wykorzystywana ma być głównie do znajdywania inspiracji przy tworzeniu własnych dzieł artystycznych. Wykorzystywać będzie język PHP i JS oraz mechanizm AJAX.",
    pictures: ["tski_logo.svg","tski_screen2.png","tski_screen3.png"],
    color: "moonBlue1"
  },
  {
    name: "Studio Muzyczne Szczecin",
    shortname: "StudioMuzyczneSzczecin",
    link: "https://www.studiomuzyczneszczecin.pl",
    desc: "Strona typu landing page zrobiona na zlecenie prywatnej szkoły muzycznej znajdującej się w Szczecinie. W niedalekiej przyszłości planowany jest rework<br> i odświerzenie wyglądu strony.",
    pictures: ["sms_logo.png","sms_screen1.png","sms_screen2.png","sms_screen3.png","sms_screen4.png"],
    color: "musicGreen1"
  },
  {
    name: "Projekt \"Village\"",
    shortname: "Village",
    link: "",
    desc: "Gra przeglądarkowa wykorzystująca element Canvas oraz język JS, tworzona jako inżynieryjski projekt dyplomowy. Inspirowana jest innymi tytułami, takimi  jak Stardew Valley, Pokemon Red/Blue czy Forager. Możliwe będzie granie <br>w nią zarówno na komputerach jak i telefonach dotykowych.",
    pictures: [],
    color: "gameRed1"
  },
];
let carrouselObjects = {};


function loadItems(){
  let itemsHolder = document.getElementById("itemsHolder");
  for (let i = 0; i < itemsData.length; i++){

    let item = document.createElement("div");
  	item.classList.add("item");
    item.setAttribute("id", itemsData[i]["name"]);
    item.setAttribute("onmouseover", "hoverItem(\'" + itemsData[i]["name"] + "\', \'" + itemsData[i]["color"] + "\')");
    //item.setAttribute("onmouseout", "colorRainbow()");
    item.setAttribute("onmouseout", "unhoverItem(\'" + itemsData[i]["name"] + "\')");

    let imageHolder = document.createElement("div");
    imageHolder.classList.add("imageHolder");
  	item.appendChild(imageHolder);

    let imageCarrouselHolder = document.createElement("div");
    imageCarrouselHolder.classList.add("imageCarrouselHolder");
    if (itemsData[i]["pictures"].length == 0){
      imageCarrouselHolder.style.backgroundImage = "url(\"assets/no_picture.svg\")";
    }
    imageHolder.appendChild(imageCarrouselHolder);

    if (itemsData[i]["pictures"].length > 0){
      for (let j = 0; j < itemsData[i]["pictures"].length; j++){
        let imageCarrousel = document.createElement("div");
        imageCarrousel.classList.add("imageCarrousel");
        imageCarrousel.setAttribute("id", itemsData[i]["shortname"] + j + "Image");
        imageCarrousel.style.backgroundImage = "url(\"assets/screen_shots/" + itemsData[i]["pictures"][j] + "\")";
        imageCarrousel.style.left = 152 * j + "px";
        imageCarrousel.style.top = -152 * j + "px";
        imageCarrouselHolder.appendChild(imageCarrousel);
      }
      carrouselObjects[itemsData[i]["shortname"]] = new Carrousel(itemsData[i]["shortname"], itemsData[i]["pictures"]);

      let arrowLeft = document.createElement("div");
      arrowLeft.classList.add("imageButton");
      arrowLeft.classList.add("arrowLeft");
      arrowLeft.setAttribute("onclick", "carrouselObjects[\'" + itemsData[i]["shortname"] + "\'].leftPicture()");
      arrowLeft.innerHTML = "◀";
      imageHolder.appendChild(arrowLeft);

      let showImage = document.createElement("div");
      showImage.classList.add("imageButton");
      showImage.classList.add("showImage");
      showImage.setAttribute("onclick", "carrouselObjects[\'" + itemsData[i]["shortname"] + "\'].showPicture()");
      imageHolder.appendChild(showImage);

      let arrowRight = document.createElement("div");
      arrowRight.classList.add("imageButton");
      arrowRight.classList.add("arrowRight");
      arrowRight.setAttribute("onclick", "carrouselObjects[\'" + itemsData[i]["shortname"] + "\'].rightPicture()");
      arrowRight.innerHTML = "▶";
      imageHolder.appendChild(arrowRight);
    }

    let textHolder = document.createElement("div");
    textHolder.classList.add("textHolder");
  	item.appendChild(textHolder);

    let itemName = document.createElement("div");
    itemName.classList.add("itemName");
    itemName.innerHTML = itemsData[i]["name"];
  	textHolder.appendChild(itemName);

    if (itemsData[i]["link"] == ""){
      let a = document.createElement("a");
      a.classList.add("inactiveLink");
    	textHolder.appendChild(a);

      let itemLink = document.createElement("div");
      itemLink.classList.add("itemLink");
      itemLink.innerHTML = "X";
    	a.appendChild(itemLink);
    }else{
      let a = document.createElement("a");
      a.classList.add("activeLink");
      a.href = itemsData[i]["link"];
      a.title = itemsData[i]["link"];
    	textHolder.appendChild(a);

      let itemLink = document.createElement("div");
      itemLink.classList.add("itemLink");
      itemLink.innerHTML = "▶";
    	a.appendChild(itemLink);
    }

    let hr = document.createElement("hr");
  	textHolder.appendChild(hr);

    let itemDesc = document.createElement("div");
    itemDesc.classList.add("itemDesc");
    itemDesc.innerHTML = itemsData[i]["desc"];
  	textHolder.appendChild(itemDesc);

    itemsHolder.appendChild(item);
  }

  //colorRainbow();
}


class Carrousel{
  constructor(name, pictures){
    this.name = name;
    this.pictures = pictures;
    this.numOfPics = pictures.length;
    this.currentPicture = 0;
  }

  showPicture(){
    // console.log(this.pictures[this.currentPicture]);
    openBigImage(this.currentPicture, this.pictures);
  }

  leftPicture(){
    this.currentPicture -= 1;
    if (this.currentPicture == -1){
      this.currentPicture = this.numOfPics - 1;
    }
    for (let i = 0; i < this.numOfPics; i++){
      document.getElementById(this.name + i + "Image").style.left = (i - this.currentPicture) * 152 + "px";
    }
  }

  rightPicture(){
    this.currentPicture += 1;
    if (this.currentPicture == this.numOfPics){
      this.currentPicture = 0;
    }
    for (let i = 0; i < this.numOfPics; i++){
      document.getElementById(this.name + i + "Image").style.left = (i - this.currentPicture) * 152 + "px";
    }
  }
}


function hoverItem(itemName, itemColor){
  //clearInterval(rainbowInterval);
  let item = document.getElementById(itemName);
  item.style.transitionDuration = "0.3s";
  item.style.border = "3px solid var(--" + itemColor + ")";
  item.style.boxShadow = "inset 0 0 8px var(--" + itemColor + "), 0 0 10px var(--" + itemColor + ")";

  neonIntervals[0] = setInterval(function(){
    neonIntervals[1] = setTimeout(function(){
      unhighlightItem(itemName, "0.2s");
      neonIntervals[2] = setTimeout(function(){
        highlightItem(itemName, itemColor, "0.3s");
        neonIntervals[3] = setTimeout(function(){
          unhighlightItem(itemName, "0.3s");
          neonIntervals[4] = setTimeout(function(){
            highlightItem(itemName, itemColor, "0.2s");
          }, 100);
        }, 100);
      }, 100);
    }, 100);

  }, 3000)
}


function highlightItem(itemName, itemColor, time){
  //clearInterval(rainbowInterval);
  let item = document.getElementById(itemName);
  item.style.transitionDuration = time;
  item.style.border = "3px solid var(--" + itemColor + ")";
  item.style.boxShadow = "inset 0 0 8px var(--" + itemColor + "), 0 0 10px var(--" + itemColor + ")";
}


function unhighlightItem(itemName, time){
  let item = document.getElementById(itemName);
  item.style.transitionDuration = time;
  item.style.border = "3px solid var(--moonGray1Dark)";
  item.style.boxShadow = "inset 0 0 8px var(--moonGray1), 0 0 10px var(--moonGray1Dark)";
}


function unhoverItem(itemName){
  clearInterval(neonIntervals[0]);
  for(let i = 1; i < neonIntervals.length; i++){
    clearTimeout(neonIntervals[i]);
  }

  unhighlightItem(itemName, "0.3s")
}


let bigImages = [];
let currentBigImage = 0;

function openBigImage(currentPicture, pictures){
  console.log(currentPicture, pictures);
  currentBigImage = currentPicture;
  bigImages = pictures;
  document.getElementById("bigImageCarrouselHolder").style.backgroundImage = "url(\"assets/screen_shots/" + bigImages[currentBigImage] +"\")";
  document.getElementById("bigImageShadow").style.display = "block";
}


function closeBigImage(){
  document.getElementById("bigImageShadow").style.display = "none";
}


function dontCloseBigImage(event){
  event.stopPropagation()
}


function leftBigPicture(){
  currentBigImage -= 1
  if (currentBigImage == -1){
    currentBigImage = bigImages.length - 1
  }
  document.getElementById("bigImageCarrouselHolder").style.backgroundImage = "url(\"assets/screen_shots/" + bigImages[currentBigImage] +"\")";
}


function rightBigPicture(){
  currentBigImage += 1
  if (currentBigImage == bigImages.length){
    currentBigImage = 0
  }
  document.getElementById("bigImageCarrouselHolder").style.backgroundImage = "url(\"assets/screen_shots/" + bigImages[currentBigImage] +"\")";
}


/*
function colorRainbow(){
  let currentColorId = 0;

  rainbowInterval = setInterval(function(){
    if (currentColorId == itemsData.length){
      currentColorId = 0;
    }
    let currentColor = itemsData[currentColorId]['color']

    for (let i = 0; i < itemsData.length; i++){
      let item = document.getElementById(itemsData[i]["name"]);
      item.style.transitionDuration = "2s";
      item.style.border = "2px solid var(--" + currentColor + ")";
      item.style.boxShadow = "0 0 10px var(--" + currentColor + ")";
    }

    currentColorId += 1;
  }, 2500)
}
*/
