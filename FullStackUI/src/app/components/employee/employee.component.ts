import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';
import {DepartmentServiceService} from 'src/app/service/department-service.service';
import {DesignationServiceService} from 'src/app/service/designation-service.service';
import {ProjectServiceService} from 'src/app/service/project-service.service';
import { Employee } from 'src/app/models/employee.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  ExcelData:any;
  departmentName:any;
  departmentSelected:string='';
  displayedColumn: string[] = ['action'];
  displayedColumns: string[] = [];
  displayedDeptColumns: string[] = [];
  dataSource:any;
  dataDeptSource:any;
  empData:any;
  newEmpData:any=[];
  deptData:any;
  desiData:any;
  projData:any;
  isToggled: boolean = false;
  popUpdata1: string[] = [];
  title: string='';
  titleButton: string='';
  buttonAddUpdate: boolean = false;
  sendData:any;

  addEmployee: Employee = {
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

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: EmployeeServiceService,
    private deptservice: DepartmentServiceService,
    private desiservice: DesignationServiceService,
    private projservice: ProjectServiceService
    ) { }

  ngOnInit(): void {
    if(this.isToggled){
      this.getAllEmployeesData();
    } else {
      this.getAllDepartmentsData();
    }
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
    // this.getAllDesignationsData();
    // this.getAllProjectsData();
    // this.getAllDepartmentsData();
    this.title='Add Employee Details';
    this.titleButton='Add';
    this.buttonAddUpdate=false;
  }

  getAllEmployeesData(){
    this.displayedColumns=[];
    this.displayedColumn=['action'];
    this.service.getAllEmployees().subscribe({
      next: (employees) => {
        this.empData=employees;
        for (var k in this.empData[0]) {
          this.displayedColumns.push(k);
        }
        this.displayedColumn.unshift(...this.displayedColumns);
        this.dataSource = new MatTableDataSource(this.empData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  getAllDepartmentsData(){
    this.displayedDeptColumns=[];
    this.deptservice.getAllDepartments().subscribe({
      next: (departments) => {
        this.deptData=departments;
        for (var k in this.deptData[0]) {
          this.displayedDeptColumns.push(k);
        }
        this.dataDeptSource=new MatTableDataSource(this.deptData);
        this.dataDeptSource.paginator=this.paginator;
        this.dataDeptSource.sort=this.sort;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  getAllDesignationsData(){
    this.desiservice.getAllDesignations().subscribe({
      next: (designations) => {
        this.desiData=designations;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  getAllProjectsData(){
    this.projservice.getAllProjects().subscribe({
      next: (projects) => {
        this.projData=projects;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  toggle() {
    this.isToggled = !this.isToggled;
    if(this.isToggled){
      this.getAllEmployeesData();
    } else {
      this.getAllDepartmentsData();
    }
  }

  FilterChange(event: Event) {
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue;
  }

  getrow(row:any) {
    // console.log(row);
  }

  EditbuttonClicked(row:any) {
    var id=row.id;
    this.service.getEmployee(id).subscribe({
      next: (employee:any) => {
        this.buttonAddUpdate=true;
        //open modal
        this.sendData=employee[0];
        this.displayStyle = "block";
        //Change all data to that of Update
        this.title='Update Employee Details';
        this.titleButton='Update';
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
  
  delete(row:any) {
    var newId=row['id'];
      this.service.deleteEmployee(newId).subscribe({
        next: () =>{
          console.log("Deleted Successfully");
          location.reload();
        },
        error: (response) => {
          console.log(response);
        }
      })
  }

  addEmployeeDetail(){
    this.service.addEmployee(this.addEmployee).subscribe({
      next: (employee) => {
        location.reload();
      },
      error: (response) => {
        console.log(response);
      }
    });
    this.displayStyle = "none";
  }

  Departmentchange(val:string){
    this.departmentSelected=val;
    // console.log(this.departmentSelected);
  }

  searchdepts(){
    this.newEmpData=[];
    for(var i=0; i<this.empData.length; i++){
      if(this.empData[i].department==this.departmentSelected){
        this.newEmpData.push(this.empData[i]);
      }
    }    
    this.dataSource = new MatTableDataSource(this.newEmpData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }

  closeModal(){
    this.displayStyle = "none"; 
  }

  success(e:boolean){
    this.displayStyle = "none";
    location.reload();
  }

  ReadExcel(event:any){
    //excel import
    let file=event.target.files[0];
    let fileReader= new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload=(e)=>{
      var workBook=XLSX.read(fileReader.result,{type:'binary'});
      var SheetNames = workBook.SheetNames;
      this.ExcelData=XLSX.utils.sheet_to_json(workBook.Sheets[SheetNames[0]]);
      //data to be displayed in the Table
      // console.log([...this.empData,...this.ExcelData]);
      this.dataSource = new MatTableDataSource([...this.empData,...this.ExcelData]);
    }
  }

}

