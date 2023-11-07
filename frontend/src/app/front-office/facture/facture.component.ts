import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product';
import { User } from '../../shared/models/user';
import {CommandeService} from '../../services/commande.service';
import {Commandes} from '../../shared/models/Commandes';
import {FactureService} from '../../services/facture.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  @ViewChild('htmlData') htmlData!:ElementRef;
  product:Product;
  user:User;
  commande:number;
  public Com:any;
  constructor(private route:ActivatedRoute,private service:FactureService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{

        console.log(params);


        this.service.getFacture(params.idFacture).subscribe((Response:Commandes)=>{
          console.log(Response);
          this.Com=Response;
        });
      }
      );
  }

  public downloadPDF():void {
    let data = this.htmlData.nativeElement;
    let options : any = {
      orientation: 'p',
      unit: 'px',
      format: 'a4',
      };
    let doc = new jsPDF(options);
     doc.html(data.innerHTML, {
      callback: function (doc) {
            doc.save("angular-demo.pdf");
          },
      margin:15,
      x: 10,
      y: 10
    });
  }

  saveAs(pdf1: string) {

  }
  print() {
    const printContents = document.getElementById('print-section').innerHTML;
    const a = window.open('', '');
    a.document.write(printContents);
    a.document.close();
    a.print();
    a.close();
  }
}

