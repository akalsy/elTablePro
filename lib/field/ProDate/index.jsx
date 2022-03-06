import moment from "moment";
import ProFieldMixins from '../ProFieldMixins';
export default {
  name: 'ProDate',
  mixins: [ProFieldMixins],
  props: {
    value: [String, Number],
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  },
  watch: {
  },
  computed: {
  },
  render() {
    const { value, mode, fieldProps = {} } = this
    if (mode === 'read') {
      return <span>{value ? moment(value).format('YYYY-MM-DD') : '-'}</span>;
    }
    return (
      <el-date-picker
        format={'yyyy-MM-dd'}
        value-format={'yyyy-MM-dd'}
        style={fieldProps.style}
        value={value}
        on={this.$listeners}
        placeholder={fieldProps.placeholder || `请选择${this.name}`}
        attrs={{ ...fieldProps }}
      ></el-date-picker>
    )
  }
}