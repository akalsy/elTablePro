import ProFieldMixins from "../ProFieldMixins";
export default {
  name: "ProCascader",
  mixins: [ProFieldMixins],
  props: {
    value: [String, Number, Array],
    valueEnum: Array,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    getOptionText(value, list = this.valueEnum) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].value == value) {
          return list[i].label;
        }
        if (list[i].children) {
          let label = this.getOptionText(value, list[i].children);
          if (!!label) {
            return label;
          }
        }
      }
    },
    onChange(value) {
      this.$emit("input", value);
      this.$refs.cascaderHandle.dropDownVisible = false;
      // if (value instanceof Array) {
      //   if (value.length > 0) {
      //     this.$emit('input', value[value.length - 1])
      //   } else {
      //     this.$emit('input', '')
      //   }
      // }
    },
    onClickLabel(data) {
      // this.cascaderValue = data.value;
      this.$emit("input",data.value);
    },
    scopedSlots() {
      return {
        default: ({ data }) => {
          var key = this.fieldProps?.props?.label ?? 'label';
          return <div onClick={() => this.onClickLabel(data)}>{data[key]}</div>;
        }
      };
    }
  },
  render() {
    const { value, mode, valueEnum, fieldProps = {} } = this;
    if (mode === "read") {
      return <span>{this.getOptionText(value)}</span>;
    }

    // fieldProps.props.emitPath = false; // bjj 这里强制改成 只返回选中结点，否则点击文本就选中的效果会失效。 (可以从外面传进来)
    

    return (
      <el-cascader
        ref="cascaderHandle"
        value={value}
        options={valueEnum}
        onChange={this.onChange}
        on={this.$listener}
        clearable={
          fieldProps.hasOwnProperty("clearable") ? fieldProps.clearable : true
        }
        placeholder={fieldProps.placeholder || `请选择${this.name}`}
        attrs={{ ...fieldProps }}
        style={fieldProps.style}
        scopedSlots={this.scopedSlots()}
      ></el-cascader>
    );
  },
};
