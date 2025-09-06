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
import { buildTasteRadarOptions } from '../../utilities/taste-echart.builder';

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
        const mainFlavors = data?.mainCharacterstics ?? {};
        const mainFlavorLabels = Object.keys(mainFlavors);
        const mainFlavorValues = Object.values(mainFlavors);
        this.subCharacteristics = data?.subCharacteristics ?? {};

        this.radarOptions = buildTasteRadarOptions({
          labels: mainFlavorLabels,
          values: mainFlavorValues,
        });
        console.log('taste profile data retrieved', this.tasteProfile);
      });
    this.loading = false;
  }
}
