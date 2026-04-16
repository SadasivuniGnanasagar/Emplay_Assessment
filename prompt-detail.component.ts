import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PromptService } from '../../services/prompt.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prompt-detail.component.html'
})
export class PromptDetailComponent implements OnInit {

  prompt: any;

  constructor(
    private route: ActivatedRoute,
    private service: PromptService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.service.getPrompt(id).subscribe(data => {
      this.prompt = data;
    });
  }
}