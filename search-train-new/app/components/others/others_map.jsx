import React from "react";

import bluedot from '../../../images/bluedot.png';

var mapMarkersArray = []; //makes an array of the markers you place on the map,
                          //it is used in clearMarkers().
var map;
var ctaLayer;

/*const DEFAULT_POSITION = {
  lat: 39.9526,
  lng: -75.1652 
};*/

class OthersMap extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			line: props.line
			//initiate state.line
		}
		this.refreshMap = this.refreshMap.bind(this);
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

	componentWillReceiveProps(nextProps){
		var line = nextProps.line;
		this.setState({
			line: line
		});
	};

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
        	//handleLocationError(true, infoWindow, map.getCenter());
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
		var line = this.state.line;
		var lineName;
		if(line == 'rr_route_mfl'){
			lineName = "MFL";
		}else if(line == 'rr_route_mfo'){
			lineName = "MFO";
		}else if(line == 'rr_route_bsl'){
			lineName = "BSL";
		}else if(line == 'rr_route_bso'){
			lineName = "BSO";
		}else if(line == 'rr_route_nhsl'){
			lineName = "NHSL";
		}else if(line == 'cct'){
			lineName = "CCT";
		}

		//console.log(lineName);

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
			url: 'https://www3.septa.org/transitview/kml/' + lineName + '.kml',
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
	}
	//initMap() ends

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

export default OthersMap;