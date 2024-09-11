import { useState } from "react"

export const WeatherApp = () => {
  let ulrBase = 'https://api.openweathermap.org/data/2.5/weather'
let apiKey = 'a63f3a198ccb65f0264181f8a8a82aa3'
const difKelvin = 273.15

   const [ciudad, setCiudad] = useState('')
   const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)

    }
    const hanblerSubmit = (e) => {
      e.preventDefault()
      if(ciudad.length > 0) fetchClima()

    }

    const fetchClima = async() => {
      try {
        const response = await fetch(`${ulrBase}?q=${ciudad}&appid=${apiKey}`)
        const data = await response.json()
        setDataClima(data)
        
      } catch(error){
        console.error('ocurrio un error')
        
      }
    }

  return (
    <div className="container">
        <h1> App the Weather </h1>

          <form onSubmit={hanblerSubmit}>
            <input 
            type="text" 
             value={ciudad}
             onChange={handleCambioCiudad} />
            <button type="submit">look for city</button>
          </form>
          {
            dataClima && (
              <div>
                <h2> {dataClima.name}  </h2>
                <h3>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</h3>
                <p>Condicion:{dataClima.weather[0].description} </p>
                <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />

              </div>

            )
          }
        
        </div>
  )
}




