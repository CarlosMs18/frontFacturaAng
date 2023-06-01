import {ScriptsService } from '../services/scripts.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  constructor(

    private scriptService :ScriptsService
  ){
    this.scriptService.loadScript();
  }
}
