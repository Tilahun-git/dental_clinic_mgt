'use client';

import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const baseOptions: ApexOptions = {
  chart: { toolbar: { show: false }, fontFamily: 'Avenir Next, Segoe UI, sans-serif', foreColor: '#64756A' },
  grid: { borderColor: '#E7F0EA', strokeDashArray: 4 },
  dataLabels: { enabled: false },
  tooltip: { theme: 'light' },
};

export function RevenueChart({ categories, values, label = 'Revenue' }: { categories: string[]; values: number[]; label?: string }) {
  const options: ApexOptions = {
    ...baseOptions,
    chart: { ...baseOptions.chart, type: 'area' },
    colors: ['#18794E'],
    stroke: { curve: 'smooth', width: 3 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.03, stops: [0, 95, 100] } },
    xaxis: { categories, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: value => `${Math.round(value / 1000)}k` } },
    tooltip: { y: { formatter: value => `${value.toLocaleString()} ETB` } },
  };

  return <Chart options={options} series={[{ name: label, data: values }]} type="area" height={220} />;
}

export function StatusDonut({ labels, values, colors }: { labels: string[]; values: number[]; colors: string[] }) {
  const options: ApexOptions = {
    ...baseOptions,
    chart: { ...baseOptions.chart, type: 'donut' },
    labels,
    colors,
    legend: { position: 'bottom', fontSize: '12px', markers: { size: 6 } },
    stroke: { colors: ['#FFFFFF'] },
    plotOptions: { pie: { donut: { size: '68%', labels: { show: true, total: { show: true, label: 'Total', color: '#64756A' } } } } },
  };

  return <Chart options={options} series={values} type="donut" height={250} />;
}

export function CategoryBar({ categories, values }: { categories: string[]; values: number[] }) {
  const options: ApexOptions = {
    ...baseOptions,
    chart: { ...baseOptions.chart, type: 'bar' },
    colors: ['#2B8A61'],
    plotOptions: { bar: { borderRadius: 5, columnWidth: '48%' } },
    xaxis: { categories, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: 0, tickAmount: 4 },
  };

  return <Chart options={options} series={[{ name: 'Items', data: values }]} type="bar" height={250} />;
}
