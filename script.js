// Kalkulátor ceny

function calculatePrice(){
  var roomSize = document.getElementById("room-size").value;
  const borders = 20; //cena olištování na 1m
  const protection = 15; //cena za ochranu podlahy na 1m2
  var priceOfFloor; //cena konkrétního druhu podlahy bez práce na 1m2

  switch(document.getElementById("floor-type").value){
    case "vinyl":
      priceOfFloor = 400;
      break;
    case "pvc":
      priceOfFloor = 180;
      break;
    case "wood":
      priceOfFloor = 2000;
      break;
    case "carpet":
      priceOfFloor = 110;
      break;
    case "parkety":
      priceOfFloor = 700;
      break;
    case "natureLinoleum":
      priceOfFloor = 1200;
      break;
    case "plovouci":
      priceOfFloor = 150;
      break;
  }

  var result = roomSize*priceOfFloor;
  result = result.toFixed(2);
  
  border = document.getElementById("room-border").checked;
  if(border){
    result += (Math.sqrt(roomSize)*4)*borders;
  }

  border = border.toFixed(2);
  
  care = document.getElementById("floor-care").checked;
  if(care){
    result += roomSize*protection;
  }
  
  care = care.toFixed(2);

  result = Math.round(result);
  result += " Kč"

  document.getElementById("price").textContent = result;
  return {val1: roomSize,val2: document.getElementById("floor-type").value,val3: priceOfFloor,val4: border,val5: care,val6: result};
}

//stažení a kalkulace
function downloadPrice(){
  var result = calculatePrice();
  let text = "Kalkulace ceny\n\n"; 
  text += "Velikost místnosti v m²: " + result.val1 + " m²\n";
  text += "Vybraný typ podlahy:     " + result.val2 + "\n";
  text += "Olištování místnosti:    " + result.val4 + "\n";
  text += "Ošetření podlahy:        " + result.val5 + "\n\n";
  text += "Cena podlahy s pokládkou:" + result.val1 + "m² * " + result.val3 + "Kč/m² = " + result.val1*result.val3 + "Kč\n";
  if(result.val4){
  text += "Olištování podlahy:      " + Math.sqrt(result.val1)*4 + "m * 20Kč/m = " + (Math.sqrt(result.val1)*4)*20 + "Kč\n";
  }
  if(result.val5){
  text += "Ošetření podlahy:        " + result.val1 + "m² * 15Kč/m² = " + result.val1*15 + "Kč\n";
  }
  text += "----------------------------------------------------------\n"
  text += "Celková cena včetně DPH: " + result.val6;

  let soubor = new Blob([text], {type: "text/plain"});
  let odkaz = document.createElement("a");
  odkaz.href = URL.createObjectURL(soubor);
  odkaz.download = "Kalkulace.txt";
  document.body.appendChild(odkaz);
  odkaz.click();
  document.body.removeChild(odkaz);
}

//ověření vstupu
function validateInput(){
  let roomSize = document.getElementById("room-size").value;
  if (roomSize < 1 || isNaN(roomSize)) {
    alert("Zadejte kladné číslo pro velikost místnosti.");
    return false;
  }
  return true;
}
