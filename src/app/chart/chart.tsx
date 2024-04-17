"use client"
import React, { useEffect, useRef } from 'react';
import Chart, { ChartType } from 'chart.js/auto';

interface ChartProps {
    data: number[];
    labels: string[];
    type?: ChartType;
}


const ChartComponent: React.FC<ChartProps> = ({ data, labels, type = 'bar' }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            // Destroy previous chart instance
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstance.current = new Chart(ctx, {
                    type: type,
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Chart Data',
                            data: data,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }

        return () => {
            // Cleanup - destroy the chart instance when component unmounts
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartRef, data, labels, type]);

    return <canvas ref={chartRef} />;
};

export default ChartComponent;
