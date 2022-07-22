import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  employeeForm !: FormGroup;
  constructor(private formBuilder: FormBuilder,


    @Inject(MAT_DIALOG_DATA) public editEmpData: any,
    private dialogRef: MatDialogRef<ViewEmployeeComponent>,
  ) { }
  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      emp_id: new FormControl({ value: this.editEmpData.emp_id, disabled: false }),
      fname: new FormControl({ value: this.editEmpData.fname, disabled: true }),
      mname: new FormControl({ value: this.editEmpData.mname, disabled: true }),
      lname: new FormControl({ value: this.editEmpData.lname, disabled: true }),
      gender: new FormControl({ value: this.editEmpData.gender, disabled: true }),
      email: new FormControl({ value: this.editEmpData.email, disabled: true }),
      pass: new FormControl({ value: this.editEmpData.pass, disabled: true }),
      dob: new FormControl({ value: this.editEmpData.dob, disabled: true }),
      doj: new FormControl({ value: this.editEmpData.dij, disabled: true }),
      status: new FormControl({ value: this.editEmpData.status, disabled: true }),
      repManager: new FormControl({ value: this.editEmpData.repManager, disabled: true }),
      mobNo: new FormControl({ value: this.editEmpData.mobNo, disabled: true }),
      contNo: new FormControl({ value: this.editEmpData.contNo, disabled: true }),
    })
    // console.log("EDITEMPDATA:", this.editEmpData);
  }

}
