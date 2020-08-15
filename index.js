/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */

 /**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author sukhacbiet1199@gmail.com on 15/8/2020.
 * email: sukhacbiet1199@gmail.com
 */
 'use-strict';
var fs = require('fs');
var readlineSync=require('readline-sync');
var danhSach =[];
function chon(){
  console.log("Chon option :");
  console.log("0. Xem danh bạ");
  console.log("1. Nhập dữ liệu.");
  console.log("2. Sửa dữ liệu.");
  console.log("3. Xóa dữ liệu.");
  console.log("4. Tìm kiếm dữ liệu.");
  var option = readlineSync.question(">>");
  switch(option){
    case '0':
       danhBa();
       console.log("-----------------------");
       chon();
       break;
    case '1':
       themDL();
       luu();
       console.log("-----------------------");
       chon();
       break;
    case '2':
       suaDL();
       danhBa();
       console.log("-----------------------");
       chon();
       break;
    case '3':
       xoaDL();
       console.log("-----------------------");
       chon();
       break;
    case '4':
       timkiem();
       chon();
       break;
    default:
       break;   
  }
}
function loadDS(){
  var xem = fs.readFileSync('./data.json');
  danhSach=JSON.parse(xem);
}
function themDL(){
   var names = readlineSync.question("Name :");
   var phone = readlineSync.question("Phone number :");
   var lienHe = {
     name :names,
     number : phone
   };
   danhSach.push(lienHe);  
}
function luu(){
  var nhap = JSON.stringify(danhSach);
  fs.writeFileSync('./data.json',nhap,{encoding: 'utf8'});
}
function danhBa(){
    console.log("**********************");
    console.log("Danh bạ điện thoại của bạn là :");
    for(var lienHe of danhSach){
    console.log(lienHe.name,':   ',lienHe.number);
     }
}
// nhap id sau do tim id trong mang và sua theo idid
function suaDL(){
    var id = readlineSync.question("Nhập id của 1 liên hệ muốn sửa thông tin :");
    idsua=parseInt(id);
    for(var i=0;i<danhSach.length;i++){
      if(i==idsua){
        console.log(danhSach[i]);
        console.log("1. Sua ten.");
        console.log("2. Sua so dien thoai.");
        console.log("3. Sua ca ten va so dien thoai");
        var option = readlineSync.question(">>");
        switch(option){
          case '1':
             var name = readlineSync.question("Nhap ten moi :");
             danhSach[i].name=name;
             luu();
             break;
          case '2':
             var number = readlineSync.question("Nhap so moi :");
             danhSach[i].number=number;
             luu();
             break;
          case '3':
            var name = readlineSync.question("Nhap ten moi :");
             var number = readlineSync.question("Nhap so moi :");
             danhSach[i].name=name;
             danhSach[i].number=number;
             luu();
             break;
          default :
             console.log("Wrong option!");
             chon();
             break;
        }
      }
    }
}
function xoaDL(){
  var id = readlineSync.question("Nhập id của 1 liên hệ muốn xóaxóa thông tin :");
    idxoa=parseInt(id);
    for(var i=0;i<danhSach.length;i++){
      if(i==idxoa){
        danhSach.splice(i,1);
        luu();
        danhBa();
      }
    }
}
function timkiem(){
  loadDS();
  var hoi = readlineSync.question("Nhap thong tin tim kiem :");
  var result =[];
  for(var i = 0 ;i<danhSach.length;i++){
      if ( danhSach[i].name == hoi || danhSach[i].number == hoi){
        result.push(danhSach[i]);
      }
  }
  console.log(result);
  return result;
}
function main(){
    loadDS();
    // console.log(danhSach);
    chon();
}
main();