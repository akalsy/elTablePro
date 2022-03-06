import ProFieldMixins from '../ProFieldMixins';
export default {
  name: 'ProCascader',
  mixins: [ProFieldMixins],
  props: {
    value: [String, Number, Array],
    valueEnum: Array
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  render() {
    const { value, mode, valueEnum, fieldProps = {} } = this;
    if (mode === 'read') {
      return <span>{value}</span>;
    }
    return (
      <el-autocomplete
        value={value}
        ref="proAutocomplete"
        placeholder={fieldProps.placeholder || `请选择${this.name}`}
        suffix-icon={fieldProps.suffixIcon || ''}
        fetch-suggestions={fieldProps.fetchSuggestions}
        onSelect={fieldProps.onSelect}
        attrs={{ ...fieldProps }}
        style={fieldProps.style}
        on={this.$listeners}></el-autocomplete>
    );
  }
};
