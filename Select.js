class MySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "", 
      chosen: []
    }
  }
  
  onChange = (event) => {
    console.log(event.target.value)
    this.setState({ search: event.target.value });
  }
  
  onClick = (option) => {
    const {chosen} = this.state;
    const {multiSelect} = this.props;
    if (!chosen.includes(option)) {
      if (multiSelect) {
         chosen.push(option);     
      } else {
        chosen[0] = option;
      }
    } else {
      _.remove(chosen, (element) => {        //lodash remove function
        return element === option;
      })
      console.log(chosen);
    }
    this.setState({chosen: chosen});
  }
  
  render() {
    const {options} = this.props;
    const {search, chosen} = this.state;
    const toShow = chosen.join(', ');
    
    const results = search === "" 
      ? options 
      : options.filter(option => {
        return option.toLowerCase().includes(search.toLowerCase());
      })
      
          
    return (
      <div>
        <input className='inputbox' onChange={this.onChange}>
        </input>
        <div className='chosen'>Chosen: {toShow}</div>
        <div>
          {results.map((option) => {
           return (
             <Option 
                onClick={this.onClick}
                title={option}
             />
           )
          })}
        </div>
      </div>
    )
  }
}

class Option extends React.Component {
  constructor(props) {
    super(props);
  }
  
  onClick = () => {
    const {title, onClick} = this.props;
    onClick(title);    
  }
  
  render() {
    const {title} = this.props;
    
    return(
      <li onClick={this.onClick}>{title}</li>
    )
  }
}


const options = [
  "Apple", 
  "Pineapple",
  "Orange"
]

ReactDOM.render(
  <MySelect options={options} multiSelect={false}/>,
  document.getElementById('root')
);