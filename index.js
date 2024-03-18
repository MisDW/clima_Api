

const form = document.querySelector(".container_search");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const contry = document.getElementById('contry').value;
    const city = document.getElementById('city').value;
    // console.log(contry);
    search(contry, city)
})

function search(contry, city) {
    var key = "5e25b8d45697c6a1ac0b58929193be36"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${contry}&appid=${key}`)
    .then(data => data.json())
    .then(dataJson =>  {
        if (dataJson.cod == "404" || city == "" || dataJson.message === "city not found") {
            showError("Por favor escribe una ciudad");
        }else{
            showMessage(dataJson, contry, city);
        }
    });
}

function showError(msg) {
    const box_page = document.querySelector('.box_page');
    const alert = document.createElement('div');
    alert.classList = "msg_error"
    box_pagina.appendChild(alert);
    alert.innerHTML = `
    <div>
    <span>${msg}</span>
    <img src="img/clime/tormentaLluviosa.png">
    </div>
    `
     setTimeout(() => {
         alert.remove()
     }, 3000);
}

function showMessage(data, contry, city) {
    var {clouds:{all},name,main:{humidity,temp,temp_max,temp_min},weather:[{description,icon,main}],wind:{speed}} = data;
    const celcius_nor = parseInt(temp - 273.15);
    const celcius_max = parseInt(temp_max - 273.15);
    const celcius_min = parseInt(temp_min - 273.15);
    const img_icon = `https://openweathermap.org/img/wn/${icon}@4x.png`

    //traductor de descripcion
    switch (description) {
        case "overcast clouds":description = "Nublado☁"
        break;
        case "clear sky":description = "Despejado☀"
        break;       
        case "mist": description = "Neblina🌫"
        break;
        case "light rain": description = "Lluvia ligera🌦"
        break;
        default:
            console.log("Error");
            break;
    }

    switch (main) {
        case "Clouds": main = "Nubes"
            break;
        case "Clear": main = "Limpio"
            break;
        case "Mist": main = "Neblina"
            break;
        case "Rain": main = "Lluvia"
            break;
        default:
            console.log("Error");
            break;
    }

    const h3_contry = document.getElementById("h3_contry")
    const p_city = document.getElementById("p_city")
    const img_clime = document.getElementById("img_clime")
    const max_grades = document.getElementById("max_grades")
    const min_grades = document.getElementById("min_grades")
    const description_txt = document.getElementById("description")
    const wind_humidity_txt = document.getElementById("wind_humidity")
    const others = document.getElementById("others")

    h3_contry.innerHTML = `<i class="bi bi-globe-americas"></i> ${contry}`
    p_city.innerHTML = `<i class="bi bi-buildings"></i> ${city}`
    img_clime.src = img_icon
    max_grades.innerHTML = `<i class="bi bi-caret-up-fill"></i> ${celcius_max} °`
    min_grades.innerHTML = `<i class="bi bi-caret-down-fill"></i> ${celcius_min} °`
    description_txt.innerHTML = description 
    wind_humidity_txt.innerHTML = "Humidity: " + humidity + "%"
    others.innerHTML = `${main} ${all}%`

 
}