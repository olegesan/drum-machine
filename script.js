const activePadStyle = {
  backgroundColor: 'rgb(104, 11, 190)',
  transform: 'translateY(3px)',
  boxShadow:'1px 1px 10px rgba(231, 230, 223, 0.141)'
}
 const defaultPadStyle={
  color:'white',
  backgroundColor: 'blueviolet',
}
class DrumPad extends React.Component{
  constructor(props){
    super(props);
    this.state={
      style:props.style
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  activatePad(){
    this.setState({style:activePadStyle})
    setTimeout(()=>{
      this.setState({style:defaultPadStyle})
    },100)
  }
  handleClick=(e)=>{
    this.activatePad()
    this.props.HandleClickPad(e,this.props.name)
  }
  handleKeyPress=(e)=>{
    if(e.key===this.props.name){
      let sound = document.getElementById(e.key.toUpperCase())
      sound.currentTime = 0;
      sound.play();
      this.activatePad()
    }
  }
  componentDidMount(){
    document.addEventListener('keydown',this.handleKeyPress)
  }
  render(){
    let {src, name, style} = this.props
    return(
    <div onClick={this.handleClick}id={`drum-pad-${name}`}className='drum-pad' style={this.state.style} >
          {name.toUpperCase()}
          <audio src={src} id={name.toUpperCase()} className='clip'>
          </audio>
    </div>
      )
  }
}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      currentSound:'',
      currentKit:['kit1'],
      sounds:{
        'kit1':{
          'q':['Closed HH','https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'],
          'w': ['Punchy Kcik','https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'],
          'e': ['Side Kick','https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'],
          'a': ['Dick Oh','https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'],
          's': ["Kick'n Hat",'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'],
          'd': ['RP4 Kick','https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'],
          'z': ['Cev H2','https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'],
          'x': ['Dry Ohh','https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'],
          'c': ['Bark Snr','https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'],
        },
      }
    }
    this.handlePressKey=this.handlePressKey.bind(this);
    this.handleClickPad = this.handleClickPad.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  playSound(key){
    let sound = document.getElementById(key.toUpperCase())
    sound.currentTime = 0;
    sound.play();
  }
  handlePressKey(e){
    let keyPressed = e.key
    let currentKit = this.state.currentKit
    if(Object.keys(this.state.sounds[currentKit]).includes(keyPressed)){
      this.setState({currentSound:this.state.sounds[currentKit][keyPressed.toLowerCase()][0]})
    }
  }
  handleClickPad(e,id){
    if(Array.from(e.target.classList).includes('drum-pad')){
      this.playSound(e.target.innerText)
      let currentKit = this.state.currentKit
      this.setState({currentSound:this.state.sounds[currentKit][e.target.innerText.toLowerCase()][0]})
    }
  }
  componentDidMount(){
    document.addEventListener('keydown', this.handlePressKey)
    document.addEventListener('click',this.handleClickPad)
  }
  render(){   
    const drumPads =  Object.keys(this.state.sounds[this.state.currentKit]).map(name=>
      <DrumPad HandleClickPad={this.handleClickPad}name={name}key={name} src={this.state.sounds[this.state.currentKit][name][1]}/>)
    return(
      <div id='drum-machine'>
       
        <h1>Drum Machine</h1>
        <div id='display'>
          {this.state.currentSound?this.state.currentSound:'no sound'}
        </div>
        <div className='drumKeys'>
          {drumPads}
        </div>
      </div>
      )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));


