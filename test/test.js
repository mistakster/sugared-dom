(function () {

	module("el");

	var tags = [
		"a", "abbr", "address", "article", "aside", "audio",
		"b", "bdi", "bdo", "blockquote", "button",
		"canvas", "caption", "cite", "code", "colgroup", "command",
		"datalist", "dd", "del", "details", "dfn", "div", "dl", "dt",
		"em",
		"fieldset", "figcaption", "figure", "footer", "form",
		"h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup",
		"i", "iframe", "ins",
		"kbd",
		"label", "legend", "li",
		"map", "mark", "menu", "meter",
		"nav", "noscript",
		"object", "ol", "optgroup", "option", "output",
		"p", "pre", "progress",
		"q",
		"rp", "rt", "ruby",
		"s", "samp", "script", "section", "select", "small", "span", "strong", "style", "sub", "summary", "sup",
		"table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track",
		"ul",
		"var",
		"video"
	];

	var selfClosedTags = [
		"br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "wbr"
	];

	var trimLeft = /^\s+/, trimRight = /\s+$/;

	function trim(text) {
		return text ? text.toString().replace(trimLeft, "").replace(trimRight, "") : "";
	}

	function normalize(text) {
		return trim(text).toLowerCase();
	}

	test("simple elements", function () {

		var holder = document.createElement("div"), i, tag;

		for (i = 0; i < tags.length; i++) {
			tag = tags[i];
			holder.innerHTML = "";
			holder.appendChild(el(tag));
			equal(normalize(holder.innerHTML), "<" + tag + "></" + tag + ">");
		}

		holder = null;
	});

	test("simple selfclosed elements", function () {

		var holder = document.createElement("div"), i, tag;

		for (i = 0; i < selfClosedTags.length; i++) {
			tag = selfClosedTags[i];
			holder.innerHTML = "";
			holder.appendChild(el(tag));
			equal(normalize(holder.innerHTML), "<" + tag + ">");
		}

		holder = null;
	});


	test("id sugar", function () {

		var element;

		element = el("div#test1");
		equal(element.getAttribute("id"), "test1");

		element = el("div#test1#test2");
		equal(element.getAttribute("id"), "test2");

		element = null;
	});

	test("class sugar", function () {

		var element;

		element = el("div.test1");
		equal(element.getAttribute("class"), "test1");

		element = el("div.test1.test2");
		equal(element.getAttribute("class"), "test1 test2");

		element = null;
	});

	test("id and class sugar", function () {

		var element;

		element = el("div#test1.test2");
		equal(element.getAttribute("id"), "test1");
		equal(element.getAttribute("class"), "test2");

		element = el("div.test1#test2");
		equal(element.getAttribute("id"), "test2");
		equal(element.getAttribute("class"), "test1");

		element = el("div.test1#test2.test3");
		equal(element.getAttribute("id"), "test2");
		equal(element.getAttribute("class"), "test1 test3");

		element = null;
	});


}());
