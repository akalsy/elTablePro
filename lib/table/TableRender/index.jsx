import Toolbar from './ToolBar';
import Alert from './Alert';
import Vue from 'vue';
import ProField from '../../field/ProField';
import ProLabel from '../../field/ProLabel';
import VueClipboard from 'vue-clipboard2';
import { cloneDeep } from 'lodash';
import './index.less';

VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);

export default {
  name: 'tableRender',
  inheritAttrs: false,
  components: {
    Toolbar,
    Alert,
    ProField
  },
  data() {
    return {
      rowSelect: [],
      size: 'medium',
      columnsStatus: []
    };
  },
  props: {
    toolbar: {
      type: [Boolean, Object],
      default: false
    },
    pagination: {
      type: [Boolean, Object],
      default: () => {
        return {};
      }
    },
    rowselection: {
      type: [Boolean, Object],
      default: false
    },
    currentchange: {
      type: Function,
      default: () => {}
    },
    rowclick: {
      type: Function,
      default: () => {}
    },
    columns: Array,
    total: Number,
    pageSize: Number,
    current: Number,
    loading: Boolean
  },
  created() {
    this.resetColumnsStatus();
  },
  mounted() {},
  computed: {},
  directives: {
    // VueClipboard
  },
  methods: {
    resetColumnsStatus() {
      this.columnsStatus = this.columns
        .filter((c) => !c.hideInTable)
        .map((c) => {
          return {
            label: c.label,
            visible: true
          };
        });
    },
    scopedSlots(item) {
      return {
        default: ({ row, column, $index }) => {
          var value = row[item.prop];
          var dom = (
            <ProField
              value={value}
              valueType={item.valueType}
              mode="read"
              valueEnum={item.valueEnum}
              fieldProps={item.fieldProps}
            />
          );
          if (item.render) {
            return item.render(value, dom, row, !!this.pagination ? $index + (this.current - 1) * this.pageSize : $index);
          }
          if (item.copyable) {
            return (
              <span>
                {dom}
                <i
                  title="复制"
                  onClick={() => {
                    this.$copyText(value).then((e) => {
                      this.$message.success('已复制到剪切板');
                    });
                  }}
                  class="extraIcon el-icon-copy-document"></i>
              </span>
            );
          }
          if (item.editable) {
            return (
              <span>
                {dom}
                <i title="编辑" onClick={item.onEdit} class="extraIcon el-icon-edit-outline"></i>
              </span>
            );
          }
          return dom;
        },
        header: ({ row, column, $index }) => {
          return <ProLabel label={column.label} tooltip={item.tooltip} />;
        }
      };
    },
    renderColumns() {
      const { rowselection, columnsStatus, columns } = this;
      let isColumnVisible = (label) => {
        let colstatus = columnsStatus.find((c) => c.label == label);
        if (colstatus) {
          return colstatus.visible;
        }
      };
      let columnFixed = (label) => {
        let colstatus = columnsStatus.find((c) => c.label == label);
        if (colstatus) {
          if (colstatus.fixed == 'front') {
            return 'left';
          } else if (colstatus.fixed == 'end') {
            return 'right';
          }
          return '';
        }
      };
      var cloneColumns = cloneDeep(columns);
      cloneColumns.forEach((c) => {
        let fixed = columnFixed(c.label);
        if (fixed) {
          c.fixed = fixed;
        }
      });
      var tablecolumns = cloneColumns
        .sort(
          (a, b) =>
            columnsStatus.findIndex((c) => c.label == a.label) - columnsStatus.findIndex((c) => c.label == b.label)
        )
        .filter((c) => !c.hideInTable && isColumnVisible(c.label))
        .map((item) => {
          return <el-table-column attrs={{ ...item }} scopedSlots={this.scopedSlots(item)}></el-table-column>;
        });
      if (!!rowselection) {
        tablecolumns.unshift(<el-table-column type="selection" 
        reserve-selection={true} width={55} />);
      }

      return tablecolumns;
    },
    onSelectionChange(rowSelect) {
      const { rowselection } = this;
      this.rowSelect = rowSelect;
      rowselection.onRowSelect([...rowSelect]);
    },
    onSelectAll(selection) {
      const { rowselection } = this;
      rowselection.onSelectAll && rowselection.onSelectAll(selection);
    },
    onSelect() {
      const { rowselection } = this;
      rowselection.onSelect && rowselection.onSelect(...arguments);
    }
  },
  watch: {
    columns: {
      handler(val) {
        this.resetColumnsStatus();
      },
      deep: true //true 深度监听
    }
  },
  render() {
    const { data, alertRender, alertActionRender, search } = this.$attrs;
    const { pagination, total, pageSize, current, rowSelect, columnsStatus, columns, toolbar } = this;

    return (
      <div class="pro-table-render">
        {toolbar && (
          <div class="pro-table-render-toolbar">
            <Toolbar
              onSizechange={(size) => (this.size = size)}
              columnsStatus={columnsStatus}
              onColumnsstatus={(status) => {
                this.columnsStatus = status;
                // this.$nextTick(() => { //在数据加载完，重新渲染表格
                //   this.$refs['table'].doLayout();
                // })
              }}
              on={this.$listeners}
              attrs={{ ...this.toolbar, search, columns }}></Toolbar>
          </div>
        )}
        {rowSelect.length > 0 && (
          <Alert
            alertRender={alertRender}
            alertActionRender={alertActionRender}
            rowSelect={rowSelect}
            onClearselect={() => this.$refs.table.clearSelection()}
          />
        )}
        <div class="pro-table-realtable">
          <el-table
            height={300}
            ref="table"
            v-loading={this.loading}
            size={this.size}
            onSelection-change={this.onSelectionChange}
            onSelect-all={this.onSelectAll}
            onSelect={this.onSelect}
            // onCurrent-change={(currentRow, oldCurrentRow) => {

            //   this.$emit('currentchange', currentRow, oldCurrentRow)
            // }}border
            // border={window["pro-table-theme"] == "light"}
            onCurrent-change={this.currentchange}
            onRow-click={this.rowclick}
            on={this.$listeners}
            data={data}
            style={{ width: '100%' }}
            attrs={{ ...this.$attrs }}>
            {this.renderColumns()}
          </el-table>
          {!!pagination && (
            <div class="pro-table-pagination">
              <el-pagination
                background
                onCurrent-change={(c) => {
                  this.$emit('currentpage', c);
                }}
                on={this.$listeners}
                page-sizes={[10, 20, 30, 50, 100]}
                pageSize={pageSize}
                currentPage={current}
                layout="total, sizes, prev, pager, next"
                total={total}></el-pagination>
            </div>
          )}
        </div>
      </div>
    );
  }
};
