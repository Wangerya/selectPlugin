//闭包
(function (window, undefined) {
  function DiySelect(ele, json) {
    if (this instanceof DiySelect) { //要求开发者明确地确认对象为某特定类型
      if ($.isPlainObject(json)) { //用于判断指定参数是否是一个纯粹的对象
        //配置
        this.config = {
          series: [],
          isReplaceText: true,
          isHideSlide: true,
          callback: null,
          isneedTip: true,
          tip: '请选择',
          createLi: function (liitem) {
            var li = '<li class="item">' + liitem.text + '</li>';
            return li;
          },
        };
        $.extend(this.config, json);
      }
      this.config.selector = $(ele);
      this.init(json);
      return this;
    } else {
      return new DiySelect(ele, json);
    }
  }
  var tmp = '<div class="dropdown dropdown-radio">' +
    '<div class="dropdown-header">' +
    '<span class="dropdown-text">我是下拉框</span>' +
    '<i class="iconfont icon-xialakuang"></i>' +
    '</div>' +
    '<div class="dropdwon-con">' +
    '<ul class="dropdown-select">' +
    '</ul>' +
    '</div>' +
    '</div>';
  DiySelect.prototype.init = function (json) {
    var self = this;
    //创建html模板
    var select;
    select = $(tmp);
    if (self.config.isneedTip) {
      select.find('.dropdown-text').addClass('dropdown-tip');
    }
    self.config.selector.empty();
    //插入插件
    self.config.selector.append(select);
    //设置option
    self.setOption(self.config.series, select);
    self.setDomEvent(select, self.config.series);
    self.inputChanges(select, self.config.series)
    return this;
  };
  DiySelect.prototype.setDomEvent = function (select, series) {
    this.normalSlide(select);
    this.replaceText(select);
    // this.inputChanges(series);
  };
  DiySelect.prototype.replaceText = function (select) {
    var self = this;
    select.on('click', '.item', function (event) {
      $(this).addClass('active').siblings().removeClass('active');
      //单选
      if (self.config.isReplaceText) {
        self.config.selector.find('.dropdown-text').removeClass('dropdown-tip');
        var text = $(this).text();
        var fir = select.find('.dropdown-text');
        fir.html(text);
      }
      //如果存在回调函数调用把jquery li对象传过去
      if (self.config.callback) {
        self.config.callback.call($(this), $(this));
      }
    });
  }
  DiySelect.prototype.normalSlide = function (select) {
    var self = this,
      diyContent = select.children('.dropdwon-con');
    //阻止事件冒泡到document
    this.config.selector.click(function (event) {
      event.stopPropagation();
    });
    //划上划下
    select.click(function () {
      if (self.config.isHideSlide) {
        diyContent.toggle();
        select.find('i').toggleClass('rotate');
      } else {
        diyContent.show();
      }
    });
    select.on('click', 'input', function (event) {
      event.stopPropagation();
    });
    //点击其他地方，列表关闭
    $(document).click(function () {
      diyContent.hide();
      select.find('i').removeClass('rotate');
    });
  }
  //监听过滤搜索框输入的内容
  DiySelect.prototype.inputChanges = function (select, datalist) {
    var self = this;
    select.find('input').on('input', function () {
      $this = $(this);
      var data = datalist.filter(function (item) {
        return item.text.indexOf($this.val()) != -1;
      });
      // console.log('datalist:' + data.length);
      var lilist = self.resetLilist(data);
      // 设置lilist
      select.find('li').remove();
      select.find('ul').append(lilist);
    });
  }
  //配置option
  DiySelect.prototype.setOption = function (datalist, select) {
    var lilist = this.setLilist(datalist);
    //设置lilist 再设置firstText的文本
    this.config.selector.find('ul').html(lilist);
    if (this.config.isneedTip) {
      select.find('.dropdown-text').html(this.config.tip);
    } else {
      this.config.selector.find('.dropdown-text').html(datalist[0].text);
    }
  };
  DiySelect.prototype.getValue = function () {
    return this.config.selector.find('.dropdown-tip').length > 0 ? '' : this.config.selector.find('.dropdown-text').html();
  };
  DiySelect.prototype.setLilist = function (datalist) {
    var self = this;
    // 超过20条，可搜索
    if (datalist.length > 20) {
      var lilist = '<input placeholder="输入筛选文字" type="text"/>';
    } else {
      var lilist = '';
    }
    for (var i in datalist) {
      lilist += self.config.createLi(datalist[i]);
    }
    return lilist;
  };
  //搜索后更新li内容
  DiySelect.prototype.resetLilist = function (datalist) {
    var self = this;
    var lilist = '';
    for (var i in datalist) {
      lilist += self.config.createLi(datalist[i]);
    }
    return lilist;
  };
  window.DiySelect = DiySelect;

  $.fn.select = function (opts) {
    this.each(function () {
      new DiySelect($(this), opts)
    })
    return this;
  }
})(window);