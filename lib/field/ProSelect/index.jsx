import ProFieldMixins from '../ProFieldMixins';
export default {
  name: 'ProSelect',
  mixins: [ProFieldMixins],
  props: {
    value: [String, Number],
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
    const { value, mode, valueEnum, fieldProps = {} } = this
    if (mode === 'read') {
      return <span>{this.getOptionText(value)}</span>;
    }
    return (
      <el-select
        clearable={fieldProps.hasOwnProperty('clearable') ? fieldProps.clearable : true}
        value={value}
        on={this.$listener}
        onChange={(value) => this.$emit('input', value)}
        placeholder={fieldProps.placeholder || `请选择${this.name}`}
        attrs={{ ...fieldProps }}
        style={fieldProps.style}
        popperClass={`pro-field-select-popper-${window["pro-table-theme"]}`}
      >
        {
          valueEnum.map(item => {
            return (
              <el-option
                label={item.label}
                value={item.value}
              >
              </el-option>
            )
          })
        }
      </el-select>
    )
  }
}