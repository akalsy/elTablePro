import ColumnSetting from "./columnSetting";
import { isEmpty } from "lodash";
import "./index.less";
export default {
  name: "Right",
  data() {
    return {};
  },
  components: {
    ColumnSetting,
  },
  props: {
    onAddClick: {
      type: Function,
    },
    actions: {
      type: Array,
      default: () => [],
    },
    settings: {
      type: Object,
      default: () => {},
    },
  },
  computed: {},
  methods: {
    hasSettingBtn(key) {
      if (this.settings.hasOwnProperty(key)) {
        return this.settings[key];
      }
      return true;
    },
    hasSetting() {
      if (isEmpty(this.settings)) {
        return true;
      }
      return (
        this.hasSettingBtn("reload") ||
        this.hasSettingBtn("size") ||
        this.hasSettingBtn("column")
      );
    },
    renderActions() {
      return this.actions;
    },
    onSizeCommand(command) {
      this.$emit("sizechange", command);
    },
  },
  render() {
    return (
      <div class="pro-toolbar-right">
        <div class="pro-toolbar-actions">{this.renderActions()}</div>
        <div class="pro-toolbar-settings">
          {this.hasSettingBtn("reload") && (
            <el-tooltip content="刷新" placement="top">
              <i
                onClick={() => this.$emit("refresh")}
                class="el-icon-refresh-right"
              ></i>
            </el-tooltip>
          )}
          {this.hasSettingBtn("size") && (
            <el-tooltip content="密度" placement="top">
              <el-dropdown
                trigger="click"
                placement="bottom"
                onCommand={this.onSizeCommand}
              >
                <i class="el-icon-s-operation"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="medium">默认</el-dropdown-item>
                  <el-dropdown-item command="small">中等</el-dropdown-item>
                  <el-dropdown-item command="mini">紧凑</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-tooltip>
          )}
          {this.hasSettingBtn("column") && (
            <el-popover placement="bottom-end" width={160} trigger="click">
              <ColumnSetting
                columns={this.$attrs.columns}
                columnsStatus={this.$attrs.columnsStatus}
                on={this.$listeners}
              />
              <el-tooltip slot="reference" content="列设置" placement="top">
                <i class="el-icon-setting"></i>
              </el-tooltip>
            </el-popover>
          )}
        </div>
      </div>
    );
  },
};
