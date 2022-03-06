import ProField from "../../field/ProField";
import "./index.less";

const inputValueTypes = ["text", "progress"];
export default {
  name: "LighterFilter",
  components: {
    ProField,
  },
  data() {
    return {
      model: {},
    };
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
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
    columnRender() {
      return this.columns.map((item) => {
        var fieldProps = item.fieldProps || {};
        if (!!fieldProps.width) {
          fieldProps.style = `width:${fieldProps.width}px;`;
        }
        return (
          <el-form-item>
            <ProField
              name={item.label}
              v-model={this.model[item.prop]}
              onInput={() => this.onInput(item)}
              onChange={() => this.onChange(item)}
              mode="edit"
              valueType={item.valueType}
              valueEnum={item.valueEnum}
              fieldProps={{ ...fieldProps }}
            />
          </el-form-item>
        );
      });
    },
    isInputContol(item) {
      return (
        !item.valueType || inputValueTypes.some((t) => t == item.valueType)
      );
    },
    onInput(item) {
      if (!this.isInputContol(item)) {
        this.$emit("search", this.model);
      }
    },
    onChange(item) {
      if (this.isInputContol(item)) {
        this.$emit("search", this.model);
      }
    },
  },
  render() {
    const { model } = this;
    return (
      <div class="pro-table-lighterfilter">
        <el-form
          size="small"
          inline={true}
          props={{ model }}
          nativeOnSubmit={(event) => event.preventDefault()}
        >
          {this.columnRender()}
        </el-form>
      </div>
    );
  },
};
