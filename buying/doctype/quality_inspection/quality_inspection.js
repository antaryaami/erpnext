// Copyright (c) 2013, Web Notes Technologies Pvt. Ltd.
// License: GNU General Public License v3. See license.txt

cur_frm.cscript.item_code = function(doc, cdt, cdn) {
	if (doc.item_code)
		return get_server_fields('get_purchase_receipt_item_details','','',doc,cdt,cdn,1);
}

cur_frm.cscript.inspection_type = function(doc, cdt, cdn) {
	if(doc.inspection_type == 'Incoming'){
		doc.delivery_note_no = '';
		hide_field('delivery_note_no');		
		unhide_field('purchase_receipt_no');
	}
	else if(doc.inspection_type == 'Outgoing'){
		doc.purchase_receipt_no = '';
		unhide_field('delivery_note_no');
		hide_field('purchase_receipt_no');

	}
	else {
		doc.purchase_receipt_no = '';
		doc.delivery_note_no = '';		
		hide_field('purchase_receipt_no');
		hide_field('delivery_note_no');
	}
}

cur_frm.cscript.refresh = cur_frm.cscript.inspection_type;

// item code based on GRN/DN
cur_frm.fields_dict['item_code'].get_query = function(doc, cdt, cdn) {
	var filter = {};
	if (doc.purchase_receipt_no) filter['parent'] = doc.purchase_receipt_no;
		
	else if (doc.delivery_note_no) filter['parent'] =  doc.delivery_note_no;

	return{
		filters: filter
	}
}

// Serial No based on item_code
cur_frm.fields_dict['item_serial_no'].get_query = function(doc, cdt, cdn) {
	var filter = {};
	if (doc.item_code) {
		filter = {
			'item_code': doc.item_code,
			'status': "In Store"
		}
	} else
		filter = { 'status': "In Store" }
	
	return { filters: filter }
}