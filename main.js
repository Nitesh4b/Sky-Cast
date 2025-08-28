const body = document.querySelector("body")
const header = document.createElement("header")
const main = document.createElement("main")
const footer = document.createElement("footer")
const container = document.createElement("div")

container.id="container"
header.id="header"

container.append(header)
container.append(main)
container.append(footer)
body.append(container)


//header
const form = document.createElement("form")
form.id="form"

const searchBar= document.createElement("Input")
searchBar.id="searchBar"
searchBar.setAttribute("placeholder","Search")
form.append(searchBar)

const searchButton = document.createElement("button")
searchButton.id="searchButton"
searchButton.type="submit"
const imgIcon = document.createElement("img");
imgIcon.src = "images/searchIcon.svg";
imgIcon.alt = "Search Icon";
searchButton.append(imgIcon);
form.append(searchButton);
header.append(form)

//Main
const weatherImg = document.createElement("img")
weatherImg.id="weatherImg"
weatherImg.src="images/clear.png"
main.append(weatherImg)

const paraTemp = document.createElement("p")
paraTemp.id="paraTemp"
paraTemp.innerText=`22 °C`
main.append(paraTemp)

const paraLocation = document.createElement("p")
paraLocation.id="paraLocation"
paraLocation.innerText=`Mumbai`
main.append(paraLocation)

//Footer
function createFooterSide(imgLink , name, val, valId){
  const footerContainer = document.createElement("div")
  footerContainer.classList.add(`footerContainer`)

  const footerImg= document.createElement("img")
  footerImg.src=`${imgLink}`
  footerImg.classList.add(`footerImg`)
  footerContainer.append(footerImg)

  const infoContainer = document.createElement("span")
  infoContainer.classList.add("infoContainer")
  const infoValue = document.createElement("p")
  infoValue.classList.add("infoValue")
  infoValue.id=`${valId}`
  infoValue.innerText=`${val}`
  infoContainer.append(infoValue)

  const infoName = document.createElement("p")
  infoName.classList.add("infoName")
  infoName.innerText=`${name}`
  infoContainer.append(infoName)
  footerContainer.append(infoContainer)

  footer.append(footerContainer)
}

createFooterSide("images/humidity.png", "Humidity", "53 %", "humidity") // left side
createFooterSide("images/wind.png", "Wind speed", "5.66 Km/hr", "wind") // Right side


// Event handeling
const apiKey = `2f008132ec4f4f14ac4234150252708`

window.addEventListener("DOMContentLoaded", function () {
  apiCalling(apiKey, "Mumbai")
})

form.addEventListener("submit", function (e) {
  e.preventDefault()
  const city = searchBar.value.trim()
  if (city) {
    apiCalling(apiKey, city)
  }
})

async function apiCalling(apiKey, city){
  try{
    apiLink=`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
    const apiPromise = await fetch(apiLink)
    if(!apiPromise.ok){
      throw new Error(apiPromise.status)
    }
    const data = await apiPromise.json()
    console.log(data)
    displayData(data)
    
  }
  catch(e){
    console.error(`Error status is: ${e}`)
  }
}

function displayData(data){
  paraTemp.innerText=`${data.current.temp_c} °C`
  paraLocation.innerText=`${data.location.name}`
  const humidityVal = document.querySelector("#humidity")
  humidityVal.innerText =`${data.current.humidity}` 

  const windVal = document.querySelector("#wind")
  windVal.innerText=`${data.current.wind_kph}` 
  weatherImg.src= getWeatherImage(data.current.condition.text)
}

function getWeatherImage(conditionText) {
  conditionText = conditionText.toLowerCase();

  if (conditionText.includes("rain")) return "images/rain.png";
  if (conditionText.includes("cloud")) return "images/clouds.png";
  if (conditionText.includes("snow")) return "images/snow.png";
  if (conditionText.includes("mist")) return "images/mist.png";
  if (conditionText.includes("drizzle")) return "images/drizzle.png";
  
  return "images/clear.png"; // default
}
