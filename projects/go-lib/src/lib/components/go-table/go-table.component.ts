import { Component, ContentChildren, Input, OnChanges, QueryList } from '@angular/core';
import { GoTableColumnComponent } from './go-table-column.component';
import { GoTableConfig, SortDirection } from './index';
import { sortBy } from './go-table-utils';

@Component({
  selector: 'go-table',
  templateUrl: './go-table.component.html',
  styleUrls: ['./go-table.component.scss']
})
export class GoTableComponent implements OnChanges {

  @Input() tableConfig: GoTableConfig;

  @ContentChildren(GoTableColumnComponent) columns: QueryList<GoTableColumnComponent>;

  localTableConfig: GoTableConfig;

  ngOnChanges() {
    this.renderTable();
  }

  renderTable() {
    if (this.tableConfig!.tableData) {
      this.localTableConfig = JSON.parse(JSON.stringify(this.tableConfig));
      this.handleSort();
    }
  }

  columnClasses(columnField: string) : object {
    return {
      'go-table__th--sort-up': this.sortClasses(columnField, SortDirection.ascending),
      'go-table__th--sort-down': this.sortClasses(columnField, SortDirection.descending)
    }
  }

  toggleSort(columnField: string) {
    let { sort, sortable, tableData } = this.localTableConfig;

    if (tableData && sortable) {
      if (sort && sort.column === columnField) {
        sort.direction = this.toggleSortDir(sort.direction);
      } else {
        this.localTableConfig.sort = { column: columnField, direction: SortDirection.ascending };
      }
      this.handleSort();
    }
  }
  
  /** Private Methods **/
  private handleSort() : void {
    let { sort, sortable, tableData } = this.localTableConfig;

    if (sort && sortable && tableData && sort.column) {
      this.localTableConfig.tableData.sort(sortBy(sort.column, Boolean(sort.direction)));
    }
  }

  private toggleSortDir(currDir: SortDirection) : SortDirection {
    return currDir === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
  }

  private sortClasses(columnField: string, direction: SortDirection) : boolean {
    let { sort } = this.localTableConfig;

    return sort && sort.column === columnField && sort.direction === direction;
  }

}
