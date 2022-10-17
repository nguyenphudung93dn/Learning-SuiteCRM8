import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarWidgetRegistry,AuthGuard,BaseModuleResolver,ChartRegistry  } from 'core';
import {HttpClientModule} from '@angular/common/http';
import {HelloWorldSidebarWidgetModule} from '../containers/sidebar-widget/hello-world/hello-world-sidebar-widget.module';
import {HelloWorldSidebarWidgetComponent} from '../containers/sidebar-widget/hello-world/hello-world-sidebar-widget.component';
import {TasksSidebarWidgetModule} from '../containers/sidebar-widget/tasks/tasks-sidebar-widget.module';
import {TasksSidebarWidgetComponent} from '../containers/sidebar-widget/tasks/tasks-sidebar-widget.component';
import {HorizontalBarChartComponent} from '../charts/horizontal-bar-chart/horizontal-bar-chart.component';
import {HorizontalBarChartModule} from '../charts/horizontal-bar-chart/horizontal-bar-chart.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        HelloWorldSidebarWidgetModule,
        HorizontalBarChartModule
    ],
})
export class ExtensionModule {
    constructor(protected sidebarWidgetRegistry: SidebarWidgetRegistry,protected chartRegistry: ChartRegistry) {

        console.log('sidebar widget register213123');
        sidebarWidgetRegistry.register('default', 'hello-world', HelloWorldSidebarWidgetComponent);
        sidebarWidgetRegistry.register('default', 'tasks', TasksSidebarWidgetComponent);
        chartRegistry.register('default', 'horizontal-bar' , HorizontalBarChartComponent);
        console.log('loaded');
    }
}