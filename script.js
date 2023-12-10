// Classe RegistroClasse
class RegistroClasse {
    constructor() {
        this.studenti = JSON.parse(localStorage.getItem('studenti')) || [];
    }

    aggiungiStudente(nome, cognome, voto) {
        const nuovoStudente = {
            nome: nome,
            cognome: cognome,
            voti: [{
                punteggio: voto,
                data: getCurrentDate()
            }]
        };
        this.studenti.push(nuovoStudente);
        this.salvaSuLocalStorage();
    }

    visualizzaStudenti() {
        console.log("Elenco degli studenti nel registro:");
        this.studenti.forEach(studente => {
            console.log(`Nome: ${studente.nome}, Cognome: ${studente.cognome}`);
            console.log("Voti:");
            studente.voti.forEach(voto => {
                console.log(`  Punteggio: ${voto.punteggio}, Data: ${voto.data}`);
            });
            console.log("--------------------");
        });
    }

    aggiungiVoto(nome, cognome, punteggio, data) {
        const studente = this.studenti.find(studente =>
            studente.nome === nome && studente.cognome === cognome
        );

        if (studente) {
            const nuovoVoto = {
                punteggio: punteggio,
                data: data
            };
            studente.voti.push(nuovoVoto);
            console.log("Voto aggiunto con successo.");
            this.salvaSuLocalStorage();
        } else {
            console.log("Studente non trovato nel registro.");
        }
    }

    rimuoviStudente(nome, cognome) {
        const studentiRimasti = this.studenti.filter(studente =>
            !(studente.nome === nome && studente.cognome === cognome)
        );

        if (studentiRimasti.length < this.studenti.length) {
            this.studenti = studentiRimasti;
            console.log("Studente rimosso con successo.");
            this.salvaSuLocalStorage();
        } else {
            console.log("Studente non trovato nel registro.");
        }
    }

    salvaSuLocalStorage() {
        localStorage.setItem('studenti', JSON.stringify(this.studenti));
    }
}

// Inizializza il registro di classe
const registro = new RegistroClasse();

// Funzione per aggiungere uno studente
function aggiungiStudente() {
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const gradeInput = document.getElementById('grade');

    const name = nameInput.value;
    const surname = surnameInput.value;
    const grade = parseInt(gradeInput.value);

    if (name && surname && !isNaN(grade)) {
        registro.aggiungiStudente(name, surname, grade);
        console.log('Studente aggiunto con successo:', name, surname, grade);
        visualizzaStudenti();
        nameInput.value = '';
        surnameInput.value = '';
        gradeInput.value = '';
    } else {
        console.log('Inserisci un nome, un cognome e un voto validi.');
    }
}

// Funzione per visualizzare gli studenti
function visualizzaStudenti() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; // Pulisce la lista prima di aggiornarla

    // Aggiunge gli studenti alla lista HTML
    registro.studenti.forEach(studente => {
        const listItem = document.createElement('li');
        listItem.textContent = `Nome: ${studente.nome}, Cognome: ${studente.cognome}, Voti: `;

        // Aggiunge i voti alla lista HTML
        if (studente.voti.length > 0) {
            const votesList = document.createElement('ul');
            studente.voti.forEach(voto => {
                const voteItem = document.createElement('li');
                voteItem.textContent = `Punteggio: ${voto.punteggio}, Data: ${voto.data}`;
                votesList.appendChild(voteItem);
            });
            listItem.appendChild(votesList);
        } else {
            listItem.textContent += 'Nessun voto disponibile';
        }

        studentList.appendChild(listItem);
    });
}

// Funzione per rimuovere uno studente
function rimuoviStudente() {
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const name = nameInput.value;
    const surname = surnameInput.value;

    if (name && surname) {
        registro.rimuoviStudente(name, surname);
        console.log('Studente rimosso con successo:', name, surname);
        visualizzaStudenti();
        nameInput.value = '';
        surnameInput.value = '';
    } else {
        console.log('Inserisci un nome e un cognome validi per rimuovere uno studente.');
    }
}

// Funzione per visualizzare gli studenti all'avvio
window.onload = function () {
    visualizzaStudenti();
};

// Funzione per ottenere la data corrente nel formato 'YYYY-MM-DD'
function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Gennaio è 0!
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}
