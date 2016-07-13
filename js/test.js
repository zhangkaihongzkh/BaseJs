window.onload = function(){
	/*alert(Base.getId('box').innerHTML);
	alert(Base.getName('sex')[0].value);
	alert(Base.getTagName('p')[0].innerHTML);*/

	
/*	alert(base.getId('box').elements.length);
	alert(base.getTagName('p').elements.length);*/

	$().getId('box').html('abc');

	$().getTagName('p').css('backgroundColor','green').html('123').click(function(){
		alert('a')
	});
}; 