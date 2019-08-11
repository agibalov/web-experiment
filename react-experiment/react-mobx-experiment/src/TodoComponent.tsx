import { observer } from 'mobx-react';
import * as React from 'react';
import { Todo } from './Todo';

export interface TodoComponentProps {
    todo: Todo;
    delete: () => void;
}

@observer
export class TodoComponent extends React.Component<TodoComponentProps> {
    render(): any {
        return (
            <div>
                text={this.props.todo.text}
                <button type="button" onClick={() => this.props.delete()}>Delete</button>
            </div>
        );
    }
}
