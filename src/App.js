
import React, { Component} from 'react';
import { Button , Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getCurrentDate} from './features/getcurrentdate';
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      items : [] ,
      activityLog: [],
      show : false,
      startDate: new Date,
      CurrentId: ""
    };

 }

 handleChange(date) {
   const time = date.toISOString();
  this.setState({
    startDate: time
  })
}


  handleModal(Id){
             
    for(var i=0; i<this.state.items.length; i++){
      if(this.state.items[i].id == Id) {
        var temp = this.state.items[i].activity_periods;
        console.log(temp[i].start_time);
        this.setState({
          activityLog: temp,
          show: !this.state.show,
          CurrentId: Id
        })
      }
    }
  }

  closeModal(){
    this.setState({show : !this.state.show});
  }

 
  componentDidMount() {
    console.log(this.state.startDate.toString());
    console.log(getCurrentDate());
      fetch('https://akashappserviceapi.azurewebsites.net/page')
      .then((res) => {res.json().then((result) => {
        this.setState({items:result.members})
      })
    });
  }

  selectedDate(value,e){
    console.log(value);
    console.log(e.target.value);
  }
   
  handleChange = date => {
    this.setState({
      startDate: date
    });
     for(var k=0; k<this.state.items.length; k++){
       if(this.state.items[k].id == this.state.CurrentId) {
       var new_log = this.state.items[k].activity_periods; 

      this.setState({
        activityLog : new_log,
        show: this.state.show,
        })
       }

     }
    console.log(this.state.startDate);
  };
   render(){ 
         
         var gerdate =this.state.startDate.toString().substring(4,15);
        
         if(gerdate.charAt(4) == '0'){
           var firstPart = gerdate.substring(0,4);
           var secondPart = gerdate.substring(5,11);
           gerdate = firstPart + secondPart;
         }
   return(
           <div align="center" className="App">
            {
              this.state.items.map((item)=>             
              <div> <div><Button onClick={() => this.handleModal(item.id)}>{item.real_name} </Button>
              </div>
              <Modal show ={this.state.show} onClick={() => this.handleModal()}>
                      <Modal.Body>
                      <div  align="center"><h2><u>ACTIVITY LOG</u></h2></div>
                                 <DatePicker 
                                             dateFormat="yyyy/MM/dd"
                                             selected={this.state.startDate}
                                             onChange={this.handleChange}
                                 /> 
                                 {
                                    this.state.activityLog.filter((actItem) =>(
                                      actItem.start_time.indexOf(gerdate) >= 0 
                                      )).map((act,index) =>(       
                                          <div>
       
                                            <div>Start Time :{act.start_time}</div>
                                            <div>End Time :{act.end_time}</div> 
                                          </div>
                                        ))          
                                  }                    
                      </Modal.Body>
                      <Modal.Footer>
                      <Button onClick={() => this.closeModal()}>Close</Button>
                      </Modal.Footer>
              </Modal>
              </div>
              )
            }
           </div>
   );
  }
   
}
export default App;
