import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../shared/modelo/usuario';
import { UsuarioService } from '../shared/services/usuario.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario>;

  displayedColumns: string[] = ['name', 'cpf', 'idade', 'acoes'];

  constructor (private usuarioService: UsuarioService, private roteador: Router){
    this.dataSource = new  MatTableDataSource();
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      UsuarioRetornado => 
      {this.dataSource.data = UsuarioRetornado});
    console.log('iu');
    
  }

  filtrar(texto: string): void{
    this.dataSource.filter = texto.trim().toLowerCase();
  } 

  editar(usuario: Usuario): void {
    console.log('editando');
    this.roteador.navigate(['/editausuario', usuario.id]);
  }

  apagar(usuarioARemover: Usuario): void {
    console.log('to aqui...')
    if (usuarioARemover.id) {
      this.usuarioService.apagar(usuarioARemover.id).subscribe(
        usuarioRemovido => {
          const indx = this.dataSource.data.findIndex(usuario =>
          usuario.id === usuarioARemover.id);   
          this.dataSource.data.splice(indx, 1);
          this.ngOnInit();
        }
      );
    }
  }
}
