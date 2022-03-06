import ProField from "../../field/ProField";
import ProLabel from "../../field/ProLabel";
import "./index.less";
export default {
  name: "QueryFilter",
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
      default: 6,
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
    columnRender() {
      var doms = [];
      for (let i = 0; i < this.colCount; i++) {
        let item = this.columns[i];
        var fieldProps = item.fieldProps || {};
        fieldProps.style = "width:100%;";
        doms.push(
          <el-col span={this.span} class="pro-table-queryfilter-span">
            <el-form-item
              label-width={`${this.labelWidth}px`}
              // label={`${item.label}：`}

              // label={<ProLabel label={item.label} tooltip={item.tooltip} />}
            >
              <span slot="label">
                <ProLabel label={item.label} tooltip={item.tooltip} />：
              </span>
              <ProField
                name={item.label}
                v-model={this.model[item.prop]}
                mode="edit"
                valueType={item.valueType}
                valueEnum={item.valueEnum}
                fieldProps={{ ...fieldProps }}
              />
            </el-form-item>
          </el-col>
        );
      }
      for (var i = 0; i < this.colBlankCount; i++) {
        doms.push(
          <el-col span={this.span} class="pro-table-queryfilter-span"></el-col>
        );
      }
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
    needExpand() {
      var firstlineCols = parseInt(24 / this.span) - 1;
      return this.columns.length > firstlineCols;
    },
    colCount() {
      if (this.expand) {
        return this.columns.length;
      } else {
        return parseInt(24 / this.span) - 1 > this.columns.length
          ? this.columns.length
          : parseInt(24 / this.span) - 1;
      }
    },
    colBlankCount() {
      if (this.needExpand && !this.expand) {
        return 0;
      }
      var lineCols = parseInt(24 / this.span);
      if ((this.columns.length + 1) % lineCols == 0) {
        return 0;
      }
      return lineCols - ((this.columns.length + 1) % lineCols);
    },
  },
  render() {
    const { model } = this;
    return (
      <el-form
        props={{ model }}
        nativeOnSubmit={(event) => event.preventDefault()}
      >
        <el-row
          gutter={this.gutter}
          class="pro-table-queryfilter"
          type="flex"
          align="middle"
        >
          {this.columnRender()}
          <el-col span={this.span} class="pro-table-queryfilter-operate">
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
