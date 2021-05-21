import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { StaffService } from '@app/_services';
import { Staff } from '@app/_models';
import { Router } from '@angular/router';

@Component({ templateUrl: 'staff.component.html' })
export class StaffComponent {
  loading = false;
  //staffs = null;
  staffs: Staff[] = [];
  Name: any;
  p: number = 1;
  popoverTitle = 'Xác nhận xóa thông tin';
  popoverMessage = 'Ấn nút Confirm để xóa thông tin từ DB';
  confirmClicked = false;
  cancelClicked = false;

  constructor(private staffService: StaffService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.loading = true;
    this.staffService
      .getAll()
      .pipe(first())
      .subscribe((staffs) => {
        this.loading = false;
        this.staffs = staffs;
      });
  }

  Search() {
    if (this.Name == '') {
      this.ngOnInit();
    } else {
      this.p = 1;
      this.staffs = this.staffs.filter((res) => {
        return res.Name.toLocaleLowerCase().match(
          this.Name.toLocaleLowerCase()
        );
      });
    }
  }

  key: string = 'PK_StaffID';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  deleteStaff(id: number) {
    const staff = this.staffs.find((x) => x.PK_StaffID === id);
    staff.isDeleting = true;
    this.staffService
      .delete(id)
      .pipe(first())
      .subscribe(
        () => (this.staffs = this.staffs.filter((x) => x.PK_StaffID !== id))
      );
  }
}
