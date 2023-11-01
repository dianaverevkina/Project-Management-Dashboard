import WidgetTasks from "./WidgetTasks";
import WidgetStats from "./WidgetStats";
import Store from "./Store";

const store = new Store();

const widgetTasks = new WidgetTasks(store);
const widgetStats = new WidgetStats(store);

widgetStats.init();
widgetTasks.init();
