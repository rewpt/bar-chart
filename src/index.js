import DataTable from './bar-ui/data-table';
import Chart from './bar-ui/chart';
import Sliders from './bar-ui/sliders'

const dataTable = new DataTable(document.querySelector('.table'), document.querySelector('.chart'));
dataTable.init();

const chart = new Chart(document.querySelector('.chart'), document.querySelector('.table'), document.querySelector('.sliders'));
chart.init();

const sliders = new Sliders(document.querySelector('.sliders'), document.querySelector('.chart'))
sliders.init();