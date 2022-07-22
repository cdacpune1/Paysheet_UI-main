import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpapiService } from '../empapi.service';
import { EmployeeData } from '../empModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  flag = false;
  // formValue!: FormGroup;
  database: any;
  empModelObj: EmployeeData = new EmployeeData;
  allEmployeeData: any;
  gr = new FormArray([new FormGroup({ id: new FormControl() })])
  closeResult = '';

  displayedColumns: string[] = ['empId', 'firstName', 'lastName', 'dob', 'status', 'reportingManager', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: EmpapiService, private snackBar: MatSnackBar) {

  }



  ngOnInit(): void {
    this.getAllData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEmployeeData() {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      height: '90%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllData();
        this.showSnackbarDuration('Employee Data Added Successfully..!', 'Done', '3000');

      }
    });
  }
  viewEmployee(row: any) {
    const dialogRef = this.dialog.open(ViewEmployeeComponent, {
      width: '50%',
      height: '90%',
      data: row
    });
  }

  getAllData() {
    this.api.getEmployee().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error While fetching the data..!");
      }
    })
  }

  editEmployee(row: any) {

    this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      height: '90%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllData();
        this.showSnackbarDuration('Employee Data Updated Successfully..!', 'Done', '3000');
      }
    });



    // debugger
    // this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", size: "lg" });
    // this.showAdd = false;
    // this.showbtn = true;

  }


  deleteEmployeeData(data: any) {
    this.api.deleteEmployee(data.id).subscribe(res => {
      // alert("record delete successfully");
      this.showSnackbarDuration('Employee Data Deleted Successfully', 'Close', '3000');

      this.getAllData();
    })
  }
  showSnackbarDuration(content: any, action: any, duration: any) {

    let sb = this.snackBar.open(content, action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-style'],

    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

}
