document.addEventListener('DOMContentLoaded', function() {
	'use strict';
	var sibling = document.querySelector('#icon-edit');
	if(sibling === null) return;
	var button = document.createElement('button');
	button.setAttribute('class', 'wordsnap-button');
	sibling.parentNode.insertBefore(button, sibling);
	var container = document.querySelector('form#post');
	container.addEventListener('dragover', function(e) {
		e.preventDefault();
	});
	container.addEventListener('drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
		if(e.dataTransfer.files.length === 0) return;
		var file = e.dataTransfer.files[0],
			reader = new FileReader;
		reader.onloadend = function(e) {
			var data = JSON.parse(e.target.result);
			if(!data.status.match(/^\w+$/) || !data.visibility.match(/^\w+$/) || !data.format.match(/^\w+$/)) {
				throw new Error('Malformed WordSnap data file');
			}
			var element;
			container.querySelector('input#title').value = data.title;
			tinyMCE.getInstanceById('content').setContent(data.content);
			if(container.querySelector('select#post_status > option[value="' + data.status + '"]') !== null) {
				container.querySelector('select#post_status').value = data.status;
				container.querySelector('a.save-post-status').click();
			}
			element = container.querySelector('input[name="visibility"][value="' + data.visibility + '"]');
			if(element !== null) {
				element.checked = true;
				container.querySelector('a.save-post-visibility').click();
			}
			element = container.querySelector('input[type="radio"][name="post_format"][value="' + data.format + '"]');
			if(element !== null) {
				element.checked = true;
			}
			for(var i = 0; i < data.categories.length; i++) {
				element = container.querySelector('input[type="checkbox"][name="post_category\[\]"][value="' + data.categories[i] + '"]');
				if(element !== null) {
					element.checked = true;
				}
			}
		};
		reader.readAsText(file);
	}, false);
	button.addEventListener('click', function(e) {
		e.preventDefault();
		var post = {
			title: container.querySelector('input#title').value,
			content: tinyMCE.getInstanceById('content').getContent(),
			status: container.querySelector('select#post_status').value,
			visibility: container.querySelector('input[type="radio"][name="visibility"]:checked').value,
			format: container.querySelector('input[type="radio"][name="post_format"]:checked').value,
			categories: (function() {
				var selected = [],
					cats = container.querySelectorAll('input[type="checkbox"][name="post_category\[\]"]:checked');
				for(var i = 0; i < cats.length; i++) {
					selected.push(cats[i].value);
				}
				return selected;
			})()
		};
		var obj = new Blob([JSON.stringify(post)]),
			objUrl = (URL.createObjectURL || webkitURL.createObjectURL)(obj),
			link = document.createElement('a'),
			name = 'wordsnap-' + post.title.replace(/[^\w\-]+/g, '-').replace(/(^\-|\-$)/, '').toLowerCase() + '.json';
		link.setAttribute('download', name);
		link.setAttribute('href', objUrl);
		link.click();
	}, false);
});
/*
 * Update status:
 * document.querySelector('select#post_status').value = STATUS
 * document.querySelector('a.save-post-status[href="#post_status"]').click()
 * Update visibility:
 * document.querySelector('#post-visibility-select > input[name="visibility"][value="' + VISIBILITY + '"]').checked = true;
 * document.querySelector('a.save-post-visibility[href="#visibility"]').click()
 * Update format:
 * document.querySelector('#post-formats-select > input[name="format"][value="' + FORMAT + '"]').checked = true;
 */
