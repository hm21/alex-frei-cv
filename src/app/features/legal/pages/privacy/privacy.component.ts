import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageMetaData } from 'src/app/core/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { ToastService } from 'src/app/ui/toast/services/toast.service';
@Component({
  selector: 'af-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  animations: [
    trigger('openClose', [
      state('true', style({ height: '*', opacity: 1, margin: '20px 0' })),
      state('false', style({ height: '0px', opacity: 0, margin: '0' })),
      transition('false <=> true', animate('150ms ease')),
    ]),
    trigger('dropdownRotate', [
      state('true', style({ transform: 'rotate(180deg)' })),
      state('false', style({ transform: 'rotate(0deg)' })),
      transition('false <=> true', animate('300ms ease')),
    ]),
  ],
  imports: [NgTemplateOutlet, RouterLink],
})
export class PrivacyComponent extends ExtendedComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);

  protected override pageMeta: PageMetaData = {
    title: `Privacy`,
    description: `Privacy from the CV from Alex Frei`,
  };

  public items: ItemI[] = [
    {
      id: 'responsibleForPrivacy',
      title: `Responsible for data privacy`,
      text: `Alex Frei
      <br/>
      Hüttisbühl 2771
      <br/>
      9642 Ebnat-Kappel
      <br/>
      Schweiz
      <br/>
      Further contact information can be found in our <a target="_blank" href=https://alex-frei.web.app/imprint>imprint</a>.`,
      visible: false,
    },
    {
      id: 'contact',
      title: `Contact`,
      text: `On this website you have the possibility to contact us quickly electronically via the contact form.
      <br/><br/> 
      If you contact us using the mentioned option, the personal data you provide will be stored for 
      the duration of the exchange (if necessary). Once the exchange is completed, this data will be deleted immediately.
      <br/><br/> 
      Additionally, you can contact us via email or postal mail. You can find our contact details in our 
      <a target="_blank" href="https://alex-frei.web.app/imprint">imprint</a>. 
      If you need to send highly sensitive data or information, we recommend using postal mail, 
      as complete data security via email cannot be guaranteed.`,
      visible: false,
    },
    {
      id: 'securityOfData',
      title: `Data security`,
      text: `
      To ensure a high level of data security, all data is transmitted and stored in encrypted form. 
      We use encryption based on the Transport Layer Security (TLS) encryption protocol for data transmission.
      <br/><br/> 
      When sending very sensitive data or information, it is advisable to use the postal service, as complete data security cannot be guaranteed by e-mail. 
      cannot be guaranteed by e-mail.`,
      visible: false,
    },
   {
      id: 'logfiles',
      title: `Logfiles`,
      text: `
       With each visit to our website, we automatically collect a range of general data and information.
      <br/><br/> 
      Log files are stored separately from all personal data and deleted after a maximum of 30 days. 
      The collected data/information is analyzed with the aim of optimizing data privacy and security 
      within our website and ensuring an optimal level of privacy for you.
      <br/><br/> 
      This constitutes a legitimate interest in accordance with Art. 6 (1) lit. f GDPR.
      <br/><br/> 
      <h4>Possible Collected Data</h4>
      <ul>
          <li>IP address</li>
          <li>Internet service provider</li>
          <li>Operating system used</li>
          <li>Browser type and version</li>
          <li>Date and time of website access</li>
          <li>Website previously visited by the user</li>
          <li>Other similar data/information that helps us prevent attacks on our systems.</li>
      </ul>
      <br/>
      <h4>Reasons for This Data Collection</h4>
      <ul>
          <li>Optimization of our content</li>
          <li>In the event of a cyberattack, we can provide the necessary information 
              to the responsible authorities for prosecution.
          </li>
      </ul>
      `,
      visible: false,
    }, /* 
    {
      id: 'rightsOfTheDataSubject',
      title: `Rights of the person concerned`,
      text: `
      You have the following rights regarding your personal data concerning us:
      <ul>
        <li>Right to information and access</li>
        <li>Right to rectification</li>
        <li>Right to erasure</li>
        <li>Right to restriction of processing</li>
        <li>Right to data portability</li>
        <li>Right to object to processing</li>
        <li>Automated individual decision-making, including profiling</li>
      </ul>
      
       You have the right not to be subject to a decision based solely on automated processing – including profiling – 
       that produces legal effects concerning you or similarly significantly affects you, unless the decision:
      <br/>
      (1) is necessary for entering into or performing a contract between you and us,  
      <br/>
      (2) is permitted by legal regulations of the Union or Member States to which we are subject and these legal regulations 
      include appropriate measures to safeguard your rights and freedoms as well as your legitimate interests, or  
      <br/>
      (3) is made with your explicit consent.  
      <br/><br/>
      However, such decisions must not be based on special categories of personal data under Article 9 (1) GDPR, 
      unless Article 9 (2) lit. a or g GDPR applies and appropriate measures have been taken to protect your rights, 
      freedoms, and legitimate interests.
      <br/><br/>
      In the cases mentioned in (1) and (3), the controller shall take appropriate measures to safeguard the rights and 
      freedoms as well as your legitimate interests, including at least the right to obtain human intervention by the controller, 
      to express your point of view, and to contest the decision.
      <br/><br/>
      <h4>Right to Object</h4>
      The data subject has the right to withdraw their consent to the processing of personal data at any time. 
      However, the withdrawal does not affect the lawfulness of the processing carried out before the withdrawal.
      <br/><br/>
      
      <h4>Right to Lodge a Complaint with a Supervisory Authority</h4>
      You have the right to lodge a complaint with a data protection supervisory authority if you believe 
      that we are not processing your personal data lawfully.
      `,
      visible: false,
    }, */
    {
      id: 'dataCollection',
      title: `Data collection`,
      text: '',
      table: 'dataUsage',
      visible: false,
    },
    {
      id: 'reasonProcessData',
      title: `For what reason may we process your data`,
      text: `
      If you contact us merely to request information, we may process your data based on your consent 
      under Article 6 (1) lit. a GDPR or Article 6 (1) lit. f GDPR.
      <br/><br/>
      The temporary storage of the IP address by the system is necessary to enable the delivery of the website to the user's computer. 
      The storage of the user's IP address is required for the duration of the session.
      <br/><br/>
      The storage in log files is carried out to ensure the functionality of the website. Additionally, 
      the data helps us optimize the website and ensure the security of our IT systems. 
      The data is not analyzed for marketing purposes.
      <br/><br/>
      Based on the legal grounds mentioned above, we may contact you by phone or email.
      `,
      visible: false,
    },
    {
      id: 'contactForms',
      title: `Contact form`,
      text: `
        If you submit your data to us via a contact form, you expressly consent to the processing of your data, 
        including the personal data you have provided, as well as any unsolicited and voluntarily provided special categories 
        of personal data, for the duration of handling your inquiry by us and the recipients mentioned above. 
        These data will either be deleted immediately after the communication ends or after an appropriate period 
        corresponding to the content has elapsed.
      `,
      visible: false,
    },
    {
      id: 'copyright',
      title: `Copyrights`,
      text: `The copyright and all other rights to content, images, photos, or other files on this website 
          belong exclusively to the operator of this website or the specifically named rights holders. 
          Written permission from the copyright holder must be obtained in advance for the reproduction of any files.
      `,
      visible: false,
    },
    {
      id: 'cookies',
      title: `Cookies`,
      text: `This website does not currently use cookies`,
      visible: false,
    },
    {
      id: 'salvatoryClause',
      title: `Severability Clause`,
      text: `
    If any provision of this privacy policy is found to be invalid, unlawful, or unenforceable, 
    the validity of the remaining provisions shall not be affected. 
    The invalid or unenforceable provision shall be replaced by a valid and enforceable provision 
    that most closely reflects the intent of the original provision.`,
      visible: false,
    },
  ];

  override ngOnInit() {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      const i = this.items.findIndex((el) => el.id === fragment);
      if (i >= 0) this.items[i].visible = true;
    }
  }

  public urlCopied(event: MouseEvent) {
    this.toast.success('URL copied');
    event.stopPropagation();
  }
}

interface ItemI {
  id: string;
  title: string;
  text: string;
  table?: string;
  visible: boolean;
}
