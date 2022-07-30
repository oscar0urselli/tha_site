let firstReload = true;

const content = [
    [
        `<p></p>`
    ], 
    [
        `<p class="text-center">I always had an interest towards science in general but in particular all computers related stuff. All started using the command block in Minecraft, the command prompt of Windows and learning about HTML.</p>`
    ], 
    [
        `<p class="fs-1 text-center">Liceo statale Giuseppe Moscati 2018-2023</p>`,
        `<p class="text-center">I had a staring approach with computer programming, writing my first "Hello World" in C++. Thanks to the school, during a project I had the possibility to create my first web site using Joomla. Also I had the possibility to take part in projects about cybersecurity.</p>`
    ], 
    [
        `<p class="fs-1 text-center">Olicyber 2022</p>`,
        `<p class="text-center"><a href="https://olicyber.it/" class="text-decoration-none">This project</a> was my first encounter with cybersecurity outside Cheat Engine 🙃. I managed to pass all the selection and obtain the bronze medal in the national final.</p>`
    ], 
    [
        `<p class="fs-1 text-center">CyberChallenge.IT 2022</p>`,
        `<p class="text-center">During the same period of the Olicyber, I also took part in <a href="https://cyberchallenge.it/" class="text-decoration-none">this project</a> for universities. Here I passed the selection and entered the official team of the <a href="http://www.poliba.it/" class="text-decoration-none">Politecnico di Bari</a> with other 5 students. I had the opportunity to learn about new technologies and with the memebers of the team we founded a CTF team called <a href="https://github.com/Pwnzer0tt1" class="text-decoration-none">Pwnzer0tt1</a>.</p>`
    ], 
    [
        `<p class="fs-1 text-center">Tech</p>`,
        `<p class="fs-3 text-center">Programming languages</p>`,
        `<p class="text-center">For the moment the programming languages I know the most (in order of proficiency) are: Python, C++, JavaScript and C#. But in the last month I started learning Rust.</p>`,
        `<p class="fs-3 text-center">Database</p>`,
        `<p class="text-center">MySQL was my first approach with SQL and DB in general, later I extended to SQLite and Redis. I plan to learn about NoSQL DB such as MongoDB.</p>`,
        `<p class="fs-3 text-center">Arduino</p>`,
        `<p class="text-center">In the free time I like playing with Arduino and little projects of eletronic.</p>`
    ], 
    [
        `<p class="text-center"></p>`
    ],
    [
        `<p class="text-center"></p>`
    ],
    [
        `<p  class="fs-1 text-center">THE END</p>`
    ]
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

    gsap.fromTo('#content', {opacity: 0}, {opacity: 1, duration: 3});
}
export function after_onClickNextPlanet() {
    if (counter === content.length - 1) return;
    counter++;

    $('#content').empty();
    content[counter].forEach(element => {
        $('#content').append(element);
    });

    gsap.fromTo('#content', {opacity: 0}, {opacity: 1, duration: 3});
}
export function before_onClickPreviousPlanet() {
    gsap.to('#content', {opacity: 0, duration: 2});
}
export function before_onClickNextPlanet() {
    gsap.to('#content', {opacity: 0, duration: 2});
}