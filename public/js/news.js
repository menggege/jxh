var rootPath = "http://www.jxh01.com",
	pageSize = 4;
var $content=$(".content"),inpTitle='';

var News = function() {


	return {

		//新闻报道
		initNews: function(_pageIndex,_title, _callBack) {
			$content.removeClass("loaded").addClass("loading");
			var $ul = $(".content-list");
			if(_title)inpTitle = _title;
			var pathName = rootPath + "/GetNews?pageIndex=" + _pageIndex + "&pageSize=" + pageSize;
			if(inpTitle) pathName += "&title="+inpTitle;
			$.ajax({
				type: 'get',
				url: pathName,
				success: function(data) {
					$ul.html('');
					var newsList = JSON.parse(data);
					$(newsList).each(function(i, item) {

						var $li = $("<li>");
						var $img = $("<img>").attr({
							class: 'new-img',
							title: item.title,
							src: "/images1/"+item.imgUrl
						});
						var $a = $("<a>").attr({
							href: '/newsdetail.html?newsID=' + item.newsID
						}).html(item.title);
						var $h4 = $("<h4>").append($a);

						var $p = $("<div class='newlist-content'>").html(item.content.replace(/&nbsp;/g,''));

						var $div = $("<div>").attr({
							class: "newList-footer"
						});
						var $spanAuthor = $("<span>").append($("<i>").attr("class", "author-icon").html(item.author));
						var $spanDate = $("<span>").append($("<i>").attr("class", "time-icon").html(item.datetime.split(' ')[0]));
						var $spanCount = $("<span>").append($("<i>").attr("class", "count-icon").html(item.readtimes));	//接口暂不支持
						var $a = $("<a>").attr({
							href: '/newsdetail.html?newsID=' + item.newsID
						}).html("阅读全文").append("<i class='fx-icon'></i>");

						$div.append($spanAuthor).append($spanDate).append($spanCount).append($a);
						$li.append($img).append($h4).append($p).append($div);

						$ul.append($li);
					});
					var tcount =0;
					if(newsList.length>0)tcount=newsList[0].totalcount;
					if (_callBack) _callBack(tcount);
					$content.removeClass("loading").addClass("loaded");
				}
			});
		},

		//新闻分类
		initNewsType: function() {

			var $sideNavList = $(".sideNavList");
			var $firstNode;

			$.ajax({
				type: 'get',
				url: rootPath + "/GetNewsTypes",
				success: function(data) {

					var newsTypes = JSON.parse(data);
					$(newsTypes).each(function(i, item) {

						var $li = $("<li>");
						var $h4 = $("<h4>").attr({
							flag: item.id
						}).append($("<i>")).append(item.Name);
						var $div = $("<div>").attr({
							class: 'left-content',
							flag: item.id
						}).html('<div class="loading"><i class="fa fa-spinner fa-spin"></i> &ensp;数据加载中...</div>');
						$li.append($h4).append($div);
						$h4.click(function() {
							News.initNewsByTypes(this, $(this).attr("flag"));
						});
						$sideNavList.append($li);
						if (i == 0) $firstNode = $h4;
					});
					$firstNode.click();
				}
			});
		},

		//新闻分类下新闻列表
		initNewsByTypes: function(node, typeId) {

			var $currentNode = $("h4 i.active");
			if ($currentNode) {
				$("div[flag]").hide();
				if (($currentNode.parent("h4")).attr("flag") == typeId) {
					$currentNode.removeClass("active");
					return;
				} else {
					$currentNode.removeClass("active");
				}
			}

			$("i", $(node)).addClass("active");
			var $container = $("div[flag=" + typeId + "]");
			$container.show();
			if ($container.hasClass("loaded")) {
				return;
			}

			var pathName = rootPath + "/GetNewsByType?typeId=" + typeId + "&count=4";
			var $ul = $("<ul>");
			$.ajax({
				type: 'get',
				url: pathName,
				success: function(data) {
					$container.html('');
					var newsList = JSON.parse(data)
					$(newsList).each(function(i, item) {

						var $li = $("<li>");
						var $img = $("<img>").attr({
							alt: item.title,
							src: "/images1/"+item.imgUrl
						}).css({
							width: '129px',
							height: '103px'
						});

						var $a = $("<a>").attr({
							href: '/newsdetail.html?newsID=' + item.id
						}).html(item.title);
						var $h5 = $("<h5>").append($a);

						var $p = $("<div>").html(item.content);

						$li.append($img).append($h5).append($p);
						$ul.append($li);
					});
					$container.addClass("loaded").append($ul);
				}
			});
		},

		//新闻详情
		ininNewsDetail: function() {

			var newsID = _getQueryString("newsID");
			var pathName = rootPath + "/GetNewsByID?newsID=" + newsID;
			$.ajax({
				type: 'get',
				url: pathName,
				success: function(data) {
					$(".loading").remove();

					var news = JSON.parse(data);
					var $i = $(".newList-footer i");
					$($i[0]).append(news.author);
					$($i[1]).append(news.datetime);
					$($i[2]).append(news.readtimes);
					$(".title").html(news.title);
					$(".text").html(news.content);
					var img = $("<img>").attr({
							alt: news.title,
							src: "/images1/"+news.imgUrl
						});
					$(".img").append(img);
					$(".body").show();

				}
			});
		}
	};

}();



//初始化分页
function _initPagination(_totalCount) {


	if(_totalCount==0) {$("#paginationItem").html('');return}
	var pageCounts = Math.ceil(_totalCount / pageSize);
	$('#paginationItem').bootstrapPaginator({
		bootstrapMajorVersion: 3, //版本号。3代表的是第三版本
		currentPage: 1, //当前页数
		numberOfPages: pageSize, //显示页码数标个数
		totalPages: pageCounts, //总共的数据所需要的总页数
		onPageClicked: function(e, originalEvent, type, page) {
			//单击当前页码触发的事件。若需要与后台发生交互事件可在此通过ajax操作。page为目标页数。
			News.initNews(page);
		}
	});
}

//获取参数
function _getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}