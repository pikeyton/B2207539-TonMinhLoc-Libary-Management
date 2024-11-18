import axios from "axios";
const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        // Khi gửi dữ liệu lên server, dữ liệu sẽ được định dạng theo kiểu JSON.
        Accept: "application/json",
        // Khi nhận phản hồi từ server, yêu cầu server trả về dữ liệu dạng JSON.
    },
};
export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};