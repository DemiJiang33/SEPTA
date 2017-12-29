import React from "react";

import bluedot from '../../../images/bluedot.png';

var mapMarkersArray = []; //makes an array of the markers you place on the map,
                          //it is ussd in clearMarkers().
var map;
var ctaLayer;
var ctaLayer2;
var ctaLayer3;

var selectedInfoWindow = null;
var selectedMarkerID = null;

/*const DEFAULT_POSITION = {
  lat: 39.9526,
  lng: -75.1652 
};*/

class BusMap extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			buses: props.buses,
			//initiate state.buses
			route: props.route,
			route2: props.route2,
			route3: props.route3
		}
		this.septaTransitView = this.septaTransitView.bind(this);
		this.initMap = this.initMap.bind(this);
		this.clearMarkers = this.clearMarkers.bind(this);
		this.refreshMap = this.refreshMap.bind(this);
		this.addYourLocationButton = this.addYourLocationButton.bind(this);
		this.displayLocationOnce = this.displayLocationOnce.bind(this);
	};

	componentWillReceiveProps(nextProps){
		var buses = nextProps.buses;
		var route = nextProps.route;
		var route2 = nextProps.route2;
		var route3 = nextProps.route3;
		this.setState({
			buses: buses,
			route: route,
			route2: route2,
			route3: route3
		});
	};

	componentDidMount() {
		
		map = new google.maps.Map(this.refs.map, {
			//center: DEFAULT_POSITION,
			zoom: 10,
			mapTypeControl: false,
			gestureHandling: 'greedy'
		});

		var myMarker = new google.maps.Marker({
			map: map,
			animation: google.maps.Animation.DROP,
			icon: bluedot
			//position: DEFAULT_POSITION
		});
		this.addYourLocationButton(map, myMarker);

		//Close all points of interest
		var noPoi = [
		{
			featureType: "poi",
			stylers: [
			{ visibility: "off" }
			]   
		}
		];
		map.setOptions({styles: noPoi});

		this.displayLocationOnce(map, myMarker);

		this.timeoutID1 = setTimeout(
			() => google.maps.event.addDomListener(window, 'load', this.septaTransitView()),
			100
			);

		this.timeoutID2 = setTimeout(
			() => this.initMap(),
			500
			);

		this.handleID = setInterval(
			() => this.initMap(),
			10000 // update every 10 second as default
			);
	}

	componentWillUnmount(){
		clearInterval(this.handleID);
		clearTimeout(this.timeoutID1);
		clearTimeout(this.timeoutID2);
		clearTimeout(this.refreshMapID);
		clearTimeout(this.septaTransitViewID);
	}

	displayLocationOnce(map, marker){
		var infoWindow = new google.maps.InfoWindow;
		if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            marker.setPosition(pos);
            infoWindow.setPosition(pos);
            //infoWindow.setContent("You're here");
            //infoWindow.open(map);
            map.setCenter(pos);
        },function(){
        	handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        	infoWindow.setPosition(pos);
        	infoWindow.setContent(browserHasGeolocation ?
        		'Error: The Geolocation service failed.' :
        		'Error: Your browser doesn\'t support geolocation.');
        	infoWindow.open(map);
        }
	}

	addYourLocationButton(map, marker) 
	{
		var controlDiv = document.createElement('div');

		var firstChild = document.createElement('button');
		firstChild.style.backgroundColor = '#fff';
		firstChild.style.border = 'none';
		firstChild.style.outline = 'none';
		firstChild.style.width = '28px';
		firstChild.style.height = '28px';
		firstChild.style.borderRadius = '2px';
		firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
		firstChild.style.cursor = 'pointer';
		firstChild.style.marginRight = '10px';
		firstChild.style.padding = '0px';
		firstChild.title = 'Your Location';
		controlDiv.appendChild(firstChild);

		var secondChild = document.createElement('div');
		secondChild.style.margin = '5px';
		secondChild.style.width = '18px';
		secondChild.style.height = '18px';
		secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
		secondChild.style.backgroundSize = '180px 18px';
		secondChild.style.backgroundPosition = '0px 0px';
		secondChild.style.backgroundRepeat = 'no-repeat';
		secondChild.id = 'you_location_img';
		firstChild.appendChild(secondChild);

		google.maps.event.addListener(map, 'dragend', function() {
			$('#you_location_img').css('background-position', '0px 0px');
		});

		firstChild.addEventListener('click', function() {
			var imgX = '0';
			var animationInterval = setInterval(function(){
				if(imgX == '-18') imgX = '0';
				else imgX = '-18';
				$('#you_location_img').css('background-position', imgX+'px 0px');
			}, 500);
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					marker.setPosition(latlng);
					map.setCenter(latlng);
					map.setZoom(14);
					clearInterval(animationInterval);
					$('#you_location_img').css('background-position', '-144px 0px');
				});
			}
			else{
				clearInterval(animationInterval);
				$('#you_location_img').css('background-position', '0px 0px');
			}
		});

		controlDiv.index = 1;
		map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
	}

	septaTransitView() {
		var route = this.state.route;
		var route2 = this.state.route2;
		var route3 = this.state.route3;

		google.maps.event.addListenerOnce(map, 'zoom_changed', function() {
			var width = window.innerWidth;
			if (width < 375){
				// set the zoom level to 10.
				map.setZoom(10);
			}else if (width < 768){
				// set the zoom level to 11.
				map.setZoom(11);
			}else{
				map.setZoom(12);
			}
			});

		 ctaLayer = new google.maps.KmlLayer({
			url: 'https://www3.septa.org/transitview/kml/' + route + '.kml',
			map: map,
			preserveViewport:false
		});

		 ctaLayer2 = new google.maps.KmlLayer({
			url: 'https://www3.septa.org/transitview/kml/' + route2 + '.kml',
			map: map,
			preserveViewport:false
		});

		ctaLayer3 = new google.maps.KmlLayer({
			url: 'https://www3.septa.org/transitview/kml/' + route3 + '.kml',
			map: map,
			preserveViewport:false
		});

		google.maps.event.addListener(ctaLayer, 'defaultviewport_changed', function() {
			var getCenter = ctaLayer.getDefaultViewport().getCenter();
			map.setCenter(getCenter);
			//console.log(getCenter.toUrlValue(6));
		}); 

	}

	//initMap() begins
	initMap() {
		this.clearMarkers();
		var markers = [];//makes an array of the lat and lng of the position
		var markersIcon = [];//makes an array of the ViehleID, direction and destination of the position
		//Map the buses to get the makersIcon[] & markers[]
		{this.state.buses.map(function(bus,i){
			return(
				markersIcon[i] = {
					route: bus.route, bt: bus.bt,
					vehicleID: bus.VehicleID, blockID:bus.BlockID,
					direction: bus.Direction,
					heading: bus.heading,
					destination: bus.destination, late:  bus.late},
				markers[i] = {lat:bus.lat, lng:bus.lng}
				)
		})}

		//Marks the positions
		//for loop begins    
		for(var i = 0; i < markers.length; i++){
		var markerPosition = markers[i];// Only need lat & lng here.
		var markerIcon = markersIcon[i];// Only need ViehleID, direction, destination and late here.
		//console.log(markerIcon);

		//Icon begin here
		var iconUrl ='';
		var angle = markerIcon.heading + 180;
		var circleArrow = '<path class="st0" d="M1.7,69.3c0,22.2,10.7,41.9,27.3,54.1c0.2,0.3,36.6,41.8,36.6,41.8c1.9,1.9,5.1,1.9,7,0 		c0,0,36.4-41.5,36.6-41.8c16.5-12.3,27.3-32,27.3-54.1c0-37.2-30.2-67.4-67.4-67.4S1.7,32.1,1.7,69.3z" transform="rotate(' + angle + ' 68.8 69.1)"/>'; 

		var iconColor =''; 
		if((markerIcon.direction == 'EastBound')||(markerIcon.direction == 'NorthBound')){
			iconColor = '00539F'; //blue
		}else if((markerIcon.direction == 'WestBound')||(markerIcon.direction == 'SouthBound')){
			iconColor = 'EA0029'; //red
		}else{
			iconColor = 'F6891F'; //orange
		}

		var bt = markersIcon[i].bt;
		if(bt == "bus"){
			iconUrl = 'data:image/svg+xml;utf-8, <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width="40" height="46" viewBox="-30 0 199.8 169.8" xml:space="preserve">  <style type="text/css"> 	.st0{fill:%23' + iconColor + ';} 	.st1{fill:%23FFFFFF;stroke:%23' + iconColor + ';stroke-width:4.6757;stroke-miterlimit:10;} 	.st2{fill:%23414042;} </style> <g> ' + circleArrow + '<circle class="st1" cx="68.8" cy="69.1" r="63"/> </g> <path class="st2" d="M102.3,91.8l1.2-10.3l-1.8-43.8c0-2.5-1.2-11-5-11.4H42.5c-4.6,0.1-5.7,8.5-5.4,11.4l-2.7,45l1.3,9.1 		c-0.9,0.3-1.5,1.1-1.5,2.2v4.2c0,1.3,1,2.3,2.2,2.3h6.5v5.8c0,1.2,1,2.2,2.2,2.2h4.8c1.2,0,2.2-1,2.2-2.2v-5.8h35.5v5.6 		c0,1.2,1,2.2,2.2,2.2h4.8c1.2,0,2.2-1,2.2-2.2v-5.6h5.4c1.2,0,2.2-1,2.2-2.3V94C104.1,92.9,103.3,92,102.3,91.8 M44.2,31.2 		c0-0.7,1.2-1.5,1.8-1.5h46.3c0.6,0,1.2,0.6,1.2,1.2l0.7,6.6c0,0.7-1.2,1.3-1.9,1.3H44.6c-0.7,0-1.2-0.5-1.2-1.2L44.2,31.2z 		M47.7,89.4c0,0.6-0.3,1.2-0.6,1.2H42c-0.3,0-0.6-0.5-0.6-1.2V87c0-0.6,0.3-1.2,0.6-1.2h5.1c0.3,0,0.6,0.5,0.6,1.2 		C47.7,87,47.7,89.4,47.7,89.4z M56.6,89.4c0,0.6-0.3,1.2-0.6,1.2h-5.1c-0.3,0-0.6-0.5-0.6-1.2V87c0-0.6,0.3-1.2,0.6-1.2H56 		c0.3,0,0.6,0.5,0.6,1.2V89.4z M88.9,89.4c0,0.6-0.3,1.2-0.6,1.2h-5.1c-0.3,0-0.6-0.5-0.6-1.2V87c0-0.6,0.3-1.2,0.6-1.2h5.1 		c0.3,0,0.6,0.5,0.6,1.2V89.4z M97.8,89.4c0,0.6-0.3,1.2-0.6,1.2h-5.1c-0.3,0-0.6-0.5-0.6-1.2V87c0-0.6,0.3-1.2,0.6-1.2h5.1 		c0.3,0,0.6,0.5,0.6,1.2V89.4z M94,75.3H44.3c-1.8,0-4.9-1.5-4.9-3.5l1-25.2c0-2,2-3.7,3.9-3.7H94c1.8,0,3.3,1.6,3.3,3.6L98.1,72 		C98.1,74,95.8,75.3,94,75.3"/> </svg>'
		}else{
			iconUrl = 'data:image/svg+xml;utf-8, <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width="40" height="46" viewBox="-30 0 199.8 169.8" xml:space="preserve">  <style type="text/css"> 	.st0{fill:%23' + iconColor + ';} 	.st1{fill:%23FFFFFF;stroke:%23' + iconColor + ';stroke-width:4.6757;stroke-miterlimit:10;} 	.st2{fill:%23414042;} </style> <g> ' + circleArrow + '<circle class="st1" cx="68.8" cy="69.1" r="63"/> </g> <g> 	<path class="st2" d="M42.8,94.6h6.4V84.2h39.4v10.4h5.7c0,0,0.7-24.6,0.8-26c0.1-1.4-0.1-4.4-0.1-5c0-0.6-4.3-29-4.6-30.8 		c-0.3-1.9-2.7-2.8-4.2-2.8H71.5v-5.9l1-1v-2.8h-3.8h-4.1v2.8l1,1v5.9H51c-1.5,0-3.8,0.9-4.2,2.8c-0.3,1.9-4.6,30.3-4.6,30.8 		c0,0.6-0.2,3.6-0.1,5C42.2,70.1,42.8,94.6,42.8,94.6z M52.6,81.2c-1.3,0-2.4-1.1-2.4-2.4c0-1.3,1.1-2.4,2.4-2.4 		c1.3,0,2.4,1.1,2.4,2.4C55.1,80.1,54,81.2,52.6,81.2z M52.6,75c-1.3,0-2.4-1.1-2.4-2.4c0-1.3,1.1-2.4,2.4-2.4 		c1.3,0,2.4,1.1,2.4,2.4C55.1,73.9,54,75,52.6,75z M84.9,81.3c-1.3,0-2.4-1.1-2.4-2.4c0-1.3,1.1-2.4,2.4-2.4c1.3,0,2.4,1.1,2.4,2.4 		C87.3,80.2,86.3,81.3,84.9,81.3z M84.9,75.1c-1.3,0-2.4-1.1-2.4-2.4c0-1.3,1.1-2.4,2.4-2.4c1.3,0,2.4,1.1,2.4,2.4 		C87.3,74,86.3,75.1,84.9,75.1z M53.1,37.3c0.5-1.8,2-2.3,3.8-2.3h12h12c1.8,0,3.2,0.5,3.8,2.3c0.1,0.4,0.3,0.7,0.6,3H52.6 		C52.9,38,53,37.7,53.1,37.3z M52.5,43.5h32.9c0.9,7.1,2.2,19.7,2.2,20.2c0,0.8-0.2,2.4-3,2.4c-2.8,0-15.8,0-15.8,0s-13,0-15.8,0 		c-2.8,0-3-1.6-3-2.4C50.1,63.1,51.6,50.6,52.5,43.5z"/> 	<polygon class="st2" points="91.3,102.4 86.5,102.4 93,111.4 99.6,111.4 	"/> 	<polygon class="st2" points="37.8,111.4 44.4,111.4 50.9,102.4 46.1,102.4 	"/> 	<polygon class="st2" points="87,101.9 87,97 87,95.1 87,86.1 50.8,86.1 50.8,95.1 50.8,97 50.8,101.9 55.5,101.9 55.5,97 82.4,97  		82.4,101.9 	"/> </g></svg>'
		}

		var icon = {
			url: iconUrl
		}
		//icon end here

		this.marker = new google.maps.Marker({
			position: {lat: parseFloat(markerPosition.lat), lng: parseFloat(markerPosition.lng)},
			map: map,
			icon: icon
		});

		var m;
		if((markerIcon.late)==1){
			m = ' min';
		}else{
			m = ' mins';
		}

		// It is used to show message
		var lateM;
		if((markerIcon.late > '0') && (markerIcon.late != '999')){
			lateM = markerIcon.late + m + ' late &#10071;';
		}else if (markerIcon.late == '0'){
			lateM = ' On Time &#128077;';
		}else if (markerIcon.late == '999'){
			lateM = ' Suspended &#10071;&#9889;';
		}else{
			lateM = -(markerIcon.late) + m + ' earlier &#10071;'
		}

		var name;
		if (markerIcon.bt == "bus"){
			name = "Bus"
		}else{
			name = "Trolley"
		}

		var message = '<div id = "content">' +
		name +": #" + markerIcon.route + '<br/>' +
		"VehicleID: " + markerIcon.vehicleID + ';&nbsp;&nbsp;' +
		"BlockID: " + markerIcon.blockID + '<br/>' +
		"Direction: " + markerIcon.direction + '<br/>' +
		"Destination: " + markerIcon.destination + '<br/>' +
		"Status: " + lateM +
		'</div>';

		mapMarkersArray[i] = this.marker;   

		this.attachMessage(this.marker, message, markerIcon.vehicleID);//Call the method show message
	}
    //for loop ends
	}
	//initMap() ends

	//Attach the message to the marker.
	attachMessage(marker, message, id) {
		var infowindow = new google.maps.InfoWindow({
			content: message
		});

		if (selectedInfoWindow != null && selectedMarkerID == id && selectedInfoWindow.getMap() == null){
			selectedInfoWindow.setContent(message);
			selectedInfoWindow.open(map, marker);
		}

		//infowindow.getMap() returns null if infowindow is closed.
		marker.addListener('click', function() {
			if (selectedInfoWindow != null && selectedInfoWindow.getMap() != null) {
				selectedInfoWindow.close();
				if (selectedInfoWindow == infowindow) {
					selectedInfoWindow = null;
					return;
				}
			}
			infowindow.open(map, marker);
			selectedInfoWindow = infowindow;
			selectedMarkerID = id;
		});

		//Click somewhere else of the map to close infoWindow
		google.maps.event.addListener(map, 'click', function () {
			infowindow.close();
			if (selectedInfoWindow != null && selectedInfoWindow.getMap() != null){
				selectedInfoWindow.close();
			}
			selectedMarkerID = null;
			selectedInfoWindow = null;
		});

		//hide the close button of infoWindow
		google.maps.event.addListener(infowindow, 'domready', function () {
			$("#content").parent().parent().parent().next().remove();
		});
	}  

	// Removes the markers from the map, and not keeps them in the array.
	clearMarkers() {
		if (mapMarkersArray){
			for (var i = 0; i < mapMarkersArray.length; i++){
				mapMarkersArray[i].setMap(null);
			}
			mapMarkersArray.length = 0;
		}
	}

	refreshMap(){
		this.refreshMapID = setTimeout(
			() => this.initMap(),
			100 // update once
			);
	}

	reloadMap(){
		ctaLayer.setMap(null); 
		ctaLayer2.setMap(null); 
		ctaLayer3.setMap(null); 

		this.septaTransitViewID = setTimeout(
			() => this.septaTransitView(),
			100 // update once
			);

		this.refreshMapID = setTimeout(
			() => this.initMap(),
			500 // update once
			);
	}

	render(){

		const buttonRefresh = {
			top: '6px',
			right: '0px',
			position: 'absolute',
			visibility: 'visible'
		}

		const buttonReload = {
			top: '16px',
			position: 'absolute',
			visibility: 'hidden'
		}

		return(
			<div>
			<button className ='btn btn-primary btn-sm' id="refreshBus" 
			onClick={this.refreshMap} style={buttonRefresh}>
			<span className="glyphicon glyphicon-refresh"></span>
			</button>
			<button className ='btn btn-default btn-xs' id="reloadBus"
			style={buttonReload} 
			onClick={this.reloadMap.bind(this)}>Reload (it's hidden) </button>
			<div ref="map" id="map">I should be a map!</div>
			</div>
			)
	}
}

export default BusMap;