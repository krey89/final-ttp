$(document).ready(function(){

var target = document.getElementById('audio-id');

// Jukebox object
function Jukebox() {
	var index = 0;
	this.playlist = []; //playlist array
// add song to array
	this.add = function(newSong){
		this.playlist.push(newSong)
	}
// play mp3
	this.play = function(){
		target.setAttribute('src', this.playlist[index].url)
		target.play();
		document.getElementById("title-out").innerHTML = this.playlist[index].title;
		document.getElementById("artist-out").innerHTML = this.playlist[index].artist;
		document.getElementById("url-out").innerHTML = this.playlist[index].url;
	}
// pause
	this.pause = function(){
		target.pause();
	}
// stop
	this.stop = function(){
		target.load();
	}
// grab title, artist and url
	this.upload = function() {
		newSong = new Music(document.getElementById('title').value, document.getElementById('artist').value ,document.getElementById('url').value);
		this.add(newSong);
	}
// play previous song
	this.back = function(){
		index--
		if (index < 0) {
			 index = this.playlist.length - 1
		}
		juke.play();
	}
// play next song
	this.next = function(){
		index++
		if (index == this.playlist.length) {
			index = 0
		}
		juke.play()
	}
}
function Music(title, artist, url){
	this.title = title;
	this.artist = artist;
	this.url = url;
}
var juke = new Jukebox();
/*function juke(){
  this.jk = true
  Jukebox.apply(this, arguments);
}*/

$('#play').on('click', function(){
		  juke.play()
});

$('#pause').on('click', function(){
			juke.pause()
});

$('#stop').on('click', function(){
			juke.stop()
});

document.getElementById("back").onclick = function(){
	juke.back();
}
document.getElementById("next").onclick = function(){
	juke.next();
}
document.getElementById("add_song").onclick = function(){
	juke.upload();
}

var music1 = new Music("cute",'Johnny Sings-Alot',"audio/cute.mp3");
var music2 = new Music("dubstep", "Mr. Hipster", "audio/dubstep.mp3");
var music3 = new Music("epic",'This is Sparta',"audio/epic.mp3");
var music4 = new Music("funny", "Mr.Bamjo", "audio/funny.mp3");
juke.add(music1);
juke.add(music2);
juke.add(music3);
juke.add(music4);

});
