import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { flight } from '../../shared/models/flightmodel';
import { flightService } from '../../shared/services/flight.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],

})
export class FlightComponent implements OnInit {


  searchFlightDetails:any = {};
  
  flightDetails:flight;

  //flightWayMode = "";

  constructor(private _flightService:flightService , private _router:Router,private activateRouter:ActivatedRoute,private modalService: NgbModal) { }

  isLoggedIn = false;
  login(){
    this._router.navigate(['Login']);
  }
  ngOnInit(): void {
    if(localStorage.getItem("IsLoggedinApp") === "true"){
      this.isLoggedIn = true;
    }
  }

  flightDetailsData = [];
  searchFlight(flightDetails:any){
    console.log("flight Details",flightDetails);
    this.flightDetails = flightDetails;
    this._flightService.getFlights(this.flightDetails).subscribe((response)=>{
      this.flightDetailsData = response;
      console.log(response);
    })
  }

  TotalAmount = 0;
  flightWayMode = "";
  evtSelectItem(bflight){
   if(!bflight.isSelected){
    this.TotalAmount += bflight.price;
   }
   else{
     this.TotalAmount -=bflight.price;
   }
  console.log(this.TotalAmount);
  }

  closeModal: string;

  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  @ViewChild("modalData",{read:TemplateRef}) content;
  ContinueBooking(){
    if(localStorage.getItem("IsLoggedinApp") === "true"){
     this._router.navigate(['/user/Bookings'],{relativeTo:this.activateRouter});
     let flights = this.flightDetailsData.filter(x=>x.isSelected === true);
     let FlightIDs = [];
     flights.map(x=>FlightIDs.push(x.flightNumber));
     localStorage.setItem("FlightIds", JSON.stringify(FlightIDs));
    }
    else{
      this.triggerModal(this.content)
    }    
  }

  user:any = {};
  RegisterUser(user){
      this._flightService.registerUser(user).subscribe((response)=>{
           console.log(response);
           console.log("succesful");
           if(response == true){
              this._router.navigate(["Login"]);
           }
           else{
               console.log("data is not inserted properly");
           }
      });
  }




}
