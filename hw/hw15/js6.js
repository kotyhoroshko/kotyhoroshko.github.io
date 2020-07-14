var textBlock = document.querySelector('.wrapper156');

textBlock.addEventListener('mouseover', function(){moveTextBlock(100, 0, 0)});;
textBlock.addEventListener('mouseout', function(){moveTextBlock(0, 100, 1)});

function moveTextBlock(w,l,td){
	document.querySelector('.textBlock').style.cssText = "width:"+w+"%;left:"+l+";transition-delay:"+td+"s;"
}