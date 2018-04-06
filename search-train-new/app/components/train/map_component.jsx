import React from "react";

import bluedot from '../../../images/bluedot.png';

import trainRed from '../../../images/trainRed.png';
import trainBlue from '../../../images/trainBlue.png';

import TrainAIR from '../../../images/TrainAIR.png';
import TrainVAIR from '../../../images/TrainVAIR.png';
import TrainB from '../../../images/TrainB.png';
import TrainBDefault from '../../../images/TrainBDefault.png';
import TrainVDefault from '../../../images/TrainVDefault.png';
import TrainDefault from '../../../images/TrainDefault.png';
import TrainCHE from '../../../images/TrainCHE.png';
import TrainVCHE from '../../../images/TrainVCHE.png';
import TrainCHW from '../../../images/TrainCHW.png';
import TrainVCHW from '../../../images/TrainVCHW.png';
import TrainCYN from '../../../images/TrainCYN.png';
import TrainVCYN from '../../../images/TrainVCYN.png';
import TrainFOX from '../../../images/TrainFOX.png';
import TrainVFOX from '../../../images/TrainVFOX.png';
import TrainLAN from '../../../images/TrainLAN.png';
import TrainVLAN from '../../../images/TrainVLAN.png';
import TrainMED from '../../../images/TrainMED.png';
import TrainVMED from '../../../images/TrainVMED.png';
import TrainNOR from '../../../images/TrainNOR.png';
import TrainVNOR from '../../../images/TrainVNOR.png';
import TrainPAO from '../../../images/TrainPAO.png';
import TrainVPAO from '../../../images/TrainVPAO.png';
import TrainTRE from '../../../images/TrainTRE.png';
import TrainVTRE from '../../../images/TrainVTRE.png';
import TrainWAR from '../../../images/TrainWAR.png';
import TrainVWAR from '../../../images/TrainVWAR.png';
import TrainWIL from '../../../images/TrainWIL.png';
import TrainVWIL from '../../../images/TrainVWIL.png';
import TrainWTR from '../../../images/TrainWTR.png';
import TrainVWTR from '../../../images/TrainVWTR.png';

var mapMarkersArray = []; //makes an array of the markers you place on the map,
                          //it is ussd in clearMarkers().
var map;
var selectedInfoWindow = null;
var selectedMarkerID = null;

/*const DEFAULT_POSITION = {
  lat: 39.9526,
  lng: -75.1652 
};*/

class MapComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      trains: props.trains,
      //initiate state.trains
    }
    this.refreshMap = this.refreshMap.bind(this);
  };

  componentWillReceiveProps(nextProps){
    var trains = nextProps.trains;
    this.setState({
      trains: trains,
    });
    //console.log(nextProps.interval);
  };

  componentDidMount() {
    
    map = new google.maps.Map(this.refs.map, {
      //center: DEFAULT_POSITION,
      zoom: 10,
      mapTypeControl: false,
      gestureHandling: 'cooperative'
    });
    //console.log(this.map.getZoom());

    var myMarker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      icon: bluedot
      //position: DEFAULT_POSITION
    });
    this.addYourLocationButton(map, myMarker);

    /*//Hide the link of the Google logo
    google.maps.event.addListenerOnce(map, 'idle', function(){
      $("#map a").click(function(){
        return false;
      });
    });*/
    
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
      () => this.septaTrainView(),
      500
      );

    this.timeoutID2 = setTimeout(
      () => google.maps.event.addDomListener(window, 'load', this.initMap()),
      1000
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
  
  septaTrainView() {
    //console.log(ctaLayer.map.getZoom());
    google.maps.event.addListenerOnce(map, 'zoom_changed', function() {
      var width = window.innerWidth;
      if (width <= 425){
        // set the zoom level to 9.
        map.setZoom(9);
      }else{
        // set the zoom level to 10.
        map.setZoom(10);
      }
      //map.setCenter(DEFAULT_POSITION);
    });

    var ctaLayer = new google.maps.KmlLayer({
      url: 'https://www3.septa.org/api/TrainView/regionalrail.kml',
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
    var markersIcon = [];//makes an array of the line, consist and trainno of the position

    //Map the trains to get the makersIcon[] & markers[]
    {this.state.trains.map(function(train,i){
      var lateMessage;
      if((train.late) =='0'){
        lateMessage = 'On Time';
      }else if((train.late) =='999'){
        lateMessage = 'Suspended';
      }else{
        lateMessage = train.late;
      }

      return(
        markersIcon[i] = {line: train.line, consist: train.consist,
          source: train.SOURCE, dest: train.dest,
          trainNo: train.trainno, nextStop: train.nextstop,
          late: lateMessage},
          markers[i] = {lat:train.lat, lng:train.lon}
          )
    })}

    //Marks the positions
    //for loop begins    
    for(var i = 0; i < markers.length; i++){
      var markerPosition = markers[i];// Only need lat & lng here.
      var markerIcon = markersIcon[i];// Only need line, consist and trainno here.
      //console.log(markerIcon);

      //Icon begin here
      var icon = '';
      var modifier = '';
      if(markerIcon.consist && markerIcon.consist.toUpperCase().indexOf("TBD") == -1 ){
        var carNo = markerIcon.consist.split(",");
        switch ( parseInt(carNo[0] / 100) ) {
          case 1:
          case 2:
          case 3:
          case 4:
          break;
          case 7:
          case 8:
          modifier = 'V';
          break;
          default:
          modifier = 'B';
        }
        if ( modifier == 'B' )
          {icon = TrainB}
        else{
          switch ( markerIcon.line ) 
          {
            case 'Warminster':
            icon = TrainVWAR ;
            break;
            case 'Cynwyd':
            icon = TrainVCYN;
            break;
            case 'West Trenton':
            icon = TrainVWTR;
            break;
            case 'Fox Chase':
            icon = TrainVFOX;
            break;
            case 'Lansdale\/Doylestown':
            icon = TrainVLAN;
            break;
            case 'Chestnut Hill West':
            icon = TrainVCHW;
            break;
            case 'Chestnut Hill East':
            icon = TrainVCHE;
            break;
            case 'Media\/Elwyn':
            icon = TrainVMED;
            break;
            case 'Manayunk\/Norristown':
            icon = TrainVNOR;
            break;
            case 'Wilmington\/Newark':
            icon = TrainVWIL;
            break;
            case 'Trenton':
            icon = TrainVTRE;
            break;
            case 'Paoli\/Thorndale':
            icon = TrainVPAO;
            break;
            case 'Airport':
            icon = TrainVAIR;
            break;
            default:
            icon = TrainVDefault;
          }
        }
      }
      else
      {
      if ( markerIcon.trainNo % 2 ) // Even
        icon = trainRed;
      else
        icon = trainBlue;
    }
      //icon end here


      this.marker = new google.maps.Marker({
        position: {lat: parseFloat(markerPosition.lat), lng: parseFloat(markerPosition.lng)},
        map: map,
          //animation: google.maps.Animation.DROP,
          icon: icon
        });

      // It is used to show message
      var m;
      if((markerIcon.late)==1){
        m = ' min';
      }else{
        m = ' mins';
      }

      var lateM;
      if((markerIcon.late != 'On Time') && (markerIcon.late != 'Suspended')){
        lateM = m + ' late &#10071;';
      }else if (markerIcon.late == 'On Time'){
        lateM = ' &#128077;';
      }else{
        lateM = ' &#10071;&#9889;';
      }

      var message = '<div id = "content">' +
      "Train #: " + markerIcon.trainNo + "&nbsp;&nbsp;&nbsp;&nbsp;" +
      "Next Stop: " + markerIcon.nextStop + '<br/>' +
      "Origin: " + markerIcon.source +"&nbsp;&nbsp;&rArr;&nbsp;&nbsp;"+
      "Dest.: " + markerIcon.dest + '<br/>' +
      "Status: " + markerIcon.late + lateM +
      '</div>';

      mapMarkersArray[i] = this.marker;   
      
      this.attachMessage(this.marker, message, markerIcon.trainNo);//Call the method show message
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

  render() {

    const buttonStyle = {
      top: '6px',
      right: '1px',
      position: 'absolute',
      visibility: 'hidden'
    }

    return (
      <div id ="mapUpdate">
      <button className ='btn btn-primary' id="refresh" style ={buttonStyle} 
      onClick={this.refreshMap}>Refresh the Map (it's hidden)</button>
      <div ref="map" id="map">I should be a map!</div>
      </div>
      );
  }
}

export default MapComponent;
