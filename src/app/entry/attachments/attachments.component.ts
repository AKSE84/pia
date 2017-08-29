import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Pia } from '../pia.model';
import { Attachment } from './attachment.model';

import { AttachmentsService } from 'app/entry/attachments/attachments.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit {

  @Input() pia: Pia;
  attachmentForm: FormGroup;
  dispplayAttachmentButton = false;

  constructor(private activatedRoute: ActivatedRoute,
              private _attachmentsService: AttachmentsService) { }

  ngOnInit() {
    this.attachmentForm = new FormGroup({
      attachment_file: new FormControl('', [])
    });
    this._attachmentsService.pia = this.pia;
    this._attachmentsService.listAttachments();
    this.dispplayAttachmentButton = (this.pia.status !== 2 && this.pia.status !== 3);
  }

  /**
   * Allows users to add attachments to a PIA.
   */
  addAttachment() {
    // This attachment is a simple attachment
    this._attachmentsService.pia_signed = 0;
    const attachment: any = document.querySelector('[formcontrolname="attachment_file"]');
    attachment.click();
  }

  /**
   * Allows users to upload an attachment for a specific PIA.
   * @param {event} event : any kind of event.
   */
  uploadAttachement(event: any) {
    this._attachmentsService.upload(event.target.files[0]);
  }
}
