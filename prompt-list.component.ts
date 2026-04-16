import { Component, OnInit } from '@angular/core';
import { PromptService } from '../../services/prompt.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // ✅ ADD THIS

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule, RouterModule],  // ✅ ADD HERE
  templateUrl: './prompt-list.component.html'
})
export class PromptListComponent implements OnInit {

  prompts: any[] = [];

  constructor(private service: PromptService) {}

  ngOnInit() {
    this.service.getPrompts().subscribe(data => {
      this.prompts = data;
    });
  }
}