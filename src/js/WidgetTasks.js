import projects from './projects';

export default class WidgetTasks {
  constructor(store) {
    this.container = document.querySelector('.tasks__container');
    this.store = store;
  }

  init() {
    this.drawSelectForm();
  }

  // Отрисовываем форму select
  drawSelectForm() {
    const form = document.createElement('form');
    form.classList.add('tasks__form', 'form');
    form.name = 'project-choice';
    form.innerHTML = `
      <label for="projectChoice">Project:</label>
      <select id="projectChoice" class="form__select">
        <option class="form__option" selected>Выберите проект</option>
      </select>
    `;

    this.container.append(form);

    this.select = this.container.querySelector('.form__select');
    this.select.addEventListener('change', (e) => this.showTasks(e));

    this.addOptionsToSelect();
  }

  // Добавляем названия проектов из памяти
  addOptionsToSelect() {
    projects.forEach(({ name, id }) => {
      const option = document.createElement('option');
      option.classList.add('form__option');
      option.dataset.id = id;
      option.textContent = name;
      this.select.append(option);
    });
  }

  // Отображаем задачи в зависимости от выбранного проекта
  showTasks(e) {
    const { target } = e;
    this.projectId = target.selectedOptions[0].dataset.id;

    if (!this.projectId) {
      this.clearTasks();
      return;
    };

    const { tasks } = projects.find((project) => project.id === +this.projectId);
    this.clearTasks();
    tasks.forEach((task) => this.drawTask(task));
  }

  // Удаляем задачи
  clearTasks() {
    const tasks = this.container.querySelectorAll('.task');
    tasks.forEach((el) => el.remove());
  }

  // Создаем задачи
  drawTask({ id, name, done }) {
    const el = document.createElement('div');
    el.classList.add('tasks__row', 'task');
    el.dataset.id = id;
    el.innerHTML = `
      <label class="task__check">
        <input type="checkbox" class="task__checkbox">
        <span class="task__check-icon"></span>
      </label>
      <p class="tasks__task-name">${name}</p>
    `;

    const checkbox = el.querySelector('.task__checkbox');
    checkbox.checked = done;
    checkbox.addEventListener('change', (e) => this.handleCheckboxChange(e));

    this.container.append(el);
  }

  // При изменении чекбокса передаем данные в хранилище
  handleCheckboxChange(e) {
    const { target } = e;
    const taskEl = target.closest('.task');
    const { id: taskId } = taskEl.dataset;
    const { tasks } = projects.find((obj) => obj.id === +this.projectId);
    const foundtask = tasks.find((task) => task.id === +taskId);
    foundtask.done = target.checked;

    const type = target.checked ? 'SUBTRACT' : 'ADD';
    const payload = { projectId: this.projectId };
    this.store.dispatch(type, payload);
  }
}
