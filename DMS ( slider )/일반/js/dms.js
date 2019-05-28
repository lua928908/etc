var dms = function(option){

	// 변수 정의
	var target = jQuery( option.target );
	var item = option.item;
	var item_length = target.children().length;
	var duration = option.duration;
	var loop = option.loop;
	var count = 1;
	var action = false;

	var view,inner,item,carousel;


	// 함수 정의
	var add_name = function(target){
		target.addClass('dms-view-wrap');
		target.children().wrapAll('<div class="dms-view-inner"></div>');
		target.find('.dms-view-inner').children().addClass('dms-item');
	};

	var make_slider = function(){
		view = jQuery('.dms-view-wrap');
		inner = jQuery('.dms-view-inner');
		item = jQuery('.dms-item');

		inner.width( item_length * 500 );
		item.width(500);
		view.append('<ul class="carousel"></ul>');
		for( var i=0; i<item_length; i++ ){
			if( i<=0 ){
				jQuery('.carousel').append( '<li class="common active"></li>' );
			}else{
				jQuery('.carousel').append( '<li class="common"></li>' );
			}
		}
		carousel = jQuery('.carousel');
	};

	var make_arrow = function(){
		jQuery('.dms-view-wrap').append('<button class="dms-prev"><i class="fas fa-angle-left"></i></button>');
		jQuery('.dms-view-wrap').append('<button class="dms-next"><i class="fas fa-angle-right"></i></button>');
	};

	var prev_move = function(target){
		if( count <= 1 || action ){
			return false;
		}else{
			action = true;
			target.stop().animate({
				left : '+=500'
			},duration,function(){
				action = false;
			});
			--count;
		}
	};

	var next_move = function(target){
		if( count >= item_length || action ){
			return false;
		}else{
			action = true;
			target.stop().animate({
				left : '-=500'
			},duration,function(){
				action = false;
			});
			++count;
		}
	};

	var trans_carousel = function(current_carousel){
		carousel.find('.common').each(function(index,element){
			jQuery(this).removeClass();
			if( current_carousel == index+1 ){
				jQuery(this).addClass('common active');
			}else{
				jQuery(this).addClass('common');
			}
		});
	};

	// 함수실행
	add_name(target);
	make_slider();
	make_arrow();

	// 이벤트 부여
	jQuery('.dms-prev').on('click',function(e){
		prev_move(inner);
		trans_carousel( count );
	});
	jQuery('.dms-next').on('click',function(e){
		next_move(inner);
		trans_carousel( count );
	});
	jQuery('.carousel .common').on('click',function(e){
		if( action ){
			return;
		}else{
			action = true;
			var this_count = jQuery('.carousel').children('.common').index(jQuery(this)) + 1;
			trans_carousel( this_count );
			if( count < this_count ){
				inner.animate({
					left : -( jQuery('.dms-item').width() * (this_count-1) )
				},duration,function(){
					action = false;
				});
			}else if( count > this_count ){
				inner.animate({
					left : -( jQuery('.dms-item').width() * (this_count-1) )
				},duration,function(){
					action = false;
				});
			}else{
				return;
			}
		}
		count = this_count;
	});

}
