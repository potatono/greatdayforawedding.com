var APP = (function() {
	var self = {};
	var labelIdx = 0;
	var textIdx = 0;

	function setHexClip(hex) {
		var ctx = hex.getContext('2d');

		ctx.beginPath();
   		ctx.moveTo(40,0);
   		ctx.lineTo(120,0);
   		ctx.lineTo(160,70);
   		ctx.lineTo(120,140);
    	ctx.lineTo(40,140);
    	ctx.lineTo(0,70);
    	ctx.lineTo(40,0);
    	ctx.clip();
	}

	function paintHexBackground(hex) {
		var img = $('img[src="' + hex.getAttribute('data-img') + '"]').get(0);

		var ctx = hex.getContext('2d');
		var x = hex.getAttribute('data-offset-x') || 0;
		var y = hex.getAttribute('data-offset-y') || 0;
		ctx.drawImage(img, x, y);
	}

	function paintHexColor(hex) {
		var ctx = hex.getContext('2d');
		ctx.fillStyle = $(hex).css('color');
		ctx.fillRect(0,0,160,140);
	}

	function paintHexLabelBackground(hex) {
		var ctx = hex.getContext('2d');
		ctx.save();
		ctx.fillStyle = 'rgba(255,255,255,0.75)';
		ctx.fillRect(0,120,160,20);
		ctx.restore();
	}

	function paintHexTextBackground(hex) {
		var ctx = hex.getContext('2d');
		ctx.save();
		ctx.fillStyle = 'rgba(255,255,255,0.75)';
		ctx.fillRect(0,55,160,30);
		ctx.restore();
	}

	function paintHexBorder(hex) {
		var ctx = hex.getContext('2d');
		ctx.save();
		ctx.strokeStyle = $(hex).css('color');
		ctx.lineWidth = 5;
		ctx.beginPath();
   		ctx.moveTo(40,0);
   		ctx.lineTo(120,0);
   		ctx.lineTo(160,70);
   		ctx.lineTo(120,140);
    	ctx.lineTo(40,140);
    	ctx.lineTo(0,70);
    	ctx.lineTo(40,0);
    	ctx.stroke();
    	ctx.restore();
	}

	function appendHexLabelText(hex) {
		var pos = $(hex).offset();
		pos.top += $(hex).height() + parseInt(hex.getAttribute('data-label-offset-y') || -15);

		var element = $('<div>' + $(hex).html() + '</div>');
		element.addClass($(hex).attr('class'));
		element.addClass('text');
		element.css('position','absolute');
		element.width(160);
		element.height(20);
		element.offset(pos);
		element.css('z-index', 100);
		element.attr('id', 'label-' + labelIdx++);
		$(hex).attr('data-label-id', element.attr('id'));
		element.mouseover(function() { onHexOver(hex); });
		element.mouseout(function() { onHexOut(hex); });
		element.click(function() { onHexClick(hex); });

		$('body').append(element);
	}

	function appendHexText(hex) {
		var pos = $(hex).offset();
		pos.top += parseInt(hex.getAttribute('data-text-offset-y') || 60);

		var element = $('<div>' + $(hex).html() + '</div>');
		element.addClass($(hex).attr('class'));
		element.addClass('text');
		element.css('position','absolute');
		element.width(160);
		element.height(40);
		element.offset(pos);
		element.css('z-index', 100);
		element.attr('id', 'text-' + textIdx++);
		$(hex).attr('data-text-id', element.attr('id'));
		element.mouseover(function() { onHexOver(hex); });
		element.mouseout(function() { onHexOut(hex); });
		element.click(function() { onHexClick(hex); });
		
		$('body').append(element);

		return element;
	}

	function getText(hex) {
		return $('#'+$(hex).attr('data-text-id'));
	}

	function getLabel(hex) {
		return $('#'+$(hex).attr('data-label-id'));
	}

	function onHexOver(hex) {
		$(hex).addClass('over');

		paintHexBackground(hex);

		paintHexColor(hex);
		paintHexTextBackground(hex);
		getText(hex).show();
		getLabel(hex).hide();
	}

	function onHexOut(hex) {
		$(hex).removeClass('over');
		paintHexBackground(hex);
		paintHexLabelBackground(hex);

		getLabel(hex).show();
		getText(hex).hide();
	}

	function onHexClick(hex) {
		var url = hex.getAttribute('data-href') || 
			hex.getAttribute('data-img').replace('.jpg','');

		alert('Coming soon. Stay tuned.')
		//window.location.href = url;
	}

	function buildHexes() {
		$('.hex').each(function(idx, hex) { 
			hex.width = 160;
			hex.height = 140;

			setHexClip(hex);

			if (hex.getAttribute('data-img')) {
				paintHexBackground(hex);
				paintHexLabelBackground(hex); 
				appendHexLabelText(hex);

				$(hex).addClass('over');
				var text = appendHexText(hex).hide();
				$(hex).removeClass('over');
				text.css('color','black');

				hex.onmouseover = function() { onHexOver(hex); }
				hex.onmouseout = function() { onHexOut(hex); }
				hex.onclick = function() { onHexClick(hex); }
			}
			else {
				paintHexBorder(hex);
				appendHexText(hex);
			}
		});
	}


	function init() {
		$(function() { Kerning.live(); });
		buildHexes();
	}

	$(window).load(init);

	return self;
}());

