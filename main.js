// Kuuntelee pelaajien määrän vahvistusta:
let pelaajienMaara = document.getElementById('pelaajienMaara');
pelaajienMaara.addEventListener('submit', pelaajaAsetukset);

// Kuuntelee pelisääntöjen vahvistusta:
let saannot = document.getElementById('peliSaannot');
saannot.addEventListener('submit', peliSaannot);

// Kuuntele "lopeta vuoro" nappia:
let kenenVuoro = document.getElementById('lopetaVuoro');
kenenVuoro.addEventListener('click', seuraavaVuoro);

// Kuuntelee "heitä" nappia:
let heita = document.getElementById('heita');
heita.addEventListener('click', heitto)

// Muuttujia, pelaajien nimet, pisteet ja muut asetukset:
let pelaajaLista = [];
let pisteTavoite = 0;
let noppienMaara = 0;
let vuoro = 0;
let tamanVuoronPisteet = 0;
let tuplat = 0;

//Pelaajien määrän ja nimien asetus:
function pelaajaAsetukset(event) {
    event.preventDefault();
    let pelaajia = document.getElementById('pelaajia').value;
    // Tarkistaa että pelaajien määräksi on annettu numero:
    if (isNaN(pelaajia) || pelaajia.length < 1) {
        document.getElementById('pitaaOllaNumero').innerHTML = 'Anna numero.';
        return;
    } else {
        // Luo kaavion joka kysyy pelaajien nimet:
        document.getElementById('pitaaOllaNumero').innerHTML = '';
        let text = '<form>';
        for (let i = 0; i < pelaajia; i++) {
            let j = i + 1;
            text += `<p>Pelaajan ${j} nimi:</p>` + '<input type="text" name="nimi">';
        }
        text += '<p class="text-danger" id="nimetVaroitus"></p><div><button id="vahvistaNimet">Vahvista</button></div></form>';
        // Kuuntelee asetettujen nimien vahvistusta ja kutsuu funktiota arrayn luomiseksi:
        document.getElementById('nimet').innerHTML = text;
        let vahvistaNimet = document.getElementById('vahvistaNimet');
        vahvistaNimet.addEventListener('click', pelaajatArray);
    }
}

// Luo arrayn joka sisältää objektit joissa nimet ja pisteet:
function pelaajatArray(event) {
    event.preventDefault();
    let ok = true;
    let tarkistusLista = [];
    let nimiLista = document.querySelectorAll('input[name="nimi"]');
    // Tarkistaa että nimet on täytetty oikein:
    for (let i = 0; i < nimiLista.length; i++) {
        let nimi = nimiLista[i].value
        if (nimi.length < 1 || nimi.length > 20 || tarkistusLista.includes(nimi)) {
            ok = false;
        }
        tarkistusLista.push(nimiLista[i].value);
    }
    // Muodostaa arrayn ja avaa seuraavan valikon:
    if (ok == true) {
        document.getElementById('nimet').style.display = 'none';
        document.getElementById('pelaajienMaara').style.display = 'none';
        for (let i = 0; i < nimiLista.length; i++) {
            let tiedot = {};
            tiedot.nimi = nimiLista[i].value;
            tiedot.pisteet = 0;
            pelaajaLista.push(tiedot);
        }
        document.getElementById('saantoValikko').style.display = '';
    } else {
        document.getElementById('nimetVaroitus').innerHTML = 'Jokaisella pelaajalla on oltava uniikki nimi (pituus 1-20 merkkiä).';
    }
}

// Tarkistaa voittoon tarvittavan pistemäärän ja käytettävien noppien määrän asetukset:
function peliSaannot(event) {
    event.preventDefault();
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
        document.getElementById('saantoValikko').style.display = 'none';
        document.getElementById('peli').style.display = ''
        uusiVuoro()
    }
}

// Asettaa käyttöliittymän uuden vuoron alkuun:
function uusiVuoro() {
    tamanVuoronPisteet = 0
    pisteTaulukko()
    let noppaKuvat = document.getElementById('noppaKuvat')
    if (noppienMaara == 1) {
        noppaKuvat.innerHTML = '<img class="col-sm-3" src="img/tyhja.png" alt="noppa">'
    } else {
        noppaKuvat.innerHTML = '<img class="col-sm-3" src="img/tyhja.png" alt="noppa"><img class="col-md-3" src="img/tyhja.png" alt="noppa">'
    }
    tuplat = 0;
    document.getElementById('heita').disabled = false;
    document.getElementById('heita').style.display = '';
    document.getElementById('ilmoitus').style.visibility = 'hidden';
    document.getElementById('pelaajaNimi').innerHTML = pelaajaLista[vuoro].nimi
    document.getElementById('tulos').innerHTML = 0
    document.getElementById('yhteensa').innerHTML = tamanVuoronPisteet
    document.getElementById('kaikkiYhteensa').innerHTML = `${pelaajaLista[vuoro].pisteet}/${pisteTavoite}`
}

// Lisää pisteet ja käynnistää seuraavan pelaajan vuoron:
function seuraavaVuoro() {
    pelaajaLista[vuoro].pisteet =  pelaajaLista[vuoro].pisteet + tamanVuoronPisteet
    if (vuoro == pelaajaLista.length - 1) {
        vuoro = 0
    } else {
        vuoro++
    }
    uusiVuoro()
}

// Muodostaa pistetaulukon HTML:ään:
function pisteTaulukko() {
    let text = ''
    for (let i = 0; i < pelaajaLista.length; i++) {
        text += `<tr><td>${pelaajaLista[i].nimi}</td><td>${pelaajaLista[i].pisteet}/${pisteTavoite}</td></tr>`
    }
    document.getElementById('pisteTaulu').innerHTML = text
}

// Suorittaa nopan tai noppien heiton ja laskee tuloksen ja pisteet:
function heitto() {
    const luku1 = Math.floor(Math.random() * 6) + 1;
    const luku2 = Math.floor(Math.random() * 6) + 1;
    const noppa1 = 'img/luku' + `${luku1}` + '.png';
    const noppa2 = 'img/luku' + `${luku2}` + '.png';
    // Yhden nopan version säännöt:
    if (noppienMaara == 1) {
        document.querySelectorAll('img')[0].setAttribute('src', noppa1);
        document.getElementById('tulos').innerHTML = luku1;
        if (luku1 == 1) {
            tamanVuoronPisteet = 0;
            document.getElementById('heita').disabled = true;
            document.getElementById('ilmoitus').innerHTML = 'Heitit ykkösen, menetit tämän vuoron pisteet.';
            document.getElementById('ilmoitus').style.visibility = '';
        } else {
            tamanVuoronPisteet += luku1;
        }
    // Kahden nopan version säännöt:
    } else {
        document.querySelectorAll('img')[0].setAttribute('src', noppa1);
        document.querySelectorAll('img')[1].setAttribute('src', noppa2);
        let tulo = luku1 + luku2;
        document.getElementById('tulos').innerHTML = tulo; 
        if (luku1 === 1 && luku2 === 1) {
            tuplat++;
            if (tuplat === 3) {
                kolmeTuplaa();
            } else {
                document.getElementById('ilmoitus').innerHTML = 'Heitit ykkösparin, 25 pistettä!';
                document.getElementById('ilmoitus').style.visibility = '';
                document.getElementById('tulos').innerHTML = 25;
                tamanVuoronPisteet += 25;
            }
        } else if (luku1 === luku2) {
            tuplat++;
            if (tuplat === 3) {
                kolmeTuplaa();
            } else {
                document.getElementById('ilmoitus').innerHTML = 'Heitit parin, tuplapisteet!';
                document.getElementById('ilmoitus').style.visibility = '';
                document.getElementById('tulos').innerHTML = tulo * 2;
                tamanVuoronPisteet += tulo * 2;
            }
        } else if (luku1 === 1 || luku2 === 1) {
            tamanVuoronPisteet = 0;
            document.getElementById('heita').disabled = true;
            document.getElementById('ilmoitus').innerHTML = 'Heitit ykkösen, menetit tämän vuoron pisteet.';
            document.getElementById('ilmoitus').style.visibility = '';
        } else {
            document.getElementById('ilmoitus').style.visibility = 'hidden';
            tuplat = 0;
            tamanVuoronPisteet += tulo;
        }
    }
    let kaikkiYhteensa = tamanVuoronPisteet + pelaajaLista[vuoro].pisteet;
    // Luvut käyttöliittymään:
    document.getElementById('yhteensa').innerHTML = tamanVuoronPisteet;
    document.getElementById('kaikkiYhteensa').innerHTML = `${kaikkiYhteensa}/${pisteTavoite}`;
     // Voiton tarkistus:
     if (kaikkiYhteensa >= pisteTavoite) {
        voittaja()
    }
}

// Käytetään kun pelaaja saa kolme tuplaa peräkkäin:
function kolmeTuplaa() {
        tamanVuoronPisteet = 0;
        document.getElementById('heita').disabled = true;
        document.getElementById('ilmoitus').innerHTML = 'Heitit kolme tuplaa peräkkäin, menetit tämän vuoron pisteet.';
        document.getElementById('ilmoitus').style.visibility = '';
}

function voittaja() {
    pelaajaLista[vuoro].pisteet =  pelaajaLista[vuoro].pisteet + tamanVuoronPisteet
    pisteTaulukko()
    document.getElementById('ilmoitus').innerHTML = 'Olet voittaja!'
    document.getElementById('t').style.display = 'none'
    document.getElementById('pelinLopetus').style.display = ''
}