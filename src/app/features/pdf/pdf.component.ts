import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {

  @Input() url: string;

  constructor(private dom:DomSanitizer) { }

  ngOnInit(): void {
  }

  public get urlValue() : any {
    return this.dom.bypassSecurityTrustResourceUrl(this.url);
  }


}
