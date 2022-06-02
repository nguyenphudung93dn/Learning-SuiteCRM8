import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarWidgetRegistry} from 'core';
import {HttpClientModule} from '@angular/common/http';
import {HelloWorldSidebarWidgetModule} from '../containers/sidebar-widget/hello-world/hello-world-sidebar-widget.module';
import {HelloWorldSidebarWidgetComponent} from '../containers/sidebar-widget/hello-world/hello-world-sidebar-widget.component';
import {TasksSidebarWidgetModule} from '../containers/sidebar-widget/tasks/tasks-sidebar-widget.module';
import {TasksSidebarWidgetComponent} from '../containers/sidebar-widget/tasks/tasks-sidebar-widget.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        HelloWorldSidebarWidgetModule
    ],
})
export class ExtensionModule {
    constructor(protected sidebarWidgetRegistry: SidebarWidgetRegistry) {

        console.log('sidebar widget register213123');
        sidebarWidgetRegistry.register('default', 'hello-world', HelloWorldSidebarWidgetComponent);
        sidebarWidgetRegistry.register('default', 'tasks', TasksSidebarWidgetComponent);

        console.log('loaded');
    }
}