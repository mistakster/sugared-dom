var el = (function () {

	var doc = document;

	var toString = Object.prototype.toString;

	var directProperties = {
		'class': 'className',
		'className': 'className',
		'defaultValue': 'defaultValue',
		'for': 'htmlFor',
		'html': 'innerHTML',
		'text': 'textContent',
		'value': 'value'
	};

	var booleanProperties = {
		'checked': 1,
		'defaultChecked': 1,
		'disabled': 1,
		'multiple': 1,
		'selected': 1
	};

	function isArray(obj) {
		return toString.apply(obj) === "[object Array]";
	}

	var setProperty = function (el, key, value) {
		var prop = directProperties[key];
		if (prop) {
			el[prop] = (value == null ? '' : '' + value);
		} else if (booleanProperties[key]) {
			el[key] = !!value;
		} else if (value == null) {
			el.removeAttribute(key);
		} else {
			el.setAttribute(key, '' + value);
		}
	};

	var appendChildren = function (el, children) {
		var i, l, node;
		for (i = 0, l = children.length; i < l; i += 1) {
			node = children[i];
			if (node) {
				if (isArray(node)) {
					appendChildren(el, node);
				} else {
					if (typeof node === 'string') {
						node = doc.createTextNode(node);
					}
					el.appendChild(node);
				}
			}
		}
	};

	var splitter = /#|\./;

	return function (tag, props, children) {
		if (isArray(props)) {
			children = props;
			props = null;
		}

		var origin, parts, name, el, i, l, pos, node, prop;

		if (splitter.test(tag)) {
			origin = tag;
			parts = origin.split(splitter);
			tag = parts[0];
			if (!props) {
				props = {};
			}

			for (pos = 0, i = 1, l = parts.length; i < l; i++) {
				name = parts[i];
				pos = origin.indexOf(name, pos + 1);
				if (origin.charAt(pos - 1) === "#") {
					props.id = name;
				} else {
					props.className = props.className ?
							props.className + ' ' + name : name;
				}
			}
		}

		el = doc.createElement(tag);
		if (props) {
			for (prop in props) {
				setProperty(el, prop, props[prop]);
			}
		}
		if (children) {
			appendChildren(el, children);
		}
		return el;
	};

}());