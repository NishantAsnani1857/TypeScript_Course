"use strict";
document.addEventListener('DOMContentLoaded', () => {
    let state;
    (function (state) {
        state["active"] = "active";
        state["finished"] = "finished";
    })(state || (state = {}));
    const hostElement = document.getElementById('app');
    const templateElement = document.getElementById('project-input');
    const form = templateElement.content.querySelector('form');
    const templateElement1 = document.getElementById('project-list');
    const html = templateElement1.content.firstElementChild;
    const title = form.querySelector('#title');
    const desc = form.querySelector('#description');
    const people = form.querySelector('#people');
    let projectArray = [];
    function addProject(title, description, people) {
        const taskscreated = new Set();
        const project1 = {
            id: Math.random().toString(),
            title,
            description,
            people
        };
        if (!taskscreated.has(title)) {
            projectArray.push(project1);
            return projectArray;
        }
    }
    function renderContent(value) {
        const container = document.createElement('div');
        container.innerHTML = `
        <section class="projects" id="${value}-projects">
          <header>
            <h2>${value.toUpperCase()} Projects</h2>
          </header>
          <ul id="${value}-projects-list"></ul>
        </section>`;
        const html = container.firstElementChild;
        const listId = `${value}-projects-list`;
        html.querySelector('ul').id = listId;
        html.querySelector('h2').textContent = `${value.toUpperCase()} Projects`;
        document.body.appendChild(container);
    }
    function renderProjects(value, projects) {
        const renderedProjectIds = new Set();
        const listEl = document.getElementById(`${value}-projects-list`);
        listEl.innerHTML = "";
        for (let prjItem of projects) {
            if (!renderedProjectIds.has(prjItem.id)) {
                const listItem = document.createElement('li');
                const element = document.getElementById('single-project');
                listItem.textContent = prjItem.title;
                element.content.querySelector('h2').textContent = prjItem.description;
                element.content.querySelector('h3').textContent = prjItem.people.toString();
                listEl.appendChild(listItem);
                listEl.appendChild(element);
                renderedProjectIds.add(prjItem.id);
            }
        }
    }
    function clearInputs() {
        title.value = "";
        desc.value = "";
        people.value = "";
    }
    function textValidate(Value) {
        if (Value.trim().length === 0 || typeof (Value) !== 'string' || Value.length < 4) {
            return false;
        }
        return true;
    }
    function numberValidate(Value) {
        if (Value === "" || Value > 10 || Value <= 0) {
            return false;
        }
        return true;
    }
    hostElement.insertAdjacentElement('afterbegin', form);
    hostElement.insertAdjacentElement('beforeend', html);
    renderContent(state.active);
    renderContent(state.finished);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (textValidate(title.value) && textValidate(desc.value) && numberValidate(parseInt(people.value))) {
            console.log(`${title.value} ${desc.value} ${parseInt(people.value)}`);
            let projects = addProject(title.value, desc.value, parseInt(people.value));
            renderProjects(state.finished, projects);
            clearInputs();
        }
        else {
            alert("Enter valid inputs");
            clearInputs();
        }
    });
});
