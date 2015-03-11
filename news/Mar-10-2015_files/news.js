D2L.LE.News = D2L.LE.News || {};

D2L.LE.News.ToggleHideNewsItem = function( newsId, isHidden, callback ) {

	var rpcCallback = function( rpcResponse ) {
		if ( typeof callback === 'function' ) {
			callback( rpcResponse );
		}
	};

	D2L.Rpc.Create( 'ToggleHideNewsItem', rpcCallback, '/d2l/lms/news/controls/NewsControl.control.d2l' ).Call( newsId, isHidden );

};
