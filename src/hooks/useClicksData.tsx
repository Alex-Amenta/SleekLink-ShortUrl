"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const useClicksData = (urlId: string) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchClicksForUrl = async () => {
      try {
        const response = await axios.get(`/api/url/clicks/${urlId}`);
        const data = response.data;

        if (!Array.isArray(data)) {
          throw new Error("Unexpected response format");
        }

        // Transformar los datos
        const transformedData = data.map((item) => ({
          date: new Date(item.clickedAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
          }),
          clicks: 1,
        }));

        // Agrupar por mes
        const groupedData = transformedData.reduce((acc, curr) => {
          const date = curr.date;
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += curr.clicks;
          return acc;
        }, {});

        // Convertir a un arreglo
        const finalData = Object.keys(groupedData).map((date) => ({
          date,
          clicks: groupedData[date],
        }));

        setChartData(finalData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchClicksForUrl();
  }, [urlId]);

  return { chartData };
};

export default useClicksData;
