$(document).ready(function () {
    // 상단메뉴
    var $header = $('.header');
    var headerHeight = $header.height();
    var $gnb = $('.gnbWrap');
    var $gnbList = $('.gnbList');
    var $gnbSub = $('.subMenu');
    var $moBtn = $('.btnMoGnb');
    if (!$moBtn.is(':hidden')) {
        $('.gnbList>li').find('>div').parent('li').addClass('opNav').children('a').attr('title','하위메뉴 보기');
    }
	$(window).on("scroll", function () {
		let scrollTop = $(this).scrollTop();
		if ($moBtn.is(':hidden')) {
			if (scrollTop > 50) {
				$("#headerWrap").addClass("fix");
			} else {
				$("#headerWrap").removeClass("fix");
			}
		}
	});
   $gnbList.find('>li').on('mouseenter', function (event) {
        event.stopPropagation();
        if ($moBtn.is(':hidden')) {
            $('#headerWrap, .overlayBg').addClass('active');
            $gnbSub.stop().show();
            var height = $gnbList.find('li').height();
            $header.css('height', height);
			$gnbList.find('>li').removeClass('hover');
			$(this).addClass('hover');
        }
    });
    $header.on('mouseleave', function (event) {
        if ($moBtn.is(':hidden')) {
            $('#headerWrap, .overlayBg').removeClass('active');
            $('.gnbList').find('>li').removeClass('hover');
			$gnbSub.stop().hide();
			$('.opNav').removeClass('open').children('a').attr('title','하위메뉴 보기');
            $('.gnbList').find('>div').hide();
            $header.removeAttr('style');
        }
    });
    $gnbList.find('>li>a').on('focus', function () {
		$(this).closest('li').mouseenter();
	});
	
	$(".gnbList").find("a").on("click", function () {
		var subCheck = $(this).closest("li").find('>div').length > 0;
		if (!subCheck) {
			var lkId = $(this).attr("href");
			var lkTop = $(lkId).offset().top - 120;
			$('html, body').animate({
				scrollTop: lkTop
			}, 400);

			if ($moBtn.is(":visible")) {
				$('.gnbWrap').hide();
				$('body').removeAttr('style');
				$('#headerWrap, .overlayBg').removeClass('active');
			}
		}
	});

    $moBtn.find('button').on('click', function() {
		$('body').css('overflow','hidden');
        $gnb.show("slide", {direction: "right" }, 600);
        $('#headerWrap, .overlayBg').addClass('active');
    });
    $gnb.find('.moGnbClose button').click(function() {
		$gnb.hide();
        $('body').removeAttr('style');
        $('#headerWrap, .overlayBg').removeClass('active');
    });
    $(document).on('click', '.opNav>a', function(event) {
		if ($moBtn.is(':visible')) {
			event.preventDefault();
			var target = $(this).closest('li').find('>div');
			if (target.is(':hidden')) {
				target.slideDown();
				$(this).attr('title','하위메뉴 숨기기').closest('li').addClass('open');
			} else {
				target.hide();
				$(this).attr('title','하위메뉴 보기').closest('li').removeClass('open');
				target.find('>div').hide();
				target.find('li.open').removeClass('open').find('>a').attr('title','하위메뉴 보기');
			}
			return false;
		}
    });
	// Site Select
    $('.siteBtn').on('click', function() {
        var $this = $(this);
        var target = $this.closest('li').find('div');
        if(target.is(':hidden')) {
            $this.parent('li').addClass('active');
            target.slideDown();
        } else {
            $this.parent('li').removeClass('active');
            target.slideUp();
        }
    });
    // 상단 메뉴에서 포커스 벗어났을 시 처리
    $(document).on('focus', ':focusable', function (e) {
        if ($gnb.has(e.target).length === 0) {
            $header.mouseleave();
        }
    });

    $(window).resize(function () {
        if ($moBtn.is(':hidden')) {
            $('.gnbList>li.opNav').removeAttr('class').children('a').removeAttr('title');
			$('body').removeAttr("style");
            $header.removeAttr('style');
            $gnb.removeAttr('style');
            $gnb.find('div').removeAttr('style');
            $('.opNav>a').attr('title','하위메뉴 보기').closest('li').removeClass('open');
            $('#headerWrap, .header, .overlayBg').removeClass('active');
        } else {
            $('.gnbList>li').find('>div').parent('li').addClass('opNav').children('a').attr('title','하위메뉴 보기');
            $header.removeAttr('style');
			$('#headerWrap, .overlayBg').removeClass('active');
			$gnb.hide();
        }
    });
});
