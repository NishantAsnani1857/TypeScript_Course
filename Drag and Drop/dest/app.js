"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}
let ProjectItem = (() => {
    var _a;
    let _classSuper = Component;
    let _instanceExtraInitializers = [];
    let _dragStartHandler_decorators;
    return _a = class ProjectItem extends _classSuper {
            get persons() {
                if (this.project.people === 1) {
                    return '1 person';
                }
                else {
                    return `${this.project.people} persons`;
                }
            }
            constructor(hostId, project) {
                super('single-project', hostId, false, project.id);
                this.project = (__runInitializers(this, _instanceExtraInitializers), void 0);
                this.project = project;
                this.configure();
                this.renderContent();
            }
            dragStartHandler(event) {
                event.dataTransfer.setData('text/plain', this.project.id);
                event.dataTransfer.effectAllowed = 'move';
            }
            dragEndHandler(_) {
                console.log('DragEnd');
            }
            configure() {
                this.element.addEventListener('dragstart', this.dragStartHandler);
                this.element.addEventListener('dragend', this.dragEndHandler);
            }
            renderContent() {
                this.element.querySelector('h2').textContent = this.project.title;
                this.element.querySelector('h3').textContent = this.persons + ' assigned';
                this.element.querySelector('p').textContent = this.project.description;
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _dragStartHandler_decorators = [autobind];
            __esDecorate(_a, null, _dragStartHandler_decorators, { kind: "method", name: "dragStartHandler", static: false, private: false, access: { has: obj => "dragStartHandler" in obj, get: obj => obj.dragStartHandler }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
let ProjectList = (() => {
    var _a;
    let _classSuper = Component;
    let _instanceExtraInitializers = [];
    let _dragOverHandler_decorators;
    let _dropHandler_decorators;
    let _dragLeaveHandler_decorators;
    return _a = class ProjectList extends _classSuper {
            constructor(type) {
                super('project-list', 'app', false, `${type}-projects`);
                this.type = (__runInitializers(this, _instanceExtraInitializers), type);
                this.assignedProjects = [];
                this.configure();
                this.renderContent();
            }
            dragOverHandler(event) {
                if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                    event.preventDefault();
                    const listEl = this.element.querySelector('ul');
                    listEl.classList.add('droppable');
                }
            }
            dropHandler(event) {
                const prjId = event.dataTransfer.getData('text/plain');
                projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
            }
            dragLeaveHandler(_) {
                const listEl = this.element.querySelector('ul');
                listEl.classList.remove('droppable');
            }
            configure() {
                this.element.addEventListener('dragover', this.dragOverHandler);
                this.element.addEventListener('dragleave', this.dragLeaveHandler);
                this.element.addEventListener('drop', this.dropHandler);
                projectState.addListener((projects) => {
                    const relevantProjects = projects.filter(prj => {
                        if (this.type === 'active') {
                            return prj.status === ProjectStatus.Active;
                        }
                        return prj.status === ProjectStatus.Finished;
                    });
                    this.assignedProjects = relevantProjects;
                    this.renderProjects();
                });
            }
            renderContent() {
                const listId = `${this.type}-projects-list`;
                this.element.querySelector('ul').id = listId;
                this.element.querySelector('h2').textContent =
                    this.type.toUpperCase() + ' PROJECTS';
            }
            renderProjects() {
                const listEl = document.getElementById(`${this.type}-projects-list`);
                listEl.innerHTML = '';
                for (const prjItem of this.assignedProjects) {
                    new ProjectItem(this.element.querySelector('ul').id, prjItem);
                }
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _dragOverHandler_decorators = [autobind];
            _dropHandler_decorators = [autobind];
            _dragLeaveHandler_decorators = [autobind];
            __esDecorate(_a, null, _dragOverHandler_decorators, { kind: "method", name: "dragOverHandler", static: false, private: false, access: { has: obj => "dragOverHandler" in obj, get: obj => obj.dragOverHandler }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _dropHandler_decorators, { kind: "method", name: "dropHandler", static: false, private: false, access: { has: obj => "dropHandler" in obj, get: obj => obj.dropHandler }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _dragLeaveHandler_decorators, { kind: "method", name: "dragLeaveHandler", static: false, private: false, access: { has: obj => "dragLeaveHandler" in obj, get: obj => obj.dragLeaveHandler }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
let ProjectInput = (() => {
    var _a;
    let _classSuper = Component;
    let _instanceExtraInitializers = [];
    let _submitHandler_decorators;
    return _a = class ProjectInput extends _classSuper {
            constructor() {
                super('project-input', 'app', true, 'user-input');
                this.titleInputElement = (__runInitializers(this, _instanceExtraInitializers), void 0);
                this.titleInputElement = this.element.querySelector('#title');
                this.descriptionInputElement = this.element.querySelector('#description');
                this.peopleInputElement = this.element.querySelector('#people');
                this.configure();
            }
            configure() {
                this.element.addEventListener('submit', this.submitHandler);
            }
            renderContent() { }
            gatherUserInput() {
                const enteredTitle = this.titleInputElement.value;
                const enteredDescription = this.descriptionInputElement.value;
                const enteredPeople = this.peopleInputElement.value;
                const titleValidatable = {
                    value: enteredTitle,
                    required: true
                };
                const descriptionValidatable = {
                    value: enteredDescription,
                    required: true,
                    minLength: 5
                };
                const peopleValidatable = {
                    value: +enteredPeople,
                    required: true,
                    min: 1,
                    max: 5
                };
                if (!validate(titleValidatable) ||
                    !validate(descriptionValidatable) ||
                    !validate(peopleValidatable)) {
                    alert('Invalid input, please try again!');
                    return;
                }
                else {
                    return [enteredTitle, enteredDescription, +enteredPeople];
                }
            }
            clearInputs() {
                this.titleInputElement.value = '';
                this.descriptionInputElement.value = '';
                this.peopleInputElement.value = '';
            }
            submitHandler(event) {
                event.preventDefault();
                const userInput = this.gatherUserInput();
                if (Array.isArray(userInput)) {
                    const [title, desc, people] = userInput;
                    projectState.addProject(title, desc, people);
                    this.clearInputs();
                }
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _submitHandler_decorators = [autobind];
            __esDecorate(_a, null, _submitHandler_decorators, { kind: "method", name: "submitHandler", static: false, private: false, access: { has: obj => "submitHandler" in obj, get: obj => obj.submitHandler }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
