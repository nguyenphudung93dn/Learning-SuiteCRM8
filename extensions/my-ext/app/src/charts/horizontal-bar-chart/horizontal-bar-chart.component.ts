import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {isFalse, SingleSeries} from 'common';
import {Subscription} from 'rxjs';
import {BaseChartComponent} from 'core';

@Component({
    selector: 'scrm-horizontal-bar-chart',
    templateUrl: './horizontal-bar-chart.component.html',
    styleUrls: []
})
export class HorizontalBarChartComponent extends BaseChartComponent implements OnInit, OnDestroy {

    results: SingleSeries = [];
    protected subs: Subscription[] = [];

    constructor(protected elementRef: ElementRef) {
        super(elementRef);
    }

    ngOnInit(): void {
        if (this.dataSource.options.height) {
            this.height = this.dataSource.options.height;
        }

        this.calculateView();

        this.subs.push(this.dataSource.getResults().subscribe(value => {
            this.results = value.singleSeries || [];
        }));
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    get scheme(): string {
        return this.dataSource.options.scheme || 'picnic';
    }

    get gradient(): boolean {
        return this.dataSource.options.gradient || false;
    }

    get xAxis(): boolean {
        return this.dataSource.options.xAxis || false;
    }

    get yAxis(): boolean {
        return !isFalse(this.dataSource.options.yAxis);
    }

    get legend(): boolean {
        return !isFalse(this.dataSource.options.legend);
    }

    get showXAxisLabel(): boolean {
        return this.dataSource.options.showXAxisLabel || false;
    }

    get showYAxisLabel(): boolean {
        return this.dataSource.options.showYAxisLabel || false;
    }

    get xAxisLabel(): string {
        return this.dataSource.options.xAxisLabel || '';
    }

    get yAxisLabel(): string {
        return this.dataSource.options.yAxisLabel || '';
    }

    get xAxisTickFormatting(): Function {
        if (this.dataSource.options.xAxisTickFormatting) {
            return this.dataSource.tickFormatting;
        }
        return null;
    }

    formatTooltipValue(value: any): any {
        if (!this.dataSource || !this.dataSource.options || !this.dataSource.options.tooltipFormatting) {
            return value;
        }
        return this.dataSource.options.tooltipFormatting(value);
    }
}