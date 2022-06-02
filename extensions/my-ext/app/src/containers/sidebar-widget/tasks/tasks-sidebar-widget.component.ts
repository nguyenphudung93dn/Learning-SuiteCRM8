import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
    ButtonInterface,
    ColumnDefinition,
    Field,
    Record,
    SearchCriteria,
    SearchCriteriaFieldFilter,
    SearchCriteriaFilter
} from 'common';
import {Subscription} from 'rxjs';
import {
    BaseWidgetComponent,
    FieldManager,
    LanguageStore,
    Metadata,
    MetadataStore,
    RecordListStore,
    RecordListStoreFactory
} from 'core';
import {shareReplay, take} from 'rxjs/operators';

@Component({
    selector: 'scrm-tasks-sidebar-widget',
    templateUrl: './tasks-sidebar-widget.component.html',
    styles: []
})
export class TasksSidebarWidgetComponent extends BaseWidgetComponent implements OnInit, OnDestroy {

    @ViewChild('list') listContainer: ElementRef;

    recordList: RecordListStore;
    records: Record[];
    loading = false;
    maxHeight = 400;
    module = 'tasks';
    noData = true;

    protected subs: Subscription[] = [];
    protected fieldDefs: ColumnDefinition[];
    protected parentId: string;
    protected parentType: string;


    constructor(
        protected listStoreFactory: RecordListStoreFactory,
        protected meta: MetadataStore,
        protected language: LanguageStore,
        protected fieldManager: FieldManager
    ) {
        super();
        this.recordList = listStoreFactory.create();
    }

    ngOnInit(): void {

        if (!this.context$) {
            return;
        }

        this.recordList.init(this.module, false, 'list_max_entries_per_subpanel');
        this.initRecordSubscription();
        this.initLoading();

        this.loading = true;
        this.meta.getMetadata(this.module).pipe(
            take(1),
            shareReplay()
        ).subscribe(meta => {
            this.loading = false;
            this.initFieldDefinitions(meta);
            this.initLoadDataSubscription();
        });
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    /**
     * Get Header label
     */
    getHeaderLabel(): string {
        return this.language.getFieldLabel('LBL_MODULE_NAME', 'tasks') || '';
    }

    /**
     * Check if all records have been loaded
     */
    allLoaded(): boolean {
        const pagination = this.recordList.getPagination();
        if (!pagination) {
            return false;
        }

        return pagination.pageSize >= pagination.total;
    }

    /**
     * Get load more button definitions
     */
    getLoadMoreButton(): ButtonInterface {
        return {
            klass: 'load-more-button btn btn-link btn-sm',
            labelKey: 'LBL_LOAD_MORE',
            onClick: () => {
                this.loadMore();
            }
        } as ButtonInterface;
    }

    /**
     * Get field
     * @param field
     * @param record
     */
    initField(field: string, record: Record): Field {

        if (!field || !record) {
            return null;
        }

        if (record.fields && record.fields[field]) {
            return record.fields[field];
        }

        const definition = this?.fieldDefs[field] ?? null;

        if (!definition) {
            return null;
        }

        return this.fieldManager.addField(record, definition);
    }

    /**
     * Init record subscription
     */
    protected initRecordSubscription(): void {

        this.subs.push(this.recordList.records$.subscribe(records => {
            this.records = records;
        }));
    }

    /**
     * Init loading subscription
     */
    protected initLoading(): void {
        this.subs.push(this.recordList.loading$.subscribe(loading => {
            this.loading = loading === true;
        }));
    }

    /**
     * Update list search criteria
     * @param parentId
     * @param parentType
     */
    protected updateSearchCriteria(parentId: string, parentType: string): void {
        this.recordList.updateSearchCriteria({
            filters: {
                'parent_id': {
                    field: 'parent_id',
                    fieldType: 'id',
                    operator: '=',
                    values: [parentId]
                } as SearchCriteriaFieldFilter,
                'parent_type': {
                    field: 'parent_id',
                    fieldType: 'varchar',
                    operator: '=',
                    values: [parentType]
                } as SearchCriteriaFieldFilter
            } as SearchCriteriaFilter,
            orderBy: 'DESC',
            sortOrder: 'date_due',
            searchModule: this.module
        } as SearchCriteria);
    }

    /**
     * Init load data subscription
     */
    protected initLoadDataSubscription(): void {
        this.subs.push(this.context$.subscribe(context => {
            this.context = context;

            this.loadData();
        }));
    }

    /**
     * Load Data
     */
    protected loadData(): void {
        const parentId = this?.context?.id ?? null;
        const parentType = this?.context?.module ?? null;
        const sameParentId = this.parentId === parentId;
        const sameParentType = this.parentType === parentType;

        if (!parentId || !parentType) {
            this.noData = true;

            this.parentId = null;
            this.parentType = null;

            return;
        }


        if (sameParentId && sameParentType) {
            return;
        }

        this.parentId = parentId;
        this.parentType = parentType;

        this.updateSearchCriteria(parentId, parentType);

        this.recordList.load().pipe(
            take(1)
        ).subscribe();
    }

    /**
     * Init field definitions
     * @param meta
     */
    protected initFieldDefinitions(meta: Metadata): void {
        const fieldDefinitions = meta?.listView?.fields ?? [];
        this.fieldDefs = [];

        fieldDefinitions.forEach(definition => {
            if (!definition || !definition.name) {
                return
            }

            this.fieldDefs[definition.name] = definition;
        });
    }

    /**
     * Load more records
     * @param jump
     */
    protected loadMore(jump: number = 10): void {
        const pagination = this.recordList.getPagination();
        const currentPageSize = pagination.pageSize || 0;
        let newPageSize = currentPageSize + jump;

        this.recordList.setPageSize(newPageSize);
        this.recordList.updatePagination(0);
    }

}