// const nodemailer = require('nodemailer');
//
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'nipda.cs@gmail.com',
//     pass: 'NiPdA1234*'
//   }
// });
//
// function sendEmailComplete(order) {
//   let title = '';
//   if (order.infomerCallbackName !== '' && order.infomerCallbackName !== undefined) {
//     title += '/คุณ ' + order.infomerCallbackName;
//   }
//   const mailOptions = {
//     from: 'ระบบแจ้งเตือนอัตโนมัติ',
//     to: order.infomerEmail,
//     subject: 'รายการแจ้งซ่อม #' + order.id + ' ซ่อมเสร็จเรียบร้อยแล้ว',
//     html: '<div><span style="font-weight: 400;">เรียน คุณ ' + order.infomerName + title + '</span></div>' +
//       '<br>' +
//       '<div><span style="font-weight: 400;">ตามที่ท่านได้แจ้งซ่อมผ่านระบบมานั้นตามหมายเลขการแจ้งซ่อม <a href="https://service.nipda.co.th/status/' + order.id + '" target="_bank">#' + order.id + '</a>  ขณะนี้บริษัทฯ ได้ดำเนินการดำเนินการซ่อมและส่งคืนอุปกรณ์ไปยังสำนักงานของท่านเรียบร้อยแล้ว</span></div>' +
//       '<br>' +
//       '<div><span style="font-weight: 400;">หากท่านต้องการข้อมูลเพิ่มเติม กรุณาติอต่อฝ่ายบริการลูกค้า บริษัท นิปด้า กรุ๊ป จำกัด ได้ที่ 0-2805-0410 ต่อ 11 หรือ14 ในเวลาทำการ 9.00 - 17.00 น. วันจันทร์ - วันศุกร์</span></div>' +
//       '<br>' +
//       '<br>' +
//       '<div>ขอแสดงความนับถือ</div>' +
//       '<br>' +
//       '<div>บริษัท นิปด้า กรุ๊ป จำกัด</div>' +
//       '<br>' +
//       '<div><strong>หมายเหตุ</strong> อีเมลล์ฉบับบนี้สร้างด้วยระบบอัตโนมัติ กรุณาอย่าตอบกลับ</div>' // html body
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       return error;
//     } else {
//       return 'E-mail send success.';
//     }
//   });
// }
//# sourceMappingURL=m_send_mail_test.js.map