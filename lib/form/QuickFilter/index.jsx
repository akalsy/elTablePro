import ProField from "../../field/ProField";
import "./index.less";

const OPERATE_SPAN = 4;
export default {
  name: "QuickFilter",
  components: {
    ProField,
  },
  data() {
    return {
      expand: false,
      model: {},
    };
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    gutter: {
      type: Number,
      default: 20,
    },
    span: {
      type: Number,
      default: 3,
    },
    labelWidth: {
      type: Number,
      default: 80,
    },
  },
  mounted() {
    const { columns } = this;
    var defaultModel = {};
    columns.forEach((c) => {
      if (c.fieldProps && c.fieldProps.hasOwnProperty("defaultValue")) {
        defaultModel[c.prop] = c.fieldProps.defaultValue;
      }
    });
    this.model = defaultModel;
    this.$emit("search", this.model);
  },
  methods: {
    onSubmit() {
      this.$emit("search", this.model);
    },
    onReset() {
      this.model = {};
      this.$emit("search", this.model);
    },
    onRadioChange(value) {
      // console.log(value, 'value radio');
      this.$emit("radioChange", value);
    },
    columnRender() {
      var doms = [];
      for (let i = 0; i < this.colCount; i++) {
        let item = this.columns[i];
        var fieldProps = item.fieldProps || {};
        fieldProps.style = "width:100%;";
        doms.push(
          <el-col
            span={item.span || this.span}
            class="pro-table-quickfilter-span"
          >
            <el-form-item>
              <ProField
                name={item.label}
                v-model={this.model[item.prop]}
                mode="edit"
                onRadioChange={this.onRadioChange}
                valueType={item.valueType}
                valueEnum={item.valueEnum}
                fieldProps={{ ...fieldProps }}
              />
            </el-form-item>
          </el-col>
        );
      }
      doms.push(
        <el-col
          span={this.colBlankCount}
          class="pro-table-quickfilter-span"
        ></el-col>
      );
      return doms;
    },
    renderExpand() {
      if (this.needExpand) {
        if (this.expand) {
          return (
            <el-link
              style={{ marginLeft: "15px" }}
              onClick={() => (this.expand = false)}
              underline={false}
            >
              收起<i class="el-icon-arrow-up el-icon--right"></i>
            </el-link>
          );
        } else {
          return (
            <el-link
              style={{ marginLeft: "15px" }}
              onClick={() => (this.expand = true)}
              underline={false}
            >
              展开<i class="el-icon-arrow-down el-icon--right"></i>
            </el-link>
          );
        }
      }
      return null;
    },
  },
  computed: {
    // 计算是否需要展开
    needExpand() {
      var spanCount = OPERATE_SPAN;
      this.columns.forEach((c) => {
        spanCount += c.span || this.span;
      });
      return spanCount > 24;
    },

    // 计算需要绘制几个组件
    colCount() {
      if (!this.needExpand || this.expand) {
        // 如果不需要展开，或者说 需要展开时已经展开了，就渲染所有组件
        return this.columns.length;
      } else {
        // 计算第一行需要绘制几个组件
        var _spanCount = OPERATE_SPAN;
        var colCount = 0;
        for (var i = 0; i < this.columns.length; i++) {
          _spanCount += this.columns[i].span || this.span;
          if (_spanCount <= 24) {
            colCount++;
          } else {
            break;
          }
        }
        return colCount;
      }
    },

    // 计算绘制完成后当前行还剩余多少span空间
    colBlankCount() {
      if (!this.needExpand || !this.expand) {
        return 0;
      }

      var _spanCount = 0;
      for (var i = 0; i < this.columns.length; i++) {
        let span = this.columns[i].span || this.span;
        let operateSpan = 0;
        if (_spanCount != 0 && i == this.columns.length - 1) {
          // 如果不是这行的第一个，最后一个 需要加上操作空间
          operateSpan = OPERATE_SPAN;
        }
        if (_spanCount + span > 24) {
          // 该组件放不下了，需要另起一行
          _spanCount = span;
        } else {
          if (_spanCount + span + operateSpan > 24) {
            // 该组能放下，但是需要另起一行
            _spanCount = 0;
          } else {
            _spanCount += span;
          }
        }
      }

      let blankCount = 24 - _spanCount - OPERATE_SPAN;
      if (blankCount < 0) {
        blankCount = 24 - OPERATE_SPAN;
      }
      return blankCount;
    },
  },
  render() {
    const { model } = this;
    return (
      <el-form
        props={{ model }}
        nativeOnSubmit={(event) => event.preventDefault()} // 阻止表单的默认行为
      >
        <el-row
          gutter={this.gutter}
          class="pro-table-quickfilter"
          type="flex"
          align="middle"
        >
          {this.columnRender()}
          <el-col span={OPERATE_SPAN} class="pro-table-quickfilter-operate">
            <el-form-item>
              <el-button type="primary" onClick={this.onSubmit}>
                查询
              </el-button>
              <el-button onClick={this.onReset}>重置</el-button>
              {this.renderExpand()}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    );
  },
};
