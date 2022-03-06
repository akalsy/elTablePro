import './columnSetting.less'
import { cloneDeep } from 'lodash'
export default {
  name: "ColumnSetting",
  inheritAttrs: false,
  components: {
  },
  data() {
    return {
    }
  },
  props: {
    columnsStatus: Array
  },
  mounted() {
    this.selectedKeys = this.columnsStatus.filter(c => !!c.visible).map(c => c.label);;
  },
  computed: {
    checkedColumns() {
      return this.columnsStatus.filter(c => !!c.visible && !c.fixed).map(c => c.label);
    },
    checkedColumns_front() {
      return this.columnsStatus.filter(c => !!c.visible && c.fixed === 'front').map(c => c.label);
    },
    checkedColumns_end() {
      return this.columnsStatus.filter(c => !!c.visible && c.fixed === 'end').map(c => c.label);
    },
    isIndeterminate() {
      return this.columnsStatus.some(c => c.visible) && this.columnsStatus.some(c => !c.visible);
    },
    checkAll() {
      return !this.columnsStatus.some(c => !c.visible);
    },
    hasFixed() {
      return this.columnsStatus.some(c => !!c.fixed);
    },
    hasFixedFront() {
      return this.columnsStatus.some(c => c.fixed === 'front');
    },
    hasFixedEnd() {
      return this.columnsStatus.some(c => c.fixed === 'end');
    },
    treeData() {
      var { columnsStatus } = this;
      return columnsStatus.filter(c => !c.fixed).map(item => {
        return {
          label: item.label,
          item
        }
      })
    },
    treeData_front() {
      var { columnsStatus } = this;
      return columnsStatus.filter(c => c.fixed == 'front').map(item => {
        return {
          label: item.label,
          item
        }
      })
    },
    treeData_end() {
      var { columnsStatus } = this;
      return columnsStatus.filter(c => c.fixed == 'end').map(item => {
        return {
          label: item.label,
          item
        }
      })
    }
  },
  watch: {
  },
  methods: {
    onTreeCheck(data, checkNodes) {
      this.selectedKeys = checkNodes.checkedKeys //选中的节点

      var columnStatus = cloneDeep(this.columnsStatus);
      columnStatus.forEach(c => {
        if (!c.fixed) {
          c.visible = this.selectedKeys.some(v => v == c.label)
        }
      })
      this.$emit('columnsstatus', columnStatus);
    },
    onTreeCheck_front(data, checkNodes) {
      this.selectedKeys = checkNodes.checkedKeys //选中的节点

      var columnStatus = cloneDeep(this.columnsStatus);
      columnStatus.forEach(c => {
        if (c.fixed == 'front') {
          c.visible = this.selectedKeys.some(v => v == c.label)
        }
      })
      this.$emit('columnsstatus', columnStatus);
    },
    onTreeCheck_end(data, checkNodes) {
      this.selectedKeys = checkNodes.checkedKeys //选中的节点

      var columnStatus = cloneDeep(this.columnsStatus);
      columnStatus.forEach(c => {
        if (c.fixed == 'end') {
          c.visible = this.selectedKeys.some(v => v == c.label)
        }
      })
      this.$emit('columnsstatus', columnStatus);
    },
    handleCheckAllChange(val) {
      var columnStatus = cloneDeep(this.columnsStatus);
      columnStatus.forEach(c => c.visible = !!val)
      this.$emit('columnsstatus', columnStatus);
    },
    toFixed(label, fixedStatus) {
      var columnStatus = cloneDeep(this.columnsStatus);
      var col = columnStatus.find(c => c.label == label);
      if (col) {
        col.fixed = fixedStatus;
        this.$emit('columnsstatus', columnStatus);
      }
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      var dragKey = draggingNode.label;
      var dropKey = dropNode.label;

      var columnStatus = cloneDeep(this.columnsStatus);
      var dragIndex = columnStatus.findIndex(c => c.label == dragKey);
      var dragColumn = cloneDeep(columnStatus[dragIndex]);
      if (dragIndex < 0) {
        return;
      }
      columnStatus.splice(dragIndex, 1);
      var dropIndex = columnStatus.findIndex(c => c.label == dropKey);
      if (dropIndex < 0) {
        return;
      }
      if (dropType === 'before') {
        columnStatus.splice(dropIndex, 0, dragColumn)
      } else {
        columnStatus.splice(dropIndex + 1, 0, dragColumn)
      }
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.selectedKeys);
      })

      this.$emit('columnsstatus', columnStatus);
    },
    scopedSlots(type) {
      return {
        default: ({ node, data }) => {
          return (
            <span class="custom-tree-node">
              <span class="custom-tree-node-label">{node.label}</span>
              <span class="custom-tree-node-icon" onClick={() => this.toFixed(data.label, type == 'front' ? '' : 'front')} >
                <el-tooltip slot="reference" content={type == 'front' ? "取消固定" : "固定在列首"} placement="top">
                  <el-icon class={type == 'front' ? "el-icon-minus" : "el-icon-upload2"}></el-icon>
                </el-tooltip>
              </span>
              <span class="custom-tree-node-icon" onClick={() => this.toFixed(data.label, type == 'end' ? '' : 'end')} >
                <el-tooltip slot="reference" content={type == 'end' ? "取消固定" : "固定在列尾"} placement="top">
                  <el-icon class={type == 'end' ? "el-icon-minus" : "el-icon-download"}></el-icon>
                </el-tooltip>
              </span>
            </span>
          )
        }
      }
    },
    allowDrop(draggingNode, dropNode, type) {
      return type !== 'inner';
    },
  },
  render() {
    const { columns } = this.$attrs;
    var { checkAll, isIndeterminate, checkedColumns, columnsStatus } = this;
    return (
      <div class="pro-columnSetting">
        <div class="pro-columnSetting-header">
          <el-checkbox indeterminate={isIndeterminate} v-model={checkAll} onChange={this.handleCheckAllChange}>列展示</el-checkbox>
          {/* <el-button onClick={this.onReset} type="text">重置</el-button> */}
        </div>
        {this.hasFixedFront && (<p class="pro-columnSetting-title">固定在列首</p>)}
        {this.hasFixedFront && (<el-tree
          ref="tree_front"
          checkOnClickNode={true}
          data={this.treeData_front}
          draggable={true}
          showCheckbox
          defaultCheckedKeys={this.checkedColumns_front}
          nodeKey="label"
          allowDrop={this.allowDrop}
          onCheck={this.onTreeCheck_front}
          defaultExpandAll={true}
          onNode-drop={this.handleDrop}
          scopedSlots={this.scopedSlots('front')}
        >
        </el-tree>
        )}
        {this.hasFixed && (<p class="pro-columnSetting-title">不固定</p>)}
        <el-tree
          ref="tree"
          checkOnClickNode={true}
          data={this.treeData}
          draggable={true}
          showCheckbox
          defaultCheckedKeys={this.checkedColumns}
          nodeKey="label"
          allowDrop={this.allowDrop}
          onCheck={this.onTreeCheck}
          defaultExpandAll={true}
          onNode-drop={this.handleDrop}
          scopedSlots={this.scopedSlots()}
        >
        </el-tree>
        {this.hasFixedEnd && (<p class="pro-columnSetting-title">固定在列尾</p>)}
        {this.hasFixedEnd && (<el-tree
          ref="tree_end"
          checkOnClickNode={true}
          data={this.treeData_end}
          draggable={true}
          showCheckbox
          defaultCheckedKeys={this.checkedColumns_end}
          nodeKey="label"
          allowDrop={this.allowDrop}
          onCheck={this.onTreeCheck_end}
          defaultExpandAll={true}
          onNode-drop={this.handleDrop}
          scopedSlots={this.scopedSlots('end')}
        >
        </el-tree>
        )}
      </div >
    )
  }
}
