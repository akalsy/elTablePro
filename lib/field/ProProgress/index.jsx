import ProFieldMixins from '../ProFieldMixins';
export default {
  name: 'ProProgress',
  mixins: [ProFieldMixins],
  props: {
    status: String,
    value: Number,
  },
  render() {
    const { value, fieldProps = {}, mode } = this;
    let status = typeof fieldProps.status == 'function' ? fieldProps.status(value) : fieldProps.status;
    if (mode === 'read') {
      return (
        <el-progress
          attrs={{ ...fieldProps }}
          percentage={value}
          status={status}
        >
        </el-progress>
      )
    } else {
      return (
        <el-input-number
          value={value}
          min={0}
          max={100}
          label="进度值"
          on={this.$listener}
          placeholder={fieldProps.placeholder || `请输入${this.name}`}
          attrs={{ ...fieldProps }}
          onChange={(value) => this.$emit('input', value)}
        ></el-input-number>
      )
    }
  }
}