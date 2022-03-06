import moment from "moment";
import "./index.less"
import { isEqual } from 'lodash'
import ProFieldMixins from '../ProFieldMixins';
export default {
  name: 'ProRadioDateRange',
  mixins: [ProFieldMixins],
  props: {
    value: [String, Number, Array],
    valueEnum: Array
  },
  data() {
    return {
      showDateRange: false,
    }
  },
  created() {
  },
  methods: {
  },
  watch: {
  },
  computed: {
    radioValue() {
      var { value, valueEnum } = this;
      
      var radio = valueEnum.find(e => isEqual(e.value, value))
      if (radio) {
        return value.join(',')
      } 
      
      if ((value instanceof Array && value.length == 0)) {
        return 'all';
      }
      // if (value instanceof Array && value.length == 0) {
      //   return 'all';
      // } 
      // else if (valueEnum[0]) {
      //   return valueEnum[0].value.join(',')   // 点击重置时选择第一个按钮
      // }
      return value && 'custom';
    }
  },
  render() {
    var { value, mode, fieldProps = {}, valueEnum, showDateRange, radioValue } = this
    var radioEnum = [...valueEnum];
    radioEnum.push({
      value: ['custom'],
      label: '自定义'
    })
    if (fieldProps && fieldProps.showAll) {
      radioEnum.unshift({
        value: ['all'],
        label: fieldProps.showAllText || '全部'
      })
    }
    if (mode === 'read') {
      return <span>{value ? moment(value).format('YYYY-MM-DD') : '-'} 至 {value ? moment(value).format('YYYY-MM-DD') : '-'}</span>;
    }
    let dataValue = value;
    if (Array.isArray(dataValue) && dataValue.length == 0) {
      dataValue = [moment()
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss'),
      moment()
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')]
    }
    return (
      <div class="pro-radioDateRange">
        <el-radio-group
          value={this.showDateRange ? 'custom' : radioValue}
          onChange={() => {
            console.log(this.showDateRange, radioValue, 'radioValue')
            this.$emit('radioChange', this.showDateRange);
          }}
          // on={this.$listener}
          onInput={(value) => {
            if (value == 'custom') {
              this.showDateRange = true;
            } else if (value == 'all') {
              this.showDateRange = false;
              this.$emit('input', [])
            } else {
              this.showDateRange = false;
              this.$emit('input', value.split(','))
            }
          }}
          attrs={{ ...fieldProps }}
          style={fieldProps.style}
        >
          {
            radioEnum.map(item => {
              return (
                <el-radio-button
                  label={item.value.join(',')}
                >
                  {item.label}
                </el-radio-button>
              )
            })
          }
        </el-radio-group>
        {showDateRange && (
          <el-date-picker
            type={fieldProps.type ? fieldProps.type : 'daterange'}
            format={fieldProps.type == 'datetimerange' ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'}
            value-format={fieldProps.type == 'datetimerange' ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'}
            style={fieldProps.style}
            value={dataValue}
            on={this.$listeners}
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            attrs={{ ...fieldProps }}
          ></el-date-picker>
        )}
      </div>
    )
  }
}