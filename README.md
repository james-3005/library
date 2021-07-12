#### yarn install: tải dependency trước khi chạy 
#### yarn start: chạy web
#### Cấu trúc project
    tất cả code nằm trong folder src
    App.js là file render ra trang web
    folder Components chứa các components: những component 
    nào tính sử dụng lại cao nên được viết riêng
        -atom: các component đơn giản nhất như button, text, input
        -moreclue: một component được tạo thành từ các thẻ nhỏ
        vd: 1 component chứa ảnh sách, tên sách, nút đặt mua
        -template: Chứa các background, chỉ việc sử dụng
        -page: chứa các trang của trang web
    -Ảnh lưu trong public/image, icon lưu dưới dạng svg
    -Contexts dùng để lưu các global state, ai làm những thành phần tĩnh có thể bỏ qua
#### Dùng scss
    tạo file: filename.module.scss
    import styles from './filename.module.scss'
    trong Components có 1 file init.scss chứa các 
    cấu hình font, màu sẵn, xem qua để lấy màu, font 
#### Lưu ý khi clone project
    clone về rồi tạo 1 branch mới từ main rồi code trên đấy
    Không code trên main, code xong thì push rồi bảo t merge
    