import ProFieldMixins from '../ProFieldMixins';
export default {
  name: 'ProRadio',
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
      return '-';
    }
  },
  render() {
    const { value, mode, valueEnum, fieldProps } = this
    if (mode === 'read') {
      return <span>{this.getOptionText(value)}</span>;
    }
    let enumArray = []
    valueEnum.forEach(({ value, label, count }) => {
      if (count != undefined) {
        label += `(${count})`
      }
      enumArray.push({
        label,
        value
      })
    })

    return (
      <el-radio-group
        value={value}
        on={this.$listener}
        onInput={(value) => { this.$emit('input', value) }}
        attrs={{ ...fieldProps }}
        style={fieldProps.style}
      >
        {
          enumArray.map(item => {
            return (
              <el-radio-button
                label={item.value}
              >
                {item.label}
              </el-radio-button>
            )
          })
        }
      </el-radio-group>
    )
  }
}