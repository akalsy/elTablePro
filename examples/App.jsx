import ProTable, { ProField } from "zftable";
import "./App.less";
const { ProBadge } = ProField;
const pickerOptions = {
  shortcuts: [
    {
      text: "最近一周",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近一个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近三个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit("pick", [start, end]);
      },
    },
  ],
};
export default {
  name: "App",
  components: {
    ProTable,
  },

  data() {
    return {
      data: [
        {
          id: 1,
          date: "2016-05-02 21:11:32",
          name: "王小虎1",
          gender: "male",
          rate: 0,
          month: "2016-05-02 21:11:32",
          type: 3,
          unitCode: "zhinan",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎2",
          gender: "female",
          month: "2016-07-05 21:11:32",
          rate: 6,
          type: 1,
          unitCode: "zhinan",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎3",
          gender: "male",
          rate: 10,
          type: 2,
          expmode: false,
          unitCode: "shejiyuanze",
          address: "上海市普陀区金沙江路 1519 弄",
          // children: [
          //   {
          //     id: 4,
          //     date: "2016-05-01",
          //     name: "王小虎3",
          //     gender: "male",
          //     rate: 10,
          //     type: 2,
          //     unitCode: "shejiyuanze",
          //     address: "上海市普陀区金沙江路 1519 弄",
          //   },
          // ],
        },
        {
          id: 5,
          date: "2016-05-03",
          name: "王小虎4",
          gender: "male",
          rate: 12,
          type: 1,
          unitCode: "shejiyuanze",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          id: 6,
          date: "2016-05-03",
          name: "王小虎5",
          gender: "female",
          rate: 88,
          type: 2,
          expmode: true,
          unitCode: "zhinan",
          address: "上海市普陀区金沙江路 1516 弄",
          // children: [
          //   {
          //     id: 7,
          //     date: "2016-05-01",
          //     name: "王小虎3",
          //     gender: "male",
          //     rate: 10,
          //     type: 2,
          //     unitCode: "shejiyuanze",
          //     address: "上海市普陀区金沙江路 1519 弄",
          //   },
          //   {
          //     id: 8,
          //     date: "2016-05-01",
          //     name: "王小虎3",
          //     gender: "male",
          //     rate: 10,
          //     type: 2,
          //     unitCode: "shejiyuanze",
          //     address: "上海市普陀区金沙江路 1519 弄",
          //   },
          // ],
        },
        {
          id: 9,
          date: "2016-05-03",
          name: "王小虎6",
          gender: "male",
          rate: 100,
          type: 3,
          unitCode: "kekong",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      rows: [],
      isCustom: false,
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.columns.push(
    //     {
    //       label: '操作2',
    //       valueType: 'option',
    //       render: () => [
    //         <el-link onClick={() => alert('查看')} underline={false} type="primary">查看</el-link>,
    //         <el-divider direction="vertical"></el-divider>,
    //         <el-link underline={false} type="danger">移除</el-link>
    //       ],
    //     })
    // }, 3000);
  },
  methods: {
    extraRender() {
      return (
        <span>
          扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容扩展内容
        </span>
      );
    },
    toolbarAction() {
      return [
        <el-button onClick={this.onClickOpt1}>普通操作2</el-button>,
        <el-button onClick={this.onClickOpt1}>普通操作1</el-button>,
        <el-button onClick={this.onClickOpt2} type="primary">
          主操作
        </el-button>,
        // <el-button onClick={this.onClickOpt2} size="small" type="danger">
        //   操作2
        // </el-button>,
        <el-divider direction="vertical"></el-divider>,
      ];
    },
    renderCustom() {
      return [
        // {
        //   label: "日期",
        //   prop: "date",
        //   // hideInSearch: true,
        //   valueType: "datetimerange",
        //   tooltip: "用户最后登录的时间",
        //   fieldProps: {
        //     pickerOptions: pickerOptions,
        //     // width: 130
        //     // defaultValue: ['2021-08-01','2021-08-02']
        //   },
        //   span: 5,
        //   // render: (text, dom, record, index) => {
        //   //   return <el-tag>{dom}</el-tag>
        //   // },
        // },
        {
          label: "统计范围",
          prop: "sceat",
          valueType: "radiodaterange",
          // hideInSearch: true,
          span: this.isCustom ? 12 : 5,
          fieldProps: {
            // width: 130
            // defaultValue: ['2021-08-01', '2021-08-03']
            defaultValue: [],
            showAll: true,
            showAllText: "所有",
          },
          valueEnum: [
            // {
            //   value: [],
            //   label: '全部'
            // },
            {
              label: "今日",
              value: ["2021-08-01", "2021-08-02"],
            },
            {
              label: "本周",
              value: ["2021-08-01", "2021-08-03"],
            },
            {
              label: "本月",
              value: ["2021-08-01", "2021-08-04"],
            },
          ],
          // render: (text, dom, record, index) => {
          //   return <el-tag>{dom}</el-tag>
          // },
        },
        // {
        //   label: '月份',
        //   prop: 'month',
        //   valueType: 'year',
        //   fieldProps: {
        //     defaultValue: '2021-08-01'
        //   },
        //   render: (text, dom, record, index) => {
        //     return <el-tag>{dom}</el-tag>
        //   },
        // },
        // {
        //   label: '入区时间',
        //   prop: 'month',
        //   valueType: 'daterange',
        //   fieldProps: {
        //   },
        // },
        // {
        //   label: '节省模式',
        //   prop: 'expmode',
        //   valueType: 'switch',
        //   fieldProps: {
        //   },
        //   valueEnum:[{
        //     value: 0,
        //     label: '节省模式'
        //   },{
        //     value: 1,
        //     label: '普通模式'
        //   }]
        // },
        {
          label: "姓名",
          prop: "name",

          // hideInSearch: true,
          editable: true,

          onEdit: () => {
            alert("edit");
          },
          sortable: true,
          // render: (text, dom, record, index) => {
          //   return <el-tag>{text}</el-tag>
          // },
          fieldProps: {
            clearable: false,
          },
        },
        {
          label: "单位",
          prop: "unitCode",
          // hideInSearch: true,

          valueType: "cascader",
          valueEnum: [
            {
              value: "zhinan",
              label: "指南",
              children: [
                {
                  value: "shejiyuanze",
                  label: "设计原则",
                  children: [
                    {
                      value: "yizhi",
                      label: "一致",
                    },
                    {
                      value: "fankui",
                      label: "反馈",
                    },
                    {
                      value: "xiaolv",
                      label: "效率",
                    },
                    {
                      value: "kekong",
                      label: "可控",
                    },
                  ],
                },
                {
                  value: "daohang",
                  label: "导航",
                  children: [
                    {
                      value: "cexiangdaohang",
                      label: "侧向导航",
                    },
                    {
                      value: "dingbudaohang",
                      label: "顶部导航",
                    },
                  ],
                },
              ],
            },
          ],
          fieldProps: {
            defaultValue: "kekong",
            showAllLevels: false, //只显示最后一级内容
            filterable: true, //支持搜索
            props: {
              checkStrictly: true, //允许选择父结点
              emitPath: false, // 只返回选中结点
            },
          },
        },
        {
          label: "性别",
          prop: "gender",

          sortable: true,
          // hideInSearch: true,
          valueType: "select",
          valueEnum: [
            { value: "male", label: "男" },
            { value: "female", label: "女" },
          ],
          fieldProps: {},
          // render: (text, dom, record, index) => {
          //   return <el-tag>{dom}</el-tag>;
          // },
        },
        {
          label: "地址",
          prop: "address",

          valueType: "text",
          // hideInSearch: true,
          copyable: true,
          showOverflowTooltip: true,
          fieldProps: {
            clearable: true,
          },
        },
        // {
        //   label: '类别',
        //   prop: 'type',
        //   valueType: 'radio',
        //   valueEnum: [
        //     {
        //       value: 2,
        //       label: 'webpack',
        //       count: 300
        //     },
        //     {
        //       value: 1,
        //       label: 'react',
        //       count: 100
        //     },
        //     {
        //       value: 0,
        //       label: 'vue',
        //       count: 200
        //     }
        //   ],
        //   order: 1,
        //   fieldProps: {
        //     defaultValue: 1
        //   },
        //   render: (text, dom) => {
        //     return <ProBadge>{dom}</ProBadge>
        //   }
        // },
        {
          label: "进度",
          prop: "rate",
          hideInSearch: true,

          valueType: "progress",
          hideInTable: true,
          // valueEumn:{
          //   status: {
          //     exception: 0,
          //     warning: [0, 10],
          //     normal: [10, 100],
          //     success: 100,
          //   },
          // },
          fieldProps: {
            // status: 'warning',
            // status: (item) => {
            //   if (item <= 0) {
            //     return 'exception';
            //   } else if (item < 10) {
            //     return 'warning'
            //   } else {
            //     return 'success'
            //   }
            // },
            showText: false,
            strokeWidth: 12,
          },
        },
        {
          label: "操作",
          valueType: "option",

          render: () => [
            <el-link
              onClick={() => alert("查看")}
              // underline={false}
              type="primary"
            >
              查看
            </el-link>,
            <el-divider direction="vertical"></el-divider>,
            <el-link type="danger">移除</el-link>,
          ],
        },
      ]
    },
    onClickOpt1() {
      this.$refs.proTable.reload();
    },
    onClickOpt2() {
      let table = this.$refs.proTable.getTable();
      table.toggleRowSelection(this.rows[0], false);
    },
    onRadioChange(value) {
      // console.log(value, 'radio table index render');
      this.isCustom = value;
    },
    renderCard(data) {
      console.log(data, 'data list');
      return <div class="list-item">
        <div class="item-left"></div>
        <div class="item-right">
          <div class="right-top">
            <p>{data.name}</p>
            <p>{data.gender}</p>
            <p>{data.date}</p>
          </div>
          <div class="right-bottom">
            <CutButton size="small">下载</CutButton>
          </div>
        </div>
      </div>
      // <el-col xs={16} sm={12} md={8} lg={5} xl={5}>

      // </el-col>
    }
  },

  render() {
    return (
      <div id="app">
        <div class="tablecontent">
          <ProTable
            ref={"proTable"}
            columns={this.renderCustom()}
            type="table"
            rowKey="id"
            defaultExpandAll={true}
            // rowselection={{
            //   onRowSelect: (row) => {
            //     this.rows = row;
            //     console.log('onRowSelect', row);
            //   }
            // }}
            // currentchange={(currentRow, oldCurrentRow) => {
            //   console.log(currentRow, oldCurrentRow, "1234");
            // }}
            rowclick={(row, column, event) => {
              console.log(row, column, event, 'rowclick')
            }}
            onRadioChange={this.onRadioChange}
            highlightCurrentRow={true}
            pagination={{
              pageSize: 50,
            }}
            toolbar={{
              title: "我的表格",
              // title:<span>{'ccc'}</span>,
              tooltip: "测试tooltip",
              settings: {
                // size: false
              },
              // tabs: [{
              //   label: '用户管理',
              //   name: 'user',
              //   default: true
              // }, {
              //   label: '配置管理',
              //   name: 'config'
              // }],
              // tabChange: (tab) => { console.log('tabclick', tab) },
              actions: this.toolbarAction(),
            }}
            search={{
              type: "quick",
              // type: 'query',
              // type: "lighter",
              span: 3,
              gutter: 10,
              labelWidth: 80,
            }}
            // search={false}
            request={async ({ searchParams, sorts, filters, pageInfo }) => {
              console.log("request", searchParams, sorts, filters, pageInfo);
              return {
                list: this.data,
                total: 100,
              };
            }}
            // theme="dark"
          // renderCard={this.renderCard}
          // extraRender={this.extraRender}
          />
        </div>
      </div>
    );
  },
};
