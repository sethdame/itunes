var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
    
    this.getArtist = function(name){  
        var deferred = $q.defer();
        name = name.split(' ').join('+');
        $http({     
          method: 'JSONP',
          url: 'http://itunes.apple.com/search?term=' + name + '&callback=JSON_CALLBACK'      
            }).then(function(response){
                    response = response.data.results;
                    var songList = [];
                    for (var i = 0; i < response.length; i++){
                              var song = {};
                              song['AlbumArt'] = response[i]['artworkUrl60'];
                              song['Artist'] = response[i]['artistName'];
                              song['Title'] = response[i]['trackName'];
                              song['Collection'] = response[i]['collectionName'];
                              song['CollectionPrice'] = response[i]['collectionPrice'];
                              song['Play'] = response[i]['previewUrl'];
                              song['TrackNumber'] = response[i]['trackNumber'];
    
                              songList.push(song);
                    }

              deferred.resolve(songList);
    });
      return deferred.promise;
    };
});


