const projects = [
	{
		'title' : 'CSV Converter',
		'description' : 'Take a .csv file and convert it into a .xlsx file.',
		'link' : 'https://github.com/oscar0urselli/CSV-Converter',
		'type' : 0,
        'techs': ['Python']
	},
	{
		'title' : 'CONNECT',
		'description' : 'Control an Arduino connected to a PC using a smartphone.',
		'link' : 'https://github.com/oscar0urselli/CONNECT',
		'type' : 2,
        'techs': ['C#', 'Arduino', 'Xamarin', '.NET Core']
	},
	{
		'title' : 'Frequency LED Visualizer',
		'description' : 'Visualize the frequency of the music with a led using Arduino and Python.',
		'link' : 'https://github.com/oscar0urselli/Frequency-LED-Visualizer',
		'type' : 2,
        'techs': ['Python', 'Arduino']
	},
	{
		'title' : 'This site',
		'description' : 'My personal web site.',
		'link' : '/',
		'type' : 1,
        'techs': ['JavaScript', 'Express.js', 'Pug', 'Heroku', 'Bootstrap', 'jQuery']
	},
	{
		'title' : 'About section of this site',
		'description' : '3D graphics is cool so used it.',
		'link' : '/about',
		'type' : 1,
        'techs': ['JavaScript', 'three.js', 'GSAP']
	},
	{
		'title' : 'Progettiamo il nostro futuro',
		'description' : 'Site for a school project.',
		'link' : 'https://costruiamoilnostrofuturo.com/',
		'type' : 1,
        'techs': ['JavaScript', 'Express.js', 'Heroku', 'Telegram']
	}
];
const techs = {
    'Python': 3502757,
    'JavaScript': 16769308,
    'Pug': 11035732,
    'HTML': 14896166,
    'C++': 15944573,
    'TypeScript': 3242182,
    'Bootstrap': 5651836,
    'Node.js': 4425021,
    'Express.js': 12067100,
    'three.js': 0,
    'GSAP': 6401063,
    'Heroku': 7952543,
    'jQuery': 19882,
    'Arduino': 31102,
    'C#': 1541632,
    '.NET Core': 5906012,
    'Xamarin': 753328,
    'Telegram': 4629216,
    'Electron.js': 551293
};

window.addEventListener('DOMContentLoaded', () => {   
    projects.forEach((project, i) => {
        let t = '';

        project.techs.forEach((tech) => {
            let color = techs[tech].toString(16);
            let z = '';
            for (let i = 0; i < 6 - color.length; i++) {
                z += '0';
            }
            color = z + color;
            t += `<span class="col-auto badge m-2" style="background-color: #${color}">${tech}</span>`;
        });

        $('#projects').prepend(`
            <div id="project-${i}" class="col-md-12 col-lg-6 my-2">
            <div class="card h-100">
                <div class="card-body">
                    <p class="fs-5">${project.type === 1 ? 'WORK' : 'LAB'}</p>
                    <hr class="text-grey-50">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <div class="row row-cols-12 my-3">
                        ${t}
                    </div>
                    <div class="hstack">
                        <a href="${project.link}" class="btn btn-primary btn-lg">Explore</a>
                    </div>
                </div>
            </div>
            </div>
        `);
        gsap.fromTo(`#project-${i}`, { opacity: 0 }, { opacity: 1, duration: (10 - i + 1) * 1 / projects.length});
    });
});