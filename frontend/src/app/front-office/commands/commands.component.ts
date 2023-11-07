import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';
import {CommandeService} from '../../services/commande.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Commandes} from '../../shared/models/Commandes';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit, OnDestroy {
  commands: any = [];
  private user: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private service: CommandeService,
              private router: Router
  ) {
  }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(environment.users))
    this.getMyCommands()

  }

  getMyCommands() {
    this.service.getMyCommands().subscribe((res: any) => {
      console.log(res)
      this.commands = res.data
    })

  }


  ngOnDestroy() {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
