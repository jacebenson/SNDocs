(function () {
	data.filterMsg = gs.getMessage("Filter...");
	
	options.show_footer = gs.nil(options.show_footer) ?  true : options.show_footer;
	options.table = $sp.getParameter('t') || options.table;
	if (!options.table)
		return;

	var gr = new GlideRecordSecure(options.table); // does ACL checking for us
	if(!gr.isValid()) {
		data.isValid = false;
		return;
	} else
		data.isValid = true;
	gr.addEncodedQuery(options.filter);
	options.title = options.title || gr.getPlural();
	options.display_field = $sp.getParameter('f') || options.display_field;
	if (!options.display_field || !gr.isValidField(options.display_field))
		options.display_field = gr.getDisplayName();

	if (input && input.filterText) {
		gr.addEncodedQuery(options.display_field + "LIKE" + input.filterText)
	}

	options.title = options.title || gr.getPlural();
	options.secondary_fields = options.secondary_fields || "";
	options.secondary_fields = options.secondary_fields.split(",");
	if (!options.order_by || !gr.isValidField(options.order_by))
		options.order_by = options.display_field;

	// Set ID of sp_page from option schema
	if (options.list_page) {
		var sp_page = GlideRecord('sp_page');
		if (sp_page.get(options.list_page))
			options.list_page_dv = sp_page.getDisplayValue('id');
	}
	
	// redo query with limit
	if (options.order_direction == "asc")
		gr.orderBy(options.order_by);
	else
		gr.orderByDesc(options.order_by);

	data.maxCount = 500;
	gr.setLimit(data.maxCount);
	gr.query();
	
	data.count = gr.getRowCount();
	data.actions = getActions();
	data.list = [];
	var recordIdx = 0;
	while (gr.next()) {
		if (options.maximum_entries && recordIdx == options.maximum_entries)
			break;

		var record = {};
		if (data.actions.length > 0) {
			var fields = gr.getFields();
			for (var i = 0; i < fields.size(); i++) {
				var glideElement = fields.get(i);
				var name = glideElement.getName();
				if (name.indexOf("sys_") == -1)
					record[name] = gr.getValue(name);
			}
		}

		record.sys_id = gr.getValue('sys_id');
		if (options.image_field) {
			record.image_field = gr.getDisplayValue(options.image_field);
			if (!record.image_field)
				record.image_field = "noimage.pngx";
		}

		if (options.display_field)
			record.display_field = getField(gr, options.display_field);

		record.secondary_fields = [];
		options.secondary_fields.forEach(function(f) {
			record.secondary_fields.push(getField(gr, f));
		});

		if (options.sp_page) {
			var view = "sp";
			if (options.view) {
				var viewGR = new GlideRecord("sys_ui_view");
				viewGR.get(options.view);
				view = viewGR.getValue("name");
			}
			record.url = {id: options.sp_page, table: options.table, sys_id: record.sys_id, view: view};
		} else if (options.url != '')
			record.url = options.url;
		else
			record.url = null;

		data.list.push(record);
		recordIdx++;
	}

	function getField(gr, name) {
		var f = {};
		f.display_value = gr.getDisplayValue(name);
		f.value = gr.getValue(name);
		var ge = gr.getElement(name);
			if (ge == null)
				return f;

		f.type = ge.getED().getInternalType()
		f.label = ge.getLabel();
		return f;
	}

	function getActions() {
		var rl = GlideRecord("sp_vlist_action");
		rl.addQuery("sp_rectangle_vlist",$sp.getValue("sys_id"));
		rl.query();
		var actions = [];
		while(rl.next()) {
			var action = {};
			$sp.getRecordValues(action, rl, "name,glyph,hint,url,color");
			actions.push(action);
		}
		return actions;
	}
})()