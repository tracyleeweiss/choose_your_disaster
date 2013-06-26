
	var myBingKey="Apz_c58BEMk1j8GQv9-bRToFsL_nSEyuxD-BAv6cDiM7F5yYlfphy4_BP3LfxZEk";
	var mybingurl;
	navigator.geolocation.getCurrentPosition(locationAcquired);
	var mylat;
	var mylong;
	var lat1;
	var lat2;
	var longitude1;
	var longitude2;
	var boundingBox;
	function locationAcquired (whatever) {
	  	mylat = whatever.coords.latitude;
		mylong = whatever.coords.longitude;
		//Get current elevation from bing

		//set up bounding box
		lat1=mylat-.04;
		lat2=mylat+.04;
		longitude1=mylong-.04;
		longitude2=mylong + .04;
		boundingBox=lat1.toPrecision(6)+","+longitude1.toPrecision(6)+","+lat2.toPrecision(6)+","+longitude2.toPrecision(6);

		var ROWS = 10;
		var COLUMNS=10;
		var SAMPLES=50;
		mybingurl="http://dev.virtualearth.net/REST/v1/Elevation/Polyline?"+"points="+boundingBox+"&samples="+SAMPLES+"&key="+myBingKey+"&jsonp=?";
		console.log(mybingurl);
		$(callAjax);
		// alert(mylat+' long: '+mylong);
	}

	//var bingurl="http://dev.virtualearth.net/REST/v1/Elevation/List?points=35.89431,-110.72522,35.89393,-110.72578,35.89374,-110.72606,35.89337,-110.72662&key="+myBingKey;
	//var hardBingUrl="http://dev.virtualearth.net/REST/v1/Elevation/List?points=35.89431,-110.72522,35.89393,-110.72578,35.89374,-110.72606,35.89337,-110.72662&key=Apz_c58BEMk1j8GQv9-bRToFsL_nSEyuxD-BAv6cDiM7F5yYlfphy4_BP3LfxZEk&jsonp=?";
	//"https://api.github.com/users/octocat/orgs"
	//
	//var bingurl="http://dev.virtualearth.net/REST/v1/Elevation/List?points="+mylat+','+mylong+'&key='+myBingKey;

	//;lat1,long1,lat2,long2,latn,longn&heights=heights&key=BingMapsKey
	// $.ajax({
	// 		  dataType: "json",
	// 		  url: "test.json",
	// 		  success: success
	// 		});
	// $.get("http://dev.virtualearth.net/REST/v1/Elevation/List","points=35.89431,-110.72522,35.89393,-110.72578,35.89374,-110.72606,35.89337,-110.72662&o=xml&key=Apz_c58BEMk1j8GQv9-bRToFsL_nSEyuxD-BAv6cDiM7F5yYlfphy4_BP3LfxZEk",function(data,status,dummy){
	// 		console.log("yo. status is ",status);

	// }).fail(function(){alert("ERROREO");});

	var callAjax= function(){
			$.ajax(mybingurl, {
				dataType:'jsonp',
				type: 'GET',
				//crossDomain:true,
				success:function(data){
					var testSuccess=JSON.stringify(data);
					//console.log(testSuccess);
					//document.write(testSuccess);
					console.log('This function runs!');
					console.log(data);
					getElevations(data);


				},
				error: function(dummy, status, error){
					alert("status: "+status +  " error: " + error);
				}
			});
	}
	//$.getJSON(bingurl, function(data){$("#elevationData").text('This function runs!');});

	//var jsonElevation=http://dev.virtualearth.net/REST/v1/Elevation/List?points=lat1,long1,lat2,long2,latn,longn&heights=heights&key=BingMapsKey
	//$.ajax(url, params)
	function getElevations(data){
		var elevations=(data.resourceSets[0].resources[0].elevations);
		var max = 0;
		var maxi=0;
		for (var i = 0; i<elevations.length;i++){
			if(max<elevations[i]){
				max=elevations[i];
				maxi=i;
			}
		}//end for
		var diffLocationLat = lat2-lat1;
		var diffLocationLong = longitude2 - longitude1; 
		var maxLocationLat=lat1+(diffLocationLat*maxi);
		var maxLocationLong=longitude1+(diffLocationLong*maxi);

		//Display to user
		var eletext = max+" at " +maxLocationLat.toPrecision(6)+", "+maxLocationLong.toPrecision(6);
		 $("#currentLoc").append(mylat.toPrecision(6)+" "+mylong.toPrecision(6));//text(eletext);
		 $("#highPt").append(eletext);
	}


