import Search from './Search/index.jsx';
import TableRender from './TableRender/index.jsx';
import { debounce } from 'lodash';
import './index.less';

export default {
  name: 'Table',
  inheritAttrs: false,
  components: {
    Search,
    TableRender
  },
  data() {
    return {
      data: [],
      total: 0,
      searchParams: {},
      current: 1,
      pageSize: 20,
      sorts: {},
      loading: true
    };
  },
  props: {
    columns: Array,
    search: {
      type: [Boolean, Object],
      default: () => ({})
    },
    shadow: {
      type: String,
      default: 'never'
    },
    disableLoading: {
      type: Boolean,
      default: false
    },
    request: {
      type: Function
    },
    theme: {
      type: String,
      default: 'light'
    },
    renderCard: {
      type: Function
    },
    type: {
      type: String,
      default: 'table'
    },
    customRender: {
      type: Function
    },
    inset: {
      type: [Number, String],
      default: ''
    }
  },
  created() {
    this._refresh = debounce(this.refresh, 500);
    window['pro-table-theme'] = this.theme;
  },
  mounted() {
    var pagination = this.$attrs.pagination;
    if (pagination && pagination.pageSize) {
      this.pageSize = pagination.pageSize;
    }

    this._refresh();
  },
  methods: {
    async getList() {
      const { searchParams, current, pageSize, sorts } = this;
      this.loading = true;
      var payload = {
        searchParams: { ...searchParams },
        pageInfo: {
          current,
          pageSize
        },
        sorts: { ...sorts }
      };
      try {
        var data = await this.request(payload);
        this.data = data.list || [];
        this.total = data.total || 0;
        if (this.total > 0 && this.total % this.pageSize === 0 && this.current > parseInt(this.total / this.pageSize)) {
          //分页器删除bug修改
          this.current = parseInt(this.total / this.pageSize) || 1;
          this.getList();
        }
      } catch {
        this.loading = false;
      }

      this.loading = false;
    },
    getTable() {
      return this.$refs.tableRender.$refs.table;
    },
    reload() {
      // 重新加载
      this._refresh();
    },
    refresh() {
      // 查询数据
      this.getList();
    },
    onSearch(model) {
      this.searchParams = model;
      this.current = 1;
      this._refresh();
    },
    onSizeChange(pageSize) {
      this.pageSize = pageSize;

      this._refresh();
    },
    onCurrentChange(current) {
      this.current = current;
      this._refresh();
    },
    onSortChange({ column, prop, order }) {
      this.sorts[prop] = order;
      this._refresh();
    },
    onRadioChange(value) {
      // console.log(value, 'value radio table render');
      this.$emit('radioChange', value);
    },
    renderSearch() {
      const { columns, search, shadow } = this;
      if (search && search.type != 'lighter') {
        return (
          <div class="pro-table-search">
            <el-card body-style={{ padding: '22px 20px 0' }} shadow={shadow}>
              <Search
                columns={columns}
                attrs={{ ...search }}
                onSearch={this.onSearch}
                onEnterKeyUp={this.onSearch}
                onRadioChange={this.onRadioChange}
              />
            </el-card>
          </div>
        );
      }
    },
    renderTable() {
      const { columns, search, shadow, data, total, pageSize, current, type, disableLoading } = this;
      if (type === 'table') {
        return (
          <div class="pro-table">
            <el-card shadow={shadow}>
              <TableRender
                loading={!disableLoading && this.loading}
                ref="tableRender"
                onRefresh={this._refresh}
                onSize-change={this.onSizeChange}
                onCurrentpage={this.onCurrentChange}
                onSort-change={this.onSortChange}
                search={search}
                onSearch={this.onSearch}
                columns={columns}
                data={data}
                total={total}
                pageSize={pageSize}
                current={current}
                attrs={this.$attrs}
              />
            </el-card>
          </div>
        );
      } else if (type === 'card') {
        return (
          <div class="pro-card">
            <div class="card-content">{this.data.map((d) => this.renderCard(d))}</div>
          </div>
        );
      }
    }
  },
  computed: {},
  render() {
    const { customRender, theme, inset } = this;
    let searchDom = this.renderSearch();
    let tableDom = this.renderTable();
    return (
      <div class={'pro-table-container pro-table-theme-' + theme || ''}>
        <div class="pro-table-inner" style={`top:${inset};bottom:${inset};left:${inset};right:${inset}`}>
          {customRender ? customRender(searchDom, tableDom) : [searchDom, tableDom]}
        </div>
      </div>
    );
  }
};
