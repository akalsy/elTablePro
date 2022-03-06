import ProField from '.';
const {
    ProText,
    ProProgress,
    ProSelect,
    ProSwitch,
    ProDate,
    ProDateRange,
    ProDateTimeRange,
    ProRadioDateRange,
    ProMonth,
    ProWeek,
    ProYear,
    ProRadio,
    ProCascader,
    ProAutocomplete
} = ProField;

export default {
    props: {
        valueType: {
            type: String,
            default: 'text'
        }
    },
    methods: {
        genControl() {
            const { valueType } = this;
            if (valueType == 'text') {
                return <ProText attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'select') {
                return <ProSelect attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'switch') {
                return <ProSwitch attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'progress') {
                return <ProProgress attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'date') {
                return <ProDate attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'datetime') {
                return <ProDateTime attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'daterange') {
                return <ProDateRange attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'datetimerange') {
                return <ProDateTimeRange attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'radiodaterange') {
                return <ProRadioDateRange attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'month') {
                return <ProMonth attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'week') {
                return <ProWeek attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'year') {
                return <ProYear attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'radio') {
                return <ProRadio attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'cascader') {
                return <ProCascader attrs={{ ...this.$attrs }} on={this.$listeners} />
            } else if (valueType == 'autocomplete') {
                return <ProAutocomplete attrs={{ ...this.$attrs }} on={this.$listeners} />
            }
            return <ProText attrs={{ ...this.$attrs }} on={this.$listeners} />
        }
    },
    render() {
        return this.genControl();
    },
}
