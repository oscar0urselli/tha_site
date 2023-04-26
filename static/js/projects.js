let projects = {};

window.addEventListener('DOMContentLoaded', () => {    
    $.get('/projects/get', (data) => {
        data.forEach((project) => {
            if (projects[project.id]) {
                if (project.id_tech !== null) {
                    projects[project.id].techs.push(project.id_tech);
                }
            }
            else {
                projects[project.id] = {
                    title: project.title,
                    description: project.description,
                    techs: (project.id_tech !== null ? [project.id_tech] : []),
                    type: project.type,
                    link: project.link
                }
            }
        });

        $.get('/projects/techs', (techs) => {
            for (const [key, value] of Object.entries(projects)) {
                let t = '';
                value.techs.forEach((tech) => {
                    let color = techs[tech - 1].color.toString(16);
                    let z = '';
                    for (let i = 0; i < 6 - color.length; i++) {
                        z += '0';
                    }
                    color = z + color;
                    t += `<span class="col-auto badge m-2" style="background-color: #${color}">${techs[tech - 1].name}</span>`;
                });

                $('#projects').prepend(`
                <div class="col-md-12 col-lg-6 my-2">
                <div id="project-${key}" class="card h-100">
                    <div class="card-body">
                        <p class="fs-5">${value.type === 1 ? 'WORK' : 'LAB'}</p>
                        <hr class="text-grey-50">
                        <h5 class="card-title">${value.title}</h5>
                        <p class="card-text">${value.description}</p>
                        <div class="row row-cols-12 my-3">
                            ${t}
                        </div>
                        <div class="hstack">
                            <a href="${value.link}" class="btn btn-primary btn-lg" value="${key}">Explore</a>
                        </div>
                    </div>
                </div>
                </div>
                `);
                gsap.fromTo(`#project-${key}`, {opacity: 0}, {opacity: 1, duration: 1});
            }
        });
    });
});