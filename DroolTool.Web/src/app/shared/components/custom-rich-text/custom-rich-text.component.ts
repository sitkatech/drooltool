import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../models/alert';
import { AlertContext } from '../../models/enums/alert-context.enum';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';
import { CustomRichTextDto, CustomRichTextService, UserDto } from '../../generated';
import { Observable } from 'rxjs';

@Component({
  selector: 'drooltool-custom-rich-text',
  templateUrl: './custom-rich-text.component.html',
  styleUrls: ['./custom-rich-text.component.scss']
})
export class CustomRichTextComponent implements OnInit {
  @Input() customRichTextTypeID: number;
  public customRichTextContent: string;
  public isLoading: boolean = true;
  public isEditing: boolean = false;
  public isEmptyContent: boolean = false;
  
  public Editor = ClassicEditor;
  public editedContent: string;
  public editor;

  currentUser: UserDto;

  public ckConfig = {"removePlugins": ["MediaEmbed"]}

  constructor(
    private customRichTextService: CustomRichTextService,
    private authenticationService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
    //window.Editor = this.Editor;

    this.customRichTextService.customRichTextCustomRichTextTypeIDGet(this.customRichTextTypeID).subscribe(x => {
      this.customRichTextContent = x.CustomRichTextContent;
      this.isEmptyContent = x.IsEmptyContent;
      this.isLoading = false;
    });
  }

  // tell CkEditor to use the class below as its upload adapter
  // see https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html#how-does-the-image-upload-work
  public ckEditorReady(editor) {
    const customRichTextService = this.customRichTextService
    this.editor = editor;

    console.log(this.Editor.builtinPlugins.map( plugin => plugin.pluginName ));

    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      // disable the editor until the image comes back
      editor.isReadOnly = true;
      return new CkEditorUploadAdapter(loader, customRichTextService, environment.apiHostName, editor);
    };
  }

  public showEditButton(): boolean {
    return this.authenticationService.isUserAnAdministrator(this.currentUser);
  }

  public enterEdit(): void {
    this.editedContent = this.customRichTextContent;
    this.isEditing = true;
  }

  public cancelEdit(): void {
    this.isEditing = false;
  }

  public saveEdit(): void {
    this.isEditing = false;
    this.isLoading = true;
    const updateDto = new CustomRichTextDto({ CustomRichTextContent: this.editedContent });
    console.log(updateDto);
    this.customRichTextService.customRichTextCustomRichTextTypeIDPut(this.customRichTextTypeID, updateDto).subscribe(x => {
      this.customRichTextContent = x.CustomRichTextContent;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.alertService.pushAlert(new Alert("There was an error updating the rich text content", AlertContext.Danger, true));
    });
  }
  
  public isUploadingImage():boolean{
    return this.editor && this.editor.isReadOnly;
  }

}

class CkEditorUploadAdapter {
  loader;
  service: CustomRichTextService;
  apiUrl: string;
  editor;

  constructor(loader, uploadService: CustomRichTextService, apiUrl: string, editor) {
    // The file loader instance to use during the upload.
    this.loader = loader;
    this.service = uploadService;
    this.apiUrl = apiUrl;
    this.editor = editor;
  }

  // Starts the upload process.
  upload() {
    const editor = this.editor;
    const service = this.service;


    //return this.loader.file.then(file => new Promise((resolve, reject) => {
    //   service.uploadFile(file).subscribe(x => {
    //     const imageUrl = `https://${this.apiUrl}${x.imageUrl}`;
    //     editor.isReadOnly = false;

    //     resolve({
    //       // todo: this should be correct instead of incorrect.
    //       default: imageUrl
    //     });
    //   }, error => {
    //     editor.isReadOnly = false;

    //     reject("There was an error uploading the file. Please try again.")
    //   });
    // })
    // );
  
}

  // Aborts the upload process.
  abort() {
    // NP 4/23/2020 todo? I'm not sure this is actually necessary, I don't see any way for the user to cancel the upload once triggered.
  }
  uploadFile(file: any): Observable<any> {
    // const apiHostName = environment.apiHostName
    // const route = `https://${apiHostName}/FileResource/CkEditorUpload`;
    // var result = this.httpClient.post<any>(
    //   route,
    //   file, // Send the File Blob as the POST body.
    //   {
    //     // NOTE: Because we are posting a Blob (File is a specialized Blob
    //     // object) as the POST body, we have to include the Content-Type
    //     // header. If we don't, the server will try to parse the body as
    //     // plain text.
    //     headers: {
    //       "Content-Type": file.type
    //     },
    //     params: {
    //       clientFilename: file.name,
    //       mimeType: file.type
    //     }
    //   }
    // );

    return;
  }
}
