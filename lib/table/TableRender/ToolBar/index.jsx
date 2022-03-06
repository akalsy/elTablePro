import Left from './Left'
import Right from './Right'
import './index.less'
export default {
  name: "ToolBar",
  inheritAttrs: false,
  components: {
    Left,
    Right,
  },
  data() {
    return {

    }
  },
  props: {
  },
  computed: {
  },
  methods: {
  },
  render() {
    const { settings, actions, title, search, columns, tooltip, tabs, tabChange, columnsStatus } = this.$attrs;
    return (
      <div class="pro-toolbar">
        <Left search={search} columns={columns} title={title} tabs={tabs} tabChange={tabChange} tooltip={tooltip} on={this.$listeners}></Left>
        <Right
          columns={columns}
          settings={settings}
          columnsStatus={columnsStatus}
          actions={actions}
          on={this.$listeners}
        />
      </div>
    )
  }
};
