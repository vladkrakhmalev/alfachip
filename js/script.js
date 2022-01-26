//input
$('.input').click(function() {
	$(this).removeClass('_error')
	$(this).removeClass('_valid')
	$(this).addClass('_focus')
})
$('.input__field').blur(function () {
	if($(this).val() == '') {
		$(this).closest('.input').removeClass('_error')
		$(this).closest('.input').removeClass('_valid')
		$(this).closest('.input').removeClass('_focus')
	}
})



$(document).ready(function () {



	//menu
	function addClassforMenu() {
		let item = $('.header .menu__list > li')
		let link = $('.header .menu__list > li > a')
		let item_ws = $('.header .menu__list > li > ul').closest('li')
		let sub_list = $('.header .menu__list > li > ul')
		let sub_item = $('.header .menu__list > li > ul li')
		let sub_link = $('.header .menu__list > li > ul li > a')
		let sub_list_2 = $('.header .menu__list > li > ul > li > ul')
		let sub_list_3 = $('.header .menu__list > li > ul > li > ul > li > ul')
		let sub_item_ws = $('.header .menu__list > li > ul > li > ul').closest('li')
		let sub_item_ws_3 = $('.header .menu__list > li > ul > li > ul > li > ul').closest('li')

		item.addClass('menu__item')
		link.addClass('menu__link')
		item_ws.addClass('_submenu')
		item_ws.addClass('_level-1')
		sub_list.addClass('submenu')
		sub_list.addClass('_level-1')
		sub_item.addClass('submenu__item')
		sub_link.addClass('submenu__link')
		sub_item_ws.addClass('_submenu')
		sub_item_ws.addClass('_level-2')
		sub_list_2.addClass('submenu')
		sub_list_2.addClass('_level-2')
		sub_item_ws_3.addClass('_submenu')
		sub_item_ws_3.addClass('_level-3')
		sub_list_3.addClass('submenu')
		sub_list_3.addClass('_level-3')
	}

	addClassforMenu()

	if (window.innerWidth > 720) {
		$('._submenu._level-1').mouseover(function () {
			let submenu = $(this).children('.submenu._level-1')
			if (!submenu.hasClass('_visible'))
				submenu.addClass('_visible')
		})
		$('._submenu._level-2').mouseover(function () {
			let submenu = $(this).children('.submenu._level-2')
			if (!submenu.hasClass('_visible'))
				submenu.addClass('_visible')
		})
		$('._submenu._level-3').mouseover(function () {
			let submenu = $(this).children('.submenu._level-3')
			if (!submenu.hasClass('_visible'))
				submenu.addClass('_visible')
		})
		$('.submenu').mouseleave(function () {
			$(this).removeClass('_visible')
		})
		$('._submenu').mouseleave(function () {
			$(this).children('.submenu').removeClass('_visible')
		})
	}

	if (window.innerWidth <= 720) {
		$('._submenu._level-1').click(function () {
			$('.menu__list').removeClass('_visible')
			if (!$('.submenu._level-2').hasClass('_visible')) {
				$(this).children('.submenu._level-1').addClass('_visible')
			}
		})
		$('._submenu._level-2').click(function () {
			$('.submenu._level-1').removeClass('_visible')
			$(this).children('.submenu._level-2').addClass('_visible')
		})
		$('._submenu._level-3').click(function () {
			let that = $(this)
			setTimeout(function () {
				$('.submenu._level-2').removeClass('_visible')
				that.children('.submenu._level-3').addClass('_visible')
			}, 1)
		})
		$('.menu__btn-edit').click(function () {
			if ($('.menu__list').hasClass('_visible')) {
				$('.menu__list').removeClass('_visible')
				$('.menu__btn').removeClass('_open')
			} else if ($('.submenu._level-1').hasClass('_visible')) {
				$('.submenu._level-1._visible').closest('.menu__list').addClass('_visible')
				$('.submenu._level-1._visible').removeClass('_visible')
				console.log('1')
			} else if ($('.submenu._level-2').hasClass('_visible')) {
				$('.submenu._level-2._visible').closest('.submenu._level-1').addClass('_visible')
				$('.submenu._level-2._visible').removeClass('_visible')
				console.log('2')
			} else if ($('.submenu._level-3').hasClass('_visible')) {
				$('.submenu._level-3._visible').closest('.submenu._level-2').addClass('_visible')
				$('.submenu._level-3._visible').removeClass('_visible')
				console.log('3')
			}
		})
		$('.menu__btn').click(function () {
			if ($(this).hasClass('_open')) {
				$(this).removeClass('_open')
				$('.menu__list').removeClass('_visible')
				$('.submenu').removeClass('_visible')
				$('.menu__list').removeClass('_visible')
				$('body').removeClass('_no-scroll')
			} else {
				$(this).addClass('_open')
				$('.menu__list').addClass('_visible')
				$('body').addClass('_no-scroll')
			}
		})
	}



	//sliders
	$('.mainscreen__slider').slick({
		appendArrows: $('.mainscreen__arrows'),
		prevArrow: '<div class="mainscreen__arrow _left"><img src="img/i_arrow_white.png" alt="" class= "mainscreen__arrow-icon"></div>',
		nextArrow: '<div class="mainscreen__arrow _right"><img src="img/i_arrow_white.png" alt="" class= "mainscreen__arrow-icon"></div>',
		autoplay: true,
		autoplaySpeed: 6000,
  })
	$('.mainscreen__length').text($('.mainscreen__slider .slick-slide:not(.slick-cloned)').length + ' / ' + $('.mainscreen__slider .slick-slide:not(.slick-cloned)').length);
	$('.mainscreen__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('.mainscreen__length').text((currentSlide + 1) + ' / ' + slick.slideCount);
	})
	$('.about__slider').slick({
		dots: true,
		dotsClass: 'about__pagination-list',
		appendArrows: $('.about__pagination'),
		appendDots: $('.about__pagination'),
		prevArrow: '<div class="about__arrow _left"><img src="img/i_arrow_white.png" alt="" class= "about__arrow-icon"></div>',
		nextArrow: '<div class="about__arrow _right"><img src="img/i_arrow_white.png" alt="" class= "about__arrow-icon"></div>'
	})



	//submit
	$('.contact__btn').click(function (e) {
		e.preventDefault()
		let form = $(e.target).closest('form')
		let data = form.serialize()
		
		if (validData()) {
			$.post('/ajax.php', data, function (result) {
				if (result.status == 'success') openPopup('All good')
				else alert(result.message)
			}, 'json').fail(function () {
				openPopup('Error')
			})
			clearForm(form)
		}
	})

	function clearForm(form) {
		form.find('input').val('')
		form.find('.input').removeClass('_focus')
		form.find('.input').removeClass('_error')
		form.find('.input').removeClass('_valid')
	}
	function openPopup(title) {
		string = '<div class="popup"><h5 class="popup__title">' + title + '</h5></div>'
		$.magnificPopup.open({
			items: {
				src: string,
				type: 'inline'
			}
		});
	}
	function validData() {
		let agree = false
		let inputs = $('.input._required > input')
		let checkbox = $('.checkbox.contact__checkbox > input')
		inputs.each(function() {
			if ($(this).val() == '') {
				$(this).closest('.input').addClass('_error')
			} else {
				$(this).closest('.input').removeClass('_error')
			}
		})
		if (!checkbox.prop("checked"))
			checkbox.closest('.checkbox').addClass('_error')
		else
			checkbox.closest('.checkbox').removeClass('_error')

		if (!$('.input').hasClass('_error') && !$('.checkbox').hasClass('_error')) {
			agree = true
		}
		return agree
	}



})