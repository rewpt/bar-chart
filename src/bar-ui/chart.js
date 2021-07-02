import './styles/chart.css';

class Chart {
  constructor(chart, table, sliders) {
    this.element = chart;
    this.table = table;
    this.mainContent = this.element.querySelector('.main-content')
    this.barContent = this.mainContent.querySelector('.bar-content')
    this.spitBtn = this.table.querySelector('.spit-bars-btn')
    this.chartTitles = this.table.querySelector('.chartTitles');
    this.sliders = sliders;
  }
  init() {
    this.spitBtn.addEventListener('click', e => {  
      let chartTitle = this.table.querySelector('#chart-title').value;
      let yTitleInput = this.table.querySelector('#y-axis-title');
      let yTitleChart = this.element.querySelector('#y-title');
      let xTitleInput = this.table.querySelector('#x-axis-title');
      let xTitleChart = this.element.querySelector('#x-title');
      let mainTitle = this.element.querySelector('#main-title');
      let bars = this.element.querySelectorAll('.single-bar');
      let chartLabels = this.element.querySelectorAll('.chart-label');
      let yNums = this.element.querySelectorAll('.y-num');
      let widthSlider = this.sliders.querySelector('.width-slider');
      let valueHeightSlider = this.sliders.querySelector('.val-height-slider');
      mainTitle.innerText = chartTitle;
      yTitleChart.innerText = yTitleInput.value;
      xTitleChart.innerText = xTitleInput.value;
      //Remove any current bars and labels on the chart
      barAndLabelRemove(bars, chartLabels) 
      //Create current bars based on labels
      let values = this.table.querySelectorAll('.user-value');
      let labels = this.table.querySelectorAll('.label');
      let barColors = this.table.querySelectorAll('.bar-color');
      let labelColors = this.table.querySelectorAll('.label-color');
      console.log(this.element);
      let labelSquare = this.element.querySelector('.label-square')
      console.log(labelSquare);
      //find out the highest input
      let highestBar = determineMax(values);
      //Find out what value makes the highest value 90% of the height of the chart
      let maxHeight = Math.ceil(highestBar / 100) * 100;
      //Loop through the user input labels and insert into the label box
      createYValues(yNums, maxHeight);
      createLabels(labels, labelSquare, labelColors);
      createBars(values, maxHeight, barColors, this.barContent)
      createInBarValue(bars, values);
      readWidthAndValPosition(widthSlider, valueHeightSlider, this.element);
      applyAxisColors(this.element, this.table)
    })
  }
}
//Apply chosen colours to the axis and main title
const applyAxisColors = (chart, table) => {
  let mainColorInput = table.querySelector('#main-title-color').value;
  let xColorInput = table.querySelector('#x-title-color').value;
  let yColorInput = table.querySelector('#y-title-color').value;
  let mainChartColor = chart.querySelector('#main-title');
  let yTitleColor = chart.querySelector('#y-title');
  let xTitleColor = chart.querySelector('#x-title');
  mainChartColor.style.color = mainColorInput;
  yTitleColor.style.color = yColorInput;
  xTitleColor.style.color = xColorInput;
}
//Apply chosen font size to axis and main title

//Maintain slider effects on the chart
const readWidthAndValPosition = (widthSlider, valueHeightSlider, chart) =>  {
  let singleBar = chart.querySelectorAll('.single-bar');
  for (let single of singleBar) {
    single.style.width =  `${widthSlider.value}%`;  
  }
  let barValues = chart.querySelectorAll('.in-bar-val')
        for(let val of barValues) {
          val.style.gridRowStart = valueHeightSlider.value;
          console.log(valueHeightSlider.value);
          let endRowNum = Number(valueHeightSlider.value) + 1
          val.style.gridRowEnd = `${endRowNum}`;
          console.log(valueHeightSlider.value + 1);
        }
}
//Create values on the y axis
const createYValues = (yNums, maxHeight) => {
  let i = 0;
  for (let num of yNums) {
    switch(i) {
      case 0:
        num.innerText = Math.round(maxHeight);
        break;
      case 1:
        num.innerText = Math.round(maxHeight * .8);
        break;
      case 2:
        num.innerText = Math.round(maxHeight * .6);
        break;
      case 3:
        num.innerText = Math.round(maxHeight * .4);
        break;
      case 4:
        num.innerText = Math.round(maxHeight * .2);
        break;
      case 5:
        num.innerText = 0;
        break;
    }
    i++
  }
}
//Create the values to put inside of the bars
const createInBarValue = (bars, values) => {
  let i = 0
  for (let bar of bars) {
    let inBarVal = document.createElement('span');
    inBarVal.classList.add('in-bar-val');
    inBarVal.innerText = values[i];
    bar.appendChild(inBarVal);
  }
}
// Remove bars and labels on the chart Fx
const barAndLabelRemove = (bars, chartLabels) => {
  for (let bar of bars) {
    bar.remove();
  }
  //remove chart labels
  for (let chartLabel of chartLabels) {
    chartLabel.remove();
  }
}
// Creating a bar Fx
const createBars = (values, maxHeight, barColors, barContent) => {
  let i = 0;
  //Loop through the values to be inputted as bars
  for (let val of values) {
    let userValueInput = val.value;
    //find out the percentage height of the current bar relative to the max height determined above
    let barHeightPercentage = userValueInput / maxHeight * 100;
    //create a div that will be stylized by the .single-bar css selector
    let barDiv = document.createElement('div');
    barDiv.classList.add('single-bar');
    barDiv.setAttribute('id', 'bar' + i);
    let inBarVal = document.createElement('span');
    inBarVal.classList.add('in-bar-val');
    inBarVal.innerText = userValueInput;
    barDiv.appendChild(inBarVal);
    //assign the div height
    barDiv.style.height = `${barHeightPercentage}%`;
    //assign the div bg color
    barDiv.style.backgroundColor = barColors[i].value;
    //create value to be placed inside the bar
    i++;
    barContent.appendChild(barDiv);
  }
}
//Create labels below bars Fx
const createLabels = (labels, labelSquare, labelColors) => {
  let j = 0;
  for(let label of labels) {
    let span = document.createElement("span");
    span.innerText = label.value;
    span.classList.add('chart-label');
    span.style.color = labelColors[j].value;
    j++
    console.log(labelSquare)
    labelSquare.appendChild(span);
  }
}
//determines the highest inputted value to size up chart
const determineMax = (values) => {
  let valueArray = [];
  for (let val of values) {
    valueArray.push(val.value);
  }
  //This line not necessary but makes sure that array is type Num
  valueArray = valueArray.map((i) => Number(i));
  let highestNum = Math.max(...valueArray);
  console.log(highestNum);
  return highestNum
}


export { Chart as default }