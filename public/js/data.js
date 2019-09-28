const mapEmissionToCountry = function(country, emissions){
    let new_record = country
    let em_record = emissions.filter(res => res.id == country.id)[0]
    if (em_record){
        new_record.total = em_record.total
        new_record.perCapita = em_record.perCapita
        
    }else {
        new_record.total = -1
        new_record.perCapita = -1
    }
    return new_record;
}

const getEmissionsdata = function(year){
    return new Promise(resolve => {
        fetch('/emissions_data?year='+year)
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(err => {
            console.log(err)
        })
    })
}

export {mapEmissionToCountry, getEmissionsdata}