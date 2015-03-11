function HandleContextMenuClick( item ) {
	var structure = item.GetStructure();
	var placeholder = structure.GetOpener();
	var newsId = placeholder.GetParam( 'newsId' );
				
	switch ( item.GetKey() ) {
		case 'delete':
			var isGlobal = placeholder.GetParam( 'isGlobal' ) == 'True';
			DeleteNewsItem( newsId, isGlobal );
			break;
		case 'hide': 
			ToggleHide( newsId, true );
			placeholder.SetParam( 'isHidden', 'True' );
			break;
		case 'unhide':
			ToggleHide( newsId, false );
			placeholder.SetParam( 'isHidden', 'False' );
			break;
		case 'edit' :
			var isGlobal = placeholder.GetParam( 'isGlobal' ) == 'True';
			var newsId = placeholder.GetParam( 'newsId' );
			var navInfo = new D2L.NavInfo();
			navInfo.SetNavigation('/d2l/lms/news/newedit.d2l?newsId='+newsId+'&amp;Global='+isGlobal);
			Nav.Go( navInfo );
			break;
			
	}
}
			
function HandleShow( placeholder ) {

	var structure = placeholder.GetStructure();

	//canEditOrDelete
	var canEditOrDelete = placeholder.GetParam( 'canEditOrDelete' ) == 'True';
	structure.GetItem('delete').SetItemIsDisplayed( canEditOrDelete );
	structure.GetItem('edit').SetItemIsDisplayed( canEditOrDelete );

	//isHidden
	var isHidden = placeholder.GetParam( 'isHidden' ) == 'True';
	structure.GetItem('hide').SetItemIsDisplayed( !isHidden );
	structure.GetItem('unhide').SetItemIsDisplayed( isHidden );
}

function ToggleHide(newsId, isHidden) {

	var callback = function(rpcResponse) {

		var success = rpcResponse.GetType() == D2L.Rpc.ResponseType.Success;
		if (!success) {
			return;
		}

		var isHiddenResult = rpcResponse.GetResult();
		var textHiddenControl = UI.GetControl( 'IsDisplayedText', newsId );
		textHiddenControl.SetIsDisplayed( isHiddenResult );
	};

	D2L.LE.News.ToggleHideNewsItem(newsId, isHidden, callback);
};

function DeleteNewsItem(delId, isGlobal) {

	var HandleConfirm = function(response) {
		if (response.GetType() == D2L.Dialog.ResponseType.Positive) {
			var RpcCallback = function(rpcResponse) {
				Nav.Reload();
			};
			D2L.Rpc.Create('DeleteNewsItem', RpcCallback, '/d2l/lms/news/main.d2l').Call(delId, isGlobal);
		}
	};

	var confirmDeleteDialog = new D2L.Dialog.Confirm('confirmDelete', HandleConfirm, new D2L.Language.Term('News.Main.jsConfirmDeleteItem'));
	confirmDeleteDialog.Open();
}

function DeleteNewsEntries() {
	var gridVals = gridNews.GetSelectedValues();
	if (gridVals.length == 0) {

		var noneSelectedDialog = new D2L.Dialog.Warning('noneSelected', new D2L.Language.Term('News.Main.jsAlertNoEntriesSelected'));
		noneSelectedDialog.Open();

	} else {
		var HandleConfirm = function(response) {
			if (response.GetType() == D2L.Dialog.ResponseType.Positive) {
				Nav.SubmitAction('Delete', gridVals, '');
			}
		};

		var confirmDeleteDialog = new D2L.Dialog.Confirm('confirmDelete', HandleConfirm, new D2L.Language.Term('News.Main.jsConfirmDeleteItems'));
		confirmDeleteDialog.Open();
	}
}
