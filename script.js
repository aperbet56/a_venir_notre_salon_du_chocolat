// Récupération des différents éléments
const days = document.querySelector(".days");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

// Création de la variable twoNumberDisplay
let twoNumberDisplay = "";

// affichage d'un zéro devant un nombre/chiffre
twoNumberDisplay = (item) => {
  if (item < 10) {
    return (item = "0" + item);
  } else {
    return item;
  }
};

// Date actuelle
const now = new Date();

// Date de fin du compteur
const myDate = new Date("2026-05-24 00:00:00");

// Durée entre les deux dates
const duration = myDate - now;
// Nombre en millisecondes
console.log(duration);

// Calcul du nombre de jours dans la durée
// Durée d'un jour : 24h * 60mn * 60s * 1000ms
// 86 400 000ms
let daysInDuration = Math.floor(duration / (24 * 60 * 60 * 1000));

// Calcul du temps restant après retrait des jours
let rest = duration % (24 * 60 * 60 * 1000);
console.log(rest);

// Calucul du nombre d'heures dans le reste
// Durée d'une heure : 60mn * 60s * 1000ms
// 3 600 000ms
let hoursInRest = Math.floor(rest / (60 * 60 * 1000));

// Calcul du temps restant après retrait des heures
rest = rest % (60 * 60 * 1000);

// Calcul du nombre de minutes dans le reste
// Durée d'une minute : 60s * 1000ms
// 60000ms
let minutesInRest = Math.floor(rest / (60 * 1000));

// Calcul du temps restant après retrait des minutes
rest = rest % (60 * 1000);

// Calcul du nombre de secondes dans le reste
// Durée d'une seconde : 1000ms
let secondsInRest = Math.floor(rest / 1000);

// Déclaration de la fonction displayTime qui va permettre la mise à jour du compteur
const displayTime = () => {
  days.textContent = twoNumberDisplay(daysInDuration);
  hours.textContent = twoNumberDisplay(hoursInRest);
  minutes.textContent = twoNumberDisplay(minutesInRest);
  seconds.textContent = twoNumberDisplay(secondsInRest);
};
// Appel de la fonction displayTime
displayTime();

// Déclaration de la fonction breakdown (décompte) qui va décompter une seconde
const breakdown = () => {
  if (secondsInRest) {
    secondsInRest--;
  } else if (minutesInRest) {
    secondsInRest = 59;
    minutesInRest--;
  } else if (hoursInRest) {
    secondsInRest = 59;
    minutesInRest = 59;
    hoursInRest--;
  } else if (daysInDuration) {
    secondsInRest = 59;
    minutesInRest = 59;
    hoursInRest = 23;
    daysInDuration--;
  } else {
    clearInterval(interval);
  }
  //Appel de la fonction displayTime
  displayTime();
};

// Variable interval qui va stocker l'interval
let interval;

// Dès le chargement de la page
window.onload = () => {
  // Appel de la fonction displayTime
  displayTime();

  interval = setInterval(breakdown, 1000); // Appel de la fonction breakdown toute les 1000ms soit toutes les secondes
};
