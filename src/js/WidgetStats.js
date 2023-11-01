import { distinctUntilChanged } from 'rxjs/operators';
import projects from './projects';

export default class WidgetStats {
  constructor(store) {
    this.container = document.querySelector('.stats__wrapper');
    this.store = store;
  }

  init() {
    this.drawProjects();
    this.subscribeToStore();
  }

  // Отображаем названия проектов и количество открытых задач
  drawProjects() {
    projects.forEach(({ name, id, tasks }) => {
      const filteredTasks = tasks.filter((task) => !task.done);
      const el = document.createElement('div');
      el.classList.add('stats__row', 'project');
      el.dataset.id = id;
      el.innerHTML = `
        <div class="stats__col project__name">${name}</div>
        <div class="stats__col project__tasks">${filteredTasks.length}</div>
      `;

      this.container.append(el);
    });
  }

  // Подписываемся на состояние хранилища
  subscribeToStore() {
    this.store.state$
      .pipe(
        distinctUntilChanged(),
      ).subscribe((state) => {
        const { counter, projectId } = state;

        if (!projectId) return;

        const project = this.container.querySelector(`[data-id="${projectId}"]`);
        const tasksNumber = project.querySelector('.project__tasks');
        const { textContent: number } = tasksNumber;

        tasksNumber.textContent = +number + counter;
      });
  }
}
