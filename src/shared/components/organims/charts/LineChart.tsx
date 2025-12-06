import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface RevenueDayData {
  sale_date: string;
  daily_revenue: number;
  transactions_count?: number;
}

export default function LineChart({ data = [] }: { data?: RevenueDayData[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    // Si hay datos del API, usarlos; si no, usar los datos de ejemplo
    let chartData: number[];
    let xAxisData: string[];
    let originalDates: string[];
    let transactions: number[];

    if (data && data.length > 0) {
      // Ordenar datos por fecha
      const sortedData = [...data].sort((a, b) => 
        new Date(a.sale_date).getTime() - new Date(b.sale_date).getTime()
      );
      
      // Tomar solo los últimos 7 días o todos si son menos
      const recentData = sortedData.slice(-7);
      
      // Convertir fechas a nombres de días de la semana (Lun, Mar, Mié...)
      xAxisData = recentData.map(item => {
        const date = new Date(item.sale_date);
        // Array de nombres cortos de días en español
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        return dayNames[date.getDay()];
      });
      
      // Guardar fechas originales para el tooltip
      originalDates = recentData.map(item => item.sale_date);
      
      chartData = recentData.map(item => item.daily_revenue);
      transactions = recentData.map(item => item.transactions_count || 0);
    } else {
      // Datos de ejemplo
      xAxisData = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
      chartData = [820, 932, 901, 934, 1290, 1330, 1320];
      originalDates = xAxisData;
      transactions = [10, 15, 12, 18, 20, 25, 22];
    }

    const option: echarts.EChartsOption = {
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xAxisData,
      },
      yAxis: {
        type: "value",
      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params: any) {
          const param = params[0];
          const index = param.dataIndex;
          
          const dateStr = originalDates[index];
          let displayDate = dateStr;
          
          // Si es una fecha ISO (2025-12-04), formatearla
          if (dateStr.includes('-')) {
            const date = new Date(dateStr);
            displayDate = date.toLocaleDateString('es-ES', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            });
            // Capitalizar primera letra
            displayDate = displayDate.charAt(0).toUpperCase() + displayDate.slice(1);
          }
          
          const amount = param.value;
          const formattedAmount = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
          }).format(amount);
          
          if (transactions && transactions[index] !== undefined) {
            return `
              <div style="padding: 8px">
                <strong>${displayDate}</strong><br/>
                Ingresos: <strong>${formattedAmount}</strong><br/>
                Transacciones: ${transactions[index]}
              </div>
            `;
          }
          
          return `
            <div style="padding: 8px">
              <strong>${displayDate}</strong><br/>
              Ingresos: <strong>${formattedAmount}</strong>
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
          type: "line",
          areaStyle: {},
        },
      ],
    };

    chart.setOption(option);

    // Cleanup al desmontar el componente
    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ height: "400px", width: "100%" }} className="flex-1" />;
}