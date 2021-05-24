import { Component } from '@angular/core';
import { filter, first } from 'rxjs/operators';

import { StaffService, AlertService } from '@app/_services';
import { Staff } from '@app/_models';

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

  constructor(
    private staffService: StaffService,
    private alertService: AlertService
  ) {}

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

  /** Tìm kiếm */
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
  reverse: boolean = true;
  /** Sắp xếp */
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  /** Xóa nhân viên */
  deleteStaff(id: number) {
    const staff = this.staffs.find((x) => x.PK_StaffID === id);
    this.staffService
      .delete(id)
      .pipe(first())
      .subscribe(
        () => this.loadStaffs());
  }

  /** Reload danh sách nhân viên */
  private loadStaffs() {
    this.alertService.success('Xóa thành công');
    this.loading = true;
    this.staffService
      .getAll()
      .pipe(first())
      .subscribe((staffs) => {
        this.loading = false;
        this.staffs = staffs;
      });
  }
}
