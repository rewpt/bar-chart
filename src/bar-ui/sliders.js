import './styles/sliders.css';

class Sliders {
  constructor(sliders, chart) {
    this.sliders = sliders;
    this.chart = chart;
  }
  init () {
    console.log(this.sliders);
    let widthSlider = this.sliders.querySelector('.width-slider');
    let valueHeightSlider = this.sliders.querySelector('.val-height-slider');
    this.sliders.addEventListener('click', e => {
      //Adjust the width of the class with the width of the slider
      if (e.target.classList.contains('width-slider')) {
        let singleBar = this.chart.querySelectorAll('.single-bar');
        for (let single of singleBar) {
          single.style.width =  `${widthSlider.value}%`;
        }
      }
      if (e.target.classList.contains('val-height-slider')){
        let barValues = this.chart.querySelectorAll('.in-bar-val')
        for(let val of barValues) {
          val.style.gridRowStart = valueHeightSlider.value;
          console.log(valueHeightSlider.value);
          let endRowNum = Number(valueHeightSlider.value) + 1
          val.style.gridRowEnd = `${endRowNum}`;
          console.log(valueHeightSlider.value + 1);
        }
      } 
    } )
    
  }
};

export {Sliders as default};