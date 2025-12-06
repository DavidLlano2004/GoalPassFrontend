import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface TicketsByStandData {
  stand_name: string;
  ticket_count: number;
  percentage: string;
}

export default function PieChart2({ data = [] }: { data?: TicketsByStandData[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    // Si hay datos del API, usarlos; si no, usar los datos de ejemplo
    let chartData: { value: number; name: string; percentage?: string }[];
    let hasRealData = false;

    if (data && data.length > 0) {
      // Filtrar solo las gradas que tienen tickets
      const filteredData = data.filter(item => item.ticket_count > 0);
      
      if (filteredData.length > 0) {
        hasRealData = true;
        chartData = filteredData.map(item => ({
          value: item.ticket_count,
          name: item.stand_name,
          percentage: item.percentage
        }));
      } else {
        // Si no hay tickets, mostrar todas las gradas con 0
        chartData = data.map(item => ({
          value: item.ticket_count,
          name: item.stand_name,
          percentage: item.percentage
        }));
      }
    } else {
      // Datos de ejemplo
      chartData = [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ];
    }

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "item",
        formatter: function(params: any) {
          if (hasRealData) {
            const percentage = params.data.percentage || 
              ((params.value / params.data.value) * 100).toFixed(2);
            return `
              <div style="padding: 8px">
                <strong>${params.name}</strong><br/>
                Boletas: ${params.value}<br/>
                Porcentaje: ${Math.round(parseFloat(percentage))}%
              </div>
            `;
          }
          return `${params.name}: ${params.value}`;
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#ccc',
        borderWidth: 1,
        textStyle: {
          color: '#333'
        }
      },
      legend: {
        orient: "vertical",
        left: "left",
        textStyle: {
          fontSize: 12
        }
      },
      series: [
        {
          name: "Boletas por Grada",
          type: "pie",
          radius: "50%",
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          label: {
            formatter: function(params: any) {
              // Redondear el porcentaje a entero
              const roundedPercent = Math.round(params.percent);
              // Mostrar el porcentaje redondeado
              return `${roundedPercent}%`;
            },
            fontSize: 14,
            fontWeight: 'bold',
            color: '#fff6'
          }
        },
      ],
    };

    chart.setOption(option);

    // Manejar redimensionamiento
    const handleResize = () => {
      chart.resize();
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data]);

  return (
    <div
      ref={chartRef}
      style={{ height: "350px", width: "100%" }}
      className="flex-1"
    />
  );
}