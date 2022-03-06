import './index.less'
export default {
  name: 'ProLabel',
  props: {
    label: String,
    tooltip: String
  },
  methods: {
    renderTooltip(tooltip) {
      if (tooltip) {
        return (
          <el-tooltip content={tooltip} placement="top">
            <i class="el-icon-question pro-tooltip-icon"></i>
          </el-tooltip>
        )
      }
    }
  },
  render() {
    const { label, tooltip } = this;
    return (
      <span class="pro-label">
        <span>{label}</span>
        {this.renderTooltip(tooltip)}
      </span>
    )
  }
}