import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
export class TasteChartComponent implements OnChanges {
  @Input() tasteProfile?: TasteProfile = undefined;
  loading: boolean = true;
  mainFlavorLabels: string[] | undefined = undefined;
  mainFlavorValues: number[] | undefined = undefined;

  subCharacteristics: Record<string, SubFlavorCharacteristic[]> | undefined =
    undefined;

  radarOptions: EChartsOption = {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if ('tasteProfile' in changes && this.tasteProfile) {
      this.updateChart(this.tasteProfile);
    }
  }

  private updateChart(profile: TasteProfile) {
    const mainFlavors = profile.mainCharacterstics ?? {};
    const labels = Object.keys(mainFlavors);
    const values = Object.values(mainFlavors);
    this.subCharacteristics = profile.subCharacteristics ?? {};
    this.radarOptions = buildTasteRadarOptions({
      labels,
      values,
    });
  }
}
