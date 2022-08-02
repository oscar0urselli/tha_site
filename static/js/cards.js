const cards = [
    {
        title: 'CSV Converter',
        description: 'Take a .csv file and convert it into a .xlsx file.',
        repository: 'https://github.com/oscar0urselli/CSV-Converter',
        technology: ['Python'],
        type: 'WORK'
    },
    {
        title: 'CONNECT',
        description: 'Control an Arduino connected to a PC using a smartphone.',
        repository: 'https://github.com/oscar0urselli/CONNECT',
        technology: ['C#', 'Arduino', 'Xamarin', '.NET Core'],
        type: 'LAB'
    },
    {
        title: 'Frequency LED Visualizer',
        description: 'Visualize the frequency of the music with a led using Arduino and Python.',
        repository: 'https://github.com/oscar0urselli/Frequency-LED-Visualizer',
        technology: ['Python', 'Arduino'],
        type: 'LAB'
    },
    {
        title: 'web-server',
        description: 'Creation of a web server without using frameworks like Express.js',
        repository: 'https://github.com/oscar0urselli/web-server',
        technology: ['JavaScript', 'Node.js'],
        type: 'LAB'
    },
    {
        title: 'This site',
        description: 'My personal portfolio web site.',
        repository: '/',
        technology: ['JavaScript', 'Express.js', 'TypeScript', 'Pug', 'Heroku', 'Bootstrap', 'jQuery'],
        type: 'WORK'
    },
    {
        title: 'About section of this site',
        description: '3D graphics is cool so used it.',
        repository: '/about',
        technology: ['JavaScript', 'three.js', 'GSAP'],
        type: 'WORK'
    }
];

const badgesBg = {
    'Python': '#3572A5',
    'JavaScript': '#ffe11c',
    'Pug': '#a86454',
    'HTML': '#e34c26',
    'C++': '#f34b7d',
    'TypeScript': '#3178c6',
    'Bootstrap': '#563d7c',
    'Node.js': '#43853d',
    'Express.js': '#b8211c',
    'three.js': '#000000',
    'GSAP': '#61AC27',
    'Heroku': '#79589f',
    'jQuery': '#004daa',
    'Arduino': '#00797e',
    'C#': '#178600',
    '.NET Core': '#5a1e5c',
    'Xamarin': '#0b7eb0'
};

for (let i = cards.length - 1; i >= 0; i--) {
    let badges = '';
    cards[i].technology.forEach(t => {
        badges += `<span class="badge" style="background-color: ${badgesBg[t]}">${t}</span>\n`;
    })
    
    let card = `
    <div class="col-sm-6" id="_${i}">
        <div class="card h-100">
            <div class="card-body">
                <p class="fs-5">${cards[i].type}</p>
                <hr class="text-grey-50">
                <h5 class="card-title">${cards[i].title}</h5>
                <p class="card-text">${cards[i].description}</p>
                <a href="${cards[i].repository}" class="btn btn-primary">Explore</a>
                <br>
                <br>
                ${badges}
            </div>
        </div>
    </div>
    `;
    
    $('#cards').append(card);

    gsap.fromTo(`#_${i}`, {opacity: 0}, {opacity: 1, duration: 1});
}