import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public resource: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.resource = this.activatedRoute.snapshot.paramMap.get('resource');    
  }

}
