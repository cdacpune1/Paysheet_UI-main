import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasswordStrengthValidator } from '../employee/password-strength-validators';
import { EmpapiService } from '../empapi.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private api: EmpapiService,
    @Inject(MAT_DIALOG_DATA) public editEmpData: any,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
  ) { }

  employeeForm !: FormGroup;
  actionBtn: string = "Save";
  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      emp_id: ['', [Validators.required, Validators.maxLength(6)]],
      fname: ['', Validators.required],
      mname: [''],
      lname: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      pass: ['', [Validators.required, PasswordStrengthValidator, Validators.minLength(8)]],
      dob: ['', Validators.required],
      doj: ['', Validators.required],
      status: ['', Validators.required],
      repManager: [''],
      mobNo: ['', [Validators.required, Validators.maxLength(10)]],
      contNo: ['', []],
    })
    // console.log("EDITEMPDATA:", this.editEmpData);
    if (this.editEmpData) {

      // this.actionBtn = "Update"
      this.employeeForm.controls['emp_id'].setValue(this.editEmpData.emp_id);
      this.employeeForm.controls['fname'].setValue(this.editEmpData.fname);
      this.employeeForm.controls['mname'].setValue(this.editEmpData.mname);
      this.employeeForm.controls['lname'].setValue(this.editEmpData.lname);
      this.employeeForm.controls['gender'].setValue(this.editEmpData.gender);
      this.employeeForm.controls['email'].setValue(this.editEmpData.email);
      this.employeeForm.controls['pass'].setValue(this.editEmpData.pass);
      this.employeeForm.controls['dob'].setValue(this.editEmpData.dob);
      this.employeeForm.controls['doj'].setValue(this.editEmpData.doj);
      this.employeeForm.controls['status'].setValue(this.editEmpData.status);
      this.employeeForm.controls['repManager'].setValue(this.editEmpData.repManager);
      this.employeeForm.controls['mobNo'].setValue(this.editEmpData.mobNo);
      this.employeeForm.controls['contNo'].setValue(this.editEmpData.contNo);
    }
  }

  addEmployee() {
    if (!this.editEmpData) {
      if (this.employeeForm.valid) {
        this.api.postEmployee(this.employeeForm.value).subscribe(
          {
            next: (res) => {
              this.employeeForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding Employee..!");
            }
          }
        )
      }
    }
    else {
      this.updateEmployee();
    }
  }

  updateEmployee() {
    this.api.updateEmployee(this.employeeForm.value, this.editEmpData.id)
      .subscribe({
        next: (res) => {
          // alert("emp updated successfully..!");
          this.employeeForm.reset();
          this.dialogRef.close('update');

        },
        error: () => {
          alert("Error while updating Employee..!");

        }
      });
  }

}
