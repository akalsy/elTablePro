import moment from "moment";
import ProFieldMixins from '../ProFieldMixins';
export default {
  name: 'ProDateTimeRange',
  mixins: [ProFieldMixins],
  props: {
    value: [String, Number,Array],
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
      return <span>{value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-'} 至 {value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>;
    }
    return (
      <el-date-picker
        type="datetimerange"
        format={'yyyy-MM-dd HH:mm:ss'}
        value-format={'yyyy-MM-dd HH:mm:ss'}
        style={fieldProps.style}
        value={value}
        on={this.$listeners}
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        attrs={{ ...fieldProps }}
      ></el-date-picker>
    )
  }
}