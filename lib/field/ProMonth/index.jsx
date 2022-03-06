import moment from "moment";
import ProFieldMixins from '../ProFieldMixins';
export default {
  name: 'ProMonth',
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
      return <span>{value ? `${moment(value).format('M')}月` : '-'}</span>;
    }
    return (
      <el-date-picker
        type="month"
        format={'M月'}
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