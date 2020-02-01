import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  constructor() { }

  confirms(title: string = 'ยืนยัน'): any {
    return Swal.fire({
      title: title,
      icon: 'question',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: '#ff974a',
      cancelButtonColor: '#b2b2b2',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน',
      // reverseButtons: true,
      position: 'center',
      padding: '0 rem'
    });
  }

  success(title: string = 'บันทึกข้อมูลสำเร็จ', detail: string = ''): any {
    return Swal.fire({
      title: title,
      text: detail,
      icon: 'success',
      heightAuto: false,
    });
  }

  error(err: string): any {
    Swal.fire({
      title: 'เกิดข้อผิดพลาด',
      text: err,
      icon: 'error',
      heightAuto: false
    });
  }

  warning(detail: string): any {
    return Swal.fire({
      text: detail,
      icon: 'warning',
      heightAuto: false,
    });
  }

  datanotFound(): any {
    Swal.fire({
      icon: 'warning',
      title: '204',
      text: 'ไม่พบข้อมูล',
      heightAuto: false
    });
  }

  loginFailed(): any {
    Swal.fire({
      icon: 'error',
      title: 'เข้าสู่ระบบไม่สำเร็จ',
      text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
      position: 'top',
      padding: '-5 rem'
    });
  }

  internetNotConnected(): any {
     Swal.fire(
        'เกิดข้อผิดพลาด',
        'อินเทอร์เน็ต ไม่สามารถเชื่อมต่อได้',
        'warning'
     );
  }
}
