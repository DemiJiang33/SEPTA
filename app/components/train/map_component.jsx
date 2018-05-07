import React from "react";
import {withRouter} from "react-router-dom";
import bluedot from '../../../images/bluedot.png';
import trainRed from '../../../images/trainRed.png';
import trainBlue from '../../../images/trainBlue.png';

var mapMarkersArray = []; //makes an array of the markers you place on the map,
                          //it is ussd in clearMarkers().
var map;
var selectedInfoWindow = null;
var selectedMarkerID = null;
var ctaLayer;

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

    var url;
    var pathArray = this.props.location.pathname.split( 'regionalrail/' );
    var line = pathArray[1];
    switch ( line ) 
    {
      case 'Warminster':
      url = 'https://www3.septa.org/api/TrainView/WAR.kml';
      break;
      case 'Cynwyd':
      url = 'https://www3.septa.org/api/TrainView/CYN.kml';
      break;
      case 'West Trenton':
      url = 'https://www3.septa.org/api/TrainView/WTR.kml';
      break;
      case 'Fox Chase':
      url = 'https://www3.septa.org/api/TrainView/FOX.kml';
      break;
      case 'Lansdale\/Doylestown':
      url = 'https://www3.septa.org/api/TrainView/LAN.kml';
      break;
      case 'Chestnut Hill West':
      url = 'https://www3.septa.org/api/TrainView/CHW.kml';
      break;
      case 'Chestnut Hill East':
      url = 'https://www3.septa.org/api/TrainView/CHE.kml';
      break;
      case 'Media\/Elwyn':
      url = 'https://www3.septa.org/api/TrainView/MED.kml';
      break;
      case 'Manayunk\/Norristown':
      url = 'https://www3.septa.org/api/TrainView/NOR.kml';
      break;
      case 'Wilmington\/Newark':
      url = 'https://www3.septa.org/api/TrainView/WIL.kml';
      break;
      case 'Trenton':
      url = 'https://www3.septa.org/api/TrainView/TRE.kml';
      break;
      case 'Paoli\/Thorndale':
      url = 'https://www3.septa.org/api/TrainView/PAO.kml';
      break;
      case 'Airport':
      url = 'https://www3.septa.org/api/TrainView/AIR.kml';
      break;
      case 'Glenside Combined':
      url = 'https://www3.septa.org/api/TrainView/GC.kml';
      break;
      default:
            url = 'https://www3.septa.org/api/TrainView/regionalrail.kml';
          }

    ctaLayer = new google.maps.KmlLayer({
      url: url,
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
          heading: train.heading,
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
      //console.log(markerIcon.heading);

      //Icon begin here
      var iconColor = '';
          switch ( markerIcon.line ) 
          {
            case 'Warminster':
            iconColor = "F7AF42" ;
            break;
            case 'Cynwyd':
            iconColor = "6F549E";
            break;
            case 'West Trenton':
            iconColor = "5D5EBC";
            break;
            case 'Fox Chase':
            iconColor = "FF823D";
            break;
            case 'Lansdale\/Doylestown':
            iconColor = "775B49";
            break;
            case 'Chestnut Hill West':
            iconColor = "00B4B2";
            break;
            case 'Chestnut Hill East':
            iconColor = "94763C";
            break;
            case 'Media\/Elwyn':
            iconColor = "007CC8";
            break;
            case 'Manayunk\/Norristown':
            iconColor = "EE4C69";
            break;
            case 'Wilmington\/Newark':
            iconColor = "8AD16B";
            break;
            case 'Trenton':
            iconColor ="F683C9";
            break;
            case 'Paoli\/Thorndale':
            iconColor = "20825C";
            break;
            case 'Airport':
            iconColor = "91456C";
            break;
            default:
            iconColor = "00539F";//blue
          }
      var circleArrow;
      if(markerIcon.heading == null){
        circleArrow = '<path class="st0" d="M71,61c1.2,0,2.2-1,2.2-2.2v-6.5c0-1.2-1-2.2-2.2-2.2h-6c-1.2,0-2.2,1-2.2,2.2v6.5c0,1.2,1,2.2,2.2,2.2H71z"/>';
      }else{
        var angle = markerIcon.heading + 180;
        circleArrow = '<path class="st0" d="M1.7,69.3c0,22.2,10.7,41.9,27.3,54.1c0.2,0.3,36.6,41.8,36.6,41.8c1.9,1.9,5.1,1.9,7,0    c0,0,36.4-41.5,36.6-41.8c16.5-12.3,27.3-32,27.3-54.1c0-37.2-30.2-67.4-67.4-67.4S1.7,32.1,1.7,69.3z" transform="rotate(' + angle + ' 68.8 69.1)"/>'; 
      }
      var iconUrl = 'data:image/svg+xml;utf-8, <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width="40" height="46" viewBox="-30 0 199.8 169.8" xml:space="preserve">  <style type="text/css">   .st0{fill:%23' + iconColor + ';}  .st1{fill:%23FFFFFF;stroke:%23' + iconColor + ';stroke-width:4.6757;stroke-miterlimit:10;}  .st2{fill:%23414042;} </style> <g> ' + circleArrow + '<circle class="st1" cx="68.8" cy="69.1" r="63"/> </g> <g> <path class="st2" d="M88.3,91.1v-2.3h2.2l5.1-11.1v-33H41.1v33l5.1,11h2.4V91h3.8v-3.9h1.9l2.5-4.1v-4h3.3l0.2-29.7    c0.1-1,0.6-0.9,2.2-1c0.2,0,4,0,11.5,0c1.7,0,2.4-0.2,2.4,1.3V79h3.3v4l2.6,4.1h2.1V91L88.3,91.1L88.3,91.1z M47.3,59.9    c-0.5,0-0.8-0.5-0.8-0.9V49c0-0.4,0.4-0.6,0.8-0.6h8.1c0.4,0,0.8,0.2,0.8,0.6v9.9c0,0.5-0.3,0.9-0.8,0.9L47.3,59.9L47.3,59.9z    M54.4,73.2c-1.4,0-2.6-1.2-2.6-2.6S53,68,54.4,68s2.6,1.2,2.6,2.6S55.9,73.2,54.4,73.2z M81.8,73.1c-1.4,0-2.6-1.2-2.6-2.6    s1.2-2.6,2.6-2.6s2.6,1.2,2.6,2.6C84.5,71.9,83.3,73.1,81.8,73.1z M80.5,60c-0.5,0-0.8-0.5-0.8-0.9v-9.9c0-0.4,0.4-0.6,0.8-0.6h8.1    c0.4,0,0.8,0.2,0.8,0.6V59c0,0.5-0.3,0.9-0.8,0.9L80.5,60L80.5,60z"/>    <path class="st2" d="M93.7,37.7c-3.5-2.2-6.4-2.7-12.4-3.7l-11.8-1v-4.7h1.1v-3.8h-1.1v-2.2l4,0.1c-0.4-0.1,5.2,0.6,7.2,1.9    c0.3,0.2,0.7,0.5,1,0.2c0.1-0.2,1.7-1.9,1.7-1.9c-1.1-1.4-2.7-2.8-3.1-2.9l-6.8-1.1H62.9l-5.6,1.1c-0.2,0-3.1,2.7-3,3.1    c0,0,1.6,2,1.7,2c0,0,0.3-0.1,0.8-0.4c1.9-1,3.8-1.6,5.8-1.7l4.6-0.2v2.2h-1.3v3.8h1.3V33l-13.5,1c-2.4,0.4-7.6,0.7-10.9,3.8    c-1.5,1.4-1.6,5.5-1.7,5.5h54.5C95.7,43.3,95.5,38.8,93.7,37.7z M56.8,41.7h-9.3c0,0,0-1.1,0-2.1c0-0.9,0-1.1,0.9-1.4    c4.8-1.6,5.9-1.2,7.3-1.3c0.7,0,1.1,0.2,1.3,0.6L56.8,41.7z M76.8,39.6c0,1.2-1,2.2-2.2,2.2H62.4c-1.2,0-2.2-1-2.2-2.2v-1    c0-1.2,1-2.2,2.2-2.2h12.2c1.2,0,2.2,1,2.2,2.2C76.8,38.6,76.8,39.6,76.8,39.6z M89.3,41.7h-9.4v-4.1c0.1-0.4,0.6-0.6,1.3-0.6    c1.3,0,2.4-0.3,7.3,1.3c0.9,0.3,0.9,0.5,0.9,1.4C89.4,40.6,89.3,41.7,89.3,41.7z"/>    <path class="st2" d="M71,61c1.2,0,2.2-1,2.2-2.2v-6.5c0-1.2-1-2.2-2.2-2.2h-6c-1.2,0-2.2,1-2.2,2.2v6.5c0,1.2,1,2.2,2.2,2.2H71z"/>    <rect x="57.9" y="80.1" class="st2" width="20.7" height="4.1"/>    <path class="st2" d="M63.4,37.3c-0.9,0-1.7,0.8-1.7,1.7s0.8,1.7,1.7,1.7s1.7-0.8,1.7-1.7S64.4,37.3,63.4,37.3z"/>    <path class="st2" d="M73.7,37.4c-0.9,0-1.7,0.8-1.7,1.7s0.8,1.7,1.7,1.7c0.9,0,1.7-0.8,1.7-1.7C75.4,38.1,74.7,37.4,73.7,37.4z"/>    <path class="st2" d="M100.5,108.1l-3.3-5.5h-3.3l-1.7-2.9h3.3L92.6,95h-3.1l-0.9-1.5H84l0.8,1.5H52.4l0.8-1.5h-4.7L47.7,95h-3.1    l-2.8,4.7H45l-1.7,2.9H40l-3.3,5.5h3.6l-3,5.2h8.5l2.4-5.2H89l2.4,5.2h8.5l-3-5.2H100.5z M49.3,102.6l1.3-2.9h35.9l1.3,2.9H49.3z"/>    </g></svg>'

      var iconNew = {
        url: iconUrl,
        anchor: new google.maps.Point(20,23)
      }

      var iconOld = (markerIcon.trainNo % 2 == 0) ? trainRed : trainBlue
      //icon end here

      this.marker = new google.maps.Marker({
        position: {lat: parseFloat(markerPosition.lat), lng: parseFloat(markerPosition.lng)},
        map: map,
          //animation: google.maps.Animation.DROP,
          icon: ((navigator.userAgent.includes("Edge"))||(navigator.userAgent.includes("MS")))? iconOld : iconNew
        });

      //console.log(navigator.userAgent);
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

  reloadMap(){
    ctaLayer.setMap(null); 

    this.septaTransitViewID = setTimeout(
      () => this.septaTrainView(),
      100 // update once
      );

    this.refreshMapID = setTimeout(
      () => this.initMap(),
      500 // update once
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
      <button className ='btn btn-default btn-xs' id="reloadTrain"
      style={buttonStyle} 
      onClick={this.reloadMap.bind(this)}>Reload (it's hidden) </button>
      <div ref="map" id="map">I should be a map!</div>
      </div>
      );
  }
}

export default withRouter(MapComponent);
