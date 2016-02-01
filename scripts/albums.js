// Example Album
var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/album_covers/01.png',
    songs: [
        { name: 'Blue', length: '4:26' },
        { name: 'Green', length: '3:14' },
        { name: 'Red', length: '5:01' },
        { name: 'Pink', length: '3:21'},
        { name: 'Magenta', length: '2:15'}
    ]
};

// Another Example Album
var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/album_covers/20.png',
    songs: [
        { name: 'Hello, Operator?', length: '1:01' },
        { name: 'Ring, ring, ring', length: '5:01' },
        { name: 'Fits in your pocket', length: '3:21'},
        { name: 'Can you hear me now?', length: '3:14' },
        { name: 'Wrong phone number', length: '2:15'}
    ]
};

var albumAlex = {
    name: 'Ferrari',
    artist: 'Dimes',
    label: 'Borghini',
    year: '2012',
    albumArtUrl: 'assets/album_covers/07.png',
    songs: [
        {name: '458', length:'4:58'},
        {name: '458', length:'4:58'},
        {name: '458', length:'4:58'},
        {name: '458', length:'4:58'},
        {name: '458', length:'4:58'},
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;

    var $row = $(template);

    var clickHandler = function() {
       // clickHandler logic
       var songNumber = $(this).attr('data-song-number');

       if (currentlyPlayingSong !== null) {
           // Revert to song number for currently playing song because user started playing new song.
           var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
           currentlyPlayingCell.html(currentlyPlayingSong);
       }
       if (currentlyPlayingSong !== songNumber) {
           // Switch from Play -> Pause button to indicate new song is playing.
           $(this).html(pauseButtonTemplate);
           currentlyPlayingSong = songNumber;
       } else if (currentlyPlayingSong === songNumber) {
           // Switch from Pause -> Play button to pause currently playing song.
           $(this).html(playButtonTemplate);
           currentlyPlayingSong = null;
       }
   };

    var onHover = function(event) {
        // Placeholder for function logic
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
            }
    };
    var offHover = function(event) {
        // Placeholder for function logic
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    // #2
    $row.hover(onHover, offHover);
    // #3
    return $row;
};

var $albumTitle = $('.album-view-title');
var $albumArtist = $('.album-view-artist');
var $albumReleaseInfo = $('.album-view-release-info');
var $albumImage = $('.album-cover-art');
var $albumSongList = $('.album-view-song-list');


var setCurrentAlbum = function(album) {
    // #2
    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    // #3
    $albumSongList.empty();

    // #4
    for (i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 var currentlyPlayingSong = null;

 $(document).ready(function() {
    setCurrentAlbum(albumPicasso);
});

    var albums = [albumPicasso, albumMarconi, albumAlex];
    var index = 1;
    albumImage.addEventListener('click', function(event) {
        setCurrentAlbum(albums[index]);
        index ++;
        if(index == albums.length) {
            index = 0;
        }
    });
