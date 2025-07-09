import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios.instance";
const HealthRecordsTable = () => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const req = await axiosInstance.get("/records");
      console.log(req.data.records);
      setRecords(req.data.records);
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTemperatureColor = (temp) => {
    if (temp >= 37.5) return "text-red-600 bg-red-50";
    if (temp >= 37) return "text-orange-600 bg-orange-50";
    if (temp < 35.5) return "text-blue-600 bg-blue-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4">
          <h2 className="text-xl font-bold">Bảng Theo Dõi Sức Khỏe</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-700">
                  ID
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Tên
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Nhiệt độ (°C)
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Tiếp xúc F0
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Triệu chứng
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Thời gian tạo
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Cập nhật
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                console.log(record.id);
                return (
                  <tr
                    key={record.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-600">{record.id}</td>
                    <td className="p-4 font-medium text-gray-800">
                      {record.name}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTemperatureColor(
                          record.temperature
                        )}`}
                      >
                        {record.temperature}°C
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          record.contact_with_covid
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {record.contact_with_covid ? "Có" : "Không"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {record.Symptoms.map((symptom) => (
                          <span
                            key={symptom.id}
                            className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                          >
                            {symptom.symptom_name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      {formatDate(record.createdAt)}
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      {formatDate(record.updatedAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Tổng cộng: {records.length} bản ghi
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthRecordsTable;
