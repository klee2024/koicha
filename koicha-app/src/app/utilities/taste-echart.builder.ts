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
  radius = '70%',
}: TasteRadarArgs): EChartsOption {
  return {
    tooltip: { trigger: 'item' },
    radar: {
      radius,
      center: ['50%', '37%'],
      shape: 'polygon',
      splitNumber: rings,
      axisName: {
        color: '#333',
        fontSize: 20,
        fontFamily: 'IBM Plex Mono, monospace',
      },
      axisNameGap: 14,

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
    media: [
      {
        query: { maxWidth: 640 },
        option: {
          radar: {
            radius: '75%',
            center: ['50%', '50%'],
            axisName: {
              fontSize: 20,
            },
            axisNameGap: 6,
          },
          textStyle: {
            fontSize: 12,
          },
        },
      },
    ],
  };
}
