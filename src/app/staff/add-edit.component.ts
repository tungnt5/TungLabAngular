import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { StaffService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  checkEmail: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private staffService: StaffService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const PAT_TEL = '[0-9]{1,9}-[0-9]{1,9}-[0-9]{1,9}';
    const PAT_EMAIL = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    this.form = this.formBuilder.group({
      PK_StaffID: this.id,
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email, Validators.pattern(PAT_EMAIL)]],
      Tel: ['', [Validators.required, Validators.pattern(PAT_TEL)]],
    });

    if (!this.isAddMode) {
      this.staffService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    if (this.isAddMode) {
      this.createStaff();
    } else {
      this.updateStaff();
    }
  }

  /** Thêm mới nhân viên */
  createStaff() {
    this.staffService
      .checkEmail('0', this.form.get('Email').value)
      .subscribe((res) => {
        if (res + '' === 'true') {
          this.alertService.error('Email đã tồn tại!');
          this.loading = false;
        } else {
          this.staffService
            .create(this.form.value)
            .pipe(first())
            .subscribe({
              next: () => {
                this.alertService.success('Thêm mới thành công', {
                  keepAfterRouteChange: true,
                });
                this.router.navigate(['../'], { relativeTo: this.route });
              },
              error: (error) => {
                this.alertService.error(error);
                this.loading = false;
              },
            });
        }
      });
  }

  /** Cập nhật thông tin nhân viên */
  updateStaff() {
    this.staffService
      .checkEmail(this.id, this.form.get('Email').value)
      .subscribe((res) => {
        if (res + '' === 'true') {
          this.alertService.error('Email đã tồn tại!');
          this.loading = false;
        } else {
          this.staffService
            .update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
              next: () => {
                this.alertService.success('Cập nhật thành công', {
                  keepAfterRouteChange: true,
                });
                this.router.navigate(['../../'], { relativeTo: this.route });
              },
              error: (error) => {
                this.alertService.error(error);
                this.loading = false;
              },
            });
        }
      });
  }
}
