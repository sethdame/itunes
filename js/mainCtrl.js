var app = angular.module('itunes');

app.controller('mainCtrl', function($scope, itunesService){
    
    
    $scope.gridOptions = { 
  data: 'songData',
  height: '110px',
  sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Type'], directions: ['asc']},
  columnDefs: [
            {field: 'Play', displayName: 'Play', width: '40px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
            {field: 'Artist', displayName: 'Artist'},
            {field: 'Title', displayName: 'Title'},
            {field: 'Collection', displayName: 'Album'},
            {field: 'AlbumArt', displayName: 'Album Art', width: '110px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'},
            {field: 'TrackNumber', displayName: 'Track Number'},
            {field: 'CollectionPrice', displayName: 'Collection Price'},
          ]
    };
    
    
    $scope.getSongData = function(name) {
  
  $scope.songData = [];
  
  return itunesService.getArtist(name).then(function(response){
      $scope.songData = response;     
  });
  
  };

  var parseData = function(searchInfo){
      $scope.theData = [];
      for(var i = 0; i < searchInfo.length; i++){
        var correctData = {};
        searchInfo[i].previewUrl && (correctData['Play'] = searchInfo[i].previewUrl);
        searchInfo[i].trackName && (correctData['Song'] = searchInfo[i].trackName);
        searchInfo[i].artistName && (correctData['Artist'] = searchInfo[i].artistName);
        searchInfo[i].collectionName && (correctData['Collection'] = searchInfo[i].collectionName);
        searchInfo[i].artworkUrl60 && (correctData['AlbumArt'] = searchInfo[i].artworkUrl100);
        searchInfo[i].kind && (correctData['Type'] = searchInfo[i].kind);
        searchInfo[i].trackPrice && (correctData['IndividualPrice'] = searchInfo[i].trackPrice);
        searchInfo[i].collectionPrice && (correctData['CollectionPrice'] = searchInfo[i].collectionPrice);
        $scope.theData.push(correctData);
      }
    }
});



