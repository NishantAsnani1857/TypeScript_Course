document.addEventListener('DOMContentLoaded', () => {
    enum state { active = 'active', finished = 'finished' }
    const hostElement = <HTMLDivElement>document.getElementById('app')!
    const templateElement = <HTMLTemplateElement>document.getElementById('project-input')!
    const form = <HTMLFormElement>templateElement.content.querySelector('form')
    const templateElement1 = <HTMLTemplateElement>document.getElementById('project-list')!
    const html = <HTMLElement>templateElement1.content.firstElementChild
    const title = form.querySelector('#title') as HTMLInputElement
    const desc = form.querySelector('#description') as HTMLInputElement
    const people = form.querySelector('#people') as HTMLInputElement
    let projectArray: projects[] = []
    interface projects {
        id: string;
        title: string;
        description: string;
        people: number;
    }
    type Projs = projects[] | undefined



    function addProject(title: string, description: string, people: number):Projs {
        const taskscreated = new Set<string>()
        const project1: projects = {
            id: Math.random().toString(),
            title,
            description,
            people
        };
        if (!taskscreated.has(title)) {
            projectArray.push(project1);
            return projectArray
        }
        return undefined;


    }

    function renderContent(value: state) {
        const container = document.createElement('div');
        container.innerHTML = `
        <section class="projects" id="${value}-projects">
          <header>
            <h2>${value.toUpperCase()} Projects</h2>
          </header>
          <ul id="${value}-projects-list"></ul>
        </section>`;

        const html = <HTMLElement>container.firstElementChild;
        const listId = `${value}-projects-list`;
        html.querySelector('ul')!.id = listId;
        html.querySelector('h2')!.textContent = `${value.toUpperCase()} Projects`;
        document.body.appendChild(container);
    }


    function renderProjects(value: state, projects: Projs) {
        const renderedProjectIds = new Set<string>()
        const listEl = document.getElementById(`${value}-projects-list`) as HTMLUListElement
        listEl.innerHTML = ""
        for (let prjItem of projects!) {
            if (!renderedProjectIds.has(prjItem.id)) {
                const listItem = document.createElement('li');
                const element = <HTMLTemplateElement>document.getElementById('single-project')!
                listItem.textContent = prjItem.title;
                element.content.querySelector('h2')!.textContent = prjItem.description
                element.content.querySelector('h3')!.textContent = prjItem.people.toString()
                listEl.appendChild(listItem);
                listEl.appendChild(element)
                renderedProjectIds.add(prjItem.id);
            }
        }
    }

    function clearInputs() {
        title.value = ""
        desc.value = ""
        people.value = ""
    }

    function textValidate(Value: any) {
        if (Value.trim().length === 0 || typeof (Value) !== 'string' || Value.length < 4) {
            return false
        }
        return true
    }


    function numberValidate(Value: any) {
        if (Value === "" || Value > 10 || Value <= 0) {
            return false
        }
        return true
    }



    hostElement.insertAdjacentElement('afterbegin', form)
    hostElement.insertAdjacentElement('beforeend', html)


    renderContent(state.active);
    renderContent(state.finished);


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (textValidate(title.value) && textValidate(desc.value) && numberValidate(parseInt(people.value))) {
            console.log(`${title.value} ${desc.value} ${parseInt(people.value)}`);
            let projects: Projs = addProject(title.value, desc.value, parseInt(people.value));
            renderProjects(state.finished, projects)
            clearInputs()
        }
        else {
            alert("Enter valid inputs")
            clearInputs()
        }
    })

})
