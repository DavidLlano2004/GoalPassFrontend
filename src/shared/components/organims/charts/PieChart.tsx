import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function PieChart({ data = [] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "N° Boletas",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data,
        },
      ],
    };

    chart.setOption(option);

    // Cleanup al desmontar el componente
    return () => {
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ height: "100%" }} className="flex-1" />;
}
