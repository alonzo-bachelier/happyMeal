// FONCTION POUR RECUP DONNEES
async function getData()
{

    
await fetch('../json/data.json')
  .then (response => response(res))


  //méthode json pour recup données
  await fetch('../json/data.json')
  .then (res => { res.json()
  })
  // des que le json est reçu
  .then (json => console.log(json))

  fetch('../json/data.json', {
    method: "POST",
    body: JSON.stringify ({
        title: 'nom'
    })
  }) .then (res => res.json()).then(json => console.log(json))

}


getData()
