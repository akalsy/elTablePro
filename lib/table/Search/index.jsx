import "./index.less";
import { QueryFilter, QuickFilter } from "../../form";

export default {
  name: "Search",
  inheritAttrs: false,
  components: {
    QueryFilter,
  },
  data() {
    return {};
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
    },
  },
  computed: {},
  methods: {
    nativeOnKeyup(event) {
      if (event.key === 'Enter') {
        this.$emit('enterKeyUp', this.$children[0].model);
      }
    }
  },
  render() {
    const { columns, type } = this;
    let queryColumns = columns.filter(
      (c) => !c.hideInSearch && c.valueType != "option"
    );
    queryColumns = queryColumns.sort((a, b) => (b.order || 0) - (a.order || 0));
    return (
      <div class="search">
        {type === "quick" ? (
          <QuickFilter
            columns={queryColumns}
            attrs={this.$attrs}
            on={this.$listeners}
            nativeOnKeyup={this.nativeOnKeyup}
          />
        ) : (
          <QueryFilter
            columns={queryColumns}
            attrs={this.$attrs}
            on={this.$listeners}
            nativeOnKeyup={this.nativeOnKeyup}
          />
        )}
      </div>
    );
  },
};
