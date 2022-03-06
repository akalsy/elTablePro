import moment from "moment";
import ProFieldMixins from '../ProFieldMixins';
export default {
  name: 'ProDateTime',
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
      return <span>{value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>;
    }
    return (
      <el-date-picker
        format={'yyyy-MM-dd HH:mm:ss'}
        value-format={'yyyy-MM-dd HH:mm:ss'}
        type="datetime"
        style={fieldProps.style}
        value={value}
        on={this.$listeners}
        placeholder={fieldProps.placeholder || `请选择${this.name}`}
        attrs={{ ...fieldProps }}
      ></el-date-picker>
    )
  }
}