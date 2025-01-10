let pelaajienMaara = document.getElementById('pelaajienMaara');
pelaajienMaara.addEventListener('submit', pelaajaAsetukset);
let saannot = document.getElementById('peliSaannot');
saannot.addEventListener('submit', peliSaannot);
let lista = [];
let pisteTavoite = 0
let noppienMaara = 0

function pelaajaAsetukset(event) {
    event.preventDefault();
    let pelaajia = document.getElementById('pelaajia').value;
    // Tarkistetaan että pelaajien määräksi on annettu numero:
    if (isNaN(pelaajia) || pelaajia.length < 1) {
        document.getElementById('pitaaOllaNumero').innerHTML = 'Anna numero.';
        return;
    } else {
        // Kysytään nimet ja kutstutaan funktiota jolla luodaan array:
        document.getElementById('pitaaOllaNumero').innerHTML = '';
        let text = '<form>';
        for (let i = 0; i < pelaajia; i++) {
            let j = i + 1;
            text += `<p>Pelaajan ${j} nimi:</p>` + '<input type="text" name="nimi">';
        }
        text += '<p id="nimetVaroitus"></p><div><button id="vahvistaNimet">Vahvista</button></div></form>';
        document.getElementById('nimet').innerHTML = text;
        let vahvistaNimet = document.getElementById('vahvistaNimet');
        vahvistaNimet.addEventListener('click', pelaajatArray);
    }
}

// luodaan array joka sisältää objektit joissa nimet ja pisteet:
function pelaajatArray(event) {
    event.preventDefault();
    let ok = true;
    let tarkistusLista = [];
    let nimiLista = document.querySelectorAll('input[name="nimi"]');
    // Tarkistetaan että nimet on täytetty oikein:
    for (let i = 0; i < nimiLista.length; i++) {
        if (nimiLista[i].value.length < 1) {
            ok = false;
        }
        if (tarkistusLista.includes(nimiLista[i].value)) {
            ok = false;
        }
        tarkistusLista.push(nimiLista[i].value);
    }
    if (ok == true) {
        // Muodostetaan array ja avataan seuraava valikko:
        document.getElementById('nimet').style.display = 'none';
        document.getElementById('pelaajienMaara').style.display = 'none';
        for (let i = 0; i < nimiLista.length; i++) {
            let tiedot = {};
            tiedot.nimi = nimiLista[i].value;
            tiedot.pisteet = 0;
            lista.push(tiedot);
        }
        document.getElementById('saantoValikko').style.display = '';
    } else {
        document.getElementById('nimetVaroitus').innerHTML = 'Jokaisella pelaajalla on oltava uniikki nimi.';
    }
    console.log(lista)
}

function peliSaannot(event) {
    event.preventDefault();
    // Tarkistetaan voittoon tarvittava pistemäärä ja käytettävien noppien määrä:
    let ok1 = false;
    let ok2 = false;
    let pisteet = document.forms['saannot']['pisteMaara'].value;
    let nopat = document.forms['saannot']['nopat'].value;
    if (isNaN(pisteet) || pisteet.length < 1 || pisteet < 100) {
        document.getElementById('pisteVaroitus').innerHTML = 'Syötä numero (vähintään 100).';
    } else {
        document.getElementById('pisteVaroitus').innerHTML = '';
        pisteTavoite = +pisteet;
        ok1 = true;
    }
    if (nopat.length < 1) {
        document.getElementById('noppaVaroitus').innerHTML = 'Valitse noppien määrä';
    } else {
        document.getElementById('noppaVaroitus').innerHTML = '';
        noppienMaara = +nopat;
        ok2 = true;
    }
    if (ok1 == true && ok2 == true) {
        console.log('ok', ok1, ok2, typeof noppienMaara, typeof pisteTavoite)
    }
}

/*
let objekti = {}
let array = [0]
objekti.nimi = 'tuukka'
objekti.pisteet = 0
objekti.pisteet = array.reduce(funktio)
function funktio(t, v) {
    return t + v
}
console.log(objekti.pisteet)
*/