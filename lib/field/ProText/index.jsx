import ProFieldMixins from '../ProFieldMixins';
export default {
  name: 'ProText',
  mixins: [ProFieldMixins],
  props: {
    value: [String, Number],
  },
  render() {
    const { value, mode, fieldProps = {} } = this
    if (mode === 'read') {
      return <span>{value}</span>
    }
    return (
      <el-input
        clearable={fieldProps.hasOwnProperty('clearable') ? fieldProps.clearable : true}
        value={this.value}
        on={this.$listeners}
        placeholder={fieldProps.placeholder || `请输入${this.name}`}
        attrs={{ ...fieldProps }}
      ></el-input>
    )
  }
}