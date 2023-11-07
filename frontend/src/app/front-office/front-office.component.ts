import { Component, OnInit, Renderer2 } from '@angular/core';
import { ScriptService } from '../services/script.service';
const SCRIPT_PATH_LIST =[
  "../../assets/front-office/js/main.js",
  "../../assets/front-office/lib/easing/easing.min.js",
  "../../assets/front-office/lib/owlcarousel/owl.carousel.min.js",
  "../../assets/front-office/mail/jqBootstrapValidation.min.js",
  "../../assets/front-office/mail/contact.js"
]
@Component({
  selector: 'app-front-office',
  templateUrl: './front-office.component.html',
  styleUrls: ['./front-office.component.css']
})
export class FrontOfficeComponent implements OnInit {

  constructor(private render:Renderer2,
    private ScriptServiceService:ScriptService) { }

  ngOnInit(): void {
    SCRIPT_PATH_LIST.forEach(e=>{
      const scriptElement = this.ScriptServiceService.loadJsScript(this.render, e);
      scriptElement.onload = () => {
        console.log('loaded');
      }
      scriptElement.onerror = () => {
        console.log('Could not load the script!');
      }
    })
  }

}
