/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-facebook' : '&#xe000;',
			'icon-twitter' : '&#xe00a;',
			'icon-tumblr' : '&#xe002;',
			'icon-googleplus' : '&#xe003;',
			'icon-arrow-left' : '&#xe004;',
			'icon-arrow-right' : '&#xe005;',
			'icon-arrow-left-2' : '&#xe006;',
			'icon-arrow-right-2' : '&#xe007;',
			'icon-blogger' : '&#xe008;',
			'icon-deviantart' : '&#xe009;',
			'icon-upload' : '&#xe001;',
			'icon-arrow-left-alt1' : '&#xe00b;',
			'icon-arrow-right-alt1' : '&#xe00c;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};