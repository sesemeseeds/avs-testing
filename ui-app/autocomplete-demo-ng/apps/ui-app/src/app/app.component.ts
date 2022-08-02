import { Component } from '@angular/core';

@Component({
  selector: 'autocomplete-demo-ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ui-app';
  public searchAutocomplete = '';
  public searchAutocompleteResult: Array<any> = [];
  public seriesList: Array<any> = [
      {
        "name": "Prison Break",
        "description": "Structural Engineer Michael Scofield turns himself into the Fox River Penitentiary in order to break out his brother Lincoln Burrows, who is on death row for the murder of the Vice President's brother. But Lincoln was set up by some of the Company (an agency formed by corrupt government officials) guys, headed by General Jonathan Krantz. Michael breaks out from Fox River with his brother Lincoln and other convicts.",
        "genres": "Action, Crime, Drama, Mystery, Thriller",
        "releaseDate": "29 August 2005 (USA)"
      },
      {
        "name": "Vikings",
        "description": "The adventures of Ragnar Lothbrok: the greatest hero of his age. The series tells the saga of Ragnar's band of Viking brothers and his family as he rises to become King of the Viking tribes. As well as being a fearless warrior, Ragnar embodies the Norse traditions of devotion to the gods: legend has it that he was a direct descendant of Odin, the god of war and warriors.",
        "genres": "Action, Drama, History, War",
        "releaseDate": "3 March 2013 (USA)"
      },
      {
        "name": "Person of Interest",
        "description": "A billionaire software-genius named Harold Finch creates a Machine for the government that is designed to detect acts of terror before they can happen, by monitoring the entire world through every cell-phone, email and surveillance camera. Finch discovered that the machine sees everything, potential terrorist acts and violent crimes that involve ordinary people.",
        "genres": "Action, Drama, Mystery, Sci-Fi, Thriller",
        "releaseDate": "22 September 2011 (USA)"
      }
    ];

    constructor() {}

    fetchAddressAutocomplete(event: any) {
      if (event.target.value === '') {
        return this.searchAutocompleteResult = [];
      }
      this.searchAutocompleteResult = this.seriesList.filter((series) => {
        return series.name.toLowerCase().startsWith(event.target.value.toLowerCase());
      })
      return;
    }

    
}
