import { Component, OnInit } from '@angular/core';
import { Music } from '../music';
import { BddService } from '../bdd.service';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '../playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  // Variables
  content: Playlist;
  playListNo: number;

  // Intended to read Argument from the router corresponding to playlist id
  id: number;
  private sub: any;

  constructor(private bdd: BddService, private route: ActivatedRoute) { }


  // To display playlist
  getPlayList(id: number) {
    console.log('looking for that playList');
    const getUrl = this.bdd.getPlayList(id);

    getUrl.subscribe((data: any) => {
    this.content = data;
    console.log('playlists obtained from json-server');
    }, (error) => {
      this.bdd.handleError(error);
    });
  }

  // To delete the music in its playlist
  deleteMusic(music: Music) {
    // This code is indended to delete the music card from the display
    const i: number = this.content.playlist.indexOf(music);
    this.content.playlist.splice(i, 1);

    // This code delete the same object from the json server
    this.playListNo = this.content.id;
    this.bdd.delTitle(music, this.playListNo).subscribe((data: any) => {
      console.log('Delete request successfull');
    },
    (error: any) => {
      this.bdd.handleError(error);
    });
  }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      let intId: number;
      intId = Number(this.id);
      this. getPlayList(intId);
   });

  }

}
