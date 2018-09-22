/*
	TODO: Ensure jQuery is loaded, and give time to load before executing
*/

var ocdMadness = {}

/*
	Load jQuery if needed
	Inspired by https://stackoverflow.com/questions/10113366/load-jquery-with-javascript-and-use-jquery
*/
ocdMadness.loadJquery = function(){
	console.log( 'is jQuery present? $:', window.$ )
	console.log( 'is jQuery present? jQuery:', window.jQuery )

	if( window.jQuery ){
		console.log( 'jQuery is present' )
		ocdMadness.jQueryOk = true
	}

	if( ocdMadness.jQueryOk ){
		return
	}

	// If jQuery was not found, it will load it
	var script = document.createElement( 'script' )
	script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'
	script.type = 'text/javascript'
	script.onload = function() {
		console.log( 'jQuery loaded' )
		// window.$ = window.jQuery // Avoid as sites might use $ some ways
		ocdMadness.jQueryOk = true
	}
	document.getElementsByTagName( 'head' )[0].appendChild(script)
}



/*
	De-align the main content of the site
*/
ocdMadness.dealign = function(){
	ocdMadness.loadJquery()
	window.jQuery( 'body' ).css( 'transform', 'rotate(0.1deg)' )
}

/*
	Create dead pixels
*/
ocdMadness.createDeadPixels = function(){
	ocdMadness.loadJquery()

	// CSS class injection found on https://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply
	function createClass(name,rules){
		var style = document.createElement('style')
		style.type = 'text/css'
		document.getElementsByTagName('head')[0].appendChild(style)
		if( !(style.sheet||{}).insertRule )
			(style.styleSheet || style.sheet).addRule(name, rules)
		else
			style.sheet.insertRule(name+"{"+rules+"}",0)
	}

	function createNew(){
		var numberSoFar = $( '.deadpixels' ).length
		var positionX = Math.random() * 100
		var positionY = Math.random() * 100
		var pixelId = 'deadpixel' + numberSoFar
		console.log( 'create pixel', pixelId, positionX, positionY )
		window.jQuery( 'body' ).append( '<div id="' + pixelId + '" class="deadpixels"></div>' )
		window.jQuery( '#' + pixelId ).css( 'left', positionX + '%' )
		window.jQuery( '#' + pixelId ).css( 'top', positionY + '%' )

		setTimeout( createNew, 2000 )
	}

	// Create the dead pixel class
	createClass('.deadpixels', 'background-color: black;' )
	createClass('.deadpixels', 'position: fixed;' )
	createClass('.deadpixels', 'width: 1px;' )
	createClass('.deadpixels', 'height: 1px;' )
	createClass('.deadpixels', 'z-index: 9999;' )

	createNew()
}

/*
	Change font to Comic Sans
	TODO: after 5 seconds of inactivity
	!! Only works if Comic Sans MS is installed on client's computer; Comic Sans is a paid font: https://www.fonts.com/font/microsoft-corporation/comic-sans?QueryFontType=Web&src=GoogleWebFonts
*/
ocdMadness.setComicFont = function(){
	ocdMadness.loadJquery()
	window.jQuery( 'body' ).css( 'font-family', 'Comic Sans MS' )
	window.jQuery( 'h1' ).css( 'font-family', 'Comic Sans MS' )
	window.jQuery( 'h2' ).css( 'font-family', 'Comic Sans MS' )
	window.jQuery( 'h3' ).css( 'font-family', 'Comic Sans MS' )
	window.jQuery( 'h4' ).css( 'font-family', 'Comic Sans MS' )
	window.jQuery( 'p' ).css( 'font-family', 'Comic Sans MS' )
	window.jQuery( 'div' ).css( 'font-family', 'Comic Sans MS' )
}


// Run all:
ocdMadness.dealign()
ocdMadness.createDeadPixels()
ocdMadness.setComicFont()
