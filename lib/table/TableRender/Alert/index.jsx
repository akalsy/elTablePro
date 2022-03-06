import './index.less'
export default {
  name: "Alert",
  inheritAttrs: false,
  data() {
    return {

    };
  },
  props: {
    rowSelect: {
      type: Array,
      default: () => []
    },
    // renderContent: {
    //   type: Function,
    //   default: null
    // },
    // renderContent: {
    //   type: Function,
    //   default: null
    // }
  },
  methods: {
    renderContent() {
      const { rowSelect } = this;
      return <span>{`已选择 ${rowSelect.length} 项`}</span>
    },
    renderActions() {
      return <el-link onClick={() => this.$emit('clearselect')} underline={false} type="primary">取消选择</el-link>
    }
  },
  render() {
    return (
      <div class="pro-table-alert">
        {this.renderContent()}
        {this.renderActions()}
      </div>
    )
  }
};
