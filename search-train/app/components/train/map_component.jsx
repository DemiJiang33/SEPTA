import React from "react";

var mapMarkersArray = []; //makes an array of the markers you place on the map,
                          //it is ussd in clearMarkers().
//var interval = "10000"; //the default value of interval 

var map;
//var handleID = null;
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
      show: false
    }
    this.septaTrainView = this.septaTrainView.bind(this);
    this.initMap = this.initMap.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    this.displayLocation = this.displayLocation.bind(this);
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
    if(window.innerWidth<768){
      this.setState({show: true});
    }else{
      this.setState({show: false});
    }

    map = new google.maps.Map(this.refs.map, {
      //center: DEFAULT_POSITION,
      zoom: 10,
      mapTypeControl: false,
      gestureHandling: 'greedy'
    });
    //console.log(this.map.getZoom());

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
      15000 // update every 15 second as default
      );

  }

  componentWillUnmount(){
    clearInterval(this.handleID);
    clearTimeout(this.timeoutID1);
    clearTimeout(this.timeoutID2);
    clearTimeout(this.refreshMapID);
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
      url: 'http://www3.septa.org/api/TrainView/regionalrail.kml',
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
      var imageStr = '';
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
        imageStr = 'Train';
        if ( modifier == 'B' )
          {imageStr += modifier + ".png";}
        else{
          switch ( markerIcon.line ) 
          {
            case 'Warminster':
            imageStr += modifier + 'WAR.png';
            break;
            case 'Cynwyd':
            imageStr += modifier + 'CYN.png';
            break;
            case 'West Trenton':
            imageStr += modifier + 'WTR.png';
            break;
            case 'Fox Chase':
            imageStr += modifier + 'FOX.png';
            break;
            case 'Lansdale\/Doylestown':
            imageStr += modifier + 'LAN.png';
            break;
            case 'Chestnut Hill West':
            imageStr += modifier + 'CHW.png';
            break;
            case 'Chestnut Hill East':
            imageStr += modifier + 'CHE.png';
            break;
            case 'Media\/Elwyn':
            imageStr += modifier + 'MED.png';
            break;
            case 'Manayunk\/Norristown':
            imageStr += modifier + 'NOR.png';
            break;
            case 'Wilmington\/Newark':
            imageStr += modifier + 'WIL.png';
            break;
            case 'Trenton':
            imageStr += modifier + 'TRE.png';
            break;
            case 'Paoli\/Thorndale':
            imageStr += modifier + 'PAO.png';
            break;
            case 'Airport':
            imageStr += modifier + 'AIR.png';
            break;
            default:
            imageStr += modifier + 'Default.png';
          }
        }
      }
      else
      {
      if ( markerIcon.trainno % 2 ) // Even
        imageStr = 'trainRed.png';
      else
        imageStr = 'trainBlue.png';
    }

    icon ='../images/' + imageStr; 
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

  displayLocation(){
    //Display the geographic location of a user or device
    var infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      //Only show one info window
      if (selectedInfoWindow != null && selectedInfoWindow.getMap() != null) {
        selectedInfoWindow.close();
        if (selectedInfoWindow == infoWindow) {
          selectedInfoWindow = null;
          return;
        }
      }
      selectedInfoWindow = infoWindow;

      // Try HTML5 geolocation.
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
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

        google.maps.event.addListener(map, 'click', function () {
          infoWindow.close();
          selectedInfoWindow = null;
        });
      }

  /*handleChange(event) { 
    interval = event.target.value;
    clearInterval(handleID);
    handleID = setInterval(
      () => this.initMap(),
      interval // update every 10 second
      );
    }*/

    render() {

      const buttonStyle = {
        top: '40px',
        right: '20px',
        position: 'absolute',
        visibility: this.state.show ? 'visible' : 'hidden'
      }
      
      return (
        <div id ="mapUpdate">
        {/*<button onClick={this.septaTrainView}>Refresh the Train View</button>
        &nbsp;&nbsp;
        <button onClick={this.clearMarkers}>Clear the Train Marker</button>
        &nbsp;&nbsp;*/}
        <button onClick={this.displayLocation}>Display My Location</button>
        &nbsp;&nbsp;
        <button className ='btn btn-primary' id="refresh" style ={buttonStyle} 
        onClick={this.refreshMap}>Refresh the Map</button>
        {/*<label>
          Hint: Click somewhere else to close infoWindow.
        </label>
        <label>
        Update Interval:&nbsp;  
        <select onChange ={this.handleChange}>
        <option value="10000">10 Second </option>
        <option value="20000">20 Second </option>
        <option value="30000">30 Second</option>
        <option value="60000">60 Second</option>
        </select>
        </label>*/}
        <div ref="map" id="map">I should be a map!</div>
        </div>
        );
    }
  }

  export default MapComponent;
