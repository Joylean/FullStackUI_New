import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {

  @Output() onSendBack=new EventEmitter<boolean>();
  @Input() dataSend: any;
  @Input() dataSend1: any;
  @Input() dataSend2: any;

  title: string='';
  titleButton: string='';
  displayedColumns: string[] = [];
  buttonAddUpdate:boolean=false;


  updateEmployee: Employee = {
    id:0,
    employeeName: '',
    dateofJoining: new Date(),
    email: '',
    primaryContactNumber: 0,
    department: {
      id:0,
      departmentName: '',
      location: '',
      reportingManager: ''
    },
    project: {
      id: 0,
      projectName: ''
    },
    designation: {
      id: 0,
      designationName: ''
    },
    dependent: {
      id: 0,
      dependentName: '',
      relationship: '',
    }
   }

  displayStyle = "block";

  constructor(private service: EmployeeServiceService,
    public datepipe: DatePipe,) { }

  ngOnInit(): void {
    // this.dataSend['dateofJoining'] =this.datepipe.transform(this.dataSend[0].dateofJoining,'dd/MM/yyyy');
  //   this.dataSend[0].dateofJoining = this.dataSend[0].dateofJoining.getFullYear() + '-'
  // + ('0' + (this.dataSend[0].dateofJoining.getMonth() + 1)).slice(-2) + '-'
  // + ('0' + this.dataSend[0].dateofJoining.getDate()).slice(-2);
    this.updateEmployee=this.dataSend;
    this.displayedColumns=this.dataSend1;
    this.buttonAddUpdate=this.dataSend2;
  }

  updateEmployeeDetail(){
    this.service.updateEmployee(this.updateEmployee.id,this.updateEmployee).subscribe({
      next: (employee) => {
        this.onSendBack.emit(true);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  closeModal(){
    this.onSendBack.emit(true);
  }

}
