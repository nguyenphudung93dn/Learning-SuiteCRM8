import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksSidebarWidgetComponent} from './tasks-sidebar-widget.component';
import {ButtonModule, FieldModule, LabelModule, LoadingSpinnerModule, WidgetPanelModule} from 'core';

@NgModule({
    declarations: [TasksSidebarWidgetComponent],
    exports: [
        TasksSidebarWidgetComponent
    ],
    imports: [
        CommonModule,
        LoadingSpinnerModule,
        LabelModule,
        FieldModule,
        WidgetPanelModule,
        ButtonModule,
    ]
})
export class TasksSidebarWidgetModule {
}