import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PromptService } from '../../services/prompt.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-prompt',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-prompt.component.html'
})
export class AddPromptComponent implements OnInit {

  form: any;

  constructor(private fb: FormBuilder, private service: PromptService) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      complexity: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  submit() {
    this.service.createPrompt(this.form.value).subscribe(() => {
      alert("Prompt added!");
    });
  }
}