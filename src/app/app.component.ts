import { Component, OnInit, ViewChild } from '@angular/core';
import { TruckDataService } from './_service/truck-data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '!---- Welcome to transport world ----!';
  trucksData:any = [];
  totalTruck:number;
  trucknumber:any = [];
  stoppedTruck:any=[];
  runningTruck:any=[];
  runningTruckNo:any;
  idleTruck:any=[];
  errorTruck:any=[];
  errorTruckNo:any;
  idleTruckNo:any;
  stoppedTruckNo:any;
  selectedItems = [];
  dropdownSettings = {};

  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 31.302005;
  lng: number = 76.216896;
  markers: any=[];
  color:boolean;
  term:any;
startTime:any;
endTime:any;
time=[];



  constructor(private _truckService: TruckDataService ) { }

  ngOnInit() {
    this.trucksData=[];
    this._truckService.getTrucksData().subscribe( x => {this.trucksData = x.data;this.totalTruck =this.trucksData.length ; console.log('Truck data>>.',this.trucksData, 'TruckNo',this.trucksData[0].truckNumber );
   
    this.totalTruckListWithNo();

   
  });

  this.dropdownSettings=      {
    "singleSelection": false,
    "idField": "id",
    "textField": "truckNumber",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "itemsShowLimit": 1,
    "allowSearchFilter": false
  }


  }
 
  onItemSelect(item: any) {
  
    console.log('onItemSelect', item);
}

 onDeSelect(items: any) {
  console.log(items, "ondeselect");
}
  
  totalTruckListWithNo(){
  //  this.color=1;
  this.runningTruck=[];
  this.stoppedTruck=[];
  this.idleTruck=[];
  this.errorTruck=[];
     this.trucknumber = this.trucksData;
     this.markers=[];
     for(let i of this.trucksData)
     {
       let x= new Date(i.lastWaypoint.createTime).getUTCMinutes();
      console.log("k",x) 
       this.startTime=new Date(i.lastWaypoint.createTime).getUTCHours();
       this.endTime= new Date(i.lastRunningState.stopStartTime).getUTCHours();
       let diff= this.startTime-this.endTime;
       if((i.lastWaypoint.ignitionOn==false)&&(i.lastRunningState.truckRunningState==0)&& (diff<4))
       {
               
         this.stoppedTruck.push(i);
         console.log("stoppedTruck")
         this.stoppedTruckNo= this.stoppedTruck.length;
         let icon='https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0000FF';
    for(let i of this.stoppedTruck){
         this.markers.push({lat:i.lastRunningState.lat,lng: i.lastRunningState.lng, icon });
      
    }
         
       }
       else if((i.lastRunningState.truckRunningState==1)&& (diff<4))
       {
         this.runningTruck.push(i);
         this.runningTruckNo= this.runningTruck.length;
         let icon='https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00FF00';
         for(let i of this.runningTruck){
              this.markers.push({lat:i.lastRunningState.lat,lng: i.lastRunningState.lng, icon });
           
         }
       }
       else if((i.lastWaypoint.ignitionOn==true)&&(i.lastRunningState.truckRunningState==0)&& (diff<4))
       {
         this.idleTruck.push(i);
         console.log("idleTruck")
         this.idleTruckNo= this.idleTruck.length;
         let icon='https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFFF00';
         for(let i of this.idleTruck){
              this.markers.push({lat:i.lastRunningState.lat,lng: i.lastRunningState.lng, icon });
           
         }
       }
       
      else 
       {this.errorTruck.push(i);
        this.color=true;

           this.errorTruckNo=this.errorTruck.length;   
           let icon='https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000';
           for(let i of this.errorTruck){
                this.markers.push({lat:i.lastRunningState.lat,lng: i.lastRunningState.lng, icon });
             
           }  
       }
     }
  //  this.markers=[];
  //  let icon='https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFC300';
  //  for(let i of this.trucknumber){
  //       this.markers.push({lat:i.lastRunningState.lat,lng: i.lastRunningState.lng, icon });
     
  //  }
   
  }
  runningTruckListWithNo(){
    // this.color=2;
    
    this.trucknumber=this.runningTruck;
    this.markers=[];
    let icon='https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00FF00';
   for(let i of this.trucknumber){
        this.markers.push({lat:i.lastRunningState.lat,lng: i.lastRunningState.lng, icon });
     
   }
  }
  stoppedTruckListWithNo(){
    // this.color=3;
    this.trucknumber=this.stoppedTruck;
    this.markers=[];
    let icon='https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0000FF';
   for(let i of this.trucknumber){
        this.markers.push({lat:i.lastRunningState.lat,lng: i.lastRunningState.lng, icon });
     
   }
  }
  idleTruckListWithNo(){
    // this.color=4;
    this.trucknumber=this.idleTruck;
    this.markers=[];
    let icon='https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFFF00';
   for(let i of this.trucknumber){
        this.markers.push({lat:i.lastRunningState.lat,lng: i.lastRunningState.lng, icon });
     
   }
  }
  errorTruckListWithNo(){
    // this.color=5;
    this.trucknumber=this.errorTruck;
    this.markers=[];
    let icon='https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000';
   for(let i of this.trucknumber){
        this.markers.push({lat:i.lastRunningState.lat,lng: i.lastRunningState.lng, icon });
     
   }
  }
  getColor(colorid){
    for(let i of this.errorTruck)
    {
      if(i==colorid)
      {
        return 'red';
      }
    

    }
  }

  getRunningTruckTime(id){
    for(let i of this.runningTruck)
    {
      if(id==i)return true
    }
  }
  getStoppedTruckTime(id){
    for(let i of this.stoppedTruck)
    {
      if(id==i) return true
    }

  }
  getErrorTruckTime(id){
    for(let i of this.errorTruck)
    {
      if(id==i) return true;
    }
  }

  getIdleTruckTime(id){
    for(let i of this.idleTruck)
    {
      if(id==i) return true;
    }
  }

}
