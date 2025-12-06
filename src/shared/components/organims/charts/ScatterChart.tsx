import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface SalesTrendData {
  daily_revenue: number;
  day_name: string;
  sale_date: string;
  tickets_sold: number;
}

export default function ScatterChart({ data = [] }: { data?: SalesTrendData[] }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [hasData, setHasData] = useState<boolean>(false);

  useEffect(() => {
    // Verificar si hay datos válidos
    const validData = data && data.length > 0 && data.some(item => 
      item.tickets_sold > 0 || item.daily_revenue > 0
    );
    
    setHasData(!!validData);

    // Si no hay datos, no inicializar el gráfico
    if (!validData || !chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    // Preparar los datos para el gráfico de dispersión
    // Ordenar los datos por fecha para mejor visualización
    const sortedData = [...data].sort((a, b) => 
      new Date(a.sale_date).getTime() - new Date(b.sale_date).getTime()
    );
    
    // Mapear los datos al formato que necesita ECharts: [tickets_sold, daily_revenue]
    const scatterData = sortedData.map(item => [
      item.tickets_sold,           // Eje X: Boletas vendidas
      item.daily_revenue / 1000000, // Eje Y: Ingresos diarios (en millones)
      item.daily_revenue            // Valor adicional para tooltip
    ]);
    
    // Obtener las etiquetas para los puntos
    const categories = sortedData.map(item => item.day_name);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item',
        formatter: function(params: any) {
          const pointData = params.data;
          const tickets = pointData[0];
          const revenueInMillions = pointData[1];
          const revenueOriginal = pointData[2] || revenueInMillions * 1000000;
          const dayName = categories[params.dataIndex] || 'Día desconocido';
          
          return `
            <div style="padding: 8px">
              <strong>${dayName}</strong><br/>
              Boletas vendidas: <strong>${tickets}</strong><br/>
              Ingresos diarios: <strong>$${(revenueOriginal).toLocaleString('es-CO')}</strong><br/>
              Ingreso por boleta: <strong>$${Math.round(revenueOriginal / tickets).toLocaleString('es-CO')}</strong>
            </div>
          `;
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#ccc',
        borderWidth: 1
      },
      legend: {
        show: true,
        top: 30
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: '20%',
        containLabel: true
      },
      xAxis: {
        name: 'Boletas Vendidas',
        nameLocation: 'middle',
        nameGap: 30,
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      yAxis: {
        nameLocation: 'middle',
        nameGap: 40,
        type: 'value',
        axisLabel: {
          formatter: '${value}M'
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series: [
        {
          name: 'Ventas Diarias',
          type: 'scatter',
          symbolSize: function(data: number[]) {
            // Tamaño proporcional a los ingresos
            const revenue = data[2] || data[1] * 1000000;
            return Math.min(20 + (revenue / 5000000), 40); // Tamaño entre 20 y 40
          },
          data: scatterData,
          itemStyle: {
            color: '#3a4de9',
            opacity: 0.8
          },
          emphasis: {
            itemStyle: {
              color: '#ff6b6b',
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: true,
            formatter: function(params: any) {
              return categories[params.dataIndex] || '';
            },
            position: 'top',
            fontSize: 12
          }
        }
      ],
      visualMap: {
        show: false,
        dimension: 1, // Usar el segundo valor (ingresos) para el color
        min: Math.min(...scatterData.map(d => d[1])),
        max: Math.max(...scatterData.map(d => d[1])),
        inRange: {
          color: ['#3a4de9', '#ff6b6b']
        }
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

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] w-full">
        <div className="text-gray-400 mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="white"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          No hay datos de ventas disponibles
        </h3>
       
      </div>
    );
  }

  return <div ref={chartRef} style={{ height: "400px", width: "100%" }} className="flex-1" />;
}