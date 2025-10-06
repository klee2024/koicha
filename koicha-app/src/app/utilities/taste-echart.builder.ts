import type { EChartsOption } from 'echarts';

export type TasteRadarArgs = {
  labels: string[];
  values: number[];
  color?: string;
  rings?: number;
  radius?: string | number;
};

export function buildTasteRadarOptions({
  labels,
  values,
  color = '#40826D',
  rings = 5,
  radius = '78%',
}: TasteRadarArgs): EChartsOption {
  return {
    tooltip: { trigger: 'item' },
    radar: {
      radius,
      center: ['50%', '50%'],
      shape: 'polygon',
      splitNumber: rings,
      axisName: { color: '#333' },

      splitLine: {
        lineStyle: {
          type: 'dotted',
        },
      },

      // the radial lines from center to axes
      axisLine: {
        lineStyle: {
          type: 'dotted', // make dotted
        },
      },

      splitArea: {
        show: true,
        areaStyle: {
          color: ['#ffffff'],
        },
      },

      indicator: labels?.map((name) => ({
        name,
        max: 100,
      })),
    },
    series: [
      {
        type: 'radar',
        name: 'your taste profile',
        data: [{ value: values }],
        areaStyle: { opacity: 0.25, color: color },
        lineStyle: { width: 2, color: color },

        symbol: 'circle',
        symbolSize: 8,
        emphasis: { focus: 'self' },
        itemStyle: {
          color: color,
        },
      },
    ],
    textStyle: {
      fontSize: 16,
    },
  };
}
