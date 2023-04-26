const views = ['projects', 'apis'];
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
                    techs: (project.id_tech !== null ? [project.id_tech] : [])
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

                $('#projects-list').prepend(`
                <div id="project-${key}" class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${value.title}</h5>
                        <p class="card-text">${value.description}</p>
                        <div class="row row-cols-12 my-3">
                            ${t}
                        </div>
                        <div class="hstack">
                            <button class="btn btn-danger btn-lg delete-project-btn" value="${key}">Delete</button>
                        </div>
                    </div>
                </div>
                `);
            }
        });
    });
});

$('#projects-btn,#apis-btn').on('click', (event) => {
    let btnId = event.target.id;
    let id = btnId.slice(0, btnId.length - 4);

    $('#' + id).removeAttr('hidden');
    $('#' + btnId).removeClass('link-dark');
    $('#' + btnId).addClass('active');

    views.forEach((v) => {
        if (v !== id) {
            $('#' + v).attr('hidden', true);
            $('#' + v + '-btn').removeClass('active');
            $('#' + v + '-btn').addClass('link-dark');
        }
    });
});

$(document).on('click', '.delete-project-btn', (event) => {
    $.post('/admin/del-project', { id: event.target.value }, (res) => {
        $(`#project-${event.target.value}`).remove();
    });
});