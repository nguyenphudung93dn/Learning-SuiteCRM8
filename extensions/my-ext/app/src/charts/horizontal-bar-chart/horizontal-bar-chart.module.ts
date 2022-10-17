import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {HorizontalBarChartComponent} from './horizontal-bar-chart.component';
import {BaseChartModule} from 'core';

@NgModule({
    declarations: [HorizontalBarChartComponent],
    exports: [HorizontalBarChartComponent],
    imports: [
        CommonModule,
        NgxChartsModule,
        BaseChartModule
    ]
})
export class HorizontalBarChartModule {
}
