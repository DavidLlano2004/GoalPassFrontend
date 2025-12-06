import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface StandComparisonData {
  stand_name: string;
  total_capacity: number;
  tickets_sold: number;
  occupancy_percentage: number;
  occupancy_level?: string;
}

export default function BarChartDouble({
  data = [],
}: {
  data?: StandComparisonData[];
}) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    // Si hay datos del API, usarlos; si no, usar los datos de ejemplo
    let chartData: any[];
    let categories: string[];
    let seriesData: any[];
    let sortedData: StandComparisonData[] = [];

    if (data && data.length > 0) {
      // Ordenar por nombre de grada
      sortedData = [...data].sort((a, b) =>
        a.stand_name.localeCompare(b.stand_name)
      );

      // Preparar datos para el gráfico
      categories = sortedData.map((item) => item.stand_name);

      // Datos de capacidad total
      const capacityData = sortedData.map((item) => item.total_capacity);

      // Datos de boletas vendidas
      const ticketsData = sortedData.map((item) => item.tickets_sold);

      // Configurar dataset
      chartData = [
        ["Grada", "Capacidad Total", "Boletas Vendidas"],
        ...sortedData.map((item) => [
          item.stand_name,
          item.total_capacity,
          item.tickets_sold,
        ]),
      ];

      // Configurar series
      seriesData = [
        {
          name: "Capacidad Total",
          type: "bar",
          itemStyle: {
            color: "#3a4de9",
          },
          label: {
            show: true,
            position: "top",
            formatter: function (params: any) {
              const value = params.value;
              const dataIndex = params.dataIndex;
              const capacity = capacityData[dataIndex];
              // Usar el occupancy_percentage que ya viene del API
              const percentage = sortedData[dataIndex]?.total_capacity || 0;
              return `${Math.round(percentage.toFixed(1))}`;
            },
          },
        },
        {
          name: "Boletas Vendidas",
          type: "bar",
          itemStyle: {
            color: "#505372",
          },
          label: {
            show: true,
            position: "top",
            formatter: function (params: any) {
              const dataIndex = params.dataIndex;
              // Usar el occupancy_percentage que ya viene del API
              const percentage = sortedData[dataIndex]?.tickets_sold || 0;
              return `${Math.round(percentage.toFixed(1))}`;
            },
          },
        },
      ];
    } else {
      // Datos de ejemplo
      categories = ["Occidental", "Norte", "Sur", "Oriental"];

      chartData = [
        ["Grada", "Capacidad Total", "Boletas Vendidas"],
        ["Occidental", 80, 20],
        ["Norte", 55, 10],
        ["Sur", 55, 0],
        ["Oriental", 90, 0],
      ];

      // Crear datos de ejemplo con estructura similar
      sortedData = [
        {
          stand_name: "Occidental",
          total_capacity: 80,
          tickets_sold: 20,
          occupancy_percentage: 25,
          occupancy_level: "Bajo",
        },
        {
          stand_name: "Norte",
          total_capacity: 55,
          tickets_sold: 10,
          occupancy_percentage: 18.18,
          occupancy_level: "Bajo",
        },
        {
          stand_name: "Sur",
          total_capacity: 55,
          tickets_sold: 0,
          occupancy_percentage: 0,
          occupancy_level: "Bajo",
        },
        {
          stand_name: "Oriental",
          total_capacity: 90,
          tickets_sold: 0,
          occupancy_percentage: 0,
          occupancy_level: "Bajo",
        },
      ];

      seriesData = [
        {
          name: "Capacidad Total",
          type: "bar",
          itemStyle: {
            color: "#3a4de9",
          },
          label: {
            show: true,
            position: "top",
          },
        },
        {
          name: "Boletas Vendidas",
          type: "bar",
          itemStyle: {
            color: "#505372",
          },
          label: {
            show: true,
            position: "top",
            formatter: function (params: any) {
              const value = params.value;
              const dataIndex = params.dataIndex;
              // Usar el occupancy_percentage que ya viene del API
              const percentage =
                sortedData[dataIndex]?.occupancy_percentage || 0;
              return `${value} (${percentage.toFixed(1)}%)`;
            },
          },
        },
      ];
    }

    const option: echarts.EChartsOption = {
      
      legend: {
        data: ["Capacidad Total", "Boletas Vendidas"],
        top: 30,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params: any) {
          if (!Array.isArray(params) || params.length === 0) return "";

          // Obtener el índice del dato
          const dataIndex = params[0].dataIndex;

          // Obtener los datos directamente del array sortedData
          const standData = sortedData[dataIndex];

          if (!standData) return "";

          return `
            <div style="padding: 10px">
              <strong>${standData.stand_name}</strong><br/>
              Capacidad total: <strong>${standData.total_capacity.toLocaleString("es-CO")}</strong><br/>
              Boletas vendidas: <strong>${standData.tickets_sold.toLocaleString("es-CO")}</strong><br/>
              Ocupación: <strong>${Math.round(standData.occupancy_percentage.toFixed(2))}%</strong>
            </div>
          `;
        },
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "#ccc",
        borderWidth: 1,
      },
      dataset: {
        source: chartData,
      },
      xAxis: {
        type: "category",
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: "value",
        name: "Cantidad",
        nameTextStyle: {
          padding: [0, 0, 0, 10],
        },
      },
      series: seriesData,
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        top: "20%",
        containLabel: true,
      },
    };

    chart.setOption(option);

    // Manejar redimensionamiento
    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ height: "400px" }} className="flex-1" />;
}
