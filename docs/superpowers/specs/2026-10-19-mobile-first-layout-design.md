# Bố cục mobile-first cho album ký ức

## Mục tiêu

Ưu tiên ảnh 3D trên điện thoại: thiệp lời chúc và nhóm điều khiển không được chiếm hơn phần không gian cần thiết hoặc che vùng ảnh chính.

## Thanh điều khiển điện thoại

- Giữ biểu tượng hoa ở góc trái; ẩn tên và dòng phụ đề dưới `sm`.
- Giữ các nút điều khiển nhưng ẩn nhãn chữ `Tự động lướt`, `Tự do chạm xoay`, `Mở đầu` và `Thay ảnh & Lời chúc` dưới `sm`; biểu tượng vẫn hiển thị và nút giữ `title` hiện có.
- Nhóm nút sẽ vừa trên một hàng ở chiều rộng điện thoại, không cần xuống dòng.

## Thiệp lời chúc điện thoại

- Ở dưới `sm`, `#wish-card` có chiều cao tối đa `34vh`, cho phép cuộn dọc nếu lời chúc dài.
- Giảm padding và cỡ chữ cho tiêu đề/lời chúc/nút điều hướng ở mobile; desktop giữ cỡ hiện có.
- Ẩn dòng gợi ý chạm khung ảnh dưới `sm`, vì nút thả tim là lựa chọn rõ ràng hơn trong không gian nhỏ.

## Kiểm chứng

- CSS/HTML có các responsive utility class để ẩn nhãn mobile, giới hạn `#wish-card` và ẩn gợi ý trên mobile.
- Ở viewport điện thoại, thanh điều khiển không bọc sang dòng thứ hai và thiệp lời chúc không cao quá 34% viewport.
- Ảnh, lời chúc và các nút vẫn hiển thị; không có lỗi console.
