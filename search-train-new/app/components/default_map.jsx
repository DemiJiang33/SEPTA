import React from "react";

import bluedot from '../../images/bluedot.png';

var map;
const DEFAULT_POSITION = {
  lat: 39.9526,
  lng: -75.1652 
};

class DefaultMap extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showMap: true
		}
		this.addYourLocationButton = this.addYourLocationButton.bind(this);
		this.displayLocationOnce = this.displayLocationOnce.bind(this);
		this.onClickMove = this.onClickMove.bind(this);
	}

	componentDidMount(){
		map = new google.maps.Map(this.refs.map, {
		center: DEFAULT_POSITION,
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

	onClickMove(){
		this.setState({showMap: !this.state.showMap});
	}

	render(){
		const title ={
			textAlign:"center",
			marginBottom: "1px",
			marginTop: "1px"
		}

		const mapStyle={
			display: this.state.showMap ? 'block' : 'none'
		}

		var upOrDown;
		if(this.state.showMap){
			upOrDown = String.fromCharCode('9652') + "Hide Map"
		}else{
			upOrDown = String.fromCharCode('9662') + "Show Map"
		}
		
		return(
			<div>
			<div ref="map" id="map" style={mapStyle}>I should be a map!</div>
			<button onClick={this.onClickMove}
			className ='btn btn-primary btn-md btn-block'>{upOrDown}</button>
			<h4 className="well well-sm" style ={title}>
            <strong>Bus/Trolley</strong>
            </h4>
            </div>
			)
	}
}


export default DefaultMap;