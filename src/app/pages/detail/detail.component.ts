import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Response} from '../../models/response.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  fromRoute: string = 'list'; 
  book!: Response;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const from = params.get('from');
      console.log('Query Param from:', from);
      if (from) this.fromRoute = from;
    });
    
    const id = this.route.snapshot.paramMap.get('id')!;
    // this.fromRoute = this.route.snapshot.queryParamMap.get('from') || 'list';
    // console.log('detail page work', id)
    this.apiService.getBookById(id).subscribe(data => {
      // console.log('detail page api', data)
      this.book = data;
    });
  }
}