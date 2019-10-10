# 依赖jQuery的下拉框插件select.js

| 配置项        | 描述                     | 可选值/参数                  | 默认值   |
|:--------------|:-------------------------|:-----------------------------|:---------|
| isReplaceText | 是否更改下拉框选择的内容 | false<br> true               | true     |
| isHideSlide   | 选择完毕是否隐藏下拉框   | false <br>true               | true     |
| isneedTip     | 是否需要默认文字         | false <br>true               | true     |
| tip           | 选择框默认文字           | 自定义                       | '请选择' |
| series        | 数据项                   | 格式：[{text：xxx,val：xxx}] | [ ]      |
| callback      | 是否需要回调函数         | null <br> function(ele)      | null     |

### 备注：超过20条数据，可搜索