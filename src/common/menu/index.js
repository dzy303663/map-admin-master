export default {
    '学生': [{
        title: "首页",
        path: "/home",
        icon: "fa-home"
      }, {
        title: "实习单位选择",
        path: "/table",
        icon: "fa-gears",
        child: [{
          title: "企业列表",
          path: "/table/organization",
          icon: "fa-table",
        }]
      }, {
        title: "实习相关文件下载",
        path: "/files",
        icon: "fa-align-justify",
        child: [{
          title: "相关文件",
          path: "/files/list"
        }]
      },{
        title: "请假申请",
        path: "/leave",
        icon: "fa-map",
        child: [{
          title: "申请列表",
          path: "/leave/ask"
        }]
      },{
        title: "实习报告提交",
        path: "/monitor",
        icon: "fa-align-justify",
        child: [{
          title: "新闻管理",
          path: "/monitor/news"
        },{
          title: "公告管理",
          path: "/monitor/tips"
        }]
      },{
        title: "查看出勤情况",
        path: "/monitor",
        icon: "fa-align-justify",
        child: [{
          title: "新闻管理",
          path: "/monitor/news"
        }]
      }],
    '班主任': [
      {
        title: "首页",
        path: "/home",
        icon: "fa-home"
      }, {
        title: "实习单位选择",
        path: "/table",
        icon: "fa-gears",
        child: [{
          title: "企业列表",
          path: "/table/organization",
          icon: "fa-table",
        }]
      }, {
        title: "实习相关文件下载",
        path: "/monitor",
        icon: "fa-align-justify",
        child: [{
          title: "新闻管理",
          path: "/monitor/news"
        },{
          title: "公告管理",
          path: "/monitor/tips"
        }]
      },{
        title: "请假申请1",
        path: "/map",
        icon: "fa-map",
        child: [{
          title: "热点搜索",
          path: "/map/hot"
        },{
          title: "行政区划",
          path: "/map/area"
        },{
          title: "地图查看",
          path: "/map/search"
        },{
          title: "路线导航",
          path: "/map/road"
        }]
      },{
        title: "实习报告提交",
        path: "/monitor",
        icon: "fa-align-justify",
        child: [{
          title: "新闻管理",
          path: "/monitor/news"
        },{
          title: "公告管理",
          path: "/monitor/tips"
        }]
      },{
        title: "查看出勤情况",
        path: "/monitor",
        icon: "fa-align-justify",
        child: [{
          title: "新闻管理",
          path: "/monitor/news"
        }]
      }
    ],
    '系管理员': [],
    '校管理员': [],
    '企业': [],
    '开发': [{
      title: "首页",
      path: "/home",
      icon: "fa-home"
    }, {
      title: "实习单位选择",
      path: "/table",
      icon: "fa-gears",
      child: [{
        title: "企业列表",
        path: "/table/organization",
        icon: "fa-table",
      }, {
        title: "部门管理",
        path: "/table/dept"
      },{
        title: "岗位管理",
        path: "/table/job"
      },{
        title: "人员管理",
        path: "/table/base"
      },{
        title: "日志管理",
        path: "/table/log"
      }]
    }, {
      title: "实习相关文件下载",
      path: "/monitor",
      icon: "fa-align-justify",
      child: [{
        title: "新闻管理",
        path: "/monitor/news"
      },{
        title: "公告管理",
        path: "/monitor/tips"
      }]
    },{
      title: "请假申请",
      path: "/map",
      icon: "fa-map",
      child: [{
        title: "热点搜索",
        path: "/map/hot"
      },{
        title: "行政区划",
        path: "/map/area"
      },{
        title: "地图查看",
        path: "/map/search"
      },{
        title: "路线导航",
        path: "/map/road"
      }]
    },{
      title: "实习报告提交",
      path: "/monitor",
      icon: "fa-align-justify",
      child: [{
        title: "新闻管理",
        path: "/monitor/news"
      },{
        title: "公告管理",
        path: "/monitor/tips"
      }]
    },{
      title: "查看出勤情况",
      path: "/monitor",
      icon: "fa-align-justify",
      child: [{
        title: "新闻管理",
        path: "/monitor/news"
      },{
        title: "公告管理",
        path: "/monitor/tips"
      }]
    }]
}