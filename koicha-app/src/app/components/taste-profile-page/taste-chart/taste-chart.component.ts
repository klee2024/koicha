import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  TasteProfile,
  TasteProfileFlavorDimension,
} from '../../../models/taste-profile';
import { EChartsOption, ECharts } from 'echarts';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';

import * as echarts from 'echarts/core';
import { RadarChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { buildTasteRadarOptions } from '../../../utilities/taste-echart.builder';

echarts.use([RadarChart, TooltipComponent, LegendComponent, CanvasRenderer]);

@Component({
  selector: 'app-taste-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './taste-chart.component.html',
  styleUrl: './taste-chart.component.css',
})
export class TasteChartComponent implements OnChanges {
  @Input() tasteProfile?: TasteProfile = undefined;
  loading: boolean = true;
  mainFlavorLabels: string[] | undefined = undefined;
  mainFlavorValues: number[] | undefined = undefined;

  subCharacteristics: TasteProfileFlavorDimension[] = [];

  radarOptions: EChartsOption = {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if ('tasteProfile' in changes && this.tasteProfile) {
      this.updateChart(this.tasteProfile);
    }
  }

  private updateChart(profile: TasteProfile) {
    const mainFlavors =
      profile.flavor_dimensions?.filter(
        (flavor_value) => flavor_value.characteristic.parent == null
      ) ?? [];
    const labels = mainFlavors.map(
      (flavor_value) => flavor_value.characteristic.name
    );
    const values = mainFlavors.map((characteristic) => characteristic.value);
    console.log('taste profile labels: ', labels);
    console.log('taste profile values: ', values);
    this.radarOptions = buildTasteRadarOptions({
      labels,
      values,
    });
  }
}
