import ProFieldMixins from '../ProFieldMixins';
export default {
  name: 'ProSwitch',
  mixins: [ProFieldMixins],
  props: {
    value: [String, Number, Boolean],
    valueEnum: Array,
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    getOptionText(value) {
      var option = this.valueEnum.find(e => e.value == value);
      if (option) {
        return option.label
      }
      return '-'
    }
  },
  render() {
    const { value, mode, fieldProps = {} } = this
    if (mode === 'read') {
      return <span>{this.getOptionText(value)}</span>;
    }
    return (
      <el-switch
        value={value}
        on={this.$listener}
        onChange={(value) => this.$emit('input', value)}
        attrs={{ ...fieldProps }}
      >
      </el-switch>
    )
  }
}