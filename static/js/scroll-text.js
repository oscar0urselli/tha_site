let firstReload = true;

const content = [
    [
        `<div class="mb-3 p-5 bg-body">
            <div class="vstack">
                <div class="hstack">
                    <h2 class="me-3">Liceo G. Moscati</h2>
                    <span class="badge bg-success">2018 - 2023</span>
                </div>
                <p>Here I had a starting approach with C++, during the study I created some web sites for different projects. I also partecipated in various school competitions of chemistry, physics and mathematics.</p>
            </div>
        </div>
        <div id="sun" class=""></div>`
    ],
    [
        `<div class="mb-3 p-5 bg-body">
            <div class="vstack">
                <div class="hstack">
                    <h2 class="me-3">OliCyber 2022</h2>
                    <span class="badge bg-success">2022</span>
                </div>
                <p><a title="OliCyber22" href="https://olicyber.it/edizioni/2022">This project</a> was my first encounter with cybersecurity. I managed to pass all the selections and won the bronze medal in the national finals.</p>
            </div>
        </div>
        <div id="mercury" class=""></div>`
    ],
    [
        `<div class="mb-3 p-5 bg-body">
            <div class="vstack">
                <div class="hstack">
                    <h2 class="me-3">CyberChallenge.IT 2022</h2>
                    <span class="badge bg-success">2022</span>
                </div>
                <p>During the same period of the Olicyber, I also took part in <a title="CyberChallenge.IT22" href="https://cyberchallenge.it/halloffame/2022">this project for universities</a>. Here I passed the selections and entered the official team of the <a title="PoliBa" href="https://www.poliba.it/">Polytechnic of Bari</a> with other 5 students.</p>
            </div>
        </div>
        <div id="venus" class=""></div>`
    ],
    [
        `<div class="mb-3 p-5 bg-body">
            <div class="vstack">
                <div class="hstack">
                    <h2 class="me-3">Pwnzer0tt1</h2>
                    <span class="badge bg-success">2022 - today</span>
                </div>
                <p>After CyberChallenge I and the other members of the team decided to create a CTF team called <a title="Pwnzer0tt1" href="https://pwnzer0tt1.it/">Pwnzer0tt1</a>.</p>
            </div>
        </div>
        <div id="earth" class=""></div>`
    ],
    /*[
        `<div class="mb-3 p-5 bg-body">
            <div class="vstack">
                <div class="hstack">
                    <h2 class="me-3">1st HighSchools CTF Workshop</h2>
                    <span class="badge bg-success">02/05/2023</span>
                </div>
                <p>I helped in the organization of a <a title="ITASEC23" href="https://agenda-2023.itasec.it/track/workshop">workshop and a little CTF for highschool students</a> during ITASEC 2023. In particular, I and others students introduced the basics of cybersecurity. I covered the part related to OSINT.</p>
            </div>
        </div>
        <div id="mars" class=""></div>`
    ],
    [
        `<div class="mb-3 p-5 bg-body">
            <div class="vstack">
                <div class="hstack">
                    <h2 class="me-3">OliCyber 2023</h2>
                    <span class="badge bg-success">2023</span>
                </div>
                <p>For the <a title="OliCyber23" href="https://olicyber.it/edizioni/2023">second time</a>, I made it to the national finals.</p>
            </div>
        </div>
        <div id="jupiter" class=""></div>`
    ]*/
];

let counter = 0;

export function onDOMContentLoaded() {
    if (firstReload) {
        content[0].forEach(element => {
            $('#content').append(element);
        });
    }
    
    firstReload = false;
}
export function after_onClickPreviousPlanet() {
    if (counter === 0) return;
    counter--;

    $('#content').empty();
    content[counter].forEach(element => {
        $('#content').append(element);
    })

    gsap.fromTo('#content', {opacity: 0}, {opacity: 1, duration: 1.25});
}
export function after_onClickNextPlanet() {
    if (counter === content.length - 1) return;
    counter++;

    $('#content').empty();
    content[counter].forEach(element => {
        $('#content').append(element);
    });

    gsap.fromTo('#content', {opacity: 0}, {opacity: 1, duration: 1.25});
}
export function before_onClickPreviousPlanet() {
    gsap.to('#content', {opacity: 0, duration: 1.5});
}
export function before_onClickNextPlanet() {
    gsap.to('#content', {opacity: 0, duration: 1.5});
}