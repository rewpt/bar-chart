import './styles/table.css'
/*I learned that
Taking the element into each of your functions is important because it will update the whole element.
Otherwise the code will get stuck and not update properly.
This was specifically helpful in the labelRow function to get it to fully update with each add and removal.
*/

class DataTable {
    constructor(element, chart){
        this.element = element;
        this.chart = chart;
        this.addRowBtn = this.element.querySelector('.add-row-btn');
        this.tbody = this.element.querySelector('tbody');
        this.rmBtn = this.element.querySelectorAll('.rm')
    }
    init(){
        labelRow(this.element);
        this.addRowBtn.addEventListener('click', () => {
            let row = createRow();
            this.tbody.appendChild(row);
            labelRow(this.element)
        })
        this.element.addEventListener('click', e => {
            if(e.target.classList.contains('rm')){
                e.target.parentElement.parentElement.remove();
            }
            labelRow(this.element)
            
            incDecTitleSizes(this.chart, e);
        }
        )
        
    }  
}
//Increment and Decrement title sizes
let currSizeMain = 1.5;
let currSizeY = 1.2;
let currSizeX = 1.2;
const incDecTitleSizes = (chart, e) => {     
    if (e.target.classList.contains('main-plus')) {
        let mainSize = chart.querySelector('#main-title');
        currSizeMain += .1;
        mainSize.style.fontSize = currSizeMain + 'em';
    }
    if (e.target.classList.contains('main-minus')) {
        let mainSize = chart.querySelector('#main-title');
        currSizeMain -= .1;
        mainSize.style.fontSize = currSizeMain + 'em';
    }
    if (e.target.classList.contains('x-plus')) {
        let xSize = chart.querySelector('#x-title');
        currSizeX += .1;
        xSize.style.fontSize = currSizeX + 'em';
    }
    if (e.target.classList.contains('x-minus')) {
        let xSize = chart.querySelector('#x-title');
        currSizeX -= .1;
        xSize.style.fontSize = currSizeX + 'em';
    }
    if (e.target.classList.contains('y-plus')) {
        let ySize = chart.querySelector('#y-title');
        currSizeY += .1;
        ySize.style.fontSize = currSizeY + 'em';
    }
    if (e.target.classList.contains('y-minus')) {
        let ySize = chart.querySelector('#y-title');
        currSizeY -= .1;
        ySize.style.fontSize = currSizeY + 'em';
    }
}

//Creating a new row with the appropriate elements and then numbering it.
//Need to refactor this but it's working, i'll just do it at the end
const createRow = () => {
    const row = document.createElement('tr');
    let td1 = document.createElement('th');
    td1.classList.add('row');
    row.appendChild(td1);
    let td2 = document.createElement('td')
    let input2 = document.createElement('input')
    input2.classList.add("label")
    td2.appendChild(input2);
    row.appendChild(td2);
    const td3 = document.createElement('td')
    const input3 = document.createElement('input')
    input3.classList.add("user-value")
    td3.appendChild(input3);
    row.appendChild(td3);
    const td4 = document.createElement('td')
    const input4 = document.createElement('input')
    input4.setAttribute("type", "color");
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    input4.setAttribute("value", `#${randomColor}`);
    input4.classList.add('bar-color')
    td4.appendChild(input4);
    row.appendChild(td4);
    const td5 = document.createElement('td')
    const input5 = document.createElement('input')
    input5.setAttribute("type", "color");
    input5.classList.add('label-color')
    td5.appendChild(input5);
    row.appendChild(td5);
    let td6 = document.createElement('td');
    let rmBtn1 = document.createElement('img')
    rmBtn1.classList.add('rm')
    rmBtn1.setAttribute('src', './png/remove-icon-png-7132.png') 
    td6.appendChild(rmBtn1)
    row.appendChild(td6);
    return row;
}
//Function used to update all rows in accordance with what has been deleted.
const labelRow = (element) => {
    let i = 1;
    let tblNumbers = element.querySelectorAll('.row') 
    for (let num of tblNumbers ){
        num.textContent = i
        i++
    }
}

export {DataTable as default}