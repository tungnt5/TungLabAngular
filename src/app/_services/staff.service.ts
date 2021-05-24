import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Staff } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class StaffService {

    constructor(private http: HttpClient) { }

    /** Lấy danh sách nhân viên */
    getAll() {
        return this.http.get<Staff[]>(`${environment.apiUrl}/Staffs/GetAllStaffs`);
    }

    /** Lấy nhân viên theo id */
    getById(id: string) {
        return this.http.get<Staff>(`${environment.apiUrl}/Staffs/GetStaffById/${id}`);
    }

    /** Check trùng email */
    checkEmail(id: string, email: string) {
        return this.http.get(`${environment.apiUrl}/Staffs/EmailExists/${id}?email=${email}`);
    }

    /** Thêm nhân viên */
    create(params: any) {
        return this.http.post(`${environment.apiUrl}/Staffs/InsertStaff`, params);
    }

    /** Sửa nhân viên */
    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/Staffs/UpdateStaff/${id}`, params);
    }

    /** Xóa nhân viên */
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/Staffs/DeleteStaff/${id}`);
    }
}