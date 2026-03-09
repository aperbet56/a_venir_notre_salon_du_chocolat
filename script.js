// Récupération des différents éléments
const days = document.querySelector(".days");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const email = document.querySelector(".form");
const btn = document.querySelector(".btn");

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

// Regex
const regexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

/**
 * Déclaration de la fonction emailValidation pour la validation du champ email
 * @param {String} email
 */
const emailValidation = (email) => {
  // Ecoute de l'événement "input" sur l'input email
  email.addEventListener("input", (e) => {
    e.preventDefault();
    if (regexEmail.test(email.value) == false) {
      emailEmoji.textContent = "❌";
      return false;
    } else {
      emailEmoji.textContent = "✔️";
      return true;
    }
  });
};
// Appel de la fonction emailValidation
emailValidation(email);

// Déclaration de la fonction send qui permet d'envoyer les données
const send = () => {
  // Ecoute de l'événement "click" sur le bouton
  btn.addEventListener("click", (e) => {
    // Suppression du comportement par défaut
    e.preventDefault();
    if (regexEmail.test(email.value) == false) {
      alert("Veuillez remplir correctement le champ du formulaire !");
    } else {
      // Création de l'objet contact
      const contact = {
        email: email.value,
      };
      console.log(contact);
      alert(
        "Inscription confirmée ! Nous allons vous envoyer un mail de confirmation sous 24h. Cordialement."
      );
      // Rechargement de la page
      window.location.reload();
      email.value = "";
      window.scrollTo(0, 0);
    }
  });
};
// Appel de la fonction send()
send();
