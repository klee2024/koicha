import { Component, OnInit } from '@angular/core';
import { TasteProfileService } from '../../services/taste-profile.service';
import { TasteProfile } from '../../models/taste-profile';
import { EChartsOption, ECharts } from 'echarts';
import { SubFlavorCharacteristic } from '../../models/sub-flavor-characteristics';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';

import * as echarts from 'echarts/core';
import { RadarChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([RadarChart, TooltipComponent, LegendComponent, CanvasRenderer]);

@Component({
  selector: 'app-taste-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './taste-chart.component.html',
  styleUrl: './taste-chart.component.css',
})
export class TasteChartComponent implements OnInit {
  tasteProfile: TasteProfile | undefined = undefined;
  loading: boolean = true;
  mainFlavorLabels: string[] | undefined = undefined;
  mainFlavorValues: number[] | undefined = undefined;

  subCharacteristics: Record<string, SubFlavorCharacteristic[]> | undefined =
    undefined;

  radarOptions: EChartsOption = {};

  constructor(private tasteProfileService: TasteProfileService) {}

  ngOnInit() {
    this.tasteProfileService
      .getTasteProfileByUserId('mock_user')
      .subscribe((data) => {
        this.tasteProfile = data;
        const mainFlavors = this.tasteProfile.mainCharacterstics;
        this.mainFlavorLabels = mainFlavors ? Object.keys(mainFlavors) : [];
        this.mainFlavorValues = mainFlavors ? Object.values(mainFlavors) : [];
        this.subCharacteristics = this.tasteProfile.subCharacteristics;

        this.radarOptions = {
          tooltip: { trigger: 'item' },
          radar: {
            shape: 'circle',
            splitNumber: this.mainFlavorLabels?.length,
            axisName: { color: '#333' },
            indicator: this.mainFlavorLabels?.map((name) => ({
              name,
              max: this.mainFlavorLabels?.length,
            })),
          },
          series: [
            {
              type: 'radar',
              name: 'your taste profile',
              data: [{ value: this.mainFlavorValues }],
              areaStyle: { opacity: 0.25 },
              lineStyle: { width: 2 },
              // showSymbol: true,
              symbol: 'circle',
              symbolSize: 8,
              emphasis: { focus: 'self' },
            },
          ],
        };
        console.log('taste profile data retrieved', this.tasteProfile);
      });
    this.loading = false;
  }
}
