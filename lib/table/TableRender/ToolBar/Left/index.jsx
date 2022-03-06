import LigherFilter from '../../../../form/LighterFilter';
import ProLabel from '../../../../field/ProLabel';
import './index.less';
export default {
  name: "Left",
  data() {
    return {
      tabName: ""
    };
  },
  props: {
    title: {
      type: [String, Object],
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    },
    search: {
      type: [Object, Boolean],
      default: false
    },
    columns: {
      type: Array,
      default: () => [],
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    tabChange: Function
  },
  computed: {
  },
  mounted() {
    if (this.tabs.length > 0) {
      var defalutTab = this.tabs.find(t => t.default);
      if (defalutTab) {
        this.tabName = defalutTab.name;
      }
    }
  },
  methods: {
    renderTitle() {
      const { title, tooltip } = this;
      if (!title) return;
      if (typeof (title) == 'string') {
        return <span class="pro-toolbar-title"><ProLabel label={title} tooltip={tooltip} /></span>
      }
      return title;
    },
    renderSearch() {
      const { columns, search } = this
      if (!search || search.type != 'lighter') {
        return null;
      }
      let lighterColumns = columns.filter(c => !c.hideInSearch && c.valueType != 'option');
      lighterColumns = lighterColumns.sort((a, b) => (b.order || 0) - (a.order || 0))
      return (
        <div class="pro-toolbar-search">
          <LigherFilter columns={lighterColumns} attrs={this.$attrs} on={this.$listeners} />
        </div>
      )
    }
  },
  render() {
    const { tabs, tabChange } = this;
    return (
      <div class="pro-toolbar-left">
        {this.renderTitle()}
        {tabs.length > 0 && (
          <el-tabs v-model={this.tabName} onTab-click={tabChange}>
            {tabs.map(t => (
              <el-tab-pane label={t.label} name={t.name}></el-tab-pane>
            ))}
          </el-tabs>
        )}
        {this.renderSearch()}
      </div>
    )
  }
};
