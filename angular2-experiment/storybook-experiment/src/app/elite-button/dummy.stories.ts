import { storiesOf } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';

storiesOf('General|Dummy', module)
  .addDecorator(centered)
  .add(
    'Dummy',
    () => ({
      template: '<p>hello world</p>'
    }));
