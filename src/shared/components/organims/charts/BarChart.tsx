import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface RevenueByStandData {
  stand_name: string;
  stand_revenue: number;
  tickets_sold?: number;
}

export default function BarChart({ data = [] }: { data?: RevenueByStandData[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    // Si hay datos del API, usarlos; si no, usar los datos de ejemplo
    let chartData: (number | { value: number; itemStyle: { color: string } })[];
    let xAxisData: string[];
    let processedData: RevenueByStandData[] = [];

    if (data && data.length > 0) {
      // Asegurarnos de que los datos tienen la estructura correcta
      processedData = data.map(item => ({
        stand_name: item.stand_name || '',
        stand_revenue: Number(item.stand_revenue) || 0,
        tickets_sold: Number(item.tickets_sold) || 0
      }));
      
      // Filtrar gradas con datos (revenue > 0) y ordenar por revenue
      const filteredData = processedData.filter(item => item.stand_revenue > 0);
      const sortedData = [...filteredData].sort((a, b) => b.stand_revenue - a.stand_revenue);
      
      // Si no hay datos con revenue, mostrar todos ordenados alfabéticamente
      const displayData = sortedData.length > 0 ? sortedData : [...processedData].sort((a, b) => a.stand_name.localeCompare(b.stand_name));
      
      xAxisData = displayData.map(item => item.stand_name);
      
      // Encontrar el valor máximo para destacarlo
      const maxRevenue = Math.max(...displayData.map(item => item.stand_revenue));
      
      chartData = displayData.map(item => {
        if (item.stand_revenue === maxRevenue && item.stand_revenue > 0) {
          // Destacar la barra con mayor revenue
          return {
            value: item.stand_revenue,
            itemStyle: {
              color: "#505372",
            }
          };
        }
        return item.stand_revenue;
      });
      
      // Guardar datos procesados para el tooltip
      processedData = displayData;
    } else {
      // Datos de ejemplo
      xAxisData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      chartData = [
        120,
        {
          value: 200,
          itemStyle: {
            color: "#505372",
          },
        },
        150,
        80,
        70,
        110,
        130,
      ];
    }

    const option: echarts.EChartsOption = {
      xAxis: {
        type: "category",
        data: xAxisData,
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: function(value: number) {
            // Formatear valores monetarios
            if (value >= 1000000) {
              return `$${(value / 1000000).toFixed(1)}M`;
            } else if (value >= 1000) {
              return `$${(value / 1000).toFixed(0)}K`;
            }
            return `$${value}`;
          }
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function(params: any) {
          const param = params[0];
          const index = param.dataIndex;
          
          // Obtener el valor (puede ser número u objeto con value)
          const value = typeof param.value === 'object' ? param.value.value : param.value;
          
          const standName = xAxisData[index];
          const formattedAmount = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
          }).format(value);
          
          // Buscar los datos de tickets vendidos
          let ticketsSold = 0;
          if (processedData.length > 0 && processedData[index]) {
            ticketsSold = processedData[index].tickets_sold || 0;
          }
          
          return `
            <div style="padding: 8px">
              <strong>${standName}</strong><br/>
              Ingresos: <strong>${formattedAmount}</strong><br/>
              Boletas vendidas: ${ticketsSold}
            </div>
          `;
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#ccc',
        borderWidth: 1,
        textStyle: {
          color: '#333'
        }
      },
      series: [
        {
          data: chartData,
          type: "bar",
          itemStyle: {
            color: '#3a4de9'
          },
          label: {
            show: true,
            position: 'top',
            formatter: function(params: any) {
              const value = typeof params.value === 'object' ? params.value.value : params.value;
              if (value >= 1000000) {
                return `$${(value / 1000000).toFixed(1)}M`;
              } else if (value >= 1000) {
                return `$${(value / 1000).toFixed(0)}K`;
              }
              return `$${value}`;
            }
          }
        },
      ],
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        top: "10%",
        containLabel: true
      }
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

  return <div ref={chartRef} style={{ height: "400px" , width:"100%"}} className="flex-1" />;
}