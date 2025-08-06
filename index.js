const express = require('express');
const axios = require('axios');

// Địa chỉ API bạn cần gọi
const API_URL = 'https://api-sunwin-vannhat-v5-1.onrender.com/api/sunwin/predict';
// Thời gian chờ giữa mỗi lần gọi API (ví dụ: 10 giây)
const INTERVAL_MS = 10000;
const PORT = process.env.PORT || 3000;

// Khởi tạo ứng dụng Express
const app = express();

// Hàm để gọi API và xử lý kết quả
async function fetchData() {
    try {
        const response = await axios.get(API_URL);
        const data = response.data;
        
        console.log('-----------------------------------');
        console.log(`Thời gian: ${new Date().toISOString()}`);
        console.log(`Phiên hiện tại: ${data.phien}`);
        console.log(`Kết quả phiên trước: ${data.ket_qua}`);
        console.log(`Dự đoán cho phiên sau (${data.phien_sau}): ${data.du_doan}`);
        console.log(`Độ tin cậy: ${data.do_tin_cay}%`);
        console.log(`Trạng thái: ${data.status_phan_tich}`);
        console.log('-----------------------------------');
        
    } catch (error) {
        console.error(`Lỗi khi gọi API: ${error.message}`);
    }
}

// Hàm chạy lặp lại
function startPolling() {
    console.log('Bắt đầu treo API...');
    fetchData(); // Gọi lần đầu tiên ngay lập tức
    
    // Lặp lại việc gọi API theo khoảng thời gian đã định
    setInterval(fetchData, INTERVAL_MS);
}

// Endpoint đơn giản để giữ cho dịch vụ luôn hoạt động
app.get('/', (req, res) => {
    res.send('Dịch vụ treo API đang chạy...');
});

// Lắng nghe trên một cổng
app.listen(PORT, () => {
    console.log(`Web server đang lắng nghe tại cổng ${PORT}`);
    startPolling(); // Bắt đầu chương trình khi server khởi động
});
