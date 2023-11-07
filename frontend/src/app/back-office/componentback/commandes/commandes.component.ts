import {Component, OnInit} from '@angular/core';
import {CategorieService} from '../../../services/categorie.service';
import {CommandeService} from '../../../services/commande.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  commandsList: any;

  constructor(private commandService: CommandeService) {
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.commandService.getAllCommandes().subscribe(res => {
      this.commandsList = res
    })
  }

  delete(commande: any, i) {
    this.commandService.deleteCommande(commande.id).subscribe(res => {
      this.commandsList.splice(commande.id, 1)
      return res
    })

  }

  accepter(command: any) {
    this.commandsList = []
    this.commandService.accepterCommande(command.id).subscribe(res => {
      this.getAll()
      return res
    })

  }

  refuser(command: any) {
    this.commandsList = []

    this.commandService.refuserCommande(command.id).subscribe(res => {
      this.getAll()
      return res
    })

  }
}
