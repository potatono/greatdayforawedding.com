var APP = (function() {
	var self = {};
	var canvas;
	var ctx;

	function getBackgroundImageSrc(element) {
		var url = $(element).css('background-image');
		
		if (/([\w\-\.]+\.\w{3})['"]?\)?$/.test(url)) 
			return RegExp.$1;	
		else
			return null;
	}

	function getBackgroundPosition(element) {
		var pos = $(element).css('background-position');
		var parts = pos.split(/ /);

		return { 
			x: parts[0].replace('px','').replace('%',''),
			y: parts[1].replace('px','').replace('%','')
		};
	}

	function setHexClip() {
		var w = canvas.width;
		var h = canvas.height;

		ctx.beginPath();
   		ctx.moveTo(w*0.25,0);
   		ctx.lineTo(w*0.75,0);
   		ctx.lineTo(w,h*0.5);
   		ctx.lineTo(w*0.75,h);
    	ctx.lineTo(w*0.25,h);
    	ctx.lineTo(0,h*0.5);
    	ctx.lineTo(w*0.25,0);
    	ctx.clip();
	}

	function paintHexBackground(hex) {
		var src = getBackgroundImageSrc(hex);
		var w = canvas.width;
		var h = canvas.height;
		
		if (src) {
			var color = $(hex).css('background-color');
			$(hex).css('background-color','inherit');
			var img = $('img[src="/img/' + src + '"]').get(0);
			var pos = getBackgroundPosition(hex);

			ctx.clearRect(0,0,w,h);
			ctx.drawImage(img, pos.x, pos.y);

			var data = "url(" + canvas.toDataURL('image/png') + ")";
			$(hex).css('background-image', data).css('background-position','0px 0px');

			ctx.clearRect(0,0,w,h);
			ctx.fillStyle = color;
			ctx.fillRect(0,0,w,h);

			$(hex).append($('<img src="' + canvas.toDataURL('image/png') + '" />'));
			$(hex).mouseover(function() { onHexOver(hex); });
			$(hex).mouseout(function() { onHexOut(hex); });
			$(hex).click(function() { onHexClick(hex); });
		}
		else {
			ctx.clearRect(0,0,w,h);
			paintHexBorder(hex);

			var data = "url(" + canvas.toDataURL('image/png') + ")";
			$(hex).css('background-image', data).css('background-position','0px 0px');
		}
	}

	function paintHexBorder(hex) {
		var w = canvas.width;
		var h = canvas.height;
		ctx.save();
		ctx.strokeStyle = $(hex).find('.label').css('color');
		ctx.lineWidth = 5;
		ctx.beginPath();
   		ctx.moveTo(w*0.25,0);
   		ctx.lineTo(w*0.75,0);
   		ctx.lineTo(w,h*0.5);
   		ctx.lineTo(w*0.75,h);
    	ctx.lineTo(w*0.25,h);
    	ctx.lineTo(0,h*0.5);
    	ctx.lineTo(w*0.25,0);
    	ctx.stroke();
    	ctx.restore();
	}

	function onHexOver(hex) {
		$(hex).addClass('over');
	}

	function onHexOut(hex) {
		$(hex).removeClass('over');
	}

	function onHexClick(hex) {
		var url = hex.getAttribute('data-href');
		if (url)
			window.location.href = url;
	}

	function buildHexes() {
		$('.hex').each(function(idx, hex) { 
			paintHexBackground(hex);
		});
	}

	function init() {
		canvas = $('canvas')[0];

		if (canvas) {
			ctx = canvas.getContext('2d');
			setHexClip();
			buildHexes();
		}

		$(function() { Kerning.live(); });
	}

	$(window).load(init);

	return self;
}());

