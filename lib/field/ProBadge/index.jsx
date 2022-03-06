import './index.less'
const statusList = {
  success: '#52c41a',
  error: '#ff4d4f',
  default: '#d9d9d9',
  processing: '#1890ff',
  warning: '#faad14'
}
export default {
  name: 'ProBadge',
  props: {
    status: String,
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  methods: {
  },
  render() {
    const { status, color } = this
    var backgroundColor = color;
    if (!!status) {
      backgroundColor = statusList[status] || this.color;
    }
    let statusStyle = { backgroundColor }
    return (
      <span class="pro-badge">
        <span class="pro-badge-status-dot" style={statusStyle}></span>
        {this.$slots.default}
      </span>
    )
  }
}