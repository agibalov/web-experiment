import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

import { EliteButtonComponent } from './elite-button.component';
import { centered } from '@storybook/addon-centered/angular';

storiesOf('Stuff|Elite Button', module)
  // when this is enabled, it looks like EliteButtonComponent props get ignored
  // .addDecorator(centered)
  .add(
    'Default',
    () => ({
      component: EliteButtonComponent
    }),
    { notes: 'Some notes' })
  .add(
    'Custom text',
    () => ({
      component: EliteButtonComponent,
      props: {
        text: 'Custom text!!!'
      }
    }),
    { notes: 'Some notes #2' })
  .add(
    'Click handler',
    () => ({
      component: EliteButtonComponent,
      props: {
        text: 'Click me',
        click: action('Clicked!')
      }
    }),
  { notes: 'Some notes #3' })
  .add(
    'Decorate',
    () => ({
      template: `
<div class="box">
  <app-elite-button [text]="text" (click)="click()"></app-elite-button>
</div>`,
      props: {
        text: 'Some text',
        click: action('Clicked!')
      },
      moduleMetadata: {
        declarations: [ EliteButtonComponent ]
      }
    }));
