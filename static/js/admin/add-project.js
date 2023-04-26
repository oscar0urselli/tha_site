let techs;
let usedTechs = [];

window.addEventListener('DOMContentLoaded', () => {
    $.get('/projects/techs', (data) => {
        console.log(data);
        techs = data;

        techs.forEach((tech) => {
            $('#techs-list').append(`
                <option value="${tech.id}">${tech.name}</option>
            `)
        });
    });
});

$('#techs-list').on('change', (event) => {
    let techID = $('#techs-list').val();
    $(`#techs-list option[value='${techID}']`).remove();

    let color = techs[techID - 1].color.toString(16);
    let z = '';
    for (let i = 0; i < 6 - color.length; i++) {
        z += '0';
    }
    color = z + color;
    
    $('#used-techs').append(`
        <span data-tech-id="${techID}" class="col badge m-2" style="background-color: #${color}">${techs[techID - 1].name}</span>
    `);
    usedTechs.push(Number(techID));
});

$(document).on('click', '.badge', (event) => {
    let techID = $(event.target).data('tech-id');
    $('#techs-list').append(`
        <option value="${techID}">${techs[techID - 1].name}</option>
    `);
    $(event.target).remove();
    usedTechs.splice(usedTechs.indexOf(techID), 1);
});

$('#add-project').on('click', () => {
    let data = {
        title: $('#title').val(),
        description: $('#description').val(),
        link: $('#link').val(),
        type: Number($('#type').val()),
        techs: usedTechs
    };
    $.post('/admin/add-project', data, (res) => {
        console.log(res);
        
        if (res === 'ok') {
            window.location.replace('/admin');
        }
    });
});