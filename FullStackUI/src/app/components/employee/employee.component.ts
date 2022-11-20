import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';
import {DepartmentServiceService} from 'src/app/service/department-service.service';
import * as XLSX from 'xlsx';
declare const $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  displayedColumn: string[] = ['action'];
  displayedColumns: string[] = [];
  displayedDeptColumns: string[] = [];
  dataSource:any;
  dataDeptSource:any;
  empData:any;
  deptData:any;
  isToggled: boolean = false;
  popUpdata1: string[] = [];
  popUpdata2: string[] = [];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: EmployeeServiceService,
    private deptservice: DepartmentServiceService) { }

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
    for(var i=0; i<this.displayedColumns.length; i++){
      if(this.displayedColumns[i] == 'id'){
        continue;
      } else if(this.displayedColumns[i]=='designation' || this.displayedColumns[i]=='department' || this.displayedColumns[i]=='project'){
        this.popUpdata2.push(this.displayedColumns[i]);
      } else{
        this.popUpdata1.push(this.displayedColumns[i]);
      }
    }
  }
  closePopup() {
    this.displayStyle = "none";
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
    console.log(row);
  }

  EditbuttonClicked(row:any) {
    console.log(row);
  }
  
  DeletebuttonClicked (row:any) {
    console.log(row);
  }
  searchdepts() {

  }
}

