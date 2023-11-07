import { Component, OnInit, Renderer2 } from '@angular/core';
import { ScriptService } from '../services/script.service';
const SCRIPT_PATH_LIST =[

    "../assets/back-office/src/bootstrap/js/bootstrap.bundle.min.js",
    "../assets/back-office/src/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js",
    "../assets/back-office/src/plugins/src/mousetrap/mousetrap.min.js",
    "../assets/back-office/layouts/vertical-dark-menu/app.js",
    "../assets/back-office/src/plugins/src/apex/apexcharts.min.js",
    "../assets/back-office/src/assets/js/dashboard/dash_1.js"
]
@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent implements OnInit {

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
